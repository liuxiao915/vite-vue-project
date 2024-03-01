<template>
  <el-container class="layout">
    <Header />
    <el-container>
      <Aside />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from "@/components/layout/header.vue";
import Aside from "@/components/layout/aside.vue";
</script>
<style lang="less" csoped>
.layout {
  width: 100vw;
  height: 100vh;
  flex-direction: column;
}
</style>