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
      console.log(response.data)
      callback(response.data)
    })
    .catch(function (error) {
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
      console.log(response.data)
      callback(response.data)
    })
    .catch(function (error) {
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function getNoteById (callback, body) {
  console.log(body)
  axios.post('/note/getNoteById',
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function deleteNote (callback, body) {
  console.log(body)
  axios.post('/note/deleteNote',
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function likeNote (callback, body) {
  console.log(body)
  console.log('like')
  axios.post('/like/likeNote',
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function cancelLikeNote (callback, body) {
  console.log(body)
  console.log('cancelLike')
  axios.post('/like/cancelLike',
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function addTag (callback, body) {
  console.log(body)
  console.log('addTag')
  axios.post('/tag/addTag',
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function deleteTag (callback, body) {
  console.log(body)
  console.log('deleteTag')
  axios.post('/tag/deleteTag',
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function uploadImage (callback, body) {
  console.log(body)
  axios.post('/note/uploadImage',
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  ).then((response) => {
    callback(response.data)

    // let url = response.data.url // Get url from response
    // let name = url.split('/')[url.split('/').length - 1]
    // let path = require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/' + name)
//          console.log(path)
//          path = require.context('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/', false, /\.(png|jpe?g|gif|svg)(\?.*)?$/)(name)
//          Editor.clipboard.dangerouslyPasteHTML(cursorLocation, '<img src="' + path + '"/>', Quill.sources.SILENT)
//     Editor.insertEmbed(cursorLocation, 'image', this.path)
//     callback(path)
  })
    .catch((err) => {
      console.log(err)
    })
}

export function modifyNote (callback, body) {
  console.log(body)
  axios.post('/note/modifyNote',
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
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
