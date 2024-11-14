<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-11-13 15:53:11
 @LastEditTime: 2024-11-13 15:53:11
-->
<template>
  <el-dialog title="导出文件" v-model="model" :show-close="true" center append-to-body width="65%" @open="openDialog">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane v-for="item in state.tabList" :key="item.label" :label="item.label" :name="item.label" />
    </el-tabs>
    <code-editor :mode="activeTab" :readonly="true" v-model="code" :user-worker="false"></code-editor>
    <!-- <CodeEditorBB :mode="activeTab" :readonly="true" v-model="code" :user-worker="false"></CodeEditorBB> -->
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :data-clipboard-text="code" @click="copyVueCode">复制代码</el-button>
        <el-button type="primary" @click="saveVueCode">导出文件</el-button>
        <el-button @click="model = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import beautifier from 'js-beautify'
import { mapState, useStore } from 'vuex'
import { genSFC } from './generator.js'
import CodeEditorBB from '@/components/code-editor/bbb.vue'
const store = useStore()
const model = defineModel()
const state = reactive({
  tabList: [
    { label: 'Vue3' },
    { label: 'Vue2' },
    { label: 'HTML' },
    { label: 'JSON' },
  ]
})
const activeTab = ref('Vue3')
const code = ref(null)
const handleClick = (tab, event) => {
  console.log(tab, event)
}
const copyVueCode = (code) => {
  console.log(code)
}
const saveVueCode = (code) => {
  console.log(code)
}
const formConfig = computed(() => store.state.formBuild.formConfig)
const drawingList = computed(() => store.state.formBuild.drawingList)
const openDialog = () => {
  code.value = genSFC(formConfig.value, drawingList.value, beautifier, true)
}
</script>
<style lang="less" scoped>
</style>