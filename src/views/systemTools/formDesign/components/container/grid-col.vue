<template>
  <el-col v-if="item.type === 'grid-col'" class="grid-cell" v-bind="layoutProps" :style="colHeightStyle" :key="item.id" @click.stop="selectWidget(item)">
    <draggable :list="item.widgetList" item-key="id" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 200}" tag="transition-group" :component-data="{name: 'fade'}" handle=".drag-handler" @end="(evt) => onGridDragEnd(evt, item.widgetList)" @add="(evt) => onGridDragAdd(evt, item.widgetList)" @update="onGridDragUpdate" :move="checkContainerMove">
      <template #item="{ element: subWidget, index: swIdx }">
        <div class="form-widget-list">
          <template v-if="subWidget.category === 'container'">
            <component :is="subWidget.component" :item="subWidget" :key="subWidget.id" :parent-list="item.widgetList" :index-of-parent-list="swIdx" :parent-widget="item"></component>
          </template>
          <component v-else :is="subWidget.component" :field="subWidget" :key="subWidget.id" :parent-list="item.widgetList" :index-of-parent-list="swIdx" :parent-widget="item" :design-state="true"></component>
        </div>
      </template>
    </draggable>
  </el-col>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "GridCol",
  componentName: "GridCol",
  components: {
    draggable
  },
  props: {
    item: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    colHeight: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      layoutProps: {
        span: this.item.options.span || 12,
        offset: this.item.options.offset || 0,
        push: this.item.options.push || 0,
        pull: this.item.options.pull || 0,
      }
    }
  },
  computed: {
    colHeightStyle() {
      return !!this.colHeight ? { height: this.colHeight + 'px' } : {}
    }
  },
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
  methods: {
    onGridDragEnd(evt, subList) {
      //
    },

    onGridDragAdd(evt, subList) {
      const newIndex = evt.newIndex
      if (!!subList[newIndex]) {
        this.designer.setSelected(subList[newIndex])
      }

      this.designer.emitHistoryChange()
    },

    onGridDragUpdate() {
      this.designer.emitHistoryChange()
    },

    selectWidget(item) {
      console.log('id: ' + item.id)
      this.designer.setSelected(item)
    },

    checkContainerMove(evt) {
      return this.designer.checkWidgetMove(evt)
    },

    selectParentWidget() {
      if (this.parentWidget) {
        this.designer.setSelected(this.parentWidget)
      } else {
        this.designer.clearSelected()
      }
    },

    moveUpWidget() {
      this.designer.moveUpWidget(this.parentList, this.indexOfParentList)
    },

    moveDownWidget() {
      this.designer.moveDownWidget(this.parentList, this.indexOfParentList)
    },

    cloneGridCol(item) {
      this.designer.cloneGridCol(item, this.parentWidget)
    },

    removeWidget() {
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
    },

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

  .form-widget-list {
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
