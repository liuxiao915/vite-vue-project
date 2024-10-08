// system 页面路由
import { RouteRecordRaw } from 'vue-router'
export const systemToolsRouter:Array<RouteRecordRaw> = [
  {
    path: '/systemTools',
    name: 'systemTools',
    meta: { title: '系统工具', icon: 'Setting' },
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/systemTools/lowCode',
        name: 'systemTools/lowCode',
        meta: {
          keepAlive: true,
          title: '低代码'
        },
        component: () => import('@/views/systemTools/LowCode/index.vue'),
      },
      {
        path: '/systemTools/formBuild',
        name: 'systemTools/formBuild',
        meta: {
          keepAlive: true,
          title: '表单构建'
        },
        component: () => import('@/views/systemTools/FormBuild/index.vue'),
      }
    ]
  }
]