export default {
  namespaced: true,
  state: () => ({
    historyData: {
      index: -1,
      maxStep: 20,
      steps: [],
    },
    drawingList: [], // 添加的组件数据
  }),
  mutations: {
    addComponent: (state, payload) => {
      console.log('addComponent::', payload, state.drawingList)
      state.drawingList.push(payload)
      localStorage.setItem('drawingList', JSON.stringify(state.drawingList))
    },
    getComponent: (state, payload) => {
      state.drawingList = JSON.parse(localStorage.getItem('drawingList')) || []
    },
    deleteComponent: (state, index) => {
      state.drawingList.splice(index, 1)
    },
  },
  actions: {}
}