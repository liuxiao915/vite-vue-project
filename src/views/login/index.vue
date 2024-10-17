<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box_title">统一身份认证</div>
      <el-form ref="formRef" style="width: 100%" :model="ruleForm" status-icon :rules="rules" label-width="auto">
        <el-form-item label="" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入用户名" prefix-icon="UserFilled" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" show-password v-model="ruleForm.password" placeholder="请输入登录密码" prefix-icon="Unlock" />
        </el-form-item>
        <el-form-item label="" prop="">
          <!-- 滑动校验 -->
          <slider v-model="ruleForm.sliderVerify" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import slider from './slider.vue';
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { utils } from '@/utils/index'
const store = useStore()
const router = useRouter()
const ruleForm = reactive({
  userName: 'admin',
  password: '123456',
  sliderVerify: false
})
const formRef = ref(null)
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入登录密码'))
  } else {
    callback()
  }
}
const rules = reactive({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
  sliderVerify: [{ required: true, message: '请完成安全验证' }],
})
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      if (!ruleForm.sliderVerify) {
        ElMessage({
          type: 'error',
          message: '请完成安全验证！',
        })
        return
      }
      store.commit('tabs/setUserInfo', ruleForm)
      router.push('/')
      sessionStorage.setItem('token', utils.guid())
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login/full-screen-bg.png') no-repeat;
  background-size: 666px 573px;
  background-position: 160px 254px;
  .login-box {
    position: absolute;
    right: 10%;
    bottom: 0;
    top: 0;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: 480px;
    background: #ffffff;
    box-shadow: 0px 5px 5px 0 rgba(83, 53, 89, 0.2);
    border-radius: 8px;
    padding: 50px 40px;
    .login-box_title {
      font-family: PingFangSC-Regular;
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .el-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  .el-input {
    width: 100%;
    height: 50px;
    :deep(.el-input__icon) {
      width: 24px;
      height: 24px;
    }
  }
  .el-button {
    width: 100%;
    height: 50px;
    font-size: 18px;
  }
  :deep(.ant-input-affix-wrapper) {
    padding: 10px 24px;
    border: 1px solid rgba(221, 221, 221, 1);
    border-radius: 8px;
    .ant-input-prefix {
      margin-inline-end: 24px;
    }
    input::-webkit-input-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #999999;
      line-height: 24px;
      font-weight: 400;
    }
  }
}
</style>
