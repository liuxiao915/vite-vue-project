import { createStore } from 'vuex'
import home from './modules/home'
import report from './modules/report'
import system from './modules/system'
// 自动引入
// const files  = import.meta.glob('./modules/*.js', { eager: true })
// const modules = {}
// for (const [path, value] of Object.entries(files)) {
//   const name = path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
//   modules[name] = value
// }



export default createStore({
  state: () => ({}),
  modules: {
    home,
    report,
    system
  }
})