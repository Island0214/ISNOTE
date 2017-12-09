<template>
  <div>
    <div id="main-part" :style="mainStyle">
      <div class="left-wrapper" :style="contentStyle">
        <div class="title-wrapper">
          <h1>好<br><br>友<br><br>信<br><br>息<br>。</h1>
        </div>
        <div class="inner-wrapper">
          <el-menu default-active="1" class="el-menu-vertical-demo left-nav" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapse">
            <el-menu-item index="1" @click="handleNavClick">
              <i class="el-icon-menu i-button"></i>
              <span slot="title">关 注 我 的 人</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleNavClick">
              <i class="el-icon-setting i-button"></i>
              <span slot="title">我 关 注 的 人</span>
            </el-menu-item>
          </el-menu>
        </div>

      </div>
      <div class="right-wrapper" :style="contentStyle">
        <div class="inner-wrapper">
          <!--<input class="file_input" type="file" multiple id="avc"/>-->
          <!--<div class="upload_box">-->
          <!--点我上传图片哦-->
          <!--</div>-->
          <h3 style="position: relative; text-align: left; margin-bottom: 0; left: 5%;" v-if="follows">共有 <span style="color: #ff94a3">{{ followList.length }}</span> 人关注我</h3>
          <h3 style="position: relative; text-align: left; margin-bottom: 0; left: 5%;" v-else>共关注 <span style="color: #ff94a3">{{ followList.length }}</span> 人</h3>
          <div class="info-wrapper" style="position:relative;">
            <div v-for="user in followList">
              <div class="friend-wrapper">
                <el-row :gutter="10" style="margin: 0">
                  <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                    <img src="../../assets/icon.png">
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="13" :lg="14" style="padding: 0; text-align: left;">
                    <a href="#">{{ user.name }}</a>
                    <p>{{ user.intro }}</p>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="7" :lg="6" style="padding: 0">
                    <el-button type="success" @click="handleFollowStatus(user)">{{ user.isFriend }}</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  //  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        isCollapse: false,
        imageUrl: require('../../assets/icon.png'),
        mainStyle: {
          height: window.innerHeight + 'px'
        },
        contentStyle: {
          height: window.innerHeight - 100 + 'px'
        },
        follows: true,
        followList: []
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight'
      })
    },
    methods: {
//      ...mapMutations({
//      }),
//      handleSelect (key, keyPath) {
//        console.log(key, keyPath)
//      }
      ...mapActions({
        'getMyFollowers': 'getMyFollowers',
        'getMyFollowing': 'getMyFollowing',
        'followUserAction': 'followUserAction',
        'cancelFollowUserAction': 'cancelFollowUserAction'
      }),
      handleNavClick (key, keyPath) {
        if (key.index === '1') {
          this.follows = true
        }
        if (key.index === '2') {
          this.follows = false
        }
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      getMyFollowersAction: function () {
        this.getMyFollowers({
          onSuccess: (data) => {
            console.log(data)
            this.followList = JSON.parse(JSON.stringify(data))
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          }
        })
      },
      getMyFollowingAction: function () {
        this.getMyFollowing({
          onSuccess: (data) => {
            console.log(data)
            this.followList = JSON.parse(JSON.stringify(data))
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          }
        })
      },
      handleFollowStatus: function (user) {
        if (user.isFriend === '关注') {
          this.followUserAction({
            onSuccess: (data) => {
              this.followList[this.followList.indexOf(user)].isFriend = '互相关注'
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
              'user': user.name
            }
          })
        }
        if (user.isFriend === '取消关注' || user.isFriend === '互相关注') {
          this.cancelFollowUserAction({
            onSuccess: (data) => {
              this.followList.splice(this.followList.indexOf(user), 1)
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
              'user': user.name
            }
          })
        }
      }
    },
    watch: {
      largeSize: function () {
        this.isCollapse = !this.largeSize
      },
      mainHeight: function () {
        this.mainStyle.height = this.mainHeight + 'px'
        this.contentStyle.height = this.mainHeight - 100 + 'px'
      },
      follows: function () {
        if (this.follows) {
          this.getMyFollowersAction()
        } else {
          this.getMyFollowingAction()
        }
      }
    },
    mounted () {
      this.getMyFollowersAction()
    }
  }
</script>
<style scoped src="./info.css"></style>
<style scoped src="./friend.css"></style>
