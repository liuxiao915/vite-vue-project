<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-11 14:22:36
 @LastEditTime: 2024-10-11 14:22:36
-->
<template>
  <el-dialog v-model="model" title="修改密码" width="600">
    <el-form ref="formRef" style="max-width: 500px" :model="ruleForm" status-icon :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-form-item label="用户名" prop="age">
        <el-input v-model="ruleForm.age" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, defineModel } from 'vue'
const model = defineModel()
const formRef = ref(null)
const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})
const validatePass = (rule, value, callback) => {
  if (value === '') {
    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~`-]).{8,16}$/,
    // message: "密码必须包含大写字母、小写字母、数字、特殊字符且8-16位",
    callback(new Error('请输入密码！'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!formRef.value) return
      formRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码！'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const rules = reactive({
  age: [{ required: true, message: '请输入用户名！', trigger: 'blur' }],
  pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
  checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
})
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang="less" scoped>
</style>