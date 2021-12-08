# adonisjs + vue

前端代码在front-end 里面
后端代码就是本仓库

## 前端

前端安装包 (vite对vue版本有要求，和element-ui有点冲突，只能强行安装)
```bash
  npm i --force 
```
前端启动
```bash
  npm run dev
```
前端利用location去判断是否为上传界面， 因为感觉没几个页面， 没有用vue-router, 直接用变量判断的
用户端地址 http://127.0.0.1:3000
上传商品地址 http://127.0.0.1:3000/admin

## 后端
先修改.env文件，加入mysql和redis的配置
安装依赖
```
npm i
```
然后同步数据库表结构
```
node ace migration:run
```
启动
```
node ace serve
```
接口访问地址 http://127.0.0.1:3333

## 表结构
1. 商品表
2. 用户表
3. 订单表
4. 用户行为日志表

## 功能说明 
1. 商品名称搜索 用的是mysql的like，量大可考虑 mysql的全文索引
2. 下单购买  安全性考虑，在后端加入了 登录校验和 请求频率校验 修改限流中间件，加入了用户id
3. 用户访问日志 在全局中间件中实现，修改了request对象，增加了用户的id属性方便记录
4. 下单完成之后支付 异步时间利用的 node.js的eventEmitter 没有使用队列

## 接口记录

1. 用户相关
   1. 注册
   2. 登录
2. 商品相关
   1. 创建
   2. 列表
3. 订单相关
   1. 创建订单


## 其它

限流测试命令
```
 ab -n 100 -c 20 -H 'Authorization: bearer Y2t3cTh3ZGY4MDAwMWJ5OWdoMjNqZnppcQ.JatNBpfQs5dbu_QFis2mYa0p-37TJDhAfe1vs-eXFw-ylhBMG9gBCVhi_pGk' http://127.0.0.1:3333/order/test
```


修改点
1. 密码 明文传输 
2. queue 下游通知改为queue

adonisjs 
1. 中间件的 设计
   1. 所有的中间件会在路由到达之前串行化执行，调用next之前不会进入路由
2. ioc 的实现
   v5的版本官方文档里面没有提到ioc，在v4的文档里面提到了
   实际上依赖注入和egg的类似，在运行时注入
   但是adonisjs里面推荐是集中注册，而不是每个组件注册，
   ioc注册这一块代码主要在 adonisjs/fold下面
   核心是 一个 register 和 resolve
   注册时根据 namespace 和参数 挂载 app 实例下面， 这个时候就会直接实例化，根据注册的类型 比如单例还是多实例这样的，注册一个对象或者函数
   获取时，根据 namespace获取对应实例 核心就一行
   ```typescript
   this.container.lookupOrFail(tokens.join('.'), prefixNamespace)
   ```
   这里是使用使用例子
   ```typescript
   // provider.ts
   this.$container.singleton('MyProject/GreetingService', () => new GreetingService())
   // controller.ts
   import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
   import GreetingService from '@ioc:MyProject/GreetingService'
   export default class TestController {
   public async index ({ response }: HttpContextContract) {
      GreetingService.sayHello('Bob')
      // more code ....
      return response.ok({
         data: {},
      })
   }
   }
   ```
   使用方式如上，不需要实例化
3. 安全性设计 
   主要是基于 shield 这个库实现
   1. csrf 跨域请求伪造 这个一般如果前后端分离，是不需要这个的，如果不使用cookie的话没有这个问题
   2. csp 资源安全策略，设置安全的加载资源来源 防止脚本共计
   3. DNS Prefetch dns的提前解析
   4. Frame guard 是否允许iframe标签解析
   5. HSTS 是否允许通过http访问
vue 
基础




