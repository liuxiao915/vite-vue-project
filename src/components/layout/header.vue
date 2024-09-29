<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-01-10 16:27:25
 @LastEditTime: 2024-01-10 16:27:25
-->
<template>
  <el-header>
    <div>{{ state.Header }}</div>
    <el-dropdown>
      <span class="el-dropdown-link">{{ userInfo.userName }}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in state.dropdownList" :key="item.value" @click="handleClick(item)">{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog v-model="visible" title="查看个人信息" width="800">
      <div>姓名：{{ userInfo.userName }}</div>
    </el-dialog>
  </el-header>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const state = reactive({
  Header: '管理系统',
  dropdownList: [
    { label: '查看个人信息', value: 0 },
    { label: '退出登录', value: 1 },
  ]
})
const visible = ref(false)
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const handleClick = (item) => {
  if (item.value === 0) {
    visible.value = true
  } else if (item.value === 1) {
    ElMessageBox.confirm('是否确认要退出登录?', '提示', { type: 'warning' })
      .then(() => {
        store.commit('clearUserInfo')
        ElMessage({
          type: 'success',
          message: '退出登录成功！',
        })
      })
  }
}
</script>

<style lang="less" scoped>
.el-header {
  line-height: 60px;
  font-style: 30px;
  font-weight: 600;
  text-align: center;
  background-color: @blue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>