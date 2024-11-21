<template>
  <!-- 官方文档中使用id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
  <div class="ace-editor" ref="aceRef"></div>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import ace from 'ace-builds'
// webpack环境必备：import "ace-builds/webpack-resolver";
// 非webpack环境不需要引入，但是需要调用ace.config.set('basePath', 'path...')指定动态js加载URL！！
import 'ace-builds/src-min-noconflict/theme-sqlserver'
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/mode-css'
import 'ace-builds/src-min-noconflict/ext-language_tools'

import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/snippets/yaml";
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
  },
  readonly: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'javascript'
  },
  userWorker: {  //是否开启语法检查，默认开启
    type: Boolean,
    default: true
  }
})
const aceRef = ref(null)
const aceEditor = ref(null)
watch(() => props.modelValue, (val) => {
  aceEditor.value.setValue(props.modelValue);
  aceEditor.value.clearSelection();
  // const position = aceEditor.value.getCursorPosition();
  // aceEditor.value.moveCursorToPosition(position);
})
watch(() => props.mode, (val) => {
  aceEditor.value.getSession().setMode(`ace/mode/${props.mode}`)
})
const addAutoCompletion = (ace) => {
  let acData = [
    { meta: 'VForm API', caption: 'getWidgetRef', value: 'getWidgetRef()', score: 1 },
    { meta: 'VForm API', caption: 'getFormRef', value: 'getFormRef()', score: 1 },
    //TODO: 待补充！！
  ]
  let langTools = ace.require('ace/ext/language_tools')
  langTools.addCompleter({
    getCompletions: function(editor, session, pos, prefix, callback) {
      if (prefix.length === 0) {
        return callback(null, []);
      } else {
        return callback(null, acData);
      }
    }
  })
}
const getEditorAnnotations = () => {
  return aceEditor.value.getSession().getAnnotations()
}
const setValue = (newValue) => {
  aceEditor.value.getSession().setValue(newValue)
}
const editValue = () => {
  aceEditor.value.setValue(props.modelValue);
  aceEditor.value.on('change', (e) => {
    emit('update:modelValue', aceEditor.value.getValue());
  });
}
onMounted(() => {
  // 设置ace编辑器资源文件所在位置
  ace.config.set('basePath', 'https://ks3-cn-beijing.ksyun.com/vform2021/ace')
  // ace.config.set('basePath', 'https://github.com/liuxiao915/vite-react-project')
  // this.addAutoCompletion(ace)  //添加自定义代码提示！！
  aceEditor.value = ace.edit(aceRef.value, {
    maxLines: 20, // 最大行数，超过会自动出现滚动条
    minLines: 5, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
    fontSize: 12, // 编辑器内字体大小
    theme: 'ace/theme/sqlserver', // 默认设置的主题  不导入webpack-resolver，该模块路径会报错
    mode: `ace/mode/${props.mode}`, // 默认设置的语言模式
    tabSize: 2, // 制表符设置为2个空格大小
    readOnly: props.readonly,
    highlightActiveLine: true,
    showPrintMargin: false,
    // value: props.modelValue
  })
  aceEditor.value.setOptions({
    enableSnippets: true,  // 设置代码片段提示
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,  // 设置自动提示
  })
  aceEditor.value.getSession().setUseWrapMode(true);
  if (!props.userWorker) {
    aceEditor.value.getSession().setUseWorker(false) // setUseWrapMode
  }
  //编辑时同步数据
  aceEditor.value.getSession().on('change', (ev) => {
    emit('update:modelValue', aceEditor.value.getValue())
  })
});
onBeforeUnmount(() => {
  aceEditor.value.destroy()
  aceEditor.value = null
});
</script>
<style lang="less" scoped>
.ace-editor {
  min-height: 300px;
  :deep(.ace_print-margin) {
    display: none;
  }
}
</style>
