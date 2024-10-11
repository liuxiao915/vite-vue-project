export default {
  namespaced: true,
  state: () => ({
    theme: {},
    themeList: [
      { label: '蓝色', value: 'blue', color: '', backGroundColor: '#0052d9' },
      { label: '橙色', value: 'orange', color: '', backGroundColor: '#eb5f0e' },
      { label: '绿色', value: 'green', color: '', backGroundColor: '#41af37' }
    ]
  }),
  mutations: {
    setTheme: (state, payload) => {
      state.theme = payload
      localStorage.setItem('theme', JSON.stringify(payload))
    }
  },
  actions: {}
}