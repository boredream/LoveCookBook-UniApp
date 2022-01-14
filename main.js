import App from './App'

import uView from 'uview-ui'
Vue.use(uView);

// 工具类
import stringUtil from './utils/string_util.js'
import requestUtil from './utils/request_util.js'
import toast from './utils/toast_util.js'
Vue.prototype.$stringUtil = stringUtil
Vue.prototype.$request = requestUtil
Vue.prototype.$toast = toast

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif


