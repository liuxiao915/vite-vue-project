// functional 页面路由
import { RouteRecordRaw } from 'vue-router'
export const functionalRouter:Array<RouteRecordRaw> = [
  { 
    path: '/index',
    name: '',
    meta: { title: 'index' },
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          keepAlive: true,
          title: 'index'
        },
        component: () => import('@/views/functional/index.vue'),
      },
      {
        path: '/daifabu',
        name: 'daifabu',
        meta: {
          keepAlive: true,
          icon: 'daifabu',
          isTab: true,
          title: '待发布'
        },
        component: () => import('@/views/functional/daifabu.vue'),
        // beforeEnter: (_to, _from, next) => {
        //   document.title = '待发布'
        //   next()
        // }
      },
      {
        path: '/daiban',
        name: 'daiban',
        meta: {
          keepAlive: true,
          icon: 'daiban',
          isTab: true,
          title: '待办'
        },
        component: () => import('@/views/functional/test.vue'),
      },
      {
        path: '/tree',
        name: 'tree', 
        meta: {
          keepAlive: true,
          icon: 'tree',
          isTab: true,
          title: 'tree'
        },
        component: () => import('@/views/functional/tree.vue'),
      },
      {
        path: '/picture-cut',
        name: 'picture-cut',
        meta: {
          keepAlive: true,
          icon: 'tree',
          isTab: true,
          title: 'picture-cut'
        },
        component: () => import('@/views/functional/picture-cut.vue'),
      },
      {
        path: '/treeSelect',
        name: 'treeSelect', 
        meta: {
          keepAlive: true,
          icon: 'daiban',
          isTab: true,
          title: '下拉'
        },
        component: () => import('@/views/functional/tree-select.vue'),
      }
    ]
  },
]