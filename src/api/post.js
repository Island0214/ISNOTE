import axios from 'axios'

export function sharePost (callback, body) {
  axios.post('/post/sharePost',
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

export function getPostsOfMyFollowing (callback, body) {
  console.log(body)
  axios.get('/post/getPostsOfMyFollowing',
    {
      params: {
        token: localStorage.getItem('token')
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

export function sendPost (callback, body) {
  axios.post('/post/sendPost',
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
