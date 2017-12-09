<template>
  <div class="info-wrapper">
    <div class="icon-wrapper">
      <img src="../../assets/icon.png" style="cursor: pointer" @mouseover="showPopoverView"/>
      <!--<div class="popover-wrapper"></div>-->
      <popover v-if="showPopover" @hidePopoverEvent="hidePopoverView" @enterPopoverEvent="enterPopoverView"></popover>

    </div>
    <div class="content-wrapper" v-show="singlePost.type === '4' || singlePost.type === 4">
      <a href="#" @mouseover="showPopoverView" @click="toUser">{{ singlePost.user }}</a>
      <p>说：</p>
      <p style="float: right">{{ singlePost.updated_at }}</p>
      <div class="inner-wrapper">
        <p>{{ singlePost.content }}</p>
      </div>

    </div>
    <div class="content-wrapper" v-show="singlePost.type !== '4' && singlePost.type !== 4">
      <a href="#"  @mouseover="showPopoverView" @click="toUser">{{ singlePost.user }}</a>
      <p>{{ noteType[singlePost.type - 1] }}</p>
      <p style="float: right">{{ singlePost.updated_at }}</p>
      <div class="inner-wrapper" style="cursor: pointer">
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
  import {mapActions} from 'vuex'

  export default {
    props: ['singlePost'],
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
        this.$router.push('/user')
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
