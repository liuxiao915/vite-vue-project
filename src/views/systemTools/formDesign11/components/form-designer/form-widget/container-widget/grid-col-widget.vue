<template>
  <el-col v-if="widget.type === 'grid-col'" class="grid-cell" v-bind="layoutProps" :class="[selected ? 'selected' : '', customClass]" :style="colHeightStyle" :key="widget.id">
    <Vuedraggable :list="widget.widgetList" item-key="id" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 200}" tag="transition-group" :component-data="{name: 'fade'}" handle=".drag-handler" @add="(evt) => onGridDragAdd(evt, widget.widgetList)" @update="onGridDragUpdate" :move="()=>true">
      <template #item="{ element: subWidget, index: swIdx }">
        <div class="form-widget-list">
          <template v-if="'container' === subWidget.category">
            <component :is="subWidget.type + '-widget'" :widget="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget"></component>
          </template>
          <template v-else>
            <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget" :design-state="true"></component>
          </template>
        </div>
      </template>
    </Vuedraggable>
  </el-col>
</template>

<script>
import FieldComponents from '@/views/systemTools/formDesign11/components/form-designer/form-widget/field-widget/index'

export default {
  name: "GridColWidget",
  componentName: "GridColWidget",
  components: {
    ...FieldComponents,
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,

    colHeight: {
      type: String,
      default: null
    },

  },
  data() {
    return {
      layoutProps: {
        span: this.widget.options.span || 12,
        offset: this.widget.options.offset || 0,
        push: this.widget.options.push || 0,
        pull: this.widget.options.pull || 0,
      }
    }
  },
  computed: {
    selected() {
      return this.widget.id === this.designer.selectedId
    },

    customClass() {
      return this.widget.options.customClass || ''
    },

    colHeightStyle() {
      return !!this.colHeight ? { height: this.colHeight + 'px' } : {}
    },
  },
  // watch: {
  //   'widget.options.responsive': {
  //     handler(val) {
  //       if (!!val) {
  //         this.layoutProps.span = this.widget.options.md || 12
  //       } else {
  //         this.layoutProps.span = this.widget.options.span || 12
  //       }
  //     }
  //   },

  //   'widget.options.span': {
  //     handler(val) {
  //       this.layoutProps.span = val
  //     }
  //   },

  //   'widget.options.md': {
  //     handler(val) {
  //       this.layoutProps.span = val
  //     }
  //   },

  //   'widget.options.sm': {
  //     handler(val) {
  //       this.layoutProps.span = val
  //     }
  //   },

  //   'widget.options.xs': {
  //     handler(val) {
  //       this.layoutProps.span = val
  //     }
  //   },

  //   'widget.options.offset': {
  //     handler(val) {
  //       this.layoutProps.offset = val
  //     }
  //   },

  //   'widget.options.push': {
  //     handler(val) {
  //       this.layoutProps.push = val
  //     }
  //   },

  //   'widget.options.pull': {
  //     handler(val) {
  //       this.layoutProps.pull = val
  //     }
  //   },

  // },
  created() {
  },
  methods: {
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

    selectWidget(widget) {
      this.designer.setSelected(widget)
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
    background: #409EFF;
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
    background: #409EFF;
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
