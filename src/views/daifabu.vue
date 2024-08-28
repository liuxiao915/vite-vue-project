<template>
  <div class="counter">
    这是待发布页面
    <Ts
      :money="123456"
      car="奔驰"
    />
  </div>
</template>
<script setup>
import Ts from '@/views/ts.vue'
defineOptions({
  name: 'Index',
})
</script>
<style scoped lang="less">
.counter {
  width: 100%;
  height: 100%;
}
</style>