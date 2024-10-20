<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-01-10 16:27:25
 @LastEditTime: 2024-01-10 16:27:25
-->
<template>
  <el-header class="sticky">
    <div class="logo">{{ state.Header }}</div>
    <!-- <Screenfull /> -->
    <el-dropdown>
      <span class="el-dropdown-link">{{ userInfo?.userName }}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in state.dropdownList" :key="item.value" @click="handleClick(item)">{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <component :is="component" v-model="visible" />
  </el-header>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ChangePassword from './components/ChangePassword.vue'
import ChangeTheme from './components/ChangeTheme.vue'
import PersonalCenter from './components/PersonalCenter.vue'
const store = useStore()
const router = useRouter()
const state = reactive({
  Header: '管理系统',
  dropdownList: [
    { label: '个人中心', value: 0 },
    { label: '修改密码', value: 1 },
    { label: '切换主题', value: 2 },
    { label: '退出登录', value: 3 },
  ]
})
const visible = ref(false)
const curTitle = ref('')
const component = ref(null)
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const handleClick = (item) => {
  curTitle.value = item.label
  if (item.value === 0) {
    visible.value = true
    component.value = PersonalCenter
  } else if (item.value === 1) {
    visible.value = true
    component.value = ChangePassword
  } else if (item.value === 2) {
    visible.value = true
    component.value = ChangeTheme
  } else if (item.value === 3) {
    ElMessageBox.confirm('是否确认要退出登录?', '提示', { type: 'warning' })
      .then(() => {
        store.commit('tabs/clearUserInfo')
        ElMessage({
          type: 'success',
          message: '退出登录成功！',
        })
        router.replace('/login')
      })
  }
}
</script>

<style lang="less" scoped>
.el-header {
  height: 50px;
  line-height: 50px;
  font-style: 30px;
  font-weight: 600;
  text-align: center;
  // background-color: @blue;
  background-color: @primaryColor;
  // background-color: var(--primaryColor);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: end;
  z-index: 10;
  position: relative;
  .logo {
    position: absolute;
    left: 16px;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
}
</style>