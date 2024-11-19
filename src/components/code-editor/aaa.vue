<template>
  <div ref="editorform" style="height: 300px" class="ace-editor"></div>
</template>
<script>
import { watch, onMounted, onDeactivated, ref } from "vue";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-yaml";
// import "ace-builds/src-noconflict/theme-chaos";
import 'ace-builds/src-min-noconflict/theme-sqlserver'
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/snippets/yaml";
//import "ace-builds/src-noconflict/keybinding-vscode";
//import "ace-builds/src-noconflict/keybinding-emacs";
// webpack环境必备：import "ace-builds/webpack-resolver";
// 非webpack环境不需要引入
export default {
  name: "CodeEditor",
  emits: ["update:modelValue"],
  props: {
    id: {
      type: Number,
      default: 0,
    },
    // 外部传入的内容，用于实现双向绑定
    modelValue: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // 外部传入的语法类型
    language: {
      type: String,
      default: "vue",
    },
    // 编辑器主题色
    theme: {
      type: String,
      default: "sqlserver",
    },
  },
  setup(props, { emit }) {
    let editor = null;
    const editorform = ref(null);
    let options = {
      theme: "ace/theme/" + (props.theme ? props.theme : "sqlserver"),
      mode: "ace/mode/" + (props.language ? props.language : "html"),
      tabSize: 2,
      maxLines: 25,
      minLines: 25,
      showPrintMargin: false,
      fontSize: 12,
      readOnly: props.readonly ? props.readonly : false,
    };
    //切换语言
    //editor.getSession().setMode(modelPath)

    function initialize() {
      if (editor) {
        //实例销毁
        editor.destroy();
      }
      //初始化
      editor = ace.edit(editorform.value, options);
      //代码提示和自动补全
      editor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
      });
      editor.getSession().setUseWrapMode(true);
      // 支持双向绑定
      editor.on("change", () => {
        if (emit) {
          emit("update:modelValue", editor.getValue());
        }
      });
      //快捷键
      editor.commands.addCommand({
        name: 'formatter',
        bindKey: { win: 'Ctrl-Shift-F', mac: 'Command-Shift-F' },
        exec: () => emit('formatter', editor)
      })
      editor.setValue(props.modelValue ? props.modelValue : "");
    }
    watch(
      () => props.id,
      () => {
        initialize();
      }
    );
    watch(
      () => props.modelValue,
      (newProps) => {
        //解决光标移动问题
        const position = editor.getCursorPosition();
        editor.getSession().setValue(newProps);
        editor.clearSelection();
        editor.moveCursorToPosition(position);
      }
    );
    onMounted(() => {
      initialize();
    });
    onDeactivated(() => {
      console.log('onBeforeUnmountonBeforeUnmountonBeforeUnmount')
      editor.destroy();
    });
    return {
      editorform,
    };
  },
};
</script>
<style lang="less" scoped>
.ace-chaos .ace_meta.ace_tag {
  color: #53a7e6 !important;
}
.ace-chaos .ace_string {
  color: #c58854 !important;
}
.ace-chaos .ace_keyword {
  color: #e0e0e0 !important;
}
.ace-chaos .ace_constant.ace_numeric {
  color: #c5c454 !important;
}
</style>
