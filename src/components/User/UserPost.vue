<template>
  <div class="right-wrapper" style="z-index: 1;">
      <!--<input placeholder="搜索笔记"/>-->

    <div class="collections-wrapper" :style="rightWrapperStyle">
      <h1 style="position: relative; float: right; right: 5%; left: 0;">Ta的动态</h1>

      <h3 v-if="postList.length === 0" style="width: 100%; text-align: center; position:absolute; top: 45%; color: #ff94a3">该用户暂无动态...</h3>
      <post v-for="singlePost in postList" :singlePost="singlePost" :showDisable=false></post>
    </div>
  </div>
  <!--<div class="right-wrapper" :style="rightWrapperStyle" style="z-index: -1; display: none">-->
<!---->
    <!--<post v-for="singlePost in postList" :singlePost="singlePost" :showDisable=false></post>-->
<!---->
  <!--</div>-->

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
        this.leftWrapperStyle.minHeight = this.mainHeight - 310 + 'px'
        this.rightWrapperStyle.height = this.mainHeight - 20 + 'px'
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
        'getPostByUser': 'getPostByUser'
      })
    },
    mounted () {
      this.user = this.$router.history.current.params.id

      this.getPostByUser({
        onSuccess: (data) => {
          this.postList = JSON.parse(JSON.stringify(data))
          console.log(this.postList)
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        },
        body: {
          'user': this.user
        }
      })
    }
  }
</script>

<style scoped src="./User.css"></style>
<style scoped src="../NoteList/NoteList.css"></style>
<style scoped src="../Note/Note.css"></style>
