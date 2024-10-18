<template>
  <!-- :style="{ top: menuTop + 'px', left: menuLeft + 'px' }" -->
  <div v-show="contextMenu.showMenu" class="contextmenu" :style="{ top: contextMenu.top + 'px', left: contextMenu.left + 'px' }">
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <li @click="copy">复制</li>
          <li @click="paste">粘贴</li>
          <li @click="cut">剪切</li>
          <li @click="deleteComponent">删除</li>
          <li @click="lock">锁定</li>
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
          <li @click="upComponent">上移</li>
          <li @click="downComponent">下移</li>
        </template>
        <li v-else @click="unlock">解锁</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
const contextMenu = defineModel('contextMenu')
const curComponent = defineModel('curComponent')
const store = useStore()
const lock = () => {
  store.commit('lock')
}
const unlock = () => {
  store.commit('unlock')
}
// 点击菜单时不取消当前组件的选中状态
const handleMouseUp = () => {
  store.commit('setClickComponentStatus', true)
}
const cut = () => {
  store.commit('cut')
}
const copy = () => {
  store.commit('copy')
}
const paste = () => {
  store.commit('paste', true)
  store.commit('recordSnapshot')
}
const deleteComponent = () => {
  store.commit('deleteComponent')
  store.commit('recordSnapshot')
}
const upComponent = () => {
  store.commit('upComponent')
  store.commit('recordSnapshot')
}
const downComponent = () => {
  store.commit('downComponent')
  store.commit('recordSnapshot')
}
const topComponent = () => {
  store.commit('topComponent')
  store.commit('recordSnapshot')
}
const bottomComponent = () => {
  store.commit('bottomComponent')
  store.commit('recordSnapshot')
}
</script>
<style lang="less" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;
  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;
    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>