<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-08-28 09:56:32
 @LastEditTime: 2024-08-28 09:56:32
-->
<template>
  <div @click="handleClick">这是home页面</div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
// const router = useRouter()
const handleClick = () => {
  console.log(route, window.location)
  // router.push({ name: 'index' })
  window.open(window.location.href + 'index', '_self')
}
</script>
<style lang="less" scoped>
</style>