<template>
  <el-dialog :title="state.title" v-model="visible" width="800px" append-to-body @close="closeDialog" @open="openDialog">
    <el-row>
      <el-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper v-if="state.showCropper" ref="cropper" :img="state.options.img" :output-type="state.options.outputType" @realTime="realTime" />
      </el-col>
      <el-col :xs="24" :md="12" :style="{height: '350px'}">
        <div ref="preview" class="avatar-upload-preview">
          <img :src="state.previews.url" :style="state.previews.img">
        </div>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :lg="2" :sm="3" :xs="3">
        <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
          <el-button size="small">选择<i class="el-icon-upload el-icon--right" /></el-button>
        </el-upload>
      </el-col>
      <el-col :lg="{span: 1, offset: 2}" :sm="2" :xs="2">
        <el-button icon="Plus" size="small" @click="changeScale(1)" />
      </el-col>
      <el-col :lg="{span: 1, offset: 1}" :sm="2" :xs="2">
        <el-button icon="Minus" size="small" @click="changeScale(-1)" />
      </el-col>
      <el-col :lg="{span: 1, offset: 1}" :sm="2" :xs="2">
        <el-button icon="ArrowLeft" size="small" @click="rotate('left')" />
      </el-col>
      <el-col :lg="{span: 1, offset: 1}" :sm="2" :xs="2">
        <el-button icon="ArrowRight" size="small" @click="rotate('right')" />
      </el-col>
      <el-col :lg="{span: 2, offset: 6}" :sm="2" :xs="2">
        <el-button type="primary" size="small" @click="uploadImg">提交</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import VueCropper from './vue-cropper.vue'
import { ref, watch, reactive, defineProps } from 'vue'
const props = defineProps({
  value: {
    type: Boolean,
    required: true,
    default: false
  },
  // 编辑图片的时候传入
  fileObj: {
    type: Object,
    default: () => { return { fileUrl: '', fileName: '' } }
  }
})
const emit = defineEmits(['input'])
const state = reactive({
  title: '编辑头像',
  file: null,
  imagePhotos: [],
  visible: false,
  showCropper: false,
  options: {
    img: '', // 裁剪图片的地址
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: 200, // 默认生成截图框宽度
    autoCropHeight: 200, // 默认生成截图框高度
    fixedBox: true, // 固定截图框大小 不允许改变
    outputType: 'png', // 默认生成截图为PNG格式
    filename: 'avatar' // 文件名称
  },
  previews: {}
})
watch(() => props.value, (val) => {
  state.visible = val
  state.options.img = props.fileObj?.fileUrl || ''
}, { immediate: true })

const openDialog = () => {
  console.log('openDialog', state.file);
  state.showCropper = true
}
const cropper = ref(null)
// 刷新组件
const refresh = () => {
  cropper.value.refresh()
}
// 覆盖默认的上传行为
const requestUpload = () => { }
// 向左/右旋转
const rotate = (type) => {
  if (type === 'left') {
    cropper.value.rotateLeft()
  } else {
    cropper.value.rotateRight()
  }
}
// 图片缩放
const changeScale = (num) => {
  cropper.value.changeScale(num)
}
// 上传预处理
const beforeUpload = (file) => {
  state.file = file
  if (file.type.indexOf('image/') === -1) {
    ElMessage({
      message: '文件格式错误，请上传图片类型,如：JPG，PNG，jpeg等后缀的文件。',
      type: 'warning'
    })
  } else {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      state.options.img = reader.result
      state.options.filename = file.name
    }
  }
}
// 上传图片
const uploadImg = () => {
  if (!state.file) {
    return ElMessage({
      message: '请先选择文件！',
      type: 'warning'
    })
  }
  cropper.value.getCropBlob(data => {
    const formData = new FormData()
    formData.append('multipartFile', data, state.file?.name || props.fileObj?.fileName)
    formData.append('pubNet', 1)
    // API.uploadImg(formData).then(res => {
    //   if (res.code === 0) {
    //     const list = [{ fileUrl: res.data.objectUrl, fileName: state.file?.name || props.fileObj?.fileName, orders: 1 }]
    //     ElMessage({
    //       message: '上传成功',
    //       type: 'success',
    //     })
    //     emit('input', false)
    //     emit('upload', list)
    //     state.showCropper = false
    //   }
    // })
  })
}
// 实时预览
const realTime = (data) => {
  state.previews = data
}
// 关闭窗口
const closeDialog = () => {
  console.log('closeDialog')
  state.showCropper = false
  state.file = null
  // emit('input', false)
}
</script>
<style scoped lang="less">
.avatar-upload-preview {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  // border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
