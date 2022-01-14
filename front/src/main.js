import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import VueCryptojs from 'vue-cryptojs'
import { Laue } from 'laue'
import interpreter from '@/plugins/interpreter'

import './assets/css/myStyle.scss'

// eslint-disable-next-line no-extend-native
Array.prototype.sum = function (prop) {
  let total = 0
  for (let i = 0, _len = this.length; i < _len; i++) total += this[i][prop]
  return total
}

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCryptojs)
Vue.use(Laue)
Vue.use(interpreter)

new Vue({
  render: h => h(App),
  router,
  store,
  el: '#app'
})

console.log(process)
