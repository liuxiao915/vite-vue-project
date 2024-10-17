<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:43:29
 @LastEditTime: 2024-10-10 16:43:29
-->
<template>
  <div class="form-build">
    <Toolbar />
    <main>
      <section class="left">
        <ComponentList />
      </section>
      <section class="center">
        <div class="content" @drop="handleDrop" @dragover="handleDragOver" @mousedown="handleMouseDown" @mouseup="deselectCurComponent">
          <Editor ref="editor" />
        </div>
      </section>
      <section class="right">
        <el-tabs v-if="curComponent" v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <!-- <component :is="curComponent.component + 'Attr'" /> -->
          </el-tab-pane>
          <!-- <el-tab-pane label="动画" name="animation" style="padding-top: 20px;">
            <AnimationList />
          </el-tab-pane>
          <el-tab-pane label="事件" name="events" style="padding-top: 20px;">
            <EventList />
          </el-tab-pane> -->
        </el-tabs>
      </section>
    </main>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import Toolbar from './Toolbar.vue'
import { deepCopy, utils } from '@/utils/index.js'
import componentList from './components-list.js'
import ComponentList from './components-list.vue'
import Editor from './Editor/index.vue'
import { layoutComponents, formComponents, customComponents, formConf } from './generator/config.js'
const state = reactive({})
const store = useStore()
const editor = ref(null)
const curComponent = ref(null)
const restore = () => {
  // 用保存的数据恢复画布
  if (localStorage.getItem('canvasData')) {
    // setDefaultcomponentData(JSON.parse(localStorage.getItem('canvasData')))
    // store.commit('setComponentData', JSON.parse(localStorage.getItem('canvasData')))
  }

  if (localStorage.getItem('canvasStyle')) {
    // store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
  }
}
const handleDrop = (e) => {
  console.log('drop事件！！！')
  e.preventDefault() // 阻止的dom元素默认的事件，如提交的按钮，超链接的跳转等。
  e.stopPropagation() // 阻止的不是事件本身，是事件的传播
  const index = e.dataTransfer.getData('index')
  const type = e.dataTransfer.getData('type')
  console.log('editor.value', editor.value.getBoundingClientRect())
  const rectInfo = editor.value.getBoundingClientRect()
  if (index && type) {
    const obj = {
      demo: componentList,
      layout: layoutComponents,
      form: formComponents,
      custom: customComponents
    }
    const component = deepCopy(obj[type][index])
    console.log('component:::', component)
    component.style.top = e.clientY - rectInfo.y
    component.style.left = e.clientX - rectInfo.x
    component.id = utils.guid()
    // changeComponentSizeWithScale(component)
    store.commit('formBuild/addComponent', component)
    // store.commit('recordSnapshot')
  }
}
const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
const handleMouseDown = (e) => {
  console.log('handleMouseDown--handleMouseDown')
  e.stopPropagation()
  // store.commit('setClickComponentStatus', false)
  // store.commit('setInEditorStatus', true)
}
const deselectCurComponent = (e) => {
  console.log('deselectCurComponent--deselectCurComponent')
  if (!this.isClickComponent) {
    // store.commit('setCurComponent', { component: null, index: null })
  }
  // 0 左击 1 滚轮 2 右击
  if (e.button != 2) {
    // store.commit('hideContextMenu')
  }
}
restore()
// 全局监听按键事件
// listenGlobalKeyDown()
</script>
<style lang="less" scoped>
.form-build {
  height: 100%;
  height: 100vh;
  background: #fff;
  main {
    height: calc(100% - 60px);
    position: relative;
    display: flex;
    flex-direction: row;
    .left {
      height: 100%;
      width: 200px;
      overflow-y: auto;
    }
    .right {
      height: 100%;
      width: 288px;
      .el-select {
        width: 100%;
      }
    }
    .center {
      flex: 1;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;
      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
  .placeholder {
    text-align: center;
    color: #333;
  }
  .global-attr {
    padding: 10px;
  }
}
</style>