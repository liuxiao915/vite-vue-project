<!--
 @Description: 文字超长显示展示收起按钮
 @Author: liuxiao
 @Date: 2024-09-16 10:19:05
 @LastEditTime: 2024-09-16 10:19:05
-->
<template>
  <div class="ellipsis">
    <div class="long-text">
      {{ title }}：{{ content }}
    </div>
    <div :class="['ellipsis-text', isCollapseLink ? '' : 'display']">
      <span>{{ title }}：{{ content }}</span>
    </div>
    <div v-if="ellipsisHeight > 105" class="collapse-btn" @click="isCollapseLink = !isCollapseLink">
      {{ isCollapseLink ? '收起' : '查看全文' }}
      <ArrowUp class="icon" v-if="isCollapseLink" color="#1177EE" />
      <ArrowDown class="icon" v-else color="#1177EE" />
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, watch, nextTick } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})
const isCollapseLink = ref(false)
const ellipsisHeight = ref(0)
watch(
  () => props.content,
  () => {
    nextTick(() => {
      const dom = document.getElementsByClassName('long-text')
      console.log('nextTick', dom)
      ellipsisHeight.value = dom[0]?.offsetHeight
      console.log('ellipsisHeight.value', ellipsisHeight.value)
    })
  },
  { immediate: true }
)
</script>
<style lang="less" scoped>
.ellipsis {
  position: relative;
  .long-text {
    position: absolute;
    // 下面控制的是最多显示4行，这里设置的最大高度要比4行的高度高一点点，这样获取标签高度的时候，就可以知道是否超过4行
    max-height: 110px;
    overflow: hidden;
    color: #fff;
  }
  .display {
    display: -webkit-box; // 弹性盒子
  }
  .ellipsis-text {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis; //出现...
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4; // 行数
    line-clamp: 4;
  }
  .collapse-btn {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    color: #1177ee;
    .icon {
      position: relative;
      top: 3px;
      height: 20px;
      width: 20px;
    }
  }
}
</style>