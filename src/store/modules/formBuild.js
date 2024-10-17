export default {
  namespaced: true,
  state: () => ({
    componentData: [], // 添加的组件数据
  }),
  mutations: {
    addComponent: (state, payload) => {
      state.componentData.push(payload)
      localStorage.setItem('componentData', JSON.stringify(state.componentData))
    }
  },
  actions: {}
}