// systemManage 页面路由
import { RouteRecordRaw } from 'vue-router'
export const systemManageRouter:Array<RouteRecordRaw> = [
  {
    path: '/systemManage',
    name: 'systemManage',
    meta: { title: '系统管理', icon: 'Setting' },
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/systemManage/index',
        name: 'systemManage/index',
        meta: {
          keepAlive: true,
          title: '系统'
        },
        component: () => import('@/views/systemManage/index.vue'),
      },
      {
        path: '/systemManage/waterMark',
        name: 'systemManage/waterMark',
        meta: {
          keepAlive: true,
          title: '水印'
        },
        component: () => import('@/views/systemManage/water-mark.vue'),
      }
    ]
  }
]