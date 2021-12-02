import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async create({ request, success }: HttpContextContract) {
    const { name, price, stock, description } = request.body()
    const product = await Product.create({ name, price, stock, description })
    return success(product.toJSON())
  }
  public async list({ success }: HttpContextContract) {
    // const { name, price, stock, description } = request.body()
    const productList = (await Product.all({})).map((product) => product.toJSON())
    return success(productList)
  }
}
