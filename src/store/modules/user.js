import * as types from '../mutation-types'
import * as authApi from '../../api/auth'

// initial state
const state = {
  loginState: false,
  curUsername: ''
}

// getters
const getters = {
  loginState: state => state.loginState,
  curUsername: state => state.curUsername
}

// actions
const actions = {
  [types.LOG_IN] ({state, commit}, {body, onSuccess, onError}) {
    // alert(body.name)
    // alert(body.password)
    authApi.userLogIn(data => {
      if (data.error !== undefined) {
        // console.log(data.error)
        onError(data.error)
      } else {
        onSuccess()
        localStorage.setItem('token', data.token)
        console.log(data)
        commit(types.CHANGE_USERNAME, body.name)
        commit(types.CHANGE_LOG_STATUS)
        commit(types.SHOW_MAIN)
        // on-success
      }
    }, body)
  },
  [types.QUIT_LOG] ({state, commit}, {onSuccess}) {
    commit(types.CHANGE_LOG_STATUS)
    localStorage.setItem('token', null)
    onSuccess('成功退出账户： ' + state.curUsername)
  }
}

// mutations
const mutations = {
  [types.CHANGE_LOG_STATUS] (state) {
    state.loginState = !state.loginState
  },
  [types.CHANGE_USERNAME] (state, username) {
    state.curUsername = username
    // alert(state.curUsername)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
