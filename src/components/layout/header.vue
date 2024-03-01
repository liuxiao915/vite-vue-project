<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-01-10 16:27:25
 @LastEditTime: 2024-01-10 16:27:25
-->
<template>
  <el-header>{{state.Header}}</el-header>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  Header: 'Header'
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