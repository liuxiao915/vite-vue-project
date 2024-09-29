<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-09-29 15:31:10
 @LastEditTime: 2024-09-29 15:31:10
-->
<template>
  <el-sub-menu v-if="menuItem?.children?.length" :index="menuItem.path">
    <template #title>
      <span>{{ menuItem.meta?.title }}</span>
    </template>
    <el-menu-item v-for="subItem in menuItem.children" :key="subItem.name" :index="subItem.path">
      <template #title>{{ subItem.meta?.title }}</template>
      <template v-if="subItem?.children?.length">
        <SubMenuItem v-for="_item in subItem" :key="_item.name" :menuItem="_item" />
      </template>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="menuItem.path">
    <template #title>{{ menuItem.meta?.title }}</template>
  </el-menu-item>
</template>
<script setup>
import { computed } from 'vue'
import SubMenuItem from './SubMenuItem.vue'
const props = defineProps({
  menuItem: {
    type: Object,
    default: () => { },
  },
})
</script>
<style lang="less" scoped>
</style>