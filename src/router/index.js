import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/Home.vue'
import UserInfoPage from '../page/UserInfoPage.vue'
import FriendInfoPage from '../page/FriendInfoPage.vue'
import CommunityPage from '../page/CommunityPage.vue'
import NotePage from '../page/NotePage.vue'
import UserPage from '../page/UserPage.vue'
import NotePad from '../components/NotePad/NotePad.vue'
import NoteList from '../components/NoteList/NoteList.vue'

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
      path: '/workbench/:id',
      name: 'workbench',
      component: NotePage,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '',
          component: NoteList
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: ':id',
          component: NotePad
        }
      ]
    }, {
      path: '/user',
      name: 'user',
      component: UserPage
    }
  ]
})
