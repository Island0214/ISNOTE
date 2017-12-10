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
import UserPost from '../components/User/UserPost.vue'
import UserNotes from '../components/User/UserNotes.vue'
import UserNote from '../components/User/UserNote.vue'

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
          path: '',
          component: NoteList
        },
        {
          path: ':id',
          component: NotePad
        }
      ]
    }, {
      path: '/user/:id',
      name: 'user',
      component: UserPage,
      children: [
        {
          path: '',
          component: UserPost
        },
        {
          path: 'notes',
          component: UserNotes
        },
        {
          path: 'note/:id',
          component: UserNote
        }
      ]
    }
  ]
})
