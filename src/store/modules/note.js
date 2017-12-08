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
    noteApi.getNoteById(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.note)
        commit(types.SET_NOTE, data)
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
  },
  'likeNote' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.likeNote(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.success)
      }
    }, body)
  },
  'cancelLike' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.cancelLikeNote(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.success)
      }
    }, body)
  },
  'addTag' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.addTag(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    }, body)
  },
  'deleteTag' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.deleteTag(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.success)
      }
    }, body)
  },
  'uploadImage' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.uploadImage(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        let url = data.url // Get url from response
        let name = url.split('/')[url.split('/').length - 1]
        // name = '/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/' + name
        onSuccess(name)
      }
    }, body)
  },
  'modifyNote' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.modifyNote(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        // commit(types.SET_NOTES, data)
        onSuccess(data)
      }
    }, body)
  },
  'forkNote' ({state, commit}, {onSuccess, onError, body}) {
    noteApi.forkNote(data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        // commit(types.SET_NOTES, data)
        onSuccess(data)
      }
    }, body)
  },
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
