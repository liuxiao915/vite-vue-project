<template>
  <div class="counter">
    <Ts :money="123456" car="奔驰" />
  </div>
</template>
<script setup lang="ts">
import Ts from '@/views/ts.vue'
defineOptions({
  name: 'Index'
})
</script>
<style scoped lang="less">
.counter {
  width: 100%;
  height: 100%;
}
</style>