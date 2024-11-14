<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:43:29
 @LastEditTime: 2024-10-10 16:43:29
-->
<template>
  <ToolbarPanel />
  <div id="editor" ref="editor" class="editor" @drop="handleDrop" @dragover="handleDragOver" @contextmenu="handleContextMenu" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <el-form :validate-on-rule-change="false">
      <Draggable v-model="drawingList" group="people" @start="drag=true" @end="drag=false" item-key="id">
        <template #item="{ element }">
          <template v-if="element.category === 'container'">
            <component :is="element.component" v-bind:item="element"></component>
          </template>
          <el-form-item v-else :label="element.label" :required="element.required">
            <component :is="element.component" v-bind:item="element"></component>
          </el-form-item>
        </template>
      </Draggable>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, watch } from 'vue'
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
const drawingList = ref([])
const getContainerByType = (typeName) => {
  let allWidgets = [...containersFields, ...basicFields, ...advancedFields, ...customFields]
  let foundCon = null
  allWidgets.forEach(con => {
    if (!!con.category && !!con.type && (con.type === typeName)) {
      foundCon = con
    }
  })
  return foundCon
}
const handleDrop = (e) => {
  e.preventDefault() // 阻止的dom元素默认的事件，如提交的按钮，超链接的跳转等。
  e.stopPropagation() // 阻止的不是事件本身，是事件的传播
  const index = e.dataTransfer.getData('index')
  const type = e.dataTransfer.getData('type')
  // console.log('editor.value', editor.value.getBoundingClientRect())
  if (index && type) {
    const obj = {
      category: containersFields,
      basic: basicFields,
      advanced: advancedFields,
      custom: customFields
    }
    const component = JSON.parse(JSON.stringify(obj[type][index]))
    let newCon = JSON.parse(JSON.stringify(component))
    newCon.id = newCon.type.replace(/-/g, '') + generateId()
    newCon.options.name = newCon.id
    if (type === 'category') {
      if (newCon.type === 'grid') {
        let newCol = JSON.parse(JSON.stringify(getContainerByType('grid-col')))
        console.log('newCol:::', newCol)
        let tmpId = generateId()
        newCol.id = 'grid-col-' + tmpId
        newCol.options.name = 'gridCol' + tmpId
        newCon.cols.push(newCol)
        newCol = JSON.parse(JSON.stringify(newCol))
        tmpId = generateId()
        newCol.id = 'grid-col-' + tmpId
        newCol.options.name = 'gridCol' + tmpId
        newCon.cols.push(newCol)
      } else if (newCon.type === 'table') {
        let newRow = { cols: [] }
        newRow.id = 'table-row-' + generateId()
        newRow.merged = false
        let newCell = JSON.parse(JSON.stringify(getContainerByType('table-cell')))
        newCell.id = 'table-cell-' + generateId()
        newCell.options.name = newCell.id
        newCell.merged = false
        newCell.options.colspan = 1
        newCell.options.rowspan = 1
        newRow.cols.push(newCell)
        newCon.rows.push(newRow)
      } else if (newCon.type === 'tab') {
        let newTabPane = JSON.parse(JSON.stringify(getContainerByType('tab-pane')))
        newTabPane.id = 'tab-pane-' + generateId()
        newTabPane.options.name = 'tab1'
        newTabPane.options.label = 'tab 1'
        newCon.tabs.push(newTabPane)
      }
    }
    store.commit('formBuild/addComponent', newCon)
    drawingList.value.push({ ...newCon })
    curComponent.value = component
  }
}
watch(drawingList.value, (val) => {
  console.log('watch--drawingList::', val)
})
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
onMounted(() => {
  store.commit('formBuild/getComponent')
  drawingList.value = JSON.parse(localStorage.getItem('drawingList')) || []
})
</script>
<style lang="less" scoped>
.editor {
  height: 100vh;
  width: 100%;
}
</style>