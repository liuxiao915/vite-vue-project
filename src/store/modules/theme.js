export default {
  namespaced: true,
  state: () => ({
    theme: {},
    themeList: [
      { label: '蓝色', value: 'blue', textColor: '', bgColor: '#0052d9' },
      { label: '橙色', value: 'orange', textColor: '', bgColor: '#eb5f0e' },
      { label: '绿色', value: 'green', textColor: '', bgColor: '#41af37' }
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