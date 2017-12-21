<template>
  <div class="info-wrapper">
    <div class="icon-wrapper">
      <img :src="iconImage" :class="{ cursorClass: showDisable }" @mouseover="showPopoverView" @click="toUser" style="border-radius: 50px"/>
      <!--<div class="popover-wrapper"></div>-->
      <popover v-if="showPopover" @hidePopoverEvent="hidePopoverView" @enterPopoverEvent="enterPopoverView" :user="singlePost.user" :showDisable="showDisable"></popover>

    </div>
    <div class="content-wrapper" v-show="singlePost.type === '4' || singlePost.type === 4">
      <p style="color: #5F5F5F; font-size: 2vmin; font-weight: 600; letter-spacing: 0.2vmin; margin-top: 0" :class="{ cursorClass: showDisable }" @mouseover="showPopoverView" @click="toUser">{{ singlePost.user }}</p>
      <p>说：</p>
      <p style="float: right">{{ singlePost.updated_at }}</p>
      <div class="inner-wrapper">
        <p>{{ singlePost.content }}</p>
      </div>

    </div>
    <div class="content-wrapper" v-show="singlePost.type !== '4' && singlePost.type !== 4">
      <p style="color: #5F5F5F; font-size: 2vmin; font-weight: 600; letter-spacing: 0.2vmin; margin-top: 0" :class="{ cursorClass: showDisable }"  @mouseover="showPopoverView" @click="toUser">{{ singlePost.user }}</p>
      <p>{{ noteType[singlePost.type - 1] }}</p>
      <p style="float: right">{{ singlePost.updated_at }}</p>
      <div class="inner-wrapper" style="cursor: pointer" @click="toNote(singlePost.user, singlePost.note_id)">
        <h3 style="color: #ff94a3">{{ noteInfo.note_title }}</h3>
        <p v-show="noteInfo.note_body != ''">{{ noteContent }}</p>
      </div>
      <div v-show="singlePost.content != null">
        <p>并说：</p>
        <div class="inner-wrapper">
          <p>{{ singlePost.content }}</p>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import Popover from '../Popover/Popover.vue'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    props: ['singlePost', 'showDisable'],
    components: {
      Popover
    },
    data () {
      return {
        showPopover: false,
        enterPopover: false,
        noteInfo: '',
        noteType: ['分享了笔记:', '创建了笔记:', '修改了笔记:'],
        noteContent: '',
        iconUser: {}
      }
    },
    computed: {
      ...mapGetters({
        'curUsername': 'curUsername'
      }),
      iconImage: function () {
//        console.log('sad')
//        console.log('photoname:' + this.iconUser.icon)
//        console.log('iconUser:')
//        console.log(this.iconUser)
        if (this.iconUser.icon !== undefined) {
          let name = this.iconUser.icon.split('/')[this.iconUser.icon.split('/').length - 1]
          console.log(name)

          return require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/local/' + name)
        } else {
          return require('../../assets/icon.png')
        }
      }
    },
    methods: {
      ...mapActions({
        'getNoteById': 'getNoteById',
        'getFriendByName': 'getFriendByName'
      }),
      showPopoverView: function () {
        this.showPopover = true
        window.setTimeout(this.autoClose, 1000)
      },
      hidePopoverView: function () {
        this.showPopover = false
        this.enterPopover = false
      },
      autoClose: function () {
        if (!this.enterPopover) {
          this.hidePopoverView()
        }
      },
      enterPopoverView: function () {
        this.enterPopover = true
      },
      toUser: function () {
//        console.log('/user/' + this.singlePost.user)
        if (this.singlePost.user === this.curUsername) {
          this.$router.push('/info')
        } else {
//          console.log('/user/' + this.singlePost.user)
//          alert('asdfasf')
          this.$router.push('/user/' + this.singlePost.user + '/notes')
        }
      },
      toNote: function (user, id) {
        if (this.curUsername !== user) {
          this.$router.push('/user/' + user + '/note/' + id)
        } else {
          this.$router.push('/workbench/0/' + id)
        }
      }
    },
    mounted () {
      if (this.singlePost.note_id !== 0) {
        this.getNoteById({
          onSuccess: (data) => {
            this.noteInfo = JSON.parse(JSON.stringify(data))
            this.noteContent = this.noteInfo.note_body.replace(/<\/?.+?>/g, '').replace(/ /g, '')
          },
          onError: () => {
          },
          body: {
            id: this.singlePost.note_id
          }
        })
      }

      this.getFriendByName({
        onSuccess: (user) => {
          this.iconUser = JSON.parse(JSON.stringify(user.friend))
          console.log('iconnnnnnnnnnnnnnnnnnnnnnnnnnn')
          console.log(this.iconUser)
//          let name = user.icon
//          this.imageUrl = require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/local/' + name)
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        },
        body: {
          user: this.singlePost.user
        }
      })
//      thi
    }
  }
</script>

<style scoped src="./Post.css"></style>
<style>
  .cursorClass {
    cursor: pointer;
  }
</style>
