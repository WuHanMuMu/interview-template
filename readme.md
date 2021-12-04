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

## 表结构
1. 商品表
2. 用户表
3. 订单表
4. 用户行为日志表

## 功能说明 
1. 商品名称搜索 用的是mysql的like，量大可考虑 mysql的全文索引
2. 下单购买  安全性考虑，在后端加入了 登录校验和 请求频率校验
3. 用户访问日志 在全局中间件中实现，修改了request对象，增加了用户的id属性方便记录






