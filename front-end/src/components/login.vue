<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    size="small"
  > 
    <el-row>
      <el-col v-if="!login" :span="12" :offset="6">
        <el-form-item label="用户名" prop="username" class='input'>
          
          <el-input 
            v-model="ruleForm.name"
            type="input"
            autocomplete="true"
          ></el-input>
        
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
         <el-form-item label="邮箱" prop="email" class='input'>
          <el-input class='input'
            v-model="ruleForm.email"
            type="input"
            autocomplete="true"
          ></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form-item label="密码" prop="password" class='input'>
          <el-input class='input'
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          ></el-input>
       </el-form-item> 
      </el-col>
    </el-row>
   
   
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
      >
      <el-button @click="resetForm('ruleForm')">去登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import axios from '../plugins/net'
export default {
  data() {
    const checkAge = (rule: any, value: unknown, callback: (arg0: Error | undefined) => void) => {
      if (!value) {
        return callback(new Error('Please input the age'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'))
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validatePass = (rule: any, value: string, callback: (arg0: Error | undefined) => void) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: string, callback: (arg0: Error | undefined) => void) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }],
      },
      login: false
    }
  },
  methods: {
    submitForm(formName: string | number) {
      this.$refs[formName].validate((valid: any) => {
        if (valid) {
          if (!this.login) {
            axios.post('/users/register', {
              ...this.ruleForm,
            }).then((res: any) => {
              console.log(res)
              this.$emit('loginSuccess', res.data)
            })
          }else {
              axios.post('/users/login', {
              ...this.ruleForm,
            }).then((res: any) => {
              console.log(res)
              this.$emit('loginSuccess', {token: res.data.token, name: this.ruleForm.name || this.ruleForm.email})
            })
          }
         
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName: string | number) {
      // this.$refs[formName].resetFields()
      this.login = !this.login
    },
  },
  emits: ['loginSuccess']
}
</script>

<style>
/* .input{
  width: 50%;
} */
</style>
