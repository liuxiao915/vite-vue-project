<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-09-29 11:51:16
 @LastEditTime: 2024-09-29 11:51:16
-->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="index === levelList.length - 1" class="no-redirect">
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const levelList = ref([])
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)[0]
  matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}
const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) {
    router.push(path)
  }
}

watch(
  () => route.path,
  () => {
    console.log('watch--route', route)
    getBreadcrumb()
  },
  { immediate: true }
)
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
</style>