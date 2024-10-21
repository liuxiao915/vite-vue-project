export default {
  namespaced: true,
  state: () => ({
    drawingList: [], // 添加的组件数据
  }),
  mutations: {
    addComponent: (state, payload) => {
      state.drawingList.push(payload)
      localStorage.setItem('drawingList', JSON.stringify(state.drawingList))
    }
  },
  actions: {}
}