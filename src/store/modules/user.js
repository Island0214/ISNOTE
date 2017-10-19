import * as types from '../mutation-types'

// initial state
const state = {
  loginState: false
}

// getters
const getters = {
  loginState: state => state.loginState
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.LOG_IN] (state) {
    state.loginState = true
  },
  [types.QUIT_LOG] (state) {
    state.loginState = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
