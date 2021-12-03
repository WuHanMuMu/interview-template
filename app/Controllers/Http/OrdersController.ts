import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  public async create({ request, auth, success }: HttpContextContract) {
    const productId = request.input('productId')
  }
}
