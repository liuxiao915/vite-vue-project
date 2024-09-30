<template>
  <div class="screen-full" @click="hanleClick">
    <FullScreen style="width: 2em; height: 2em; margin-right: 8px" />全屏
  </div>
</template>

<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
// mounted() {
//   this.init()
// },
// beforeDestroy() {
//   this.destroy()
// },
const hanleClick = () => {
  if (!screenfull.isEnabled) {
    this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
    return false
  }
  screenfull.toggle()
}
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', this.change)
  }
}
const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', this.change)
  }
}
</script>

<style lang="less" scoped>
.screen-full {
  display: flex;
  flex-direction: row;
  width: 100px;
  align-items: center;
  svg {
    font-size: 12px;
  }
}
</style>
