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
