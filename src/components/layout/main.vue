<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-07-27 09:46:37
 @LastEditTime: 2024-07-27 09:46:37
-->
<template>
  <el-main class="layout-main">
    <el-tabs
      v-model="activeTabs"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.name"
        :label="item.meta.title"
        :name="item.name"
      />
    </el-tabs>
    <el-card>
      <router-view />
    </el-card>
    <el-backtop target=".layout-main" />
  </el-main>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
let tabIndex = 2
const store = useStore()
const route = useRoute()
const router = useRouter()
const activeTabs = ref(null)
const tabsList = toRef(store.state.home, 'tabList') // 存放标签页数组
watch(
  () => route,
  (newVal) => {
    if (newVal) {
      activeTabs.value = newVal.name
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
const removeTab = (targetName) => {
  const index = tabsList.value.findIndex((item) => item.name === targetName) //查找触发右键菜单所在标签页index
  if (tabsList.value.length === 1) {
    router.replace('/')
    store.commit('updateTabs', index)
    return
  }
  //当前激活标签页与触发右键菜单标签页是同一页
  if (targetName === activeTabs.value) {
    if (index !== 0) {
      //当前激活标签页是标签页数组的第一个，则将激活标签页设置为 Index
      //当前激活标签页不是标签页数组的第一个，则将激活标签页设置为当前激活标签页的前一页
      router.replace(tabsList.value[index - 1].fullPath)
    } else {
      router.replace(tabsList.value[index + 1].fullPath)
    }
  }
  store.commit('updateTabs', index)
}
</script>

<style lang="less" scoped>
.layout-main {
  width: 100%;
}
</style>
