<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-17 14:58:47
 @LastEditTime: 2024-10-17 14:58:47
-->
<template>
  <div class="left-panel">
    <div class="title">布局组件</div>
    <div class="components-list" @dragstart="handleDragStart">
      <div v-for="(item, index) in containersFields" :key="index" class="list" :draggable="true" :data-index="index" data-type="category">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="title">基础组件</div>
    <div class="components-list" @dragstart="handleDragStart">
      <div v-for="(item, index) in basicFields" :key="index" class="list" :draggable="true" :data-index="index" data-type="basic">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="title">高级组件</div>
    <div class="components-list" @dragstart="handleDragStart">
      <div v-for="(item, index) in advancedFields" :key="index" class="list" :draggable="true" :data-index="index" data-type="advanced">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="title">自定义扩展组件</div>
    <div class="components-list">
      <div v-for="(item, index) in customFields" :key="index" class="list" :draggable="true" :data-index="index" data-type="custom">
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { containersFields, basicFields, advancedFields, customFields } from './config.js'
const handleDragStart = (e) => {
  e.dataTransfer.setData('index', e.target.dataset.index)
  e.dataTransfer.setData('type', e.target.dataset.type)
}
</script>
<style lang="less" scoped>
.left-panel {
  .title {
    margin: 16px 0;
    font-weight: 700;
  }
  .components-list {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, 100px);
    .list {
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