<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:54:41
 @LastEditTime: 2024-10-10 16:54:41
-->
<template>
  <div class="components-list">
    <div class="components-type">布局组件</div>
    <div class="layout-components" @dragstart="handleDragStart" @click="handleClick">
      <div v-for="(item, index) in layoutComponents" :key="index" class="list" :draggable="true" :data-index="index">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="components-type">表单组件</div>
    <div class="layout-components" @dragstart="handleDragStart" @click="handleClick">
      <div v-for="(item, index) in selectComponents" :key="index" class="list" :draggable="true" :data-index="index">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="components-type">自定义组件</div>
    <div class="layout-components">
      <el-button type="primary">输入框</el-button>
      <el-button type="primary">文本域</el-button>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { inputComponents, selectComponents, layoutComponents, formConf } from '@/utils/generator/config'
const state = reactive({})
const handleClick = (e) => {
  console.log('handleDragStart:::', e.target)
}
const handleDragStart = (e) => {
  console.log('handleDragStart:::', e.target.dataset)
  e.dataTransfer.setData('index', e.target.dataset.index)
}
</script>
<style lang="less" scoped>
.components-list {
  display: flex;
  flex-flow: column wrap;
}
.layout-components {
  width: 200px;
  display: grid;
  grid-gap: 10px 19px;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-template-rows: repeat(auto-fill, 40px);
  .list {
    border: 1px solid #ddd;
    cursor: grab;
    text-align: center;
    &:active {
      cursor: grabbing;
    }
  }
}
.form-item {
  cursor: move;
}
</style>