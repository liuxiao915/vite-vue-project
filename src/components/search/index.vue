<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-09-29 15:03:49
 @LastEditTime: 2024-09-29 15:03:49
-->
<template>
  <el-card>
    <el-form :inline="true" ref="formRef" :model="formData" :rules="rules" :label-width="labelWidth || 'auto'">
      <el-form-item v-for="item in formData" :key="item.prop" :label="item.label" :prop="item.prop">
        <el-input v-if="item.type === 'input'" v-model="item.value" :placeholder="item.placeholder || ''" clearable />
        <el-select v-else-if="item.type === 'select'" v-model="item.value" :placeholder="item.placeholder || ''" clearable>
          <el-option v-for="val in item.options" :key="val.value" :label="val.label" :value="val.value" />
        </el-select>
        <el-date-picker v-else-if="item.type === 'date'" v-model="item.value" type="date" :placeholder="item.placeholder || ''" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('submit', formRef)">搜索</el-button>
        <el-button @click="onSubmit('reset', formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import { reactive, computed, watch } from 'vue'
const emit = defineEmits(['onSubmit'])
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  rules: {
    type: Object,
    default: () => { }
  },
  labelWidth: {
    type: String,
    default: ''
  }
})
const formData = ref([])
watch(() => props.data, (val) => {
  formData.value = val
}, { immediate: true, deep: true })
// const formData = computed(() => props.data)
const formRef = ref(null)
const onSubmit = (type, formEl) => {
  if (!formEl) return
  if (type === 'submit') {
    formEl.validate((valid) => {
      if (valid) {
        emit('onSubmit', 'submit', formData.value)
      }
    })
  } else {
    // formEl.resetFields()
    // 暂未考虑有初始值的情况
    formData.value.forEach(item => item.value = '')
    emit('onSubmit', 'reset', formData.value)
  }
}
</script>
<style lang="less" scoped>
.el-card {
  margin-bottom: 16px;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 30px;
  .el-form-item {
    margin: 0;
    .el-input,
    .el-select {
      width: 220px !important;
    }
  }
}
</style>