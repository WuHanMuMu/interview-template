/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'
import RequestThrottler from '@ioc:Adonis/Addons/RequestThrottler'
import CustomClientRecognizer from 'App/Middleware/requestThrottle'
/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/extend'),
  () => import('App/Middleware/SilentAuth'),
  () => import('App/Middleware/userOperator'),
])
// Server.middleware.register([() => import('App/Middleware/extend')])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/


RequestThrottler.useClientRecognizer(new CustomClientRecognizer())
Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  // throttle: () => {
  //    RequestThrottler.useClientRecognizer(new CustomClientRecognizer())
  //    return RequestThrottler.verifyClient
  // },
  throttle: 'Adonis/Addons/RequestThrottler/Middleware',
})
