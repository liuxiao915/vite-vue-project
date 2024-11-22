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
      },
      {
        path: '/systemTools/formDesign',
        name: 'systemTools/formDesign',
        meta: {
          keepAlive: true,
          title: '表单设计'
        },
        component: () => import('@/views/systemTools/formDesign/index.vue'),
      },
      {
        path: '/systemTools/formDesign11',
        name: 'systemTools/formDesign11',
        meta: {
          keepAlive: true,
          title: '表单设计11'
        },
        component: () => import('@/views/systemTools/formDesign11/index.vue'),
      },
      {
        path: '/systemTools/ThreeJs',
        name: 'systemTools/ThreeJs',
        meta: {
          keepAlive: true,
          title: 'ThreeJs'
        },
        component: () => import('@/views/systemTools/ThreeJs/index.vue'),
      },
      {
        path: '/systemTools/Cesium',
        name: 'systemTools/Cesium',
        meta: {
          keepAlive: true,
          title: 'Cesium'
        },
        component: () => import('@/views/systemTools/Cesium/index.vue'),
      }
    ]
  }
]