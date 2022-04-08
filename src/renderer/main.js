import devtools from '@vue/devtools'
import Vue from 'vue'
import axios from 'axios'
import vueCookie from 'vue-cookie'

import App from './App'
import router from './router'
import store from './store'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUi)
Vue.use(vueCookie)
Vue.prototype.$bus = new Vue()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

import '../renderer/store'

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
