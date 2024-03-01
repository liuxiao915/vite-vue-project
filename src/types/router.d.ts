export interface Imeta {
  title?: string,
  icon?: string,
  keepAlive?: boolean
}

export interface IRouter {
  path: string,
  name?: string, // 命名路由
  component?: Component,
  // components?: { [name: string]: Component }, // 命名视图组件
  redirect?: string | Location | Function,
  props?: boolean | Object | Function,
  alias?: string | Array<string>,
  children?: Array<IRouter>, // 嵌套路由
  meta?: Imeta,
  beforeEnter?: Function
}