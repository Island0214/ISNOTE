<template>
  <div class="popover-wrapper" v-if="showDisable" @mouseover="sendEnterPopoverView" @mouseleave="sendHidePopoverView">
    <div class="up-wrapper"></div>
    <div class="icon-wrapper">
      <img :src="iconImage" style="border-radius: 50px"/>
    </div>
    <div class="info-wrapper">
      <h3>{{ userInfo.name }}</h3>
      <p>{{ userInfo.intro }}</p>
    </div>
    <div class="button-wrapper" v-show="!isSelf">
      <el-button type="default" @click="handleFollow">{{ userInfo.isFriend }}</el-button>
    </div>
    <div class="follow-wrapper">
      <p>关注</p>
      <p style="color: #ff94a3">{{ userInfo.following_count }}</p>
      <p>被关注</p>
      <p style="color: #ff94a3">{{ userInfo.follower_count }}</p>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    props: ['user', 'showDisable'],
    data () {
      return {
        showPopover1: true,
        userInfo: '',
        isSelf: false,
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
        'getFriendByName': 'getFriendByName',
        'cancelFollowUserAction': 'cancelFollowUserAction',
        'followUserAction': 'followUserAction'
      }),
      sendHidePopoverView: function () {
        this.$emit('hidePopoverEvent')
      },
      sendEnterPopoverView: function () {
        this.$emit('enterPopoverEvent')
      },
      handleFollow: function () {
        if (this.userInfo.isFriend !== '关注') {
          this.cancelFollowUserAction({
            onSuccess: (data) => {
              this.getFriend()
              this.$message({
                showClose: true,
                message: '取消关注成功！',
                type: 'success'
              })
            },
            onError: (error) => {
              this.$message({
                showClose: true,
                message: error,
                type: 'error'
              })
            },
            body: {
              'user': this.userInfo.name
            }
          })
        } else {
          this.followUserAction({
            onSuccess: (data) => {
              this.getFriend()
              this.$message({
                showClose: true,
                message: '关注成功！',
                type: 'success'
              })
            },
            onError: (error) => {
              this.$message({
                showClose: true,
                message: error,
                type: 'error'
              })
            },
            body: {
              'user': this.userInfo.name
            }
          })
        }
      },
      getFriend: function () {
        this.getFriendByName({
          onSuccess: (data) => {
            this.userInfo = JSON.parse(JSON.stringify(data.friend))
            this.iconUser = JSON.parse(JSON.stringify(data.friend))
//          console.log(this.userInfo)
          },
          onError: () => {
          },
          body: {
            user: this.user
          }
        })
      }
    },
    mounted () {
//      console.log(this.user)
      if (this.curUsername === this.user) {
        this.isSelf = true
      }
      this.getFriend()
    }
  }
</script>

<style scoped src="./Popover.css"></style>

