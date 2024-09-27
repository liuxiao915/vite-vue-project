<!--
 @Description: 级联选择器，动态加载区域组件
 @Author: liuxiao
 @Date: 2024-09-15 23:23:32
 @LastEditTime: 2024-09-15 23:23:32
-->
<template>
  <el-cascader ref="cascader" v-model="addressCode" :options="options" clearable :props="{lazy: true, lazyLoad}" @change="changeAddress" />
</template>
<script setup>
// import { getPetitionRegion } from '@/api/overview/index.js'
import { ref } from 'vue'
const addressCode = ref('')
const address = ref('')
const options = ref([])
const cascader = ref(null)
const lazyLoad = (node, resolve) => {
  if (node.level <= 3) {
    // getPetitionRegion({ regionCode: node.value }).then((res) => {
    //   if (res.data.code == '000000') {
    //     const list = res.data.data.map((item) => {
    //       return {
    //         label: item.regionName,
    //         value: item.regionCode,
    //         fullName: item.fullName,
    //         // 接口中，市辖区后面没有街道数据，leaf：是否为叶子节点
    //         leaf: (node.level === 2 && item.regionName === '市辖区') ? (node.level >= 2) : (node.level >= 3)
    //       }
    //     })
    //     resolve(list)
    //   }
    // })
  }
}
const changeAddress = () => {
  const checkNode = cascader.value.getCheckedNodes()[0]
  address.value = checkNode.data.fullName
}

</script>
<style lang="less" scoped>
</style>