<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="8" :sm="6" :md="6" :lg="6" style="padding: 0; overflow: hidden" id="left-col" :class="{'largeSticky': largeSize && isSticky, 'smallSticky': (!largeSize) && isSticky}">
        <div class="left-wrapper" :style="leftWrapperStyle">
          <div class="inner-border">
            <el-input
              placeholder=""
              icon="search"
              v-model="input2"
              :on-icon-click="handleIconClick">
            </el-input>

              <h2 style="top: 15%;">热门笔记</h2>
              <ul>
                <li><a href="#">1. sagascaxsfasd</a></li>
                <li><a href="#">2. xwxzxas</a></li>
                <li><a href="#">3. asfxzcas</a></li>
                <li><a href="#">4. sadasfsaf</a></li>
                <li><a href="#">5. asfgasgdsgsdf</a></li>
              </ul>

              <h2 style="top: 50%;">推荐关注</h2>

              <div class="user-wrapper" style="top: 58%;">
                <img src="../../assets/icon.png"/>
                <a class="name-wrapper">ISLAND</a>
                <p class="info-wrapper">哈哈哈哈哈哈哈哈哈</p>
                <el-button type="default">关<br><br>注</el-button>
              </div>
              <div class="user-wrapper" style="top: 72%;">
                <img src="../../assets/icon.png"/>
                <a class="name-wrapper">ISLAND</a>
                <p class="info-wrapper">哈哈哈哈哈哈哈哈哈</p>
                <el-button type="default">关<br><br>注</el-button>
              </div>
              <div class="user-wrapper" style="top: 86%;">
                <img src="../../assets/icon.png"/>
                <a class="name-wrapper">ISLAND</a>
                <p class="info-wrapper">哈哈哈哈哈哈哈哈哈</p>
                <el-button type="default">关<br><br>注</el-button>
              </div>

          </div>
          <h1>社 区。</h1>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="6" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="18" :md="18" :lg="18" style="padding: 0;">
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
            <el-button type="success">发言</el-button>
          </div>
          <!--<el-upload-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--list-type="picture-card"-->
            <!--:on-preview="handlePictureCardPreview"-->
            <!--:on-remove="handleRemove">-->
            <!--<i class="el-icon-plus"></i>-->
          <!--</el-upload>-->
          <!--<el-dialog v-model="dialogVisible" size="tiny">-->
            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
          <!--</el-dialog>-->
          <div class="split-wrapper"></div>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>



        </div>
      </el-col>
      <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">-->
      <!--<el-button type="success"  @click="showModifyPassword = true">修改</el-button>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
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
//          minHeight: '380px'
        },
        isSticky: false,
        input2: '',
        textarea: '',
        dialogImageUrl: '',
        dialogVisible: false,
        visible2: false
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop'
      })
    },
    method: {
      handleIconClick: function () {
      }
//      handleRemove (file, fileList) {
//        console.log(file, fileList)
//      },
//      handlePictureCardPreview (file) {
//        this.dialogImageUrl = file.url
//        this.dialogVisible = true
//      }
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
//        alert(this.largeSize)
      }
    },
    mounted () {
//      this.$refs.reference // 获取到目标的引用
    },
    bind (el, binding, vnode) {
      vnode.context.$refs[binding.arg].$refs.reference = el
    }
  }
</script>

<style scoped src="./Community.css"></style>
