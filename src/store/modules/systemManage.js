export default {
  namespaced: true,
  state: () => ({
    waterMark: {}
  }),
  actions: {},
  mutations: {
    setWaterMark: (state, payload) => {
      state.waterMark = payload
      sessionStorage.setItem('waterMark', JSON.stringify(payload))
    },
  }
}