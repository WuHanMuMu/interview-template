import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    // const { email, password } = request.all()

    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }

  // The register method Creates a New User object and save it to the database.
  public async register({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const name = request.input('name')
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      name: schema.string({ trim: true }),
      password: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: userSchema })
    console.log(payload)
    const count = await User.findBy('email', email)
    if (count) return { message: 'Email already exists' }
    const user = new User()
    user.email = email
    user.password = password
    user.name = name
    await user.save()
    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }
}
