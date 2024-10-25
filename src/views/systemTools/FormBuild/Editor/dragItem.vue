<template>
  <el-col>
    <el-form-item :label="element.label" :required="element.required">
      <component :is="element.tag" v-bind="element"></component>
    </el-form-item>
  </el-col>
</template>
<script setup>
import { ref, h, markRaw, shallowRef } from 'vue'
const props = defineProps([
  'element',
  'index',
  'drawingList',
  'activeId',
  'formConf'
])
</script>
