<template>
  <!-- autoplay:自动播放（不同浏览器的表现不一样）
   loop:循环播放
   muted:默认静音播放
   preload:预加载
   贴图poster：贴图 poster="poster.jpg"
   controlslist: nodownload 禁止下载  nofullscreen 禁止全屏 controlslist="nodownload nofullscreen"
   player.value.volume = 2 // 取值范围：0 到 1，0 是静音，0.5 是一半的音量，1 是最大音量（默认值）
   由于不同浏览器对视频格式的支持不同，通常需要提供多种格式的视频文件，以确保兼容性。
   可以使用多个 <source> 标签来定义不同格式的视频文件。
    -->
  <video class="player" :id="id" ref="player" controls autoplay loop muted @canplay="canPlay" @play="onPlay" @pause="onPause" @ended="onEnded">
    <source :src="src" type="video/mp4">
    <source :src="src" type="video/webm">
    <source :src="src" type="video/ogg">
    Your browser does not support the video element.
  </video>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
defineProps({
  id: {
    type: String,
    required: true,
    default: 'player'
  },
  src: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['play', 'pause', 'ended'])
const player = ref(null)
// 播放
const onPlay = () => {
  emit('play')
}
// 浏览器能够开始播放指定的音频/视频时触发
const canPlay = () => {
  emit('canPlay')
}
// 暂停
const onPause = () => {
  emit('pause')
  console.log('pause')
}
// 结束
const onEnded = () => {
  emit('ended')
  console.log('ended')
}
onMounted(() => {
  // player.value.play(); // 挂载时播放视频
})
onBeforeUnmount(() => {
  // player.value.pause(); // 组件销毁前暂停视频
})
</script>
<style lang="less" scoped>
.player {
  height: 100%;
  width: 100%;
}
</style>