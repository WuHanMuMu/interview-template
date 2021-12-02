<template>
  <div class="common-layout">
    <el-container>
      <el-header> 商品购物
          <span v-if="!login">去登录</span>
          <span v-if="login">{{user.name}}</span>
      </el-header>
      <el-main>
        <div>
            
          <el-button type="primary">el-button</el-button>
        </div>
        <login v-if="!login" @loginSuccess="loginSuccess"></login>
        <productList v-if="login">商品列表</productList>
        <div>

        </div>
      </el-main>
    </el-container>
  </div>
  
</template>

<script lang="ts">
import login from './components/login.vue'
export default {
  name: 'App',
  components: {
    login
  },
  // props: ['login', 'user'],
  data: () => ({
    login: false,
    user: {
      name: '',
      password: '',
      token: ''
    }
  }),
  methods: {
    loginSuccess(user: any) {
      this.login = true
      this.user.name = '小汪'
      this.user.token = user.token
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
