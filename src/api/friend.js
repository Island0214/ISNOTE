import axios from 'axios'

export function getOneRecommendation (callback, body) {
  axios.get('/friend/getOneRecommendation',
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

export function followUserAction (callback, body) {
  axios.post('/friend/followUser',
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

export function cancelFollowUserAction (callback, body) {
  axios.post('/friend/cancelFollow',
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
