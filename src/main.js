import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/style.css'
// import 'element-plus/dist/index.css'; // 引入 Element Plus 的基础样式
import 'element-plus/theme-chalk/dark/css-vars.css' // 引入 Element Plus 的暗黑模式样式
// import './custom-el-var.scss'
import router from './router'
import FontAwesomeIcon from './plugins/font-awesome'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn,
})
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
