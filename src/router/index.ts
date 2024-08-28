import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 全局路由(无需嵌套上左右整体布局)
// const globalRoutes = []
// 通过meta对象设置路由展示方式
// 1. isTab: 是否通过tab展示内容, true: 是, false: 否
export const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      keepAlive: true,
      title: '首页'
    },
    component: () => import('@/views/home.vue'),
  },
  { 
    path: '/index',
    // redirect: { name: 'index' },
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          keepAlive: true,
          title: '首页'
        },
        component: () => import('@/views/index.vue'),
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
        component: () => import('@/views/daifabu.vue'),
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
        component: () => import('@/views/test.vue'),
      }
    ]
  },
  {
    path: '/:pathMath(.*)', // 此处需特别注意置于最底部
    name: '404',
    meta: { title: '404' },
    component: () => import('@/components/notFound.vue')
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
router.beforeEach((_to, _from, next) => {
  next()
})
export default router