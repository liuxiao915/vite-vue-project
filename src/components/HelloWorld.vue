<template>
  <div class="card">
    <h3>{{ user.name }}</h3>
    <el-button>Default</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Hello'
})
// import { ref } from "vue";
// import { Check } from '@element-plus/icons-vue'
interface User {
  id: string,
  name: string
}
const user: User = {
  id: '11',
  name: '张三'
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>