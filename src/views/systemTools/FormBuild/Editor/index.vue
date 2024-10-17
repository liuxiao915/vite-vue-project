<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-15 17:50:05
 @LastEditTime: 2024-10-15 17:50:05
-->
<template>
  <div id="editor" class="editor edit" @contextmenu="handleContextMenu" @mousedown="handleMouseDown">
    <!-- <Shape v-for="(item, index) in componentData" :key="item.id" :default-style="item.style" :style="getShapeStyle(item.style)" :active="item.id === (curComponent || {}).id" :element="item" :index="index" :class="{ lock: item.isLock }">
      <component :is="item.component" :id="'component' + item.id" :style="getSVGStyle(item.style)" class="component" :prop-value="item.propValue" :element="item" :request="item.request" />
    </Shape> -->
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
// import Shape from './Shape.vue'
const state = reactive({})
const store = useStore()
const handleContextMenu = (e) => {
  e.stopPropagation()
  e.preventDefault()
  // 计算菜单相对于编辑器的位移
  let target = e.target
  let top = e.offsetY
  let left = e.offsetX
  while (target instanceof SVGElement) {
    target = target.parentNode
  }
  while (!target.className.includes('editor')) {
    left += target.offsetLeft
    top += target.offsetTop
    target = target.parentNode
  }
  // store.commit('showContextMenu', { top, left })
}

const curComponent = ref(null)
const handleMouseDown = (e) => {
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!curComponent.value || isPreventDrop(curComponent.value.component)) {
    e.preventDefault()
  }
  hideArea()

  // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
  const rectInfo = this.editor.getBoundingClientRect()
  this.editorX = rectInfo.x
  this.editorY = rectInfo.y

  const startX = e.clientX
  const startY = e.clientY
  this.start.x = startX - this.editorX
  this.start.y = startY - this.editorY
  // 展示选中区域
  this.isShowArea = true

  const move = (moveEvent) => {
    this.width = Math.abs(moveEvent.clientX - startX)
    this.height = Math.abs(moveEvent.clientY - startY)
    if (moveEvent.clientX < startX) {
      this.start.x = moveEvent.clientX - this.editorX
    }

    if (moveEvent.clientY < startY) {
      this.start.y = moveEvent.clientY - this.editorY
    }
  }

  const up = (e) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)

    if (e.clientX == startX && e.clientY == startY) {
      hideArea()
      return
    }
    createGroup()
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>
<style lang="less" scoped>
</style>