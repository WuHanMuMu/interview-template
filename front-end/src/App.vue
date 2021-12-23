<template>
  <div class="common-layout">
    <el-container>
      <el-header> 商品购物
          <span v-if="!login">去登录</span>
          <span v-else>{{user.name}}</span>
      </el-header>
      <el-main>
        <div v-if="admin">
          <upload></upload>
          <!-- <el-button type="primary">el-button</el-button> -->
        </div>
        <div v-else>
          <login v-if="!login" @loginSuccess="loginSuccess"></login>
          <product-list v-bind:login="login" v-bind:user="user" v-if="login">商品列表</product-list>
          <div>
        </div>
        
        </div>
      </el-main>
    </el-container>
  </div>
  
</template>

<script lang="ts">
import login from './components/login.vue'
import upload from './components/upload.vue'
import product from './components/productList.vue'
export default {
  name: 'App',
  components: {
    login,
    upload,
    'product-list': product
  },
  // props: ['login', 'user'],
  data: () => ({
    login: false,
    user: {
      name: '',
      password: '',
      token: ''
    },
    admin: false
  }),
  methods: {
    loginSuccess(user: any) {
      console.log(user)
      this.login = true
      this.user = {
        token: user.token,
        name: user.name
      }
      // console.log('====>',this.user)
      // this.user.token = user.token
    }
  },
  mounted() {
    if (location.pathname === '/admin') {
      this.admin = true
    }
  }
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
  height: auto;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
  height: 900px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
