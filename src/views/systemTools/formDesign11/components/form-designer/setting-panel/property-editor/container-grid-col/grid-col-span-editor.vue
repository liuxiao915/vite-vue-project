<template>
  <div>
    <el-form-item :label="i18nt('designer.setting.colSpanTitle')" v-if="!optionModel.responsive">
      <el-input-number v-model.number="optionModel.span" :min="1" :max="24"
                       style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item :label="i18nt('designer.setting.colSpanTitle') + '(PC)'"
                  v-if="!!optionModel.responsive">
      <el-input-number v-model.number="optionModel.md" :min="1" :max="24"
                       style="width: 100%"></el-input-number>
    </el-form-item>
  </div>
</template>

<script>
  import i18n from "@/views/systemTools/formDesign11/utils/i18n";

  export default {
    name: "grid-col-span-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      formConfig() {
        return this.designer.formConfig
      },


    }
  }
</script>

<style scoped>

</style>
