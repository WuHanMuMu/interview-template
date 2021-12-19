import { MyServiceContract } from '@ioc:MyNameSpace/MyService'

export default class MyServiceImp implements MyServiceContract {
  public protocol: string

  constructor(protocol: string) {
    this.protocol = protocol
  }
}
