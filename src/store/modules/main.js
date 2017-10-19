import * as types from '../mutation-types'

// initial state
const state = {
  welcome: true,
  logIn: false,
  signIn: false
}

// getters
const getters = {
  welcome: state => state.welcome,
  logIn: state => state.logIn,
  signIn: state => state.signIn
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.SHOW_MAIN] (state) {
    state.welcome = true
    state.logIn = false
    state.signIn = false
  },
  [types.SHOW_LOGIN] (state) {
    state.welcome = false
    state.logIn = true
    state.signIn = false
  },
  [types.SHOW_SIGNIN] (state) {
    state.welcome = false
    state.logIn = false
    state.signIn = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
