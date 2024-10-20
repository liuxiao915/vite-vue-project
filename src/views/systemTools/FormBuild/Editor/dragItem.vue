<template>
  <el-col>
    <el-form-item :label="element.label" :required="element.required">
      <RenderNode :conf="element" />
    </el-form-item>
  </el-col>
</template>
<script setup>
import { ref, h, render } from 'vue'
import RenderNode from './render.vue'
const props = defineProps([
  'element',
  'index',
  'drawingList',
  'activeId',
  'formConf'
])
</script>
