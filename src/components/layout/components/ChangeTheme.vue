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
        <div class="theme-color" :style="{background: item.bgColor}"></div>
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
  let theme = null
  if (type === 0) {
    // 设置已有的主题，通过对html添加theme-mode属性，让已定义的主题生效
    theme = item
    document.documentElement.setAttribute('theme-mode', item.value)
  } else {
    // 在body上添加style="--primaryColor: #eb5f0e;"，动态定义全局css变量
    theme = { label: '', value: 'customize', textColor: '', bgColor: item }
  }
  store.commit('theme/setTheme', theme)
  document.getElementsByTagName("body")[0].style.setProperty(`--primaryColor`, theme.bgColor);
  document.getElementsByTagName("body")[0].style.setProperty(`--primaryTextColor`, theme.textColor);
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