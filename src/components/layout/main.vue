<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-07-27 09:46:37
 @LastEditTime: 2024-07-27 09:46:37
-->
<template>
    <el-main class="layout-main">
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in tabsList"
          :key="item.name"
          :label="item.title"
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

<script lang="ts" setup>
import { ref } from 'vue'

let tabIndex = 2
const editableTabsValue = ref('2')
const tabsList = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])
const addTab = (targetName) => {
  const newTabName = `${++tabIndex}`
  tabsList.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName) => {
  const tabs = tabsList.value
  let activeName = editableTabsValue.value
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

  editableTabsValue.value = activeName
  tabsList.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>

<style lang="less" scoped>
.layout-main {
  width: 100%;
}
</style>
