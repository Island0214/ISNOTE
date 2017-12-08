// import * as types from '../mutation-types'
import * as postApi from '../../api/post'

// initial state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  'sharePost' ({state, commit}, {onSuccess, onError, body}) {
    postApi.sharePost(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    }, body)
  }
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
