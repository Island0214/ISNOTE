import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/Home'
import UserInfoPage from '../page/UserInfoPage'
import FriendInfoPage from '../page/FriendInfoPage'
import CommunityPage from '../page/CommunityPage'
import NotePage from '../page/NotePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/info',
      name: 'userInfo',
      component: UserInfoPage
    }, {
      path: '/friends',
      name: 'friendsInfo',
      component: FriendInfoPage
    }, {
      path: '/community',
      name: 'community',
      component: CommunityPage
    }, {
      path: '/note',
      name: 'note',
      component: NotePage
    }
  ]
})
