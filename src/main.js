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
import * as types from './store/mutation-types'
// import { Vuex, mapMutations } from 'vuex'

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
  components: {
    App
  },
  data () {
    return {
      screenWidth: document.body.clientWidth
    }
  },
  computed: {
    // largeSize: function () {
    //   return this.screenWidth > 768
    // }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  watch: {
    screenWidth: function () {
      if (this.screenWidth > 768) {
        this.setLarge()
      } else {
        this.setSmall()
      }
//        if (!this.timer) {
//          this.timer = true
//          let that = this
//          if (this.screenWidth < 768) {
//            this.largeSize = false
//          }
//          setTimeout(function () {
//            // that.screenWidth = that.$store.state.canvasWidth
//            console.log(that.screenWidth)
//            that.init()
//            that.timer = false
//          }, 400)
//        }
    }
  },
  methods: {
    ...Vuex.mapMutations({
      setLarge: types.SET_LARGE_SIZE, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
      setSmall: types.SET_SMALL_SIZE
    })
  }
})
