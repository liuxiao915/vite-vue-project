<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-01-10 16:27:25
 @LastEditTime: 2024-01-10 16:27:25
-->
<template>
  <el-header>
    <div>
      {{state.Header}}
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        Dropdown List
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
  Header: '管理系统',
})
</script>

<style lang="less" scoped>
.el-header {
  line-height: 60px;
  font-style: 30px;
  font-weight: 600;
  text-align: center;
  background-color: @blue;
}
</style>