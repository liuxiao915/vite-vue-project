<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-17 14:58:47
 @LastEditTime: 2024-10-17 14:58:47
-->
<template>
  <div class="left-panel">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="布局组件">
        <Vuedraggable tag="ul" :list="containersFields" item-key="key" :group="{name: 'dragGroup', pull: 'clone', put: false}" :move="checkFieldMove" :clone="handleClone" ghost-class="ghost" :sort="false">
          <template #item="{ element }">
            <li class="item">{{ element.label }}</li>
          </template>
        </Vuedraggable>
      </el-collapse-item>
      <el-collapse-item name="2" title="基础组件">
        <Vuedraggable tag="ul" :list="basicFields" item-key="key" :group="{name: 'dragGroup', pull: 'clone', put: false}" :move="checkFieldMove" :clone="handleClone" ghost-class="ghost" :sort="false">
          <template #item="{ element }">
            <li>{{ element.label }}</li>
          </template>
        </Vuedraggable>
      </el-collapse-item>
      <el-collapse-item name="3" title="高级组件">
        <Vuedraggable tag="ul" :list="advancedFields" item-key="key" :group="{name: 'dragGroup', pull: 'clone', put: false}" :move="checkFieldMove" :clone="handleClone" ghost-class="ghost" :sort="false">
          <template #item="{ element }">
            <li>{{ element.label }}</li>
          </template>
        </Vuedraggable>
      </el-collapse-item>
      <el-collapse-item name="4" title="自定义扩展组件">
        <Vuedraggable tag="ul" :list="customFields" item-key="key" :group="{name: 'dragGroup', pull: 'clone', put: false}" :move="checkFieldMove" :clone="handleClone" ghost-class="ghost" :sort="false">
          <template #item="{ element }">
            <li>{{ element.label }}</li>
          </template>
        </Vuedraggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, computed } from 'vue'
import Draggable from 'vuedraggable'
import Vuedraggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js'
import { useStore } from 'vuex'
import { generateId } from '@/utils/index.js'
import { containersFields, basicFields, advancedFields, customFields } from './config.js'
const activeNames = ref(['1', '2', '3', '4'])
const store = useStore()
const handleClone = (item) => {
  if (item) {
    let newCon = JSON.parse(JSON.stringify(item))
    newCon.id = newCon.type.replace(/-/g, '') + generateId()
    newCon.options.name = newCon.id
    newCon.options.label = newCon.options.label || newCon.type.toLowerCase()
    if (item.category === 'container') {
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
        console.log('newCon.colsnewCon.colsnewCon.cols', newCon.cols)
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
  }
}
const checkFieldMove = (item) => {
  return true
}
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
const drawingList = ref([])
onMounted(() => {
  store.commit('formBuild/getComponent')
  drawingList.value = JSON.parse(localStorage.getItem('drawingList')) || []
})
</script>
<style lang="less" scoped>
.left-panel {
  ul {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, 100px);
    li {
      border: 1px solid #ddd;
      cursor: grab;
      text-align: center;
      &:active {
        cursor: grabbing;
      }
    }
  }
}
</style>