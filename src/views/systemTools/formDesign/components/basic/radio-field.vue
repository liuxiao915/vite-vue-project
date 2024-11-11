<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-11-11 10:35:31
 @LastEditTime: 2024-11-11 10:35:31
-->
<template>
  <el-radio-group v-model="radio">
    <el-radio value="1" size="large">Option 1</el-radio>
    <el-radio value="2" size="large">Option 2</el-radio>
  </el-radio-group>
</template>
<script setup>
import { ref } from 'vue'
const radio1 = ref('1')
</script>
<style lang="less" scoped>
</style>