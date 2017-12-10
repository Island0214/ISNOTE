<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" style="padding: 0; overflow: visible;" id="left-col" :class="{'largeSticky': largeSize && isSticky, 'smallSticky': (!largeSize) && isSticky}">
        <div class="left-wrapper" style="padding-bottom: 150%; overflow: visible;">
          <div class="inner-border" style="overflow: visible;">
            <img src="../../assets/icon.png"/>
            <h5>{{ userInfo.name }}</h5>
            <el-tooltip :popper-class="tooltip" class="item" effect="light" :content="userInfo.intro" placement="bottom" >
              <p>{{ userInfo.intro }}</p>
            </el-tooltip>
            <h6 style="top: 48%;">关注 <span>{{ userInfo.following_count }}</span>  被关注 <span>{{ userInfo.follower_count }}</span></h6>
            <el-button type="default" @click="handleFollow">{{ userInfo.isFriend }}</el-button>

          </div>
          <h1>用 户。</h1>


          <div class="nav-wrapper" style="top: auto; overflow: visible;">
            <el-menu default-active="2" class="el-menu-vertical-demo left-nav" @open="handleOpen" @close="handleClose" :collapse="false">
              <el-menu-item index="2" @click="showPosts">
                <i class="el-icon-menu">动态</i>
              </el-menu-item>
              <el-menu-item index="1" @click="showNotes">
                <template slot="title">
                  <i class="el-icon-menu">笔记</i>
                </template>
              </el-menu-item>
            </el-menu>

          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="8" :md="8" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="18" style="padding: 0;">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Post from '../Post/Post.vue'

  export default {
    components: {
      Post
    },
    data () {
      return {
        mainStyle: {
          minHeight: window.innerHeight - 60 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 310 + 'px'
        },
        rightWrapperStyle: {
          minHeight: window.innerHeight - 20 + 'px'
        },
        tooltip: 'page-login-toolTipClass',
        isSticky: false,
        input2: '',
        textarea: '',
        dialogImageUrl: '',
        dialogVisible: false,
        visible2: false,
        userInfo: '',
        user: ''
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop'
      })
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 60 + 'px'
        this.leftWrapperStyle.minHeight = this.mainHeight - 310 + 'px'
        this.rightWrapperStyle.height = this.mainHeight - 20 + 'px'
//      this.contentStyle.height = this.mainHeight - 100 + 'px'
      },
      scrollTop: function () {
        if (this.scrollTop > 80) {
          this.isSticky = true
        } else {
          this.isSticky = false
        }
      },
      largeSize: function () {
//        alert(this.largeSize)
      }
    },
    methods: {
      ...mapActions({
        'getFriendByName': 'getFriendByName',
        'cancelFollowUserAction': 'cancelFollowUserAction',
        'followUserAction': 'followUserAction'
      }),
      handleIconClick: function () {
      },
      handleOpen: function () {
      },
      handleClose: function () {
      },
      open: function () {
      },
      close: function () {
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
//          console.log(this.userInfo)
          },
          onError: () => {
          },
          body: {
            user: this.user
          }
        })
      },
      showNotes: function () {
        this.$router.push('/user/' + this.user + '/notes')
      },
      showPosts: function () {
        this.$router.push('/user/' + this.user)
      }
    },
    mounted () {
      console.log(this.$router.history.current.params.id)
      this.user = this.$router.history.current.params.id
      this.getFriend()
    }
  }
</script>

<style scoped src="./User.css"></style>
<style scoped src="../NoteList/NoteList.css"></style>
<style scoped src="../Note/Note.css"></style>
<style>
  .page-login-toolTipClass {
    /*background-color: #2992FF !important;*/
    width: 15%;
    white-space: normal;
    word-break: break-all;
    font-family: 'Helvetica Neue', 'Arial', 'PingFang TC';
  }
</style>
