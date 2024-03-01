<template>
  <div>
    <div ref="btnRef" @click="handleChange">{{ name }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'Test222'
})
const name = ref('张三')
const btnRef = ref<HTMLDivElement| null>(null)
const handleChange = ():void => {
  name.value = '李四'
}

const route = useRoute()
console.log(route);
console.log(history.state);

</script>
<style lang="less" csoped>

</style>