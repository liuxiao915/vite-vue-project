<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-17 14:58:47
 @LastEditTime: 2024-10-17 14:58:47
-->
<template>
  <div>
    <div class="title">布局组件</div>
    <div class="components-list" @dragstart="handleDragStart">
      <div v-for="(item, index) in componentList" :key="index" class="list" :draggable="true" :data-index="index" data-type="demo">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="title">布局组件</div>
    <div class="components-list" @dragstart="handleDragStart">
      <div v-for="(item, index) in layoutComponents" :key="index" class="list" :draggable="true" :data-index="index" data-type="layout">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="title">表单组件</div>
    <div class="components-list" @dragstart="handleDragStart">
      <div v-for="(item, index) in formComponents" :key="index" class="list" :draggable="true" :data-index="index" data-type="form">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="title">自定义组件</div>
    <div class="components-list">
      <div v-for="(item, index) in customComponents" :key="index" class="list" :draggable="true" :data-index="index" data-type="custom">
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import componentList from './components-list.js'
import { layoutComponents, formComponents, customComponents } from './generator/config.js'
const handleDragStart = (e) => {
  e.dataTransfer.setData('index', e.target.dataset.index)
  e.dataTransfer.setData('type', e.target.dataset.type)
}
</script>
<style lang="less" scoped>
.title {
  margin: 16px 0;
  font-weight: 700;
}
.components-list {
  width: 200px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, 80px);
  // grid-template-rows: repeat(auto-fill, 40px);
  .list {
    border: 1px solid #ddd;
    cursor: grab;
    text-align: center;
    &:active {
      cursor: grabbing;
    }
  }
}
</style>