<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
  </el-config-provider>
</template>
<script setup>
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
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