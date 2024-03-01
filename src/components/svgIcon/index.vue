<template>
  <svg :class="[svgClass, 'icon-svg']" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
defineOptions({
  name: 'SvgIcon'
})
const props = withDefaults(defineProps<{
  svgName: string; // 必传
}>(), {
  svgName: '',
})
const iconName = computed(():string => `#icon-${props.svgName}`)
const svgClass = computed(():string => `icon-${props.svgName}`)
</script>

<style lang="less" scoped>
.icon-svg {
  width: 18px;
  height: 18px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
