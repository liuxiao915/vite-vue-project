import '@/assets/css/index.less'
import router from '@/router/index'
import '@/hooks/polyfill.js' // 去除touch事件谷歌提示
import App from '@/hooks'
import 'virtual:svg-icons-register'
import store from '@/store/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  App.component(key, component)
}
App.use(store).use(router).mount('#app')
