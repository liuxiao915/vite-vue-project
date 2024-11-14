export default {
  namespaced: true,
  state: () => ({
    formConfig: {
      modelName: 'formData',
      refName: 'vForm',
      rulesName: 'rules',
      labelWidth: 80,
      labelPosition: 'left',
      size: '',
      labelAlign: 'label-left-align',
      cssCode: '',
      customClass: [],
      functions: '',  //全局函数
      layoutType: 'PC',
      jsonVersion: 3,
      onFormCreated: '',
      onFormMounted: '',
      onFormDataChange: '',
    },
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