<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:43:29
 @LastEditTime: 2024-10-10 16:43:29
-->
<template>
  <div id="editor" ref="editor" class="editor" @drop="handleDrop" @dragover="handleDragOver" @contextmenu="handleContextMenu" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <Draggable v-model="drawingList" group="people" @start="drag=true" @end="drag=false" item-key="id">
      <template #item="{ element }">
        <el-form-item :label="element.label" :required="element.required">
          <component :is="element.component" v-bind="element"></component>
        </el-form-item>
      </template>
    </Draggable>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import Draggable from 'vuedraggable'
import { generateId } from '@/utils/index.js'
import { containersFields, basicFields, advancedFields, customFields } from '../left-panel/config.js'
const state = reactive({})
const store = useStore()
const editor = ref(null)
const curComponent = ref(null)
const showContextMenu = ref(false)
const drawingList = ref([])
const handleDrop = (e) => {
  e.preventDefault() // 阻止的dom元素默认的事件，如提交的按钮，超链接的跳转等。
  e.stopPropagation() // 阻止的不是事件本身，是事件的传播
  const index = e.dataTransfer.getData('index')
  const type = e.dataTransfer.getData('type')
  console.log('handleDrop::::', index, type)
  // console.log('editor.value', editor.value.getBoundingClientRect())
  if (index && type) {
    const obj = {
      category: containersFields,
      basic: basicFields,
      advanced: advancedFields,
      custom: customFields
    }
    const component = JSON.parse(JSON.stringify(obj[type][index]))
    component.id = generateId()
    store.commit('formBuild/addComponent', component)
    drawingList.value.push({ ...component })
    curComponent.value = component
  }
}
const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
// 全局监听按键事件
const contextMenuTop = ref(0)
const contextMenuLeft = ref(0)
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
  showContextMenu.value = true
  contextMenuTop.value = top
  contextMenuLeft.value = left
}

const handleMouseDown = (e) => {
  e.stopPropagation()
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!curComponent.value) {
    e.preventDefault()
  }
}
const handleMouseUp = (e) => {
  // if (!this.isClickComponent) {
  //   store.commit('setCurComponent', { component: null, index: null })
  // }
  // 0 左击 1 滚轮 2 右击
  if (e.button != 2) {
    showContextMenu.value = false
  }
}
</script>
<style lang="less" scoped>
.editor {
  height: 100vh;
  width: 100%;
}
</style>