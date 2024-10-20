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
        <div id="editor" ref="editor" class="editor content" @drop="handleDrop" @dragover="handleDragOver" @contextmenu="handleContextMenu" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
          <DragItem v-for="(item, index) in componentData" :key="item.id" :element="item" :index="index" :active-id="activeId" :form-conf="formConf" @activeItem="activeFormItem" @copyItem="drawingItemCopy" @deleteItem="drawingItemDelete" />
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
// import Editor from './Editor/index.vue'
// import Shape from './Editor/Shape.vue'
import DragItem from './Editor/dragItem.vue'
import ContextMenu from './Editor/ContextMenu.vue'
import { layoutComponents, formComponents, customComponents, formConf } from './generator/config.js'
const state = reactive({})
const store = useStore()
const editor = ref(null)
const curComponent = ref(null)
const componentData = ref([])
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
    componentData.value.push({ ...component })
    // store.commit('recordSnapshot')
  }
}
const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
restore()
// 全局监听按键事件
// listenGlobalKeyDown()


const contextMenu = reactive({
  showMenu: false,
  top: 0,
  left: 0
})
const handleContextMenu = (e) => {
  e.stopPropagation()
  e.preventDefault()
  // 计算菜单相对于编辑器的位移
  let target = e.target
  let top = e.offsetY
  let left = e.offsetX
  console.log('target:::', target)
  while (target instanceof SVGElement) {
    target = target.parentNode
  }
  while (!target.className.includes('editor')) {
    left += target.offsetLeft
    top += target.offsetTop
    target = target.parentNode
  }
  contextMenu.showMenu = true
  contextMenu.top = top
  contextMenu.left = left
}

const handleMouseDown = (e) => {
  // e.stopPropagation()
  // store.commit('setClickComponentStatus', false)
  // store.commit('setInEditorStatus', true)
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!curComponent.value || isPreventDrop(curComponent.value.component)) {
    e.preventDefault()
  }
  // hideArea()

  // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
  const rectInfo = editor.value.getBoundingClientRect()
  const editorX = rectInfo.x
  const editorY = rectInfo.y

  const startX = e.clientX
  const startY = e.clientY
  start.x = startX - editorX
  start.y = startY - editorY
  // 展示选中区域
  // this.isShowArea = true

  const move = (moveEvent) => {
    this.width = Math.abs(moveEvent.clientX - startX)
    this.height = Math.abs(moveEvent.clientY - startY)
    if (moveEvent.clientX < startX) {
      this.start.x = moveEvent.clientX - editorX
    }

    if (moveEvent.clientY < startY) {
      this.start.y = moveEvent.clientY - editorY
    }
  }

  const up = (e) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    if (e.clientX == startX && e.clientY == startY) {
      // hideArea()
      return
    }
    createGroup()
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
const handleMouseUp = (e) => {
  // if (!this.isClickComponent) {
  //   store.commit('setCurComponent', { component: null, index: null })
  // }
  // 0 左击 1 滚轮 2 右击
  if (e.button != 2) {
    contextMenu.showMenu = false
  }
}
</script>
<style lang="less" scoped>
.form-build {
  height: 100%;
  height: 100vh;
  background: #f0eeee;
  main {
    height: calc(100% - 60px);
    position: relative;
    display: flex;
    flex-direction: row;
    padding-top: 16px;
    background-color: #fff;
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
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
      .editor {
        position: relative;
        background: #fff;
        margin: auto;
        height: 100%;
        .component {
          outline: none;
          width: 100%;
          height: 100%;
        }
        .lock {
          opacity: 0.5;

          &:hover {
            cursor: not-allowed;
          }
        }
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