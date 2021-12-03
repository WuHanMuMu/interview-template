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
      <el-col :span="12" :offset="6">
        <el-form-item label="商品名称" prop="name" class='input'>
          
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
         <el-form-item label="商品描述" prop="description" class='input'>
          <el-input class='input'
            v-model="ruleForm.description"
            type="input"
            autocomplete="true"
          ></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
         <el-form-item label="商品价格" prop="price" class='input'>
          <el-input class='input'
            v-model="ruleForm.price"
            type="input"
            autocomplete="true"
          ></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
         <el-form-item label="商品商品库存" prop="stock" class='input'>
          <el-input class='input'
            v-model="ruleForm.stock"
            type="input"
            autocomplete="true"
          ></el-input>
          </el-form-item>
      </el-col>
    </el-row>
   
   
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
      >
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
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
    }
  },
  methods: {
    submitForm(formName: string | number) {
      this.$refs[formName].validate((valid: any) => {
        if (valid) {
          axios.post('/products/create', {
            ...this.ruleForm,
          }).then((res: any) => {
            console.log(res)
            this.resetForm(formName)
            // this.$emit('loginSuccess', res.data)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName: string | number) {
      this.$refs[formName].resetFields()
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
