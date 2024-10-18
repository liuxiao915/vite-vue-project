<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-15 17:50:05
 @LastEditTime: 2024-10-15 17:50:05
-->
<template>
  <div id="editor" class="editor edit" @contextmenu="handleContextMenu" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <div v-for="(item, index) in componentData" :key="item.id" :index="index">
      <DragItem />
    </div>
    <!-- <Shape v-for="(item, index) in componentData" :key="item.id" :default-style="item.style" :style="getShapeStyle(item.style)" :active="item.id === (curComponent || {}).id" :element="item" :index="index" :class="{ lock: item.isLock }">
      <component
                :is="item.component"
                v-else
                :id="'component' + item.id"
                class="component"
                :style="getComponentStyle(item.style)"
                :prop-value="item.propValue"
                :element="item"
                :request="item.request"
                @input="handleInput"
            />
    </Shape> -->
    <!-- 右击菜单 -->
    <ContextMenu v-model:context-menu="contextMenu" v-model::cur-component="curComponent" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import DragItem from './dragItem.vue'
import ContextMenu from './ContextMenu.vue'
// import Shape from './Shape.vue'
const contextMenu = reactive({
  showMenu: false,
  top: 0,
  left: 0
})
const store = useStore()
const handleContextMenu = (e) => {
  e.stopPropagation()
  e.preventDefault()
  // 计算菜单相对于编辑器的位移
  let target = e.target
  let top = e.offsetY
  let left = e.offsetX
  console.log('target:::', target)
  while (target instanceof SVGElement) {
    target = target.parentNode
  }
  while (!target.className.includes('editor')) {
    left += target.offsetLeft
    top += target.offsetTop
    target = target.parentNode
  }
  contextMenu.showMenu = true
  contextMenu.top = top
  contextMenu.left = left
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
const handleMouseUp = (e) => {
  // if (!this.isClickComponent) {
  //   store.commit('setCurComponent', { component: null, index: null })
  // }
  // 0 左击 1 滚轮 2 右击
  if (e.button != 2) {
    contextMenu.showMenu = false
  }
}
</script>
<style lang="less" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;
  height: 100%;

  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
}

.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>