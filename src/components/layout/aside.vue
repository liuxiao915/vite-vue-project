<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-01-10 16:25:07
 @LastEditTime: 2024-01-10 16:25:07
-->
<template>
  <el-aside width="240px">
    <el-menu router active-text-color="#2A64FE" :default-active="activeName" :collapse="isCollapse">
      <el-menu-item v-for="item in menuData" :key="item.path" :index="item.path" @click="clickMenu(item)">
        <SvgIcon :svgName="activeName === item.path ? `${item.meta?.icon as string}-active` : item.meta?.icon as string" />
        <template #title>{{ item.meta?.title }}</template>
      </el-menu-item>
    </el-menu>
    <img class="toggle-icon" :src="isCollapse ? right : left" @click="isCollapse = !isCollapse" />
  </el-aside>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { routes } from '@/router/index.ts';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import left from '@/assets/images/toggle-left.png'
import right from '@/assets/images/toggle-right.png'
const isCollapse = ref(false)
const route = useRoute()
const router = useRouter()
const activeName = ref('/')
const menuData = computed(() => routes[0].children)
watch(
  () => route,
  (newVal) => {
    if (newVal) {
      console.log('route', newVal);
      activeName.value = newVal?.path
    }
  },
  {
    immediate: true
  }
)
const clickMenu = (item: RouteRecordRaw) => {
  activeName.value = item.path
    // params传参，只能用name
    // router.push({name: 'about', params: {id: 2}})
  
}
</script>

<style lang="less" scoped>
.el-aside {
  height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  width: auto;
}
.el-menu {
  height: 100%;
  .el-menu-item {
    font-size: 18px;
  }
  &:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
  .icon-svg {
    margin-right: 8px;
  }
}
.toggle-icon {
  position: absolute;
  bottom: 20px;
  right: 0;
}
</style>