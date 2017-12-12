<template>
  <div class="info-wrapper">
    <div class="icon-wrapper">
      <img src="../../assets/icon.png" :class="{ cursorClass: showDisable }" @mouseover="showPopoverView" @click="toUser"/>
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
        noteContent: ''
      }
    },
    computed: {
      ...mapGetters({
        'curUsername': 'curUsername'
      })
    },
    methods: {
      ...mapActions({
        'getNoteById': 'getNoteById'
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
          this.$router.push('/user/' + this.singlePost.user)
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
    }
  }
</script>

<style scoped src="./Post.css"></style>
<style>
  .cursorClass {
    cursor: pointer;
  }
</style>
