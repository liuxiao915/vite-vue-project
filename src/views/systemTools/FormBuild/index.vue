<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-10 16:43:29
 @LastEditTime: 2024-10-10 16:43:29
-->
<template>
  <div class="form-build">
    <div class="toolbar" ref="toolbar">
      <el-button @click="hanleClick('preview')">预览</el-button>
      <el-button @click="hanleClick('screenshot')">截图</el-button>
      <el-button @click="hanleClick('copy')">复制代码</el-button>
      <el-button @click="hanleClick('generateFiles')">生成vue文件</el-button>
    </div>
    <main>
      <section class="left">
        <ComponentList />
      </section>
      <section class="center">
        <div id="editor" ref="editor" class="editor content" @drop="handleDrop" @dragover="handleDragOver" @contextmenu="handleContextMenu" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
          <Draggable v-model="drawingList" group="people" @start="drag=true" @end="drag=false" item-key="id">
            <template #item="{ element }">
              <el-form-item :label="element.label" :required="element.required">
                <component :is="element.component" v-bind="element"></component>
              </el-form-item>
            </template>
          </Draggable>
          <!-- <DragItem v-for="(item, index) in drawingList" :key="item.id" :element="item" :index="index" :form-conf="formConf" @deleteItem="drawingItemDelete" /> -->
          <ContextMenu v-model:show-context-menu="showContextMenu" v-model:context-menu-top="contextMenuTop" v-model:context-menu-left="contextMenuLeft" v-model:cur-component="curComponent" />
        </div>
      </section>
      <section class="right">
        <!-- <el-tabs v-if="curComponent" v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <component :is="curComponent.component + 'Attr'" />
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation" style="padding-top: 20px;">
            <AnimationList />
          </el-tab-pane>
          <el-tab-pane label="事件" name="events" style="padding-top: 20px;">
            <EventList />
          </el-tab-pane>
        </el-tabs> -->
      </section>
    </main>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import { deepCopy, generateId } from '@/utils/index.js'
import componentList from './components-list.js'
import ComponentList from './components-list.vue'
import beautifier from 'js-beautify'
// import Editor from './Editor/index.vue'
// import Shape from './Editor/Shape.vue'
// import DragItem from './Editor/dragItem1.jsx'
import ContextMenu from './Editor/ContextMenu.vue'
import { saveAs } from 'file-saver'
import Draggable from 'vuedraggable'
import { beautifierConf, layoutComponents, formComponents, customComponents, formConf } from './generator/config.js'
import { makeUpHtml, vueTemplate, vueScript, cssStyle } from './generator/html'
import { makeUpJs } from './generator/js'
import { makeUpCss } from './generator/css'
const state = reactive({})
const store = useStore()
const editor = ref(null)
const curComponent = ref(null)
const drawingList = ref([])
import html2canvas from 'html2canvas'
const hanleClick = (type) => {
  if (type === 'preview') {

  } else if (type === 'screenshot') {
    exportImg('editor', '效果图')
  } else if (type === 'copy') {

  } else if (type === 'generateFiles') {
    const codeStr = generateCode()
    const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'form.vue')
  }
}
const generateCode = () => {
  const formData = {
    fields: JSON.parse(JSON.stringify(drawingList.value)),
    ...formConf
  }
  console.log('formData:::', formData)
  const script = makeUpJs(formData, 'file')
  const html = vueTemplate(makeUpHtml(formData, 'file'))
  const css = cssStyle(makeUpCss(formData))
  return beautifier.html(html + script + css, beautifierConf.html)
}
const drawingItemDelete = (index, parent) => {
  parent.splice(index, 1)
  nextTick(() => {
    const len = drawingList.value.length
    if (len) {
      // this.activeId = drawingList.value[len - 1].id
      curComponent.value = drawingList.value[len - 1]
    }
  })
}
const exportImg = (ref, title) => {
  // exportLoading = true
  const copyDom = document.getElementsByClassName(ref)[0] // 要保存的dom
  const width = copyDom.offsetWidth // dom宽
  const height = copyDom.offsetHeight // dom高
  const scale = 2 // 放大倍数
  html2canvas(copyDom, {
    dpi: window.devicePixelRatio * 2,
    scale: scale,
    width: width,
    heigth: height,
    useCORS: true, // 【重要】开启跨域配置
    backgroundColor: '#fff'
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg')
    fileDownload(imgData, title)
    // exportLoading = false
  }).finally(() => {
    // exportLoading = false
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
// addComponent(item) {
//   const clone = this.cloneComponent(item)
//   this.drawingList.push(clone)
//   this.activeData = clone
//   this.activeId = clone.id
// },
const cloneComponent = (origin) => {
  let tempActiveData = null
  const clone = JSON.parse(JSON.stringify(origin))
  clone.span = formConf.span
  clone.renderKey = +new Date() // 改变renderKey后可以实现强制更新组件
  if (!clone.layout) clone.layout = 'colFormItem'
  if (clone.layout === 'colFormItem') {
    clone.vModel = `field`
    clone.placeholder !== undefined && (clone.placeholder += clone.label)
    tempActiveData = clone
  } else if (clone.layout === 'rowFormItem') {
    delete clone.label
    clone.componentName = `row`
    clone.gutter = formConf.gutter
    tempActiveData = clone
  }
  return tempActiveData
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
    component.style.top = e.clientY - rectInfo.y
    component.style.left = e.clientX - rectInfo.x
    component.id = generateId()
    // changeComponentSizeWithScale(component)
    const clone = cloneComponent(component)
    store.commit('formBuild/addComponent', component)
    drawingList.value.push({ ...component })
    curComponent.value = component
    console.log('curComponent:::', component)
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
const showContextMenu = ref(false)
const contextMenuTop = ref(0)
const contextMenuLeft = ref(0)
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
  showContextMenu.value = true
  contextMenuTop.value = top
  contextMenuLeft.value = left
}
// 选中区域的起点
const curAttr = reactive({
  start: {
    x: 0,
    y: 0,
  },
  width: 0,
  height: 0,
})
const handleMouseDown = (e) => {
  // e.stopPropagation()
  // store.commit('setClickComponentStatus', false)
  // store.commit('setInEditorStatus', true)
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!curComponent.value) {
    e.preventDefault()
  }
  // hideArea()

  // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
  const rectInfo = editor.value.getBoundingClientRect()
  const editorX = rectInfo.x
  const editorY = rectInfo.y

  const startX = e.clientX
  const startY = e.clientY
  curAttr.start.x = startX - editorX
  curAttr.start.y = startY - editorY
  // 展示选中区域
  // this.isShowArea = true

  const move = (moveEvent) => {
    curAttr.width = Math.abs(moveEvent.clientX - startX)
    curAttr.height = Math.abs(moveEvent.clientY - startY)
    if (moveEvent.clientX < startX) {
      curAttr.start.x = moveEvent.clientX - editorX
    }

    if (moveEvent.clientY < startY) {
      curAttr.start.y = moveEvent.clientY - editorY
    }
  }

  const up = (e) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    if (e.clientX == startX && e.clientY == startY) {
      // hideArea()
      return
    }
    // createGroup()
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
    showContextMenu.value = false
  }
}
</script>
<style lang="less" scoped>
.form-build {
  height: 100%;
  height: 100vh;
  background: #f0eeee;
  .toolbar {
    padding-bottom: 16px;
    background-color: #fff;
  }
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