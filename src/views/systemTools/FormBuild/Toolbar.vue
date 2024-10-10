<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:44:31
 @LastEditTime: 2024-10-10 16:44:31
-->
<template>
  <div class="toolbar">
    <el-button @click="hanleClick('preview')">预览</el-button>
    <el-button @click="hanleClick('screenshot')">截图</el-button>
    <el-button @click="hanleClick('copy')">复制代码</el-button>
    <el-button @click="hanleClick('generateFiles')">生成vue文件</el-button>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const state = reactive({})
const hanleClick = (type) => { }
</script>
<style lang="less" scoped>
</style>