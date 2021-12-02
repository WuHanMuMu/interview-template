import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserLocationMiddleware {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    ctx.success = async (data: any) => {
      return ctx.response.json({
        status: 'success',
        data,
      })
    }
    await next()
  }
}