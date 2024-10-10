import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { menuRouter } from './modules/index'
// 全局路由(无需嵌套上左右整体布局)
// const globalRoutes = []
// 通过meta对象设置路由展示方式
// 1. isTab: 是否通过tab展示内容, true: 是, false: 否
export const routes:Array<RouteRecordRaw> = [
  ...menuRouter,
  {
    path: '/',
    name: 'home',
    meta: {
      keepAlive: true,
      title: '首页',
      hidden: true
    },
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/login', // 此处需特别注意置于最底部
    name: 'login',
    meta: { title: '登录', hidden: true },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMath(.*)', // 此处需特别注意置于最底部
    name: '404',
    meta: { title: '404', hidden: true },
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
router.beforeEach((to, _from, next) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  store.commit('tabs/addTabs', { ...to })
  next()
})
export default router