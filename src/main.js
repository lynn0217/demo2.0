import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/fonticon/iconfont.css'
import './assets/fonticon1/iconfont.css'
import '@/styles/init.css'
import axios from 'axios'
// 配置根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// axios请求拦截
axios.interceptors.request.use(config => {
  console.log(config);
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
