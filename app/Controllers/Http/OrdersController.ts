import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import orderEvent from 'App/event/orderEvent'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'
import moment = require('moment')

export default class OrdersController {
  public async create({ request, auth, success, response }: HttpContextContract) {
    // return 100
    const productId: number = request.input('productId')
    
    if (!productId) throw new Error('商品id是需要参数')
    
    const product = await Product.find(productId)
    
    if (!product || product.stock < 1) throw new Error('商品库存不足')
    const userId = auth.user?.id
    // return 100
    const transaction = await Database.transaction()
    // return 100
    console.log('xxx')
    
    try {
      const orderNo = await this.orderNo()
      const [order] = await transaction
        .table('orders')
        .insert({
          productId,
          price: product?.price,
          orderNo,
          userId,
          status: 0,
          quantity: 1,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .returning('*')
      console.log('xx', order)
      await transaction.commit()
      console.log('200')
      response.send({ hhhh: 1 })
      // return '100'
      success({
        orderId: order,
        orderNo
      })

      // 15秒后自动完成订单
      setTimeout(() => {
        this.finish(orderNo)
      }, 1000)
    } catch (error) {
      console.log('eee', error)
      await transaction.rollback()
      throw error
    }
  }

  public async test() {
    console.log('1')
    return 200
  }
  public async finish(orderNo: string) {
    const order = await Order.findBy('orderNo', orderNo)
    // 这里讲道理是应该使用rabbitmq之类的
    // 简单一点 直接用node 的eventemitter
    orderEvent.emit('order:finished', order)
  }

  private async orderNo(retry = 5) {
    if (retry <= 0) throw new Error('获取订单号失败')
    const orderNo = moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 10)
    const count = await Database.from('orders').where('orderNo', orderNo).count('* as count')
    if (count[0].count > 0) {
      return this.orderNo(retry - 1)
    }
    return orderNo
  }
}
