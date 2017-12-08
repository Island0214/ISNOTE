import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import main from './modules/main'
import user from './modules/user'
import global from './modules/global'
import notebook from './modules/notebook'
import note from './modules/note'
import post from './modules/post'

// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    main,
    user,
    global,
    notebook,
    note,
    post
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
