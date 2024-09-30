// system 页面路由
import { RouteRecordRaw } from 'vue-router'
export const systemRouter:Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'system',
    meta: { title: 'system', icon: 'Setting' },
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/system/index',
        name: 'system/index',
        meta: {
          keepAlive: true,
          title: '系统'
        },
        component: () => import('@/views/system/index.vue'),
      }
    ]
  }
]