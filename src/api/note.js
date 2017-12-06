import axios from 'axios'

export function getAllNotesByUser (callback, body) {
  axios.get('/note/getAllNotesByUser',
    {
      params: {
        token: localStorage.getItem('token')
      }
    }
  )
    .then(function (response) {
      console.log('success')
      console.log(response.data)
      callback(response.data)
    })
    .catch(function (error) {
      console.log('error')
      console.log(error)
    })
}

export function getNotesByNotebook (callback, body) {
  axios.post('/note/getNotesByNotebook',
    body,
    {
      params: {
        token: localStorage.getItem('token')
      },
      header: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      console.log('success')
      console.log(response.data)
      callback(response.data)
    })
    .catch(function (error) {
      console.log('error')
      console.log(error)
    })
}

export function createNoteAction (callback, body) {
  console.log(body)
  axios.post('/note/createNote',
    body,
    {
      params: {
        token: localStorage.getItem('token')
      },
      header: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      console.log('success')
      callback(response.data)
    })
    .catch(function (error) {
      console.log('error')
      console.log(error)
    })
}

export function getNotekById (callback, body) {
  console.log(body)
  axios.post('/note/getNoteById',
    body,
    {
      header: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      console.log('success')
      callback(response.data)
    })
    .catch(function (error) {
      console.log('error')
      console.log(error)
    })
}
