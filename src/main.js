// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './index.css'
import '../theme/index.css'
import './style.less'
import Vuex from 'vuex'
import store from './store'
import VueRouter from 'vue-router'
import * as types from './store/mutation-types'
// import { mapMutations, mapActions } from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

axios.defaults.baseURL = '/api'

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
      screenWidth: document.body.clientWidth,
      screenHeight: window.innerHeight,
      scrollTop: window.scrollY
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollEvent)
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        window.screenHeight = window.innerHeight
        that.screenWidth = window.screenWidth
        that.screenHeight = window.screenHeight
      })()
    }
    this.getUser({
      onSuccess: (user) => {
        this.setUsername(user.name)
        this.changeLogStatus()
      },
      onError: (error) => {
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      }
    }, localStorage.getItem('token'))
  },
  watch: {
    screenWidth: function () {
      if (this.screenWidth > 1200) {
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
    },
    screenHeight: function () {
      this.setWindowHeight()
    }
  },
  methods: {
    ...Vuex.mapMutations({
      setLarge: types.SET_LARGE_SIZE, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
      setSmall: types.SET_SMALL_SIZE,
      setWindowHeight: types.SET_HEIGHT,
      setScrollY: types.SET_SCROLLY,
      setUsername: types.CHANGE_USERNAME,
      changeLogStatus: types.CHANGE_LOG_STATUS
    }),
    ...Vuex.mapActions({
      getUser: 'getUser'
    }),
    handleScrollEvent () {
      this.setScrollY()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScrollEvent)
  }
})
