// report 页面路由
import { RouteRecordRaw } from 'vue-router'
export const reportRouter:Array<RouteRecordRaw> = [
  { 
    path: '/report',
    name: 'report',
    meta: { title: 'report' },
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/report/index',
        name: 'report/index',
        meta: {
          keepAlive: true,
          title: '报表'
        },
        component: () => import('@/views/report/index.vue'),
      }
    ]
  }
]