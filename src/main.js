// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './index.css'
import '../theme/index.css'
import Vuex from 'vuex'
import './style.less'
import store from './store'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
