// export
import axios from 'axios'

export function userLogIn (callback, body) {
  // console.log('login')
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
      // console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function userSignIn (callback, body) {
  console.log('signin')
  axios.post('/user/register',
    body,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      callback(response.data)
      // console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function getUser (callback, token) {
  console.log('getUser')
  axios.get('/user/me',
    {
      params: {
        token: token
      }
    }
    )
    .then(function (response) {
      callback(response.data)
      // console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function userModify (callback, body) {
  console.log('modify')
  axios.post('/user/modify',
    body,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      callback(response.data)
      // console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function modifyPassword (callback, body) {
  console.log('password')
  axios.post('/user/modifyPassword',
    body,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      callback(response.data)
      // console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
