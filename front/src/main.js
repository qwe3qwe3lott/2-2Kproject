import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import VueCryptojs from 'vue-cryptojs'
import VueCookies from 'vue-cookies'

import './assets/css/myStyle.scss'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCryptojs)
Vue.use(VueCookies);

new Vue({
  render: h => h(App),
  router,
  store,
  el: '#app'
})
