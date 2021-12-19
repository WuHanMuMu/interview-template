import { ApplicationContract } from '@ioc:Adonis/Core/Application'


export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    // this.app.container.bind('@ioc:MyProject/GreetingService', () => {
    //   console.log('ioc:MyProject/GreetingService')
    //   return new GreetingService()
    // })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
