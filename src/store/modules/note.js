import * as noteApi from '../../api/note'
import * as types from '../mutation-types'

const state = {
  noteList: {},
  singleNote: {}
}

// getters
const getters = {
  noteList: state => state.noteList,
  singleNote: state => state.singleNote
}

const actions = {
  'getMyNotes' ({state, commit}, {onSuccess, onError}) {
    noteApi.getAllNotesByUser(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        commit(types.SET_NOTES, data)
        onSuccess(data)
      }
    })
  },
  'getNotesByNotebook' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.getNotesByNotebook(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        commit(types.SET_NOTES, data)
        onSuccess(data)
      }
    }, body)
  },
  'createNoteAction' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.createNoteAction(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
        // commit(types.ADD_NEWNOTE, data)
      }
    }, body)
  },
  'getNoteById' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.getNotekById(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.note)
        // commit(types.ADD_NEWNOTE, data)
      }
    }, body)
  },
  'deleteNote' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.deleteNote(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.success)
      }
    }, body)
  }
}

// mutations
const mutations = {
  [types.SET_NOTES] (state, notes) {
    state.noteList = notes
  },
  [types.SET_NOTE] (state, note) {
    state.singleNote = note
  },
  [types.ADD_NEWNOTE] (state, note) {
    console.log(state.noteList)
    state.noteList.push(note)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
