<template>
  <div ref="editor"></div>
</template>
 
<script setup>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import * as ace from 'ace-builds';
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'vue'
  },
  readonly: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'github'
  },
  // 是否开启语法检查，默认开启
  userWorker: {
    type: Boolean,
    default: true
  },
})
const editor = ref(null);
let editorInstance = null;

const initEditor = () => {
  editorInstance = ace.edit(editor.value);
  editorInstance.setTheme(`ace/theme/${props.theme}`);
  editorInstance.session.setMode(`ace/mode/${props.mode}`);
  editorInstance.setValue(props.modelValue);
  editorInstance.on('change', (e) => {
    const content = editorInstance.getValue();
    emit('update:modelValue', content);
  });
};

onMounted(() => {
  initEditor();
});

onUnmounted(() => {
  editorInstance.destroy();
  editorInstance = null;
});

</script>