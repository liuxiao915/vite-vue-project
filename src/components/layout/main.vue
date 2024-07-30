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
        >
        <el-card>
          <router-view />
        </el-card>
        </el-tab-pane>
      </el-tabs>
      <el-backtop target=".layout-main" />
    </el-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
let tabIndex = 2

const store = useStore()
const route = useRoute()
const activeTabs = ref(route.name)
const tabsList = computed(() => {
  console.log('tabList', store.state.home.tabList)
  return store.state.home.tabList
})
// const tabsList = computed(() => {
//   get() { 
//     return store.state.home.tabList
//   },
//   set(val) {
//     store.commit('home/addTabs', val)
//   }
// })
const removeTab = (targetName) => {
  const tabs = tabsList.value
  let activeName = activeTabs.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  activeTabs.value = activeName
  tabsList.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>

<style lang="less" scoped>
.layout-main {
  width: 100%;
}
</style>
