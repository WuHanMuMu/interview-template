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






