import Vue from 'vue'
import store from './store/store'
import router from './router/router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$qs = qs; //据说用来解决vue中post请求

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
