<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:43:29
 @LastEditTime: 2024-10-10 16:43:29
-->
<template>
  <div class="form-build">
    <Toolbar />

  </div>
</template>
<script setup>
import { reactive } from 'vue'
import Toolbar from './Toolbar.vue'
const state = reactive({})
</script>
<style lang="less" scoped>
.form-build {
  height: 100%;
}
</style>