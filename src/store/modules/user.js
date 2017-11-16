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
  [types.LOG_IN] ({dispatch}, {body}) {
    // alert(body.name)
    // alert(body.password)
    authApi.userLogIn(data => {
      alert(data.error)
      if (data.error !== undefined) {
        console.log(data.error)
      } else {
        localStorage.setItem('token', data.token)
        console.log(data)
        this.loginState = true
      }
    }, body)
  },
  [types.QUIT_LOG] (state) {

  }
}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
