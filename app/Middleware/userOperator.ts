import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserLog from 'App/Models/UserLog'

export default class UserLocationMiddleware {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    await next()
    console.log('x')
    await UserLog.create({
      userId: ctx.auth.user?.id,
      ip: ctx.request.ip(),
      action: ctx.request.url(),
      params: JSON.stringify(ctx.request.all()),
      // userAgent: ctx.request.header('user-agent'),
    })
    console.log('x2')
    
  }
}