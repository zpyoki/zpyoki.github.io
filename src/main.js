import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import './static/js/element.js'
import dink from 'dinkjs'
import VueSocketIO from 'vue-socket.io'
import './routers/admin/checkBtnPermission'
import lang from './helper/lang'
import config from './helper/config'
import http from './helper/axios'

Vue.config.productionTip = true
Vue.prototype.$config = config
Vue.prototype.$http = http
Vue.use(dink)
Vue.use(new VueSocketIO({
  // debug: true,
  connection: process.env.VUE_APP_WS_URL
  // vuex: {
  //   store,
  //   actionPrefix: 'SOCKET_',
  //   mutationPrefix: 'SOCKET_'
  // },
  // options: { path: '' }
}))

new Vue({
  router,
  store,
  lang,
  render: h => h(App)
}).$mount('#app')
