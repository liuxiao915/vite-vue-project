<template>
  <el-col v-if="item.type === 'grid-col'" class="grid-cell" v-bind="layoutProps" :style="colHeightStyle" :key="item.id" @click.stop="selectWidget(item)">
    <Vuedraggable :list="item.widgetList" item-key="id" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 200}" tag="transition-group" :component-data="{name: 'fade'}" handle=".drag-handler" @add="(evt) => onGridDragAdd(evt, item.widgetList)" @update="onGridDragUpdate" :move="checkContainerMove">
      <template #item="{ element, index: swIdx }">
        <div class="form-item-list">
          <template v-if="'container' === element.category">
            <component :is="element.component" :item="element" :designer="designer" :key="element.id" :parent-list="item.widgetList" :index-of-parent-list="swIdx" :parent-item="item"></component>
          </template>
          <template v-else>
            <component :is="element.component" :field="element" :designer="designer" :key="element.id" :parent-list="item.widgetList" :index-of-parent-list="swIdx" :parent-item="item" :design-state="true"></component>
          </template>
        </div>
      </template>
    </Vuedraggable>
  </el-col>
</template>

<script setup>
import { ref, reactive, nextTick, computed } from 'vue'
import draggable from 'vuedraggable'
import Vuedraggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js'
import { useStore } from 'vuex'
const props = defineProps({
  item: Object,
  parentWidget: Object,
  parentList: Array,
  indexOfParentList: Number,
  colHeight: {
    type: String,
    default: null
  },
})
const store = useStore()
const layoutProps = reactive({
  span: props.item.options.span || 12,
  offset: props.item.options.offset || 0,
  push: props.item.options.push || 0,
  pull: props.item.options.pull || 0,
})
const colHeightStyle = computed(() => !!props.colHeight ? { height: props.colHeight + 'px' } : {})
// watch: {
//   'designer.formConfig.layoutType': {
//     handler(val) {
//       if (!!this.item.options.responsive) {
//         if (val === 'H5') {
//           this.layoutProps.span = this.item.options.xs || 12
//         } else if (val === 'Pad') {
//           this.layoutProps.span = this.item.options.sm || 12
//         } else {
//           this.layoutProps.span = this.item.options.md || 12
//         }
//       } else {
//         this.layoutProps.span = this.item.options.span || 12
//       }
//     }
//   },

//   'item.options.responsive': {
//     handler(val) {
//       let lyType = this.designer.formConfig.layoutType
//       if (!!val) {
//         if (lyType === 'H5') {
//           this.layoutProps.span = this.item.options.xs || 12
//         } else if (lyType === 'Pad') {
//           this.layoutProps.span = this.item.options.sm || 12
//         } else {
//           this.layoutProps.span = this.item.options.md || 12
//         }
//       } else {
//         this.layoutProps.span = this.item.options.span || 12
//       }
//     }
//   },

//   'item.options.span': {
//     handler(val) {
//       this.layoutProps.span = val
//     }
//   },

//   'item.options.md': {
//     handler(val) {
//       this.layoutProps.span = val
//     }
//   },

//   'item.options.sm': {
//     handler(val) {
//       this.layoutProps.span = val
//     }
//   },

//   'item.options.xs': {
//     handler(val) {
//       this.layoutProps.span = val
//     }
//   },

//   'item.options.offset': {
//     handler(val) {
//       this.layoutProps.offset = val
//     }
//   },

//   'item.options.push': {
//     handler(val) {
//       this.layoutProps.push = val
//     }
//   },

//   'item.options.pull': {
//     handler(val) {
//       this.layoutProps.pull = val
//     }
//   },

// },
const onGridDragEnd = (evt, subList) => { }
const onGridDragAdd = (evt, subList) => {
  const newIndex = evt.newIndex
  console.log('onGridDragAdd::::', evt, subList)
  // if (!!subList[newIndex]) {
  //   this.designer.setSelected(subList[newIndex])
  // }
  store.commit('formBuild/historyChange')
  // this.designer.emitHistoryChange()
}

const onGridDragUpdate = () => {
  this.designer.emitHistoryChange()
}
const selectWidget = (item) => {
  console.log('id: ' + item.id)
  this.designer.setSelected(item)
}
const checkContainerMove = (evt) => {
  return this.designer.checkWidgetMove(evt)
}
const selectParentWidget = () => {
  if (this.parentWidget) {
    this.designer.setSelected(this.parentWidget)
  } else {
    this.designer.clearSelected()
  }
}
const moveUpWidget = () => {
  this.designer.moveUpWidget(this.parentList, this.indexOfParentList)
}
const moveDownWidget = () => {
  this.designer.moveDownWidget(this.parentList, this.indexOfParentList)
}
const cloneGridCol = (item) => {
  this.designer.cloneGridCol(item, this.parentWidget)
}
const removeWidget = () => {
  if (!!this.parentList) {
    let nextSelected = null
    if (this.parentList.length === 1) {
      if (!!this.parentWidget) {
        nextSelected = this.parentWidget
      }
    } else if (this.parentList.length === (1 + this.indexOfParentList)) {
      nextSelected = this.parentList[this.indexOfParentList - 1]
    } else {
      nextSelected = this.parentList[this.indexOfParentList + 1]
    }

    this.$nextTick(() => {
      this.parentList.splice(this.indexOfParentList, 1)
      this.designer.setSelected(nextSelected)
      this.designer.emitHistoryChange()
    })
  }
}
</script>

<style lang="less" scoped>
.grid-cell {
  min-height: 38px !important;
  //margin: 6px 0;  /* 设置了margin，栅格列的offset、push、pull会失效！！ */
  padding: 3px;
  outline: 1px dashed #336699;
  position: relative;

  .form-item-list {
    min-height: 28px;
  }

  .grid-col-action {
    position: absolute;
    bottom: 0;
    right: -2px;
    height: 28px;
    line-height: 28px;
    background: @primaryColor;
    z-index: 999;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;
    }
  }

  .grid-col-handler {
    position: absolute;
    top: -2px;
    left: -2px;
    height: 22px;
    line-height: 22px;
    background: @primaryColor;
    z-index: 9;

    i {
      font-size: 14px;
      font-style: normal;
      color: #fff;
      margin: 4px;
      cursor: default;
    }
  }
}

.grid-col-action,
.grid-col-handler {
  :deep(.svg-icon) {
    margin-left: 0.1em;
    margin-right: 0.1em;
  }
}
</style>
