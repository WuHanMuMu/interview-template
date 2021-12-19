import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MyServiceImp from './MyServiceImp'

export default class MyServiceProvider {
  public static needsApplication = true

  constructor(protected application: ApplicationContract) {
    console.log('i was called')
  }

  public register() {
    this.application.container.bind('@ioc:MyNameSpace/MyService', () => {
      console.log('@ioc:MyNameSpace/MyService')
      return new MyServiceImp('http')
    })

    this.application.container.bind('MyNameSpace/MyService', () => {
      console.log('MyNameSpace/MyService')
      return new MyServiceImp('https')
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them
    console.log('ready')
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
