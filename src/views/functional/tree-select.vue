<template>
  <elTreeSelect
    :props="{
      value: 'id',
      label: 'label',
      children: 'children',
    }"
    :options="deptOptions"
    :value="deptId"
    :clearable="false"
    :accordion="true"
    @getValue="handleNodeClick"
    height="200"
  />
</template>
<script>
export default {
  data() {
    return {
      deptId: '', // 牧场id
      deptOptions: [
        {
          "id": 201,
          "label": "突泉县",
          "children": [
            {
              "id": 202,
              "label": "东杜尔基镇",
              "children": [
                {
                  "id": 12,
                  "label": "东方镜养殖户",
                  "farmFlag": "1",
                  "level": null
                }
              ],
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 203,
              "label": "六户镇",
              "children": [
                {
                  "id": 14,
                  "label": "澜养殖户",
                  "farmFlag": "1",
                  "level": null
                }
              ],
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 204,
              "label": "永安镇",
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 205,
              "label": "学田乡",
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 206,
              "label": "宝石镇",
              "children": [
                {
                  "id": 3,
                  "label": "张三养殖户",
                  "farmFlag": "1",
                  "level": null
                }
              ],
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 207,
              "label": "太平乡",
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 208,
              "label": "突泉镇",
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 209,
              "label": "水泉镇",
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 210,
              "label": "内蒙古自治区国营杜尔基农场",
              "farmFlag": null,
              "level": "4"
            },
            {
              "id": 211,
              "label": "九龙乡",
              "farmFlag": null,
              "level": "4"
            }
          ],
          "farmFlag": null,
          "level": "3"
        }
      ], // tree数据
    }
  },
  methods: {
    // 节点单击事件
    handleNodeClick(data) {
      console.log('选择的数据', data);
    }
  }
}
</script>

