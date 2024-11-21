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
      <!-- tag="transition-group" :component-data="{name: 'fade'}" handle=".drag-handler"  -->
      <!-- <Vuedraggable :list="drawingList" item-key="id" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}" tag="transition-group" :component-data="{name: 'fade'}" @end="onDragEnd" @add="onDragAdd" @update="dragUpdate" :move="()=> true">
        <template #item="{ element }">
          <div class="transition-group-el">
            <template v-if="'container' === element.category">
              <component :is="element.component" v-bind:item="element"></component>
            </template>
            <el-form-item v-else :label="element.label" :required="element.required">
              <component :is="element.component" v-bind:item="element"></component>
            </el-form-item>
          </div>
        </template>
      </Vuedraggable> -->

      <Vuedraggable :list="drawingList" item-key="id" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}" tag="transition-group" :component-data="{name: 'fade'}" @end="onDragEnd" @add="onDragAdd" @update="dragUpdate" :move="()=> true">
        <template #item="{ element: widget, index }">
          <div class="transition-group-el">
            <template v-if="'container' === widget.category">
              <component :is="widget.component" :item="widget" :key="widget.id" :parent-list="drawingList" :index-of-parent-list="index" :parent-widget="null"></component>
            </template>
            <template v-else>
              <component :is="widget.component" :field="widget" :key="widget.id" :parent-list="drawingList" :index-of-parent-list="index" :parent-widget="null" :design-state="true"></component>
            </template>
          </div>
        </template>
      </Vuedraggable>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, computed } from 'vue'
import { useStore } from 'vuex'
// import Draggable from 'vuedraggable'
import { generateId } from '@/utils/index.js'
import ToolbarPanel from '../toolbar-panel/index.vue'
import { containersFields, basicFields, advancedFields, customFields } from '../left-panel/config.js'
import Vuedraggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js'
const state = reactive({})
const store = useStore()
const editor = ref(null)
const curComponent = ref(null)
const showContextMenu = ref(false)

const drawingList = ref([])
watch(() => store.state.formBuild.drawingList, () => {
  drawingList.value = JSON.parse(localStorage.getItem('drawingList')) || []
}, {
  deep: true, immediate: true
})
const onDragAdd = (e) => {
  console.log('onDragAdd:::', e)
  const newIndex = evt.newIndex
  if (!!drawingList.value[newIndex]) {
    // this.designer.setSelected(drawingList.value[newIndex])
  }
  store.commit('formBuild/historyChange')
}
const onDragEnd = (e) => {
  console.log('onDragAdd:::', e)
}
const dragUpdate = (e) => {
  console.log('dragUpdate:::', drawingList.value)
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