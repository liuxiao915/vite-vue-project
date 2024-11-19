<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:43:29
 @LastEditTime: 2024-10-10 16:43:29
-->
<template>
  <ToolbarPanel />
  <div id="editor" ref="editor" class="editor" @contextmenu="handleContextMenu" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <el-form :validate-on-rule-change="false">
      <!-- tag="transition-group" :component-data="{name: 'fade'}"  -->
      <Draggable v-model="drawingList" v-bind="{group:'dragGroup', animation: 300}" @start="drag=true" @end="drag=false" @update="dragUpdate" item-key="id">
        <template #item="{ element }">
          <component v-if="element.category === 'container'" :is="element.component" v-bind:item="element"></component>
          <el-form-item v-else :label="element.label" :required="element.required">
            <component :is="element.component" v-bind:item="element"></component>
          </el-form-item>
        </template>
      </Draggable>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, computed } from 'vue'
import { useStore } from 'vuex'
import Draggable from 'vuedraggable'
import { generateId } from '@/utils/index.js'
import ToolbarPanel from '../toolbar-panel/index.vue'
import { containersFields, basicFields, advancedFields, customFields } from '../left-panel/config.js'
const state = reactive({})
const store = useStore()
const editor = ref(null)
const curComponent = ref(null)
const showContextMenu = ref(false)

const dragUpdate = (e) => {
  console.log('dragUpdate:::', drawingList.value)
}
const drawingList = ref([])
watch(() => store.state.formBuild.drawingList, () => {
  drawingList.value = JSON.parse(localStorage.getItem('drawingList')) || []
}, {
  deep: true, immediate: true
})
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