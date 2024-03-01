import '@/assets/css/index.less'
import router from '@/router/index.ts'
import App from '@/hooks'
import 'virtual:svg-icons-register'
import store from '@/store/index.ts'
App.use(store).use(router).mount('#app')
