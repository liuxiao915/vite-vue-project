/*
 * @Author: huangguiqing
 * @Date: 2022-07-13 14:12:15
 */
import router from '@/router'
const state = {
  users: sessionStorage.getItem('userInfo') || {},
  routers: [],
  noReadNum: 0,
  wsStatus: false,
  tabList: [],
  sysName: '',
  logoPictureDtoList: []
}

const getters = {
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
}

const mutations = {
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
  addTabs: (state, payload) => {
    let blackList = ['/index', '/404']
    if (blackList.includes(payload.path)) {
      return
    }
    let index = state.tabList.findIndex((val) => payload.path === val.path)
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
  UPDATE_TAB: (state, index) => {
    state.tabList.splice(index, 1)
  },
  DELETE_TAB: (state, fullPath) => {
    let index = state.tabList.findIndex((val) => val.fullPath === fullPath)
    state.tabList.splice(index, 1)
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
}

const actions = {
  clearUser({ commit }) {
    commit('CLEAR_USER')
  },
  setUser({ commit }, payload) {
    commit('SET_USER', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
