<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-11 14:22:36
 @LastEditTime: 2024-10-11 14:22:36
-->
<template>
  <el-dialog v-model="model" title="修改主题" width="800">
    <div class="theme-list">
      <div class="theme-item" v-for="(item, index) in themeList" :key="index" @click="handleClick(item)">
        <div class="theme-color" :style="{background: item.backGroundColor}"></div>
        {{ item.label }}
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
const model = defineModel()
const state = reactive({})
const store = useStore()
const themeList = computed(() => store.state.theme.themeList)
const handleClick = (item) => {
  document.documentElement.setAttribute('theme-mode', item.value)
  console.log('documentElement', document.documentElement.getAttribute('theme-mode'))
  store.commit('theme/setTheme', item)
}
</script>
<style lang="less" scoped>
.theme-list {
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  .theme-item {
    flex: 1;
    .theme-color {
      height: 40px;
      width: 100%;
      background-color: #fff;
    }
  }
}
</style>