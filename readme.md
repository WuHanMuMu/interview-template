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






