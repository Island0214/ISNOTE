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
  },
  'modifyNotebook' ({state, commit}, {onSuccess, onError, body}) {
    notebookApi.modifyNotebook(data => {
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
    // console.log('notebook:')
    // console.log(notebook)

    if (notebook !== null) {
      // console.log('allNotebook:')
      // console.log(notebook.allNotebook)
      if (notebook.allNotebook !== undefined) {
        // console.log('safgdhfjghdgsfadfdgfhg')
        state.singleNotebook.id = notebook.allNotebook.id
        state.singleNotebook.notebook_name = notebook.allNotebook.notebook_name
        state.singleNotebook.authority = notebook.allNotebook.authority
      } else {
        // console.log('!!!!!!!!!!!!!!!!!!!')
        state.singleNotebook.id = notebook.id
        state.singleNotebook.notebook_name = notebook.notebook_name
        state.singleNotebook.authority = notebook.authority
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
