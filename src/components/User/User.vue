<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="8" :sm="8" :md="6" :lg="6" style="padding: 0; overflow: visible;" id="left-col" :class="{'largeSticky': largeSize && isSticky, 'smallSticky': (!largeSize) && isSticky}">
        <div class="left-wrapper" style="padding-bottom: 150%; overflow: visible;">
          <div class="inner-border" style="overflow: visible;">
            <img src="../../assets/icon.png"/>
            <h5>ISLAND</h5>
            <el-tooltip :popper-class="tooltip" class="item" effect="light" content="sasdjjjjjsafasgfhsdhagdagdsdgsdgsdjsasdjjjjjsafasgfhsdhagdagdsdgsdgsdjsasdjjjjjsafasgfhsdhagdagdsdgsdgsdjsasdjjjjjsafasgfhsdhagdagdsdgsdgsdjsasdjjjjjsafasgfhsdhagdagdsdgsdgsdjsasdjjjjjsafasgfhsdhagdagdsdgsdgsdj" placement="bottom" >
              <p>sasdjjjjjsafasgfhsdhagdagdsdgsdgsdj</p>
            </el-tooltip>
            <h6 style="top: 48%;">关注 <span>13</span>  被关注 <span>13</span></h6>
            <!--<p>sasdjjjjjsafasgfhsdhagdagdsdgsdgsdj</p>-->
            <el-button type="default">关注</el-button>

          </div>
          <h1>用 户。</h1>


          <div class="nav-wrapper" style="top: auto; overflow: visible;">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="true">
              <el-menu-item index="2">
                <i class="el-icon-menu">动态</i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu">笔记</i>
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item index="1-1">asd
                </el-menu-item>
                <el-menu-item index="1-2">asd
                </el-menu-item>
                <el-menu-item index="1-3">asd
                </el-menu-item>
                <el-menu-item index="1-4">asd
                </el-menu-item>

              </el-submenu>
            </el-menu>

          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="8" :md="6" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="18" :lg="18" style="padding: 0;">

        <div class="right-wrapper" style="z-index: -1;">
          <div class="search-wrapper">
            <input placeholder="搜索笔记"/>
            <el-button type="default"><i class="el-icon-search"></i></el-button>
          </div>
          <div class="collections-wrapper" :style="rightWrapperStyle">
            <div class="breadcrumb-wrapper">
              <el-breadcrumb separator="/">
                <!--<el-breadcrumb-item :to="{ path: '/' }">笔记本</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item>笔记本</el-breadcrumb-item>-->
                <el-breadcrumb-item :to="{ path: '/note/all' }">笔记本</el-breadcrumb-item>
                <el-breadcrumb-item>所有笔记</el-breadcrumb-item>
              </el-breadcrumb>

              <!--<el-button type="default">修改笔记本信息</el-button>-->
            </div>

            <el-row :gutter="10" style="margin: 0">
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper" @mouseenter="showHoverContentView()" @mouseleave="hideHoverContentView()">
                  <div>
                    <h5>娃娃的阿斯顿萨芬鹅气氛啊说</h5>
                    <h6>更新于<br>2017-08-08<br>08:08:08</h6>
                  </div>
                  <div v-show="isHoverProperty">
                    <p><span>笔记内容</span><br>safasfasfsafasfasfafsasfafsasfasfasfasfasfasfasfasfaafsasfasfasfasfasfasfasfasfafsasfasf</p>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper"></div>
              </el-col>

            </el-row>
          </div>
        </div>

        <div class="right-wrapper" :style="rightWrapperStyle" style="z-index: -1; display: none">
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
          <post></post>
        </div>
      </el-col>
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
          minHeight: window.innerHeight - 310 + 'px'
        },
        rightWrapperStyle: {
          minHeight: window.innerHeight - 20 + 'px'
        },
        tooltip: 'page-login-toolTipClass',
        isSticky: false,
        input2: '',
        textarea: '',
        dialogImageUrl: '',
        dialogVisible: false,
        visible2: false,
        isHoverProperty: false
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
      handleIconClick: function () {
      }
    }
  }
</script>

<style scoped src="./User.css"></style>
<style scoped src="../Note/Note.css"></style>
<style>
  .page-login-toolTipClass {
    /*background-color: #2992FF !important;*/
    width: 15%;
    white-space: normal;
    word-break: break-all;
    font-family: 'Helvetica Neue', 'Arial', 'PingFang TC';
  }
</style>
