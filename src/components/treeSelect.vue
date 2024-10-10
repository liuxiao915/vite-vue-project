<template>
  <el-select v-model="valueTitle" @clear="clearHandle" ref="treeSelect" filterable :filter-method="filterSelect" @visible-change="clearSelect" placeholder="请选择">
    <!-- <el-input class="selectInput" :placeholder="placeholder" v-model="filterText"></el-input> -->
    <el-option :value="valueTitle" :label="valueTitle">
      <el-tree id="tree-option" ref="selectTree" :accordion="accordion" :data="treeOptions" :props="props" :node-key="props.value" :default-expanded-keys="defaultExpandedKey" :filter-node-method="filterNode" @node-click="handleNodeClick">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "title", // 显示名称
          children: "children", // 子级字段名
        };
      },
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 初始值 */
    value: {
      type: Number | String,
      default: () => {
        return null;
      },
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "检索关键字";
      },
    },
  },
  data() {
    return {
      filterText: "",
      valueId: this.value, // 初始值
      valueTitle: "",
      defaultExpandedKey: [],
      treeOptions: [],
    };
  },
  mounted() {
    console.log('mounted');
    this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId && this.options && this.options.length > 0) {
        let info = this.findFirstDeptFarm2(this.options);
        this.valueTitle = info.label; // 初始化显示
        // this.$refs.selectTree.getNode(this.valueId).data[this.props.label]
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开

        this.treeOptions = this.options;
        console.log('treeOptions', this.treeOptions)
      }
      this.initScroll();
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach((ele) => (ele.style.width = 0));
      });
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("getValue", {
        id: this.valueId,
        label: this.valueTitle,
        farmFlag: node.farmFlag,
      });
      this.defaultExpandedKey = [];
      // if (!node.children || !node.children.length) {
      //补录选择完选项弹框不能收起
      this.$refs.treeSelect.blur();
      // }
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getValue", null);
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach((element) => element.classList.remove("is-current"));
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    findFirstDeptFarm2(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.valueId) {
          return arr[i];
        } else if (
          Array.isArray(arr[i].children) &&
          arr[i].children.length > 0
        ) {
          const result = this.findFirstDeptFarm2(arr[i].children);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
    clearSelect(show) {
      if (!show) {
        this.treeOptions = this.options;
      }
    },
    filterSelect(val) {
      if (val) {
        this.treeOptions = this.filterTreeByName(this.options, val);
      } else {
        this.treeOptions = this.options;
      }
    },
    filterTreeByName(tree, nameToMatch) {
      // 递归函数，用于遍历树并找到匹配的节点及其父节点
      function traverseAndFilter(node, filteredTree = []) {
        // 如果节点的name匹配，则将其添加到filteredTree中
        if (node.label.indexOf(nameToMatch) !== -1) {
          filteredTree.push(node);
        }

        // 遍历节点的子节点
        if (node.children) {
          for (let child of node.children) {
            // 递归调用traverseAndFilter来检查子节点
            traverseAndFilter(child, filteredTree);
          }
        }

        // 如果filteredTree不为空，说明找到了匹配项，返回filteredTree
        // 否则返回null，表示当前节点及其子节点中都没有匹配项
        return filteredTree.length ? filteredTree : null;
      }

      // 初始化结果树
      let resultTree = [];

      // 遍历树的根节点
      for (let rootNode of tree) {
        let filteredNodes = traverseAndFilter(rootNode);
        // 如果filteredNodes不为空，说明找到了匹配项，将其添加到结果树中
        if (filteredNodes) {
          resultTree = resultTree.concat(filteredNodes);
        }
      }

      // 去除重复的节点（如果有的话），因为可能通过多个路径找到了相同的节点
      resultTree = [
        ...new Map(resultTree.map((node) => [node.id || node, node])).values(),
      ];

      // 如果没有找到任何匹配的节点，返回null
      if (resultTree.length === 0) {
        return null;
      }

      // 构建最终的树形结构，只包含匹配的节点及其父节点
      function buildFilteredTree(nodes) {
        const filteredTree = [];
        const nodeMap = new Map();

        for (const node of nodes) {
          nodeMap.set(node.id || node, node);
        }

        for (const node of nodes) {
          const parent = node.parent;
          if (!parent || nodeMap.has(parent)) {
            let currentNode = nodeMap.get(node.id || node);
            let parentNode = parent ? nodeMap.get(parent) : null;

            if (parentNode) {
              if (!parentNode.children) {
                parentNode.children = [];
              }
              parentNode.children.push(currentNode);
              filteredTree.push(parentNode);
            } else {
              filteredTree.push(currentNode);
            }
          }
        }

        return filteredTree;
      }

      // 如果找到了匹配的节点，则构建最终的树形结构
      if (resultTree.length > 0) {
        return buildFilteredTree(resultTree);
      }

      // 如果没有找到匹配的节点，返回null
      return null;
    },
  },
  watch: {
    value() {
      this.valueId = this.value;
      this.initHandle();
    },
    filterText(val) {
      if (val) {
        try {
          this.$refs.selectTree.filter(val);
        } catch (error) { }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>

