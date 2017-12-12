<template>
  <div class="right-wrapper" :style="leftWrapperStyle">
    <h1>搜索结果</h1>
    <div @click="backToCommunity">
      <icon name="arrow-circle-left" class="icon"></icon>
    </div>

    <div class="info-wrapper">
      <h3>用户结果<span v-show="userList.length === 3" @click="showAllUsersContent">查看更多 ></span></h3>


      <el-row :gutter="20">
        <div  v-for="user in userList">
          <user :user="user"></user>
        </div>
        <h2 v-show="userList.length === 0">无用户搜索结果...</h2>
      </el-row>
    </div>

    <div class="split-wrapper" style="margin-top: 30px"></div>

    <div class="info-wrapper">
      <h3>笔记结果<span v-show="noteList.length === 3" @click="showAllNotesContent">查看更多 ></span></h3>

      <el-row :gutter="20">
        <!--<div  v-for="note in noteList">-->
          <note  v-for="noteResult in noteList" :noteResult="noteResult"></note>
        <!--<p v-for="noteResult in noteList">{{ noteResult.note_title }}</p>-->
        <!--</div>-->
      </el-row>

      <h2 v-show="noteList.length === 0">无笔记搜索结果...</h2>
    </div>

    <div class="split-wrapper" style="margin-top: 30px"></div>

    <div class="info-wrapper">
      <h3>动态结果<span v-show="postList.length === 5" @click="showAllPostsContent">查看更多 ></span></h3>

      <post v-for="singlePost in postList" :singlePost="singlePost" :showDisable=true></post>

      <h2 v-show="postList.length === 0">无动态搜索结果...</h2>
    </div>

    <!--<post v-for="singlePost in postList" :singlePost="singlePost" :showDisable=true></post>-->
  </div>
</template>


<script>
  import {mapGetters, mapActions} from 'vuex'
  import Post from '../Post/Post.vue'
  import User from '../SearchContent/User.vue'
  import Note from '../SearchContent/Note.vue'

  export default {
    components: {
      Post,
      User,
      Note
    },
    data () {
      return {
        mainStyle: {
          minHeight: window.innerHeight - 60 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 110 + 'px',
          display: 'inline-block'
        },
        userList: [],
        postList: [],
        noteList: []
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
      },
      searchContent: function () {
        console.log('saf')
        this.searchAllAction()
      }
    },
    methods: {
      ...mapActions({
        'searchAll': 'searchAll'
      }),
      pushToNote (user, id) {
        console.log(user + '/2/' + id)
        if (this.curUsername !== user) {
          this.$router.push('/user/' + user + '/note/' + id)
        } else {
          this.$router.push('/workbench/0/' + id)
        }
      },
      pushToUser (user) {
        if (user === this.curUsername) {
          this.$router.push('/info')
        } else {
          this.$router.push('/user/' + user)
        }
      },
      searchAllAction () {
        this.searchAll({
          onSuccess: (data) => {
//            console.log(data)
            this.userList = JSON.parse(JSON.stringify(data[0]))
            this.noteList = JSON.parse(JSON.stringify(data[1]))
            this.postList = JSON.parse(JSON.stringify(data[2]))
            console.log(this.noteList)
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          },
          body: {
            contain: this.searchContent
          }
        })
      },
      showAllUsersContent () {
        this.$router.push('/community/search/allUsers')
      },
      showAllNotesContent () {
        this.$router.push('/community/search/allNotes')
      },
      showAllPostsContent () {
        this.$router.push('/community/search/allPosts')
      },
      backToCommunity () {
        this.$router.push('/community/posts')
      }
    },
    mounted: function () {
      this.searchAllAction()
    }
  }
</script>

<style scoped src="../Community/Community.css"></style>
<style scoped src="./Content.css"></style>

