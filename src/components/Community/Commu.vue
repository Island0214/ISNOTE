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
              :on-icon-click="searchAllContents"
            >
            </el-input>

            <h2 style="top: 15%;">热门笔记</h2>
            <ol type="1">
              <li v-for="note in hotNotes">
                <p @click="pushToNote(note.user, note.id)">{{ note.note_title }}</p>
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
                <img src="../../assets/icon.png" @click="pushToUser(user.name)"/>
                <a class="name-wrapper" @click="pushToUser(user.name)">{{ user.name }}</a>
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
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import * as types from '../../store/mutation-types'

  export default {
    components: {
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
        curUsername: 'curUsername',
        searchContent: 'searchContent'
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
      ...mapMutations({
        setSearch: types.SET_SEARCH
      }),
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
      },
      searchAllContents () {
        this.setSearch(this.input2)
        if (this.input2.length > 0) {
          this.$router.push('/community/search')
        } else {
          this.$router.push('/community/posts')
        }
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
    }
  }
</script>

<style scoped src="./Community.css"></style>
