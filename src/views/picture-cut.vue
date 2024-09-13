<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-09-13 15:30:51
 @LastEditTime: 2024-09-13 15:30:51
-->
<template>
  <el-button @click="visible = true">点击选择图片</el-button>
  <CutPicture v-model="visible" />
</template>
<script setup>
import CutPicture from '@/components/vue-cropper/cutPicture.vue'
import { ref, reactive } from 'vue'
const visible = ref(false)
const state = reactive({})
</script>
<style lang="less" scoped>
</style>