import * as notebookApi from '../../api/notebook'
import * as types from '../mutation-types'

const state = {
  notebookList: {}
}

// getters
const getters = {
  notebookList: state => state.notebookList
}

const actions = {
  'getMyNotebooks' ({state, commit}, {onSuccess, onError}) {
    notebookApi.getAllNotebooksByUser(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        commit(types.SET_NOTEBOOKS, data)
        onSuccess(data)
      }
    }, localStorage.getItem('token'))
  },
  'createNoteBookAction' ({state, commit}, {onSuccess, onError, body}) {
    notebookApi.createNoteBookAction(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.notebook)
      }
    }, body)
  }
}

// mutations
const mutations = {
  [types.SET_NOTEBOOKS] (state, notebooks) {
    state.notebookList = notebooks
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
