/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Route.post('/list', 'ProductController.list').middleware('auth')
  Route.post('/list', 'ProductController.list')
  Route.post('/create', 'ProductController.create')
}).prefix('/products')

// Route.post('/order/create', 'OrdersController.create').middleware('auth').middleware('throttle:1,1') //一分钟一个订单
Route.post('/order/create', 'OrdersController.create').middleware('auth')
Route.get('/order/test', 'OrdersController.test').middleware(['auth', 'throttle:10,20']) //一分钟一个订单

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
}).prefix('/users')

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
