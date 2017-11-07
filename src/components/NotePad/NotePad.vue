<template>
  <div class="right-wrapper">
  <div class="search-wrapper">
    <input placeholder="搜索内容"/>
    <el-button type="default"><i class="el-icon-search"></i></el-button>
  </div>
  <div class="collections-wrapper" :style="rightWrapperStyle">
    <div class="breadcrumb-wrapper">
      <el-breadcrumb separator="/">
        <!--<el-breadcrumb-item :to="{ path: '/' }">笔记本</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>笔记本</el-breadcrumb-item>-->
        <el-breadcrumb-item :to="{ path: '/note/all' }">笔记本</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/note/all' }">笔记本1</el-breadcrumb-item>
        <el-breadcrumb-item>哈哈哈哈 <i class="el-icon-setting"  @click="modifyBookAction=true"></i></el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <editor></editor>

  </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'
  import Editor from '../Editor/Editor.vue'

  export default {
    components: {
      Editor
    },
    data () {
      return {
        mainStyle: {
          minHeight: window.innerHeight - 60 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 110 + 'px'
        },
        rightWrapperStyle: {
          height: window.innerHeight - 20 + 'px'
        },
        editorContent: ''
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
    }
  }
</script>

<style scoped src="./NotePad.css"></style>
