import router from '@/router'
export default {
  state: () => ({
    userInfo: {},
    routers: [],
    tabList: []
  }),
  getters: {
    routers: (state) => {
      return state.routers
    }
  },
  mutations: {
    addTabs: (state, payload) => {
      let blackList = ['home', '404']
      if (blackList.includes(payload.name)) {
        return
      }
      let index = state.tabList.findIndex((val) => payload.name === val.name)
      if (index === -1) {
        state.tabList.push(payload)
      } else {
        // 同组件同路由下刷新组件状态
        if (state.tabList[index].fullPath !== payload.fullPath) {
          state.tabList.splice(index, 1)
          setTimeout(() => {
            state.tabList.splice(index, 0, payload)
          }, 0)
        }
      }
    },
    deleteTabs: (state, index) => {
      state.tabList.splice(index, 1)
    },
    // 存储用户信息
    setUserInfo: (state, payload) => {
      state.userInfo = payload
    }
  },
  actions: {}
}