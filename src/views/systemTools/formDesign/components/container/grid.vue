<template>
  <el-row :key="item.id" :gutter="item.options.gutter" class="grid-container">
    <template v-for="(colWidget, colIdx) in item.cols" :key="colWidget.id">
      <GridCol :item="colWidget" :parent-list="item.cols" :index-of-parent-list="colIdx" :parent-widget="item" :col-height="item.options.colHeight"></GridCol>
    </template>
  </el-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import GridCol from "./grid-col.vue"
const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})
const value = ref('')
watch(() => props.item, () => {
  console.log('grid.vue::::', props.item)
})
</script>

<style lang="less" scoped>
.el-row.grid-container {
  min-height: 50px;
  outline: 1px dashed #336699;
  .form-widget-list {
    min-height: 28px;
  }
}
.grid-container.selected,
.grid-cell.selected {
  outline: 2px solid @primaryColor !important;
}
</style>
