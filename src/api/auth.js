// export
import axios from 'axios'

export function userLogIn (callback, body) {
  console.log('login')
  axios.post('/user/login',
    body,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      callback(response.data)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
