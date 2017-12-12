import * as types from '../mutation-types'
import * as searchApi from '../../api/search'

// initial state
const state = {
  searchContent: ''
}

// getters
const getters = {
  searchContent: state => state.searchContent
}

// actions
const actions = {
  'searchAll' ({state, commit}, {onSuccess, onError, body}) {
    searchApi.searchAll(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    }, body)
  },
  'getUserSearchResult' ({state, commit}, {onSuccess, onError, body}) {
    searchApi.getUserSearchResult(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    }, body)
  },
  'getNoteSearchResult' ({state, commit}, {onSuccess, onError, body}) {
    searchApi.getNoteSearchResult(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    }, body)
  },
  'getPostSearchResult' ({state, commit}, {onSuccess, onError, body}) {
    searchApi.getPostSearchResult(data => {
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
  [types.SET_SEARCH]  (state, content) {
    console.log('mutation:' + content)
    state.searchContent = content
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
