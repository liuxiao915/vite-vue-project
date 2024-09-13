<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-01-10 16:25:07
 @LastEditTime: 2024-01-10 16:25:07
-->
<template>
  <el-aside width="240px">
    <el-menu
      router
      active-text-color="#2A64FE"
      :default-active="activeName"
      :collapse="isCollapse"
    >
      <el-menu-item
        v-for="item in menuData"
        :key="item.path"
        :index="item.path"
        @click="clickMenu(item)"
      >
        <SvgIcon :svg-name="getSvgName(item)" />
        <template #title>{{ item.meta?.title }}</template>
        <template v-if="item.children?.length">
          <el-sub-menu
            v-for="subItem in item.children"
            :key="subItem.path"
            :index="subItem.path"
          ></el-sub-menu>
        </template>
      </el-menu-item>
    </el-menu>
    <img
      class="toggle-icon"
      :src="isCollapse ? right : left"
      @click="isCollapse = !isCollapse"
    />
  </el-aside>
</template>

<script setup>
import { ref, toRef, watch, computed } from 'vue'
import { routes } from '@/router/index'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import left from '@/assets/images/toggle-left.png'
import right from '@/assets/images/toggle-right.png'
const isCollapse = ref(false)
const route = useRoute()
const menuData = computed(() => routes[1].children)
const store = useStore()
const activeName = toRef(route, 'path') // 存放当前激活标签页，默认激活首页
const getSvgName = (item) => {
  return activeName === item.path
    ? `${item.meta?.icon}-active`
    : item.meta?.icon
}
const clickMenu = (item) => { }
</script>

<style lang="less" scoped>
.el-aside {
  height: calc(100vh - 60px);
  overflow: hidden;
  position: relative;
  width: auto;
  &:hover {
    overflow-y: auto;
  }
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