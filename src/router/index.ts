import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from "@/components/layout/index.vue"
export const routes:Array<RouteRecordRaw> = [
  { 
    path: '/',
    name: '',
    component: layout,
    children: [
      {
        path: '/',
        name: '',
        meta: {
          keepAlive: true,
          icon: 'daifabu',
          title: '待发布'
        },
        component: () => import('@/views/index.vue'),
        beforeEnter: (_to, _from, next) => {
          document.title = '待发布'
          next()
        }
      },
      { 
        path: '/about',
        name: 'about', 
        meta: {
          keepAlive: true,
          icon: 'daiban',
          title: '待办'
        },
        component: () => import('@/views/test.vue'),
        beforeEnter: (_to, _from, next) => {
          document.title = '待办'
          next()
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory('./'),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router