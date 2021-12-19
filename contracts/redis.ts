/**
 * Contract source: https://git.io/JemcN
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

declare module '@ioc:Adonis/Addons/Redis' {
  interface RedisConnectionsList {
    local: RedisConnectionConfig
  }
}

declare module '@ioc:MyProject/GreetingService' {
  export interface GreetingService {
    sayHello(name: string): void
  }
}
declare module '@ioc:MyNameSpace/MyService' {
  export interface MyServiceContract {
    protocol?: string
  }
}
