import * as types from '../mutation-types'

// initial state
const state = {
  largeSize: document.body.clientWidth > 768
}

// getters
const getters = {
  largeSize: function () {
    return state.largeSize
  }
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
