import router from '@/router'
export default {
  state: () => ({
    users: sessionStorage.getItem('userInfo') || {},
    routers: [],
    noReadNum: 0,
    wsStatus: false,
    tabList: [],
    sysName: '',
    logoPictureDtoList: []
  }),
  getters: {
    getTabsNameList: (state) => {
      return state.tabList.map((val) => val.name)
    },
    routers: (state) => {
      return state.routers
    },
    getUsersRoles: (state) => {
      return state.users
    },
    getNoReadNum: (state) => {
      return state.noReadNum
    }
  },
  mutations: {
    addTabs: (state, payload) => {
      let blackList = ['/home', '/404']
      if (blackList.includes(payload.path)) {
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
    updateTabs: (state, index) => {
      state.tabList.splice(index, 1)
    },
    deleteTabs: (state, fullPath) => {
      let index = state.tabList.findIndex((val) => val.fullPath === fullPath)
      state.tabList.splice(index, 1)
    },
    // 清除用户信息
    CLEAR_USER: (state) => {
      state.users = null
      state.routers = []
    },
    // 存储用户信息
    SET_USER: (state, payload) => {
      state.users = payload
    },
    // 修改数据
    CHANGE_SETTING: (state, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value
      }
    },
    // 设置未读消息数
    NOREADNUM_SETTING: (state, payload) => {
      state.noReadNum = payload
    },
    ROUTER_PUSH: (state, path) => {
      let index = state.tabList.findIndex((val) => val.path === path)
      router.push(state.tabList(index).fullPath)
    },
    SET_NAME: (state, payload) => {
      state.sysName = payload
    },
    SET_LIST: (state, payload) => {
      state.logoPictureDtoList = payload
      // 用法
      // import { useStore } from 'vuex'
      // const store = useStore()
      // store.commit('SET_LIST', res.data?.logoPictureDtoList)
    }
  },
  actions: {
    clearUser({ commit }) {
      commit('CLEAR_USER')
    },
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    }
  }
}
