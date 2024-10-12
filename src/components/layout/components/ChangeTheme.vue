<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-11 14:22:36
 @LastEditTime: 2024-10-11 14:22:36
-->
<template>
  <el-dialog v-model="model" title="修改主题" width="800">
    <div class="theme-list">
      <div class="theme-item" v-for="(item, index) in themeList" :key="index" @click="handleClick(item, 0)">
        <div class="theme-color" :style="{background: item.backGroundColor}"></div>
        {{ item.label }}
      </div>
    </div>
    自定义主题颜色
    <el-color-picker v-model="color" :show-alpha="showAlpha" @change="handleClick($event, 1)" />
  </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
// //调用切换方法
const model = defineModel()
const state = reactive({})
const store = useStore()
const color = ref('#409EFF')
const showAlpha = ref(true)
const themeList = computed(() => store.state.theme.themeList)
const handleClick = (item, type) => {
  if (type === 0) {
    document.documentElement.setAttribute('theme-mode', item.value)
    console.log('documentElement', document.documentElement.getAttribute('theme-mode'))
    store.commit('theme/setTheme', item)
  } else {
    const theme = { label: '', value: 'customize', textColor: '', backGroundColor: item }
    store.commit('theme/setTheme', theme)
    document.getElementsByTagName("body")[0].style.setProperty(`--primaryColor`, theme.backGroundColor);
    document.getElementsByTagName("body")[0].style.setProperty(`--primaryTextColor`, theme.color);
  }
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