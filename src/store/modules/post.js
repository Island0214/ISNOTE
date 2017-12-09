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
  },
  'getPostsOfMyFollowing' ({state, commit}, {onSuccess, onError}) {
    postApi.getPostsOfMyFollowing(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    })
  },
  'sendPost' ({state, commit}, {onSuccess, onError, body}) {
    postApi.sendPost(data => {
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
