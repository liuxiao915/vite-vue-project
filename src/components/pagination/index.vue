<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-09-30 15:15:04
 @LastEditTime: 2024-09-30 15:15:04
-->
<template>
  <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="options.pageSizes" :size="options.size" :layout="options.layout" :total="options.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['sizeChange', 'currentChange'])
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        total: 500,
        size: 'default',
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        layout: 'total, sizes, prev, pager, next, jumper',
      }
    }
  }
})
const pageSize = ref(props.options.pageSize)
const currentPage = ref(1)
const handleSizeChange = (val) => {
  emit('sizeChange', val)
}
const handleCurrentChange = (val) => {
  emit('currentChange', val)
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin-top: 16px;
  justify-content: end;
  position: relative;
  :deep(.el-pagination__total) {
    position: absolute;
    left: 0;
  }
}
</style>