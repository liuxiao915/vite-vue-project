import { createStore } from 'vuex'

// 自动引入
const files  = import.meta.glob('./modules/*.js', { eager: true })
const modules = {}
for (const [path, value] of Object.entries(files)) {
  const name = path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
  modules[name] = value
}

export default createStore({
  modules
})