<!--
  @Description: 
  @Author: liuxiao
  @Date: 2024-09-06 10:49:54
  @LastEditTime: 2024-09-06 10:49:54
-->
<template>
  <div class="sapi-tree">
    <ul class="tree-ul">
      <li
        class="tree-node"
        :data-index="index"
        v-for="(item, index) in state.data"
        :key="item[props.value]"
      >
        <div class="tree-node-text">
          <span class='tree-node-icon icon-caret-right'></span>
          <span
            class="tree-node-label"
            :title="item[props.label]"
          >{{ item[props.label] }}</span>
        </div>
        <SapiTree v-if="item[props.children]?.length" />
      </li>
    </ul>
  </div>
</template>
<script setup>
import SapiTree from './tree.vue'
import { defineProps, defineOptions, reactive, watch } from 'vue';
defineOptions({
  name: 'SapiTree'
})
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      {
        "code": "110",
        "children": [],
        "dictDataId": "163a6837-05b0-4718-88b9-5879233fc93b",
        "parentDictDataId": null,
        "name": "11111111111111"
      },
      {
        "code": "12345678901234567890123456789012345678901234567890",
        "children": [
          {
            "code": "12345678901234567890123456789012345678901234567891",
            "children": [],
            "dictDataId": "7a49834e-9bc3-4937-a87f-a4b495d1dd4a",
            "parentDictDataId": "a7d44e7d-82dc-4f99-8a22-af19b7f8064c",
            "name": "12345678901234567890123456789012345678"
          },
          {
            "code": "122",
            "children": [],
            "dictDataId": "5f3234d9-9e3c-4ef9-bc74-3283163045f6",
            "parentDictDataId": "a7d44e7d-82dc-4f99-"
          }
        ],
        "dictDataId": "a7d44e7d-82dc-4f99-8a22-af19b7f8064c",
        "parentDictDataId": null,
        "name": "111111111"
      },
      {
        "code": "11111",
        "children": [],
        "dictDataId": "810bceed-3576-4aa3-9b8b-af35e35518ff",
        "parentDictDataId": null,
        "name": "1111"
      },
      {
        "code": "11",
        "children": [
          {
            "code": "22",
            "children": [
              {
                "code": "33",
                "children": [],
                "dictDataId": "14bc17dd-2b3a-4d15-9961-5c11e043c464",
                "parentDictDataId": "267b985c-e9be-466a-b5ea-75eaec61b9c5",
                "name": "33"
              }
            ],
            "dictDataId": "267b985c-e9be-466a-b5ea-75eaec61b9c5",
            "parentDictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
            "name": "22"
          },
          {
            "code": "4",
            "children": [],
            "dictDataId": "98b7f903-9d5f-49a6-88b0-075e94f65e87",
            "parentDictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
            "name": "4"
          },
          {
            "code": "7897",
            "children": [],
            "dictDataId": "1330cf75-8bd6-4d95-ba26-334020a950bc",
            "parentDictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
            "name": "1221"
          }
        ],
        "dictDataId": "ae1e7122-31a9-480f-9b7c-63da7a95c67a",
        "parentDictDataId": null,
        "name": "11"
      },
      {
        "code": "123",
        "children": [],
        "dictDataId": "d47188b3-130d-45e2-9671-1f8249357be0",
        "parentDictDataId": null,
        "name": "123"
      },
      {
        "code": "6545",
        "children": [
          {
            "code": "1233",
            "children": [],
            "dictDataId": "179f486b-b51e-4e8a-914a-8fe680257ece",
            "parentDictDataId": "2798d7af-de25-412e-8338-d553145b1d81",
            "name": "123"
          },
          {
            "code": "12333",
            "children": [],
            "dictDataId": "822686db-6269-42e4-b5af-fe08b153275b",
            "parentDictDataId": "2798d7af-de25-412e-8338-d553145b1d81",
            "name": "1233"
          }
        ],
        "dictDataId": "2798d7af-de25-412e-8338-d553145b1d81",
        "parentDictDataId": null,
        "name": "6545"
      },
      {
        "code": "12313213",
        "children": [],
        "dictDataId": "4f56f741-aaab-4f9d-bb0c-617e9499518f",
        "parentDictDataId": null,
        "name": "13123213"
      }
    ]
  }, //数据源
  props: {
    //数据源结构映射对象
    type: Object,
    default: () => {
      return {
        label: null,
        value: null,
        children: null,
        disabled: null,
        hasChild: null
      }
    }
  },
  activedId: { type: [String, Number, Boolean], default: '' }, //初始化选中节点
  indent: { type: [String, Number], default: 16 }, //缩进距离
  defaultExpandAll: { type: Boolean, default: false }, //是否展开所有的子节点
  // 设置展开所有子节点时，只展开children.length > 0 的节点
  expandWithChildren: {
    type: Boolean,
    default: false
  },
  //渲染函数  这里有两种返回方式，第一种就是直接返回html字符串，另外一种是返回一个对象，比如{html:'<div></div>',vm:this}  
  // 这里vm需要返回的原因是：renderContent距离sapi-tree太远，难以定位，（假如renderContent定义跟sapi-tree引入不在同一个组件，必须使用该方式）
  renderContent: Function,
  lazyLoad: Function, //按需加载调用此函数
  showTip: { type: Boolean, default: false }, // 鼠标经过时是否显示提示文字（为原生的提示）
  selectAfter: Function, //初始化选中之后的回调函数
  expandOnClickNode: {
    //是否在点击节点的时候展开或者收缩节点，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点， 默认值为 false。
    type: Boolean,
    default: false
  },
  uniqueOpened: {
    //是否只保持一个顶层节点展开
    type: Boolean,
    default: false
  }
})
const state = reactive({
  data: []
})
watch(() => props.data,
  (val) => {
    state.data = val
  })

</script>
<style lang="less" scoped>
</style>