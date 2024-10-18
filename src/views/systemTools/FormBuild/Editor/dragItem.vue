<script setup>
// import draggable from 'vuedraggable'
import render from '../generator/render'
import { h } from 'vue'
const components = {
  itemBtns(h, element, index, parent) {
    const { copyItem, deleteItem } = $listeners
    return [
      <span class="drawing-item-copy" title="复制" onClick={event => {
        copyItem(element, parent); event.stopPropagation()
      }}>
        <i class="el-icon-copy-document" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem(index, parent); event.stopPropagation()
      }}>
        <i class="el-icon-delete" />
      </span>
    ]
  }
}
const layouts = {
  colFormItem(h, element, index, parent) {
    const { activeItem } = this.$listeners
    let className = props.activeId === element.formId ? 'drawing-item active-from-item' : 'drawing-item'
    if (props.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    return (
      <el-col span={element.span} class={className}
        nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
        <el-form-item label-width={element.labelWidth ? `${element.labelWidth}px` : null}
          label={element.label} required={element.required}>
          <render key={element.renderKey} conf={element} onInput={event => {
            this.$set(element, 'defaultValue', event)
          }} />
        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, element, index, parent) {
    const { activeItem } = $listeners
    const className = props.activeId === element.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (element.type === 'flex') {
      child = <el-row type={element.type} justify={element.justify} align={element.align}>
        {child}
      </el-row>
    }
    return (
      <el-col span={element.span}>
        <el-row gutter={element.gutter} class={className}
          nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
          <span class="component-name">{element.componentName}</span>
          {/* <draggable list={element.children} animation={340} group="componentsGroup" class="drag-wrapper">
            {child}
          </draggable> */}
          <div draggable={true} list={element.children} animation={340} group="componentsGroup" class="drag-wrapper">{child}</div>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  }
}

function renderChildren(h, element, index, parent) {
  if (!Array.isArray(element.children)) return null
  return element.children.map((el, i) => {
    const layout = layouts[el.layout]
    if (layout) {
      return layout.call(this, h, el, i, element.children)
    }
    return layoutIsNotFound()
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${props.element.layout}匹配的layout`)
}
const props = defineProps([
  'element',
  'index',
  'drawingList',
  'activeId',
  'formConf'
])
render = (h) => {
  const layout = layouts[props.element.layout]
  if (layout) {
    return layout.call(layout, h, props.element, props.index, props.drawingList)
  }
  return layoutIsNotFound()
}
</script>
