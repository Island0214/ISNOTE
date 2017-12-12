<template>
  <div>
    <el-col :xs="24" :sm="12" :md="12" :lg="8" style="padding: 0; overflow: hidden">
      <div class="user-wrapper">
        <img src="../../assets/icon.png" @click="pushToUser()"/>
        <h4 @click="pushToUser()">{{ this.user.name }}</h4>
        <p>{{ this.user.intro }}</p>
        <el-button type="default" @click="handleFollow">{{ this.user.isFriend }}</el-button>
      </div>
    </el-col>
  </div>
</template>



<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    props: ['user'],
    components: {
    },
    data () {
      return {
        mainStyle: {
          minHeight: window.innerHeight - 60 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 110 + 'px'
        }
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop',
        curUsername: 'curUsername'
      })
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 60 + 'px'
        this.leftWrapperStyle.minHeight = this.mainHeight - 110 + 'px'
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
      }
    },
    methods: {
      ...mapActions({
        'searchAll': 'searchAll',
        'cancelFollowUserAction': 'cancelFollowUserAction',
        'followUserAction': 'followUserAction'
      }),
      pushToUser () {
        if (this.user.name === this.curUsername) {
          this.$router.push('/info')
        } else {
          this.$router.push('/user/' + this.user.name + '/notes')
        }
      },
      handleFollow: function () {
        if (this.user.isFriend === '我的信息') {
          this.$router.push('/info')
          return
        }
        if (this.user.isFriend !== '关注') {
          this.cancelFollowUserAction({
            onSuccess: (data) => {
              this.user.isFriend = '关注'
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
              'user': this.user.name
            }
          })
        } else {
          this.followUserAction({
            onSuccess: (data) => {
              this.user.isFriend = '取消关注'
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
              'user': this.user.name
            }
          })
        }
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped src="./Content.css"></style>

