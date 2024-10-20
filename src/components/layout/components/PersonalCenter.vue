<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-11 14:22:36
 @LastEditTime: 2024-10-11 14:22:36
-->
<template>
  <el-dialog v-model="model" title="个人中心" width="800">
    <div>姓名：{{ userInfo?.userName }}</div>
  </el-dialog>
</template>
<script setup>
import { reactive } from 'vue'
const state = reactive({})
const model = defineModel()
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
</script>
<style lang="less" scoped>
</style>