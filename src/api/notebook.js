import axios from 'axios'

export function getAllNotebooksByUser (callback, body) {
  axios.get('/notebook/getAllNotebooksByUser',
    {
      params: {
        token: body
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

export function createNoteBookAction (callback, body) {
  console.log(body)
  axios.post('/notebook/createNotebook',
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

export function getNotebookById (callback, body) {
  console.log(body)
  axios.post('/notebook/getNotebookById',
    body,
    {
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

export function modifyNotebook (callback, body) {
  console.log(body)
  axios.post('/notebook/modifyNotebook',
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
      this.$message({
        showClose: true,
        message: '登录状态出错...请重新登录',
        type: 'error'
      })
      this.$router.push('/')
      console.log(error)
    })
}
