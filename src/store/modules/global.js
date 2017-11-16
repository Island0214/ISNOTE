import * as types from '../mutation-types'

// initial state
const state = {
  largeSize: document.body.clientWidth > 1200,
  mainHeight: window.innerHeight,
  scrollTop: window.scrollY,
  curUsername: ''
}

// getters
const getters = {
  largeSize: state => state.largeSize,
  mainHeight: state => state.mainHeight,
  scrollTop: state => state.scrollTop,
  curUsername: state => state.curUsername
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
  },
  [types.SET_SCROLLY] (state) {
    state.scrollTop = window.scrollY
  },
  [types.CHANGE_USERNAME] (state, username) {
    state.curUsername = username
    alert(state.curUsername)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
