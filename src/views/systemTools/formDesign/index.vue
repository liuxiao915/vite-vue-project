<template>
  <el-container>
    <el-aside width="220px">
      <LeftPanel />
    </el-aside>
    <el-main>
      <el-scrollbar>
        <EditorPanel />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script setup>
import LeftPanel from './left-panel/index.vue'
import EditorPanel from './editor-panel/index1.vue'
</script>
<style lang="less" scoped>
</style>
