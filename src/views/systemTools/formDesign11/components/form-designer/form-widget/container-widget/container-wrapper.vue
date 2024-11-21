<!--
/**
 * author: vformAdmin
 * email: vdpadmin@163.com
 * website: https://www.vform666.com
 * date: 2021.08.18
 * remark: 如果要分发VForm源码，需在本文件顶部保留此文件头信息！！
 */
-->

<template>
  <div class="container-wrapper">
    <slot></slot>

    <div class="container-action" v-if="designer.selectedId === widget.id && !widget.internal">
      <i :title="i18nt('designer.hint.selectParentWidget')" @click.stop="selectParentWidget(widget)">
        <svg-icon svg-name="el-back" />
      </i>
      <i v-if="!!parentList && (parentList.length > 1)" :title="i18nt('designer.hint.moveUpWidget')" @click.stop="moveUpWidget()"><svg-icon svg-name="el-move-up" /></i>
      <i v-if="!!parentList && (parentList.length > 1)" :title="i18nt('designer.hint.moveDownWidget')" @click.stop="moveDownWidget()"><svg-icon svg-name="el-move-down" /></i>
      <i v-if="widget.type === 'table'" :title="i18nt('designer.hint.insertRow')" @click.stop="appendTableRow(widget)"><svg-icon svg-name="el-insert-row" /></i>
      <i v-if="widget.type === 'table'" :title="i18nt('designer.hint.insertColumn')" @click.stop="appendTableCol(widget)"><svg-icon svg-name="el-insert-column" /></i>
      <i v-if="(widget.type === 'grid') || (widget.type === 'table')" :title="i18nt('designer.hint.cloneWidget')" @click.stop="cloneContainer(widget)"><svg-icon svg-name="el-clone" /></i>
      <i :title="i18nt('designer.hint.remove')" @click.stop="removeWidget">
        <svg-icon svg-name="el-delete" />
      </i>
    </div>

    <div class="drag-handler" v-if="designer.selectedId === widget.id && !widget.internal">
      <i :title="i18nt('designer.hint.dragHandler')"><svg-icon svg-name="el-drag-move" /></i>
      <i>{{i18n2t(`designer.widgetLabel.${widget.type}`, `extension.widgetLabel.${widget.type}`)}}</i>
      <i v-if="widget.options.hidden === true"><svg-icon svg-name="el-hide" /></i>
    </div>
  </div>
</template>

<script>
import i18n from "@/views/systemTools/formDesign11/utils/i18n";
import containerMixin from "@/views/systemTools/formDesign11/components/form-designer/form-widget/container-widget/containerMixin";
import SvgIcon from '@/views/systemTools/formDesign11/components/svg-icon'

export default {
  name: "container-wrapper",
  mixins: [i18n, containerMixin],
  components: {
    SvgIcon
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
  }
}
</script>

<style lang="less" scoped>
.container-wrapper {
  position: relative;
  margin-bottom: 5px;

  .container-action {
    position: absolute;
    //bottom: -30px;
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

  .drag-handler {
    position: absolute;
    top: -2px;
    //bottom: -24px;  /* 拖拽手柄位于组件下方，有时无法正常拖动，原因未明？？ */
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
      cursor: move;
    }
  }
}

.container-action,
.drag-handler {
  :deep(.svg-icon) {
    margin-left: 0.1em;
    margin-right: 0.1em;
  }
}
</style>
