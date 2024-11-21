<template>
  <div class="form-widget-container">
    <el-form class="full-height-width widget-form" :label-position="labelPosition" :size="size" :validate-on-rule-change="false">
      <template v-if="designer.widgetList.length === 0">
        <div class="no-widget-hint">暂无数据</div>
      </template>
      <div class="form-widget-list">
        <Vuedraggable :list="designer.widgetList" item-key="id" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}" tag="transition-group" handle=".drag-handler" @add="onDragAdd" @update="onDragUpdate" :move="()=>true">
          <template #item="{ element: widget, index }">
            <div class="transition-group-el">
              <template v-if="'container' === widget.category">
                <component :is="widget.type + '-widget'" :widget="widget" :designer="designer" :key="widget.id" :parent-list="designer.widgetList" :index-of-parent-list="index" :parent-widget="null"></component>
              </template>
              <template v-else>
                <component :is="widget.type + '-widget'" :field="widget" :designer="designer" :key="widget.id" :parent-list="designer.widgetList" :index-of-parent-list="index" :parent-widget="null" :design-state="true"></component>
              </template>
            </div>
          </template>
        </Vuedraggable>
      </div>
    </el-form>
  </div>
</template>

<script>
import ContainerComponents from '@/views/systemTools/formDesign11/components/form-designer/form-widget/container-widget/index'
import FieldComponents from '@/views/systemTools/formDesign11/components/form-designer/form-widget/field-widget/index'
export default {
  name: "VFormWidget",
  componentName: "VFormWidget",
  components: {
    ...ContainerComponents,
    ...FieldComponents,
  },
  props: {
    designer: Object,
    formConfig: Object,
  },
  provide() {
    return {
      refList: this.widgetRefList,
      getFormConfig: () => this.formConfig,  /* 解决provide传递formConfig属性的响应式更新问题！！ */
      globalModel: {
        formModel: this.formModel,
      }
    }
  },
  data() {
    return {
      formModel: {},
      widgetRefList: {},
    }
  },
  computed: {
    labelPosition() {
      if (!!this.designer.formConfig && !!this.designer.formConfig.labelPosition) {
        return this.designer.formConfig.labelPosition
      }
      return 'left'
    },

    size() {
      if (!!this.designer.formConfig && !!this.designer.formConfig.size) {
        return this.designer.formConfig.size
      }
      return 'default'
    },
  },
  created() {
    this.designer.initDesigner();
    this.designer.loadPresetCssCode('')
  },
  mounted() {
    this.disableFirefoxDefaultDrop()  /* 禁用Firefox默认拖拽搜索功能!! */
    this.designer.registerFormWidget(this)
  },
  methods: {
    getWidgetName(widget) {
      return widget.type + '-widget'
    },

    disableFirefoxDefaultDrop() {
      let isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") !== -1)
      if (isFirefox) {
        document.body.ondrop = function(event) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    },
    onDragAdd(evt) {
      const newIndex = evt.newIndex
      if (!!this.designer.widgetList[newIndex]) {
        this.designer.setSelected(this.designer.widgetList[newIndex])
      }

      this.designer.emitHistoryChange()
    },

    onDragUpdate() {  /* 在VueVuedraggable内拖拽组件发生位置变化时会触发update，未发生组件位置变化不会触发！！ */
      this.designer.emitHistoryChange()
    },

    checkMove(evt) {
      return this.designer.checkWidgetMove(evt)
    },

    getWidgetRef(widgetName, showError = false) {
      let foundRef = this.widgetRefList[widgetName]
      if (!foundRef && !!showError) {
        this.$message.error(this.i18nt('designer.hint.refNotFound') + widgetName)
      }
      return foundRef
    },

    getSelectedWidgetRef() {
      let wName = this.designer.selectedWidgetName
      return this.getWidgetRef(wName)
    },

    clearWidgetRefList() {
      Object.keys(this.widgetRefList).forEach(key => {
        delete this.widgetRefList[key]
      })
    },

    deleteWidgetRef(widgetRefName) {
      delete this.widgetRefList[widgetRefName]
    },

  }
}
</script>

<style lang="less" scoped>
.container-scroll-bar {
  :deep(.el-scrollbar__wrap),
  :deep(.el-scrollbar__view) {
    overflow-x: hidden;
  }
}

.form-widget-container {
  padding: 10px;
  background: #f1f2f3;

  overflow-x: hidden;
  overflow-y: auto;

  .el-form.full-height-width {
    height: 100%;
    padding: 3px;
    background: #ffffff;

    .no-widget-hint {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 18px;
      color: #999999;
    }

    .form-widget-list {
      min-height: calc(100vh - 56px - 68px);
      padding: 3px;
    }
  }

  .el-form.PC-layout {
    //
  }

  .el-form.Pad-layout {
    margin: 0 auto;
    max-width: 960px;
    border-radius: 15px;
    box-shadow: 0 0 1px 10px #495060;
  }

  .el-form.H5-layout {
    margin: 0 auto;
    width: 420px;
    border-radius: 15px;
    //border-width: 10px;
    box-shadow: 0 0 1px 10px #495060;
  }

  .el-form.widget-form :deep(.el-row) {
    padding: 2px;
    border: 1px dashed rgba(170, 170, 170, 0.75);
  }
}

.grid-cell {
  min-height: 30px;
  border-right: 1px dotted #cccccc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
