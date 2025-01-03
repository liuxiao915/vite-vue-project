import { createStore } from 'vuex'
import formBuild from './modules/formBuild'
import report from './modules/report'
import system from './modules/system'
import systemManage from './modules/systemManage'
import tabs from './modules/tabs'
import theme from './modules/theme'
import formDesign11 from './modules/formDesign11'
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
    formBuild,
    report,
    system,
    systemManage,
    tabs,
    theme,
    formDesign11
  }
})