<template>
  <el-container class="layout">
    <Header />
    <el-container>
      <Aside />
      <Main />
    </el-container>
  </el-container>
</template>

<script setup>
import Header from "@/components/layout/header.vue";
import Aside from "@/components/layout/aside.vue";
import Main from "@/components/layout/main.vue";
</script>
<style lang="less" csoped>
.layout {
  width: 100vw;
  height: 100vh;
  flex-direction: column;
}
</style>