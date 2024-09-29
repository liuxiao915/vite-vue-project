<template>
  <div class="login">
    <div class="login-module">
      <div class="login-module_title">统一身份认证</div>
      <el-form ref="formRef" style="width: 100%" :model="ruleForm" status-icon :rules="rules" label-width="auto">
        <el-form-item label="" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入用户名">
            <template #prefix>
              <div class="user-icon"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" show-password v-model="ruleForm.password" placeholder="请输入登录密码">
            <template #prefix>
              <div class="password-icon"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <!-- 滑动校验 -->
          <slider @verificationSuccess="getVerificationResult" />
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
  userName: '',
  password: ''
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
  password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
})
const isSuccessUnlock = ref(false)
// 获取滑动的验证结果
const getVerificationResult = (isSuccess) => {
  isSuccessUnlock.value = isSuccess;
}
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      store.commit('setUserInfo', ruleForm)
      router.push('/')
      sessionStorage.setItem('token', utils.guid(16))
    }
  })
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 1920px;
  height: 919px;
  background: url('@/assets/images/login/full-screen-bg.png') no-repeat;
  background-size: 666px 573px;
  background-position: 160px 254px;
  .login-module {
    position: absolute;
    right: 160px;
    bottom: 277px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: 500px;
    background: #ffffff;
    box-shadow: 0px 5px 5px 0 rgba(83, 53, 89, 0.2);
    border-radius: 8px;
    padding: 56px 40px;
  }
  .login-module_title {
    font-family: PingFangSC-Regular;
    color: #181818;
    font-weight: 600;
    font-size: 20px;
  }
  .el-input {
    margin-top: 24px;
    width: 100%;
    height: 50px;
  }
  .user-icon {
    width: 24px;
    height: 24px;
    background: url('@/assets/images/login/user.png') no-repeat;
    background-size: 100% 100%;
  }
  .password-icon {
    width: 24px;
    height: 24px;
    background: url('@/assets/images/login/password.png') no-repeat;
    background-size: 100% 100%;
  }
  .el-button {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    line-height: 50px;
    border-radius: 8px;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #ffffff;
    font-weight: 600;
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
