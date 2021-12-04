import Order from 'App/Models/Order'
import Product from 'App/Models/Product'

const EventEmitter = require('events')

class OrderEvent extends EventEmitter {}
const orderEvent = new OrderEvent()

orderEvent.on('order:finished', async (order) => {
  console.log('xxxx', order)
  // 更新 订单支付状态
  await Order.query().where('orderNo', order.orderNo).update({ status: 2 })
  // 更新商品库存
  await Product.query().where('id', order?.productId).decrement('stock', 1)
})
export default orderEvent
