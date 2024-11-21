<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-11-13 15:53:11
 @LastEditTime: 2024-11-13 15:53:11
-->
<template>
  <el-dialog title="导出文件" v-model="model" :show-close="true" center append-to-body width="65%" @open="openDialog">
    <el-tabs v-model="activeTab" @tab-change="tabChange">
      <el-tab-pane v-for="item in state.tabList" :key="item.label" :label="item.label" :name="item.label" />
    </el-tabs>
    <code-editor v-if="model" :mode="state.tabList.filter(item => item.label === activeTab)[0].mode" :readonly="true" v-model="code" :user-worker="false" />
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="copyCode">复制代码</el-button>
        <el-button type="primary" @click="saveCode">导出文件</el-button>
        <el-button @click="model = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import beautifier from 'js-beautify'
import { useStore } from 'vuex'
import { genSFC } from './generator.js'
import { saveAs } from 'file-saver'
import { useClipboard } from "@vueuse/core"

const store = useStore()
const model = defineModel()
const state = reactive({
  tabList: [
    { label: 'Vue3', mode: 'javascript', fileType: 'vue' },
    { label: 'Vue2', mode: 'javascript', fileType: 'vue' },
    { label: 'HTML', mode: 'html', fileType: 'html' },
    { label: 'JSON', mode: 'json', fileType: 'json' },
  ]
})
const activeTab = ref('Vue3')
const code = ref(null)
const { copy, isSupported } = useClipboard()
const copyCode = () => {
  if (!isSupported) {
    return ElMessage({
      message: '您的浏览器不支持Clipboard API!',
      type: 'warning'
    })
  }
  copy(code.value)
  ElMessage({ message: '复制成功!', type: 'success' })
}
const saveCode = () => {
  const blob = new Blob([code.value], { type: 'text/plain;charset=utf-8' })
  const fileType = state.tabList.filter(item => item.label === activeTab.value)[0].fileType
  saveAs(blob, `formDesign.${fileType}`)
}
const formConfig = computed(() => store.state.formBuild.formConfig)
const drawingList = computed(() => store.state.formBuild.drawingList)
const tabChange = (tab) => {
  if (tab === 'JSON') {
    code.value = JSON.stringify({ drawingList: drawingList.value, formConfig: formConfig.value }, null, '  ')
  } else {
    code.value = genSFC(formConfig.value, drawingList.value, beautifier, activeTab.value)
  }

}
const openDialog = () => {
  code.value = genSFC(formConfig.value, drawingList.value, beautifier, activeTab.value)
}
</script>
<style lang="less" scoped>
</style>