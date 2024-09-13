<template>
  <div class="login">
    <div class="login-module">
      <div class="login-module_title">统一身份认证</div>
      <el-input v-model="userInfo.userName" placeholder="请输入用户名">
        <template #prefix>
          <div class="user-icon"></div>
        </template>
      </el-input>
      <el-input type="password" show-password v-model="userInfo.password" placeholder="请输入登录密码">
        <template #prefix>
          <div class="password-icon"></div>
        </template>
      </el-input>
      <!-- 滑动校验 -->
      <slider @verificationSuccess="getVerificationResult" />
      <div class="login-btn" :style="btnStyle" @click="handleLogin">登录</div>
    </div>
  </div>
</template>

<script>
import slider from "./slider.vue";
export default {
  components: {
    slider,
  },
  data() {
    return {
      // 用户信息
      userInfo: {
        userName: "",
        password: "",
      },
      // 密码是否可见
      closeEyes: false,
      // 账号不存在/密码错误提示框
      isShowError: false,
      // 滑块是否解锁成功
      isSuccessUnlock: false,
    };
  },
  computed: {
    btnStyle() {
      let background = "#825C89";
      let cursor = "pointer";
      if (
        !this.userInfo.userName ||
        !this.userInfo.password ||
        !this.isSuccessUnlock
      ) {
        background = "rgba(130, 92, 137, 0.3)";
        cursor = "not-allowed";
      }
      return {
        background,
        cursor,
      };
    },
  },
  methods: {
    // 获取滑动的验证结果
    getVerificationResult(isSuccess) {
      this.isSuccessUnlock = isSuccess;
    },
    // 登录校验
    handleLogin() { },
  },
};
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
    width: 560px;
    height: 525px;
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
    width: 480px;
    height: 60px;
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
  .login-btn {
    width: 480px;
    height: 60px;
    margin-top: 40px;
    text-align: center;
    line-height: 60px;
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
