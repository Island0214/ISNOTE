// import * as types from '../mutation-types'
import * as friendApi from '../../api/friend'

// initial state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  'getOneRecommendation' ({state, commit}, {onSuccess, onError}) {
    friendApi.getOneRecommendation(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    })
  },
  'followUserAction' ({state, commit}, {onSuccess, onError, body}) {
    friendApi.followUserAction(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    }, body)
  },
  'cancelFollowUserAction' ({state, commit}, {onSuccess, onError, body}) {
    friendApi.cancelFollowUserAction(data => {
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
