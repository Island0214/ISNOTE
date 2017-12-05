import * as notebookApi from '../../api/notebook'
import * as types from '../mutation-types'

const state = {
  notebookList: {},
  singleNotebook: {}
}

// getters
const getters = {
  notebookList: state => state.notebookList,
  singleNotebook: state => state.singleNotebook
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
  },
  'getNotebookById'  ({state, commit}, {onSuccess, onError, body}) {
    notebookApi.getNotebookById(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        commit(types.SET_NOTEBOOK, data.notebook)
        onSuccess(data.notebook)
      }
    }, body)
  }
}

// mutations
const mutations = {
  [types.SET_NOTEBOOKS] (state, notebooks) {
    state.notebookList = notebooks
  },
  [types.SET_NOTEBOOK] (state, notebook) {
    state.singleNotebook = notebook
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
