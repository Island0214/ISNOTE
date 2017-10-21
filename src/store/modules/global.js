import * as types from '../mutation-types'

// initial state
const state = {
  largeSize: document.body.clientWidth > 768,
  mainHeight: window.innerHeight
}

// getters
const getters = {
  largeSize: state => state.largeSize,
  mainHeight: state => state.mainHeight
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.SET_LARGE_SIZE] (state) {
    state.largeSize = true
  },
  [types.SET_SMALL_SIZE] (state) {
    state.largeSize = false
    // alert(state.largeSize)
  },
  [types.SET_HEIGHT] (state) {
    state.mainHeight = window.innerHeight
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
