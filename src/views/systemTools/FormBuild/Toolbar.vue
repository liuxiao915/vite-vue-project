<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:44:31
 @LastEditTime: 2024-10-10 16:44:31
-->
<template>
  <div class="toolbar" ref="toolbar">
    <el-button @click="hanleClick('preview')">预览</el-button>
    <el-button @click="hanleClick('screenshot')">截图</el-button>
    <el-button @click="hanleClick('copy')">复制代码</el-button>
    <el-button @click="hanleClick('generateFiles')">生成vue文件</el-button>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import html2canvas from 'html2canvas'
const state = reactive({})
const hanleClick = (type) => {
  if (type === 'preview') {

  } else if (type === 'screenshot') {
    // exportImg('toolbar', '效果图')
  } else if (type === 'copy') {

  } else if (type === 'generateFiles') {

  }
}
const exportImg = (ref, title) => {
  this.exportLoading = true
  const copyDom = this.$refs[ref]// 要保存的dom
  const width = copyDom.offsetWidth // dom宽
  const height = copyDom.offsetHeight // dom高
  const scale = 2 // 放大倍数
  html2canvas(this.$refs[ref], {
    dpi: window.devicePixelRatio * 2,
    scale: scale,
    width: width,
    heigth: height,
    useCORS: true, // 【重要】开启跨域配置
    backgroundColor: '#fff'
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg')
    this.fileDownload(imgData, title)
    this.exportLoading = false
  }).finally(() => {
    this.exportLoading = false
  })
}
const fileDownload = (downloadUrl, title) => {
  const aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = downloadUrl
  aLink.download = title + '.png'
  // 触发点击-然后移除
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
}
</script>
<style lang="less" scoped>
.toolbar {
  padding-bottom: 16px;
  background-color: #fff;
}
</style>