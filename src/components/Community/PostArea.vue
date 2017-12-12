<template>
  <div class="right-wrapper" :style="leftWrapperStyle">
    <h1>关注人动态</h1>
    <div class="post-wrapper">
      <h2>说句话吧</h2>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 4}"
        placeholder="说 话。"
        v-model="textarea">
      </el-input>
      <br>
      <el-button type="success" @click="sendNewPost">发言</el-button>
    </div>

    <div class="split-wrapper"></div>
    <post v-for="singlePost in postList" :singlePost="singlePost" :showDisable=true></post>
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
          minHeight: window.innerHeight - 110 + 'px'
        },
        isSticky: false,
        input2: '',
        textarea: '',
        dialogImageUrl: '',
        dialogVisible: false,
        visible2: false,
        hotNotes: {},
        recommendUsers: [],
        positions: [
          {
            top: '58%'
          },
          {
            top: '72%'
          },
          {
            top: '86%'
          }
        ],
        postList: []
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
        'getHotNotes': 'getHotNotes',
        'getOneRecommendation': 'getOneRecommendation',
        'followUserAction': 'followUserAction',
        'cancelFollowUserAction': 'cancelFollowUserAction',
        'getPostsOfMyFollowing': 'getPostsOfMyFollowing',
        'sendPost': 'sendPost'
      }),
      pushToNote (user, id) {
        console.log(user + '/2/' + id)
        if (this.curUsername !== user) {
          this.$router.push('/user/' + user + '/note/' + id)
        } else {
          this.$router.push('/workbench/0/' + id)
        }
      },
      sendNewPost () {
        this.sendPost({
          onSuccess: (data) => {
//            console.log(data)
            this.postList.shift()
            this.postList.unshift(data.post)
//            console.log(this.postList)
            this.textarea = ''
            this.$message({
              showClose: true,
              message: '发送成功！',
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
            'content': this.textarea
          }
        })
      },
      pushToUser (user) {
        if (user === this.curUsername) {
          this.$router.push('/info')
        } else {
          this.$router.push('/user/' + user)
        }
      }
    },
    mounted: function () {
      this.getPostsOfMyFollowing({
        onSuccess: (data) => {
//          console.log(data)
          this.postList = JSON.parse(JSON.stringify(data))
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        }
      })
    }
  }
</script>

<style scoped src="./Community.css"></style>
