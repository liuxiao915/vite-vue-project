<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { isStorageObject } from '@/utils/storage.js'
if (isStorageObject('local', 'theme')) {
  const theme = JSON.parse(localStorage.getItem('theme')) || null
  document.documentElement.setAttribute('theme-mode', theme?.value)
  if (theme?.value === 'customize') {
    document.getElementsByTagName("body")[0].style.setProperty(`--primaryColor`, theme.backGroundColor);
  }
}
const locale = ref({
  ...zhCn,
  el: {
    pagination: {
      goto: '跳至',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页',
      // 覆盖其他组件文案...
    }
    // 覆盖其他组件的文案...
  }
})
</script>