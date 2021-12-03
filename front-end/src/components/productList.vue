
<template>
  <el-row>
    <el-col
      v-for="product in list"
      :key="product.id"
      :span="8"

    >
      <el-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>{{product.name}}</span>
          <div class="bottom">
            <time class="time">库存：{{product.stock}}</time>
            <time class="time">描述{{product.description}}</time>
            <el-button type="text" class="button">价格:{{product.price}}</el-button>
            <el-button @click.prevent="purchase(product.id)">去购买</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
// import Vue from 'vue'
import axios from '../plugins/net'
import { ElNotification } from 'element-plus'
export default {
  data: ()=>{
    return {
      list: [],
      // user: this.user
    }
  },
  // props: {
  //   user: Object,
  //   login: Boolean,
  //   fuck: string
  // },
  props: ['user', 'login', 'fuck'],
  methods: {
    purchase(id) {

      setTimeout(()=>{
         ElNotification({
        title: 'Success',
        message: '购买成功',
        type: 'success',
      })
      }, 1000)
      
    //   axios.post('/order/create',{
    //     productId: id
    //   }, {headers: {
    //  Authorization: 'Bearer ' + this.user.token
  //  }}).then(res=>{
  //    const {data} = res;
     
  //  })
      
    },
  },
  mounted(){
    console.log(this)
    console.log(this.user, this.name, this.token)
    console.log(this.login, this.fuck)
   axios.post('/products/list',{}, {headers: {
     Authorization: 'Bearer ' + this.user.token
   }}).then(res=>{
     const {data} = res;
     console.log(data);
     this.list = data.data
   })
  }
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>