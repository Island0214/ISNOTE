<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" style="padding: 0; overflow: hidden" id="left-col" :class="{'largeSticky': largeSize && isSticky, 'smallSticky': (!largeSize) && isSticky}">
        <div class="left-wrapper" :style="leftWrapperStyle">
          <div class="inner-border">
            <el-input
              placeholder=""
              icon="search"
              v-model="input2"
            >
              <!--:on-icon-click=""-->
            </el-input>

            <h2 style="top: 15%;">热门笔记</h2>
            <ol type="1">
              <li v-for="note in hotNotes">
                <a href="#" @click="pushToNote(note.user, note.id)">{{ note.note_title }}</a>
              </li>
            <!--<li><a href="#">1. sagascaxsfasd</a></li>-->
            <!--<li><a href="#">2. xwxzxas</a></li>-->
            <!--<li><a href="#">3. asfxzcas</a></li>-->
            <!--<li><a href="#">4. sadasfsaf</a></li>-->
            <!--<li><a href="#">5. asfgasgdsgsdf</a></li>-->
            </ol>

            <h2 style="top: 50%;">推荐关注</h2>

            <div v-for="user in recommendUsers">
              <div class="user-wrapper" :style="positions[recommendUsers.indexOf(user)]">
                <img src="../../assets/icon.png"/>
                <a class="name-wrapper">{{ user.name }}</a>
                <p class="info-wrapper">{{ user.intro }}</p>
                <el-button type="default" @click="followUser(user)">关<br><br>注</el-button>
              </div>
            </div>



          </div>
          <h1>社 区。</h1>
        </div>
      </el-col>

      <el-col :xs="8" :sm="8" :md="8" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="18" style="padding: 0;">
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
        scrollTop: 'scrollTop'
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
      },
      followUser (user) {
        this.followUserAction({
          onSuccess: (data) => {
            this.recommendUsers.splice(this.recommendUsers.indexOf(user), 1)
            this.getRecommendation()
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
      },
      sendNewPost () {
        this.sendPost({
          onSuccess: (data) => {
//            console.log(data)
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
      },
      getRecommendation () {
        this.getOneRecommendation({
          onSuccess: (data) => {
//            console.log(this.recommendUsers.indexOf(data))
            let alreadyIn = false
            for (let i = 0; i < this.recommendUsers.length; i++) {
              if (this.recommendUsers[i].name === data.name) {
                alreadyIn = true
                break
              }
            }
            if (!alreadyIn) {
              this.recommendUsers.push(data)
            } else {
              this.getRecommendation()
            }
//          this.hotNotes = JSON.parse(JSON.stringify(data))
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
    },
    mounted: function () {
      this.getHotNotes({
        onSuccess: (data) => {
          this.hotNotes = JSON.parse(JSON.stringify(data))
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        }
      })

      for (let i = 0; i < 3; i++) {
        this.getRecommendation()
      }

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
