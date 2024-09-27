<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-09-13 15:30:51
 @LastEditTime: 2024-09-13 15:30:51
-->
<template>
  <el-button @click="visible = true">点击修改图片</el-button>
  <CutPicture v-model="visible" />
</template>
<script setup>
import CutPicture from '@/components/vue-cropper/cutPicture.vue'
import { ref } from 'vue'
const visible = ref(false)
</script>
<style lang="less" scoped>
</style>