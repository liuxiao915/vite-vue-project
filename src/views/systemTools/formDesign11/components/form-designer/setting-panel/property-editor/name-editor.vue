<template>
  <el-form-item prop="name" :rules="nameRequiredRule">
    <template #label>
      <span>{{i18nt('designer.setting.uniqueName')}}
        <el-tooltip effect="light" :content="i18nt('designer.setting.editNameHelp')">
          <svg-icon svg-name="el-info" /></el-tooltip>
      </span>
    </template>
    <template v-if="!!selectedWidget.category">
      <el-input type="text" v-model="optionModel.name" :readonly="false" @change="updateWidgetNameAndRef"></el-input>
    </template>
  </el-form-item>
</template>

<script>
import i18n from "@/views/systemTools/formDesign11/utils/i18n"
import { isEmptyStr } from "@/views/systemTools/formDesign11/utils/util"
import SvgIcon from "@/views/systemTools/formDesign11/components/svg-icon/index";

export default {
  name: "name-editor",
  mixins: [i18n],
  components: {
    SvgIcon
  },
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  data() {
    return {
      nameRequiredRule: [{ required: true, message: 'name required' }],
    }
  },
  methods: {
    updateWidgetNameAndRef(newName) {
      let oldName = this.designer.selectedWidgetName
      if (isEmptyStr(newName)) {
        this.selectedWidget.options.name = oldName
        this.$message.info(this.i18nt('designer.hint.nameRequired'))
        return
      }

      if (!!this.designer.formWidget) {
        let foundRef = this.designer.formWidget.getWidgetRef(newName) // 检查newName是否已存在！！
        if (!!foundRef) {
          this.selectedWidget.options.name = oldName
          this.$message.info(this.i18nt('designer.hint.duplicateName') + newName)
          return
        }

        let widgetInDesign = this.designer.formWidget.getWidgetRef(oldName)
        if (!!widgetInDesign && !!widgetInDesign.registerToRefList) {
          widgetInDesign.registerToRefList(oldName)  //注册组件新的ref名称并删除老的ref！！
          this.designer.updateSelectedWidgetNameAndLabel(this.selectedWidget, newName, '')
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
</style>
