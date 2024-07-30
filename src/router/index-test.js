import { createRouter, createWebHashHistory } from 'vue-router'
import {defaultRoutes, NotFoundRoutes} from '@/router/routes'
import store from '@/store'
import layout from "@/components/layout/index.vue"
const router = createRouter({
  history: createWebHashHistory('./'),
  routes:defaultRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
 
let appEnter = 0  //这个是用于判断动态路由是否已经被获取
router.beforeEach(async (to, from, next) => {
  if(appEnter) {
    next()
  } else {
    //获取动态路由
    let asyncRoutes = await getAsyncRoutes()
    // 获取当前默认路由
    let currenRoutes = router.options.routes
    // 将动态添加进默认路由中
    currenRoutes.push({
      path: '/',
      name: '',
      component: layout,
      redirect: '/' + (asyncRoutes[0]?.path || '404'),
      children: asyncRoutes
    })
    // 将404添加进去
    //现在才添加的原因是：作为一级路由，当刷新，动态路由还未加载，路由就已经做了匹配，找不到就跳到了404 
    if(currenRoutes[currenRoutes.length - 1].path != '/:pathMath(.*)') {
      currenRoutes.push(...NotFoundRoutes)
    }
    // 将新生成的路由替换原路由
    currenRoutes.forEach(item => {
      router.addRoute(item)
    })
    // 更改控制生成路由次数的值
    appEnter++
    //确保addRoute()时动态添加的路由已经被完全加载上去，不然刷新页面可能会导致空白
    next({ ...to, replace: true })
  }
})
 
// 获取符合条件的动态路由数据
// 默认的是点击登录按钮返回的用户数据中就含有当前用户所能含有动态路由的用于判断的权限数组
function getAsyncRoutes() {
  return new Promise((resolve, reject) => {
    if (import.meta.env.VUE_APP_ENTRY_POWER === 'true') {
      // UserAuth.auth({ systemCode: 'emigration-system-zp' }).then((result) => {
      //   const permissionList = result.userResource || []
      //   const routers = filterByPermission(store.state.system.routers, permissionList)
      //   store.commit('storePermissions', permissionList)
      //   store.commit('storeRouters', routers)
      //   resolve(routers)
      // })
    } else {
      const routers = filterByPermission(store.state.system.routers, store.state.system.permissionList)
      store.commit('storeRouters', routers)
      resolve(routers)
    }
  })
}
function filterByPermission(routers, permissionList) {
  return routers.filter(item => permissionList.includes(item.meta.code))
}
export default router