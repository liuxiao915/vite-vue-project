<template>
  <div>
    <div ref="btnRef" @click="handleChange">{{ name }}</div>
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const name = ref('张三')
const btnRef = ref<HTMLDivElement| null>(null)
const handleChange = ():void => {
  name.value = '李四'
}
</script>
<style lang="less" csoped>

</style>