/**
 * Contract source: https://git.io/JemcN
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    success(message: any): void
    // userId: number
    // RequestContract : typeof RequestContract{
    //   userId: number
    // }
    // export interface Legged {
    //   numberOfLegs: number;
    // }
    // request : imple{
    //   userId: number
    // }
  }
}
declare module '@ioc:Adonis/Core/Request' {
  interface RequestContract {
    userId: number
  }
}
