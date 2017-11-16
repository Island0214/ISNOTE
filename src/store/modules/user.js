import * as types from '../mutation-types'
import * as authApi from '../../api/auth'

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
  [types.LOG_IN] ({state, commit}, {body, onSuccess, onError}) {
    // alert(body.name)
    // alert(body.password)
    authApi.userLogIn(data => {
      if (data.error !== undefined) {
        console.log(data.error)
      } else {
        localStorage.setItem('token', data.token)
        console.log(data)
        commit(types.CHANGE_USERNAME, body.name)
        commit(types.CHANGE_LOG_STATUS)
        commit(types.SHOW_MAIN)
      }
    }, body)
  },
  [types.QUIT_LOG] ({commit}) {
    commit(types.CHANGE_LOG_STATUS)
  }
}

// mutations
const mutations = {
  [types.CHANGE_LOG_STATUS] (state) {
    state.loginState = !state.loginState
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
