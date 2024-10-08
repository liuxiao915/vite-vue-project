<template>
  <div class="wrapper">
    <el-watermark class="watermark" :content="config.content" :font="config.font" :z-index="config.zIndex" :rotate="config.rotate" :gap="config.gap" :offset="config.offset">
      <h3>Element Plus</h3>
    </el-watermark>
    <el-form ref="formRef" :model="config" label-position="top" label-width="50px">
      <el-form-item prop="content" label="Content">
        <el-input v-model="config.content" />
      </el-form-item>
      <el-form-item prop="font.color" label="Color">
        <el-color-picker v-model="config.font.color" show-alpha />
      </el-form-item>
      <el-form-item prop="font.fontSize" label="FontSize">
        <el-slider v-model="config.font.fontSize" />
      </el-form-item>
      <el-form-item prop="zIndex" label="zIndex">
        <el-slider v-model="config.zIndex" />
      </el-form-item>
      <el-form-item prop="rotate" label="Rotate">
        <el-slider v-model="config.rotate" :min="-180" :max="180" />
      </el-form-item>
      <el-form-item prop="gap" label="Gap">
        <el-space>
          <el-input-number v-model="config.gap[0]" controls-position="right" />
          <el-input-number v-model="config.gap[1]" controls-position="right" />
        </el-space>
      </el-form-item>
      <el-form-item prop="offset" label="Offset">
        <el-space>
          <el-input-number v-model="config.offset[0]" placeholder="offsetLeft" controls-position="right" />
          <el-input-number v-model="config.offset[1]" placeholder="offsetTop" controls-position="right" />
        </el-space>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('submit', formRef)">确定</el-button>
        <el-button @click="onSubmit('reset', formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const config = reactive({
  content: store.state.tabs.userInfo.userName || userInfo.userName,
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.15)',
  },
  zIndex: -1,
  rotate: -22,
  gap: [100, 100],
  offset: [0, 0],
})
const formRef = ref(null)
const onSubmit = (type, formEl) => {
  if (!formEl) return
  if (type === 'submit') {
    formEl.validate((valid) => {
      if (valid) { }
    })
  } else {
    formEl.resetFields()
  }
  console.log('config:::', config)
}
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  .watermark {
    display: flex;
    flex: auto;
  }
  .el-form {
    width: 330px;
    margin-left: 20px;
    border-left: 1px solid #eee;
    padding-left: 20px;
  }
}
</style>