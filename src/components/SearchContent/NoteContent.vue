<template>
  <div class="right-wrapper" :style="leftWrapperStyle">
    <h1>笔记搜索结果</h1>
    <div @click="backToSearch">
      <icon name="arrow-circle-left" class="icon"></icon>
    </div>

    <div class="info-wrapper">
      <note  v-for="noteResult in noteList" :noteResult="noteResult"></note>
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
      }
    },
    methods: {
      ...mapActions({
        'getNoteSearchResult': 'getNoteSearchResult'
      }),
      backToSearch () {
        console.log('sad')
        this.$router.push('/community/search')
      }
    },
    mounted: function () {
      this.getNoteSearchResult({
        onSuccess: (data) => {
//            console.log(data)
          this.noteList = JSON.parse(JSON.stringify(data))
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
    }
  }
</script>

<style scoped src="../Community/Community.css"></style>
<style scoped src="./Content.css"></style>

