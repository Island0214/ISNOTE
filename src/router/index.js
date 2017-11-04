import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/Home.vue'
import UserInfoPage from '../page/UserInfoPage.vue'
import FriendInfoPage from '../page/FriendInfoPage.vue'
import CommunityPage from '../page/CommunityPage.vue'
import NotePage from '../page/NotePage.vue'
import UserPage from '../page/UserPage.vue'

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
    }, {
      path: '/user',
      name: 'user',
      component: UserPage
    }
  ]
})
