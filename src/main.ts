import '@/assets/css/index.less'
import router from '@/router/index'
import '@/hooks/polyfill.js' // 去除touch事件谷歌提示
import App from '@/hooks'
import 'virtual:svg-icons-register'
import store from '@/store/index.js'
// 全局注册element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  App.component(key, component)
}
import Logger from '@/utils/logger'
Logger.prettyPrimary(`欢迎使用`, import.meta.env.VITE_APP_TITLE || '本系统')
App.use(store).use(router).mount('#app')
