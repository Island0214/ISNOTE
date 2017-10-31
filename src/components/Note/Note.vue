<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="8" :sm="6" :md="6" :lg="6" style="padding: 0; overflow: hidden" id="left-col" :class="{'largeSticky': largeSize && isSticky, 'smallSticky': (!largeSize) && isSticky}">
        <div class="left-wrapper" :style="leftWrapperStyle">
          <div class="inner-border">
          </div>
          <h1>笔 记。</h1>
          <el-button type="default" class="create-button" @click="createBookAction=true">新建笔记本</el-button>
          <div class="nav-wrapper">
            <el-menu default-active="0" class="el-menu-vertical-demo" :style="mainStyle">
              <el-menu-item index="0">所有笔记</el-menu-item>
              <el-menu-item index="1">😶😶😶</el-menu-item>
              <el-menu-item index="2">😐😐😐</el-menu-item>
              <el-menu-item index="3">😢😢😢</el-menu-item>
              <el-menu-item index="4">😊😊😊</el-menu-item>
              <el-menu-item index="5">😍😍😍</el-menu-item>
              <el-menu-item index="6">🙁🙁🙁</el-menu-item>
              <el-menu-item index="7">😤😤😤</el-menu-item>
              <el-menu-item index="8">🙄🙄🙄</el-menu-item>
              <el-menu-item index="9">🤥🤥🤥</el-menu-item>
              <el-menu-item index="10">😡😡😡</el-menu-item>
              <el-menu-item index="11">😷😷😷</el-menu-item>
              <el-menu-item index="12">🤐🤐🤐</el-menu-item>
              <el-menu-item index="13">🙃🙃🙃</el-menu-item>
              <el-menu-item index="14">🤧🤧🤧</el-menu-item>
              <el-menu-item index="15">💩💩💩</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="6" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="18" :md="18" :lg="18" style="padding: 0;">

        <div class="right-wrapper">
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
                <el-breadcrumb-item>所有笔记 <i class="el-icon-setting"  @click="modifyBookAction=true"></i></el-breadcrumb-item>
              </el-breadcrumb>

              <!--<el-button type="default">修改笔记本信息</el-button>-->
            </div>

            <el-row :gutter="10" style="margin: 0">
              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper new-wrapper"  @click="createNewNoteAction=true">
                  <el-button type="default"><i class="el-icon-plus"></i><br><br><br>新建笔记</el-button>
                </div>
              </el-col>

              <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center">
                <div class="collection-wrapper" @mouseenter="showHoverContentView()" @mouseleave="hideHoverContentView()">
                  <div>
                    <h5>娃娃的阿斯顿萨芬鹅气氛啊说</h5>
                    <h6>更新于<br>2017-08-08<br>08:08:08</h6>
                  </div>
                  <div v-show="isHoverProperty">
                    <p><span>笔记内容</span><br>safasfasfsafasfasfafsasfafsasfasfasfasfasfasfasfasfaafsasfasfasfasfasfasfasfasfafsasfasf</p>
                  </div>
                  <!--<p>撒反击哦册那就扫号放假哦啊少女心哦萨芬</p>-->
                  <i class="el-icon-circle-close" @click="confirmCloseAction=true"></i>
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
      </el-col>
      <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">-->
      <!--<el-button type="success"  @click="showModifyPassword = true">修改</el-button>-->
      <!--</el-col>-->
    </el-row>
    <dialogs
      :confirmCloseAction="confirmCloseAction" @closeConfirmClose="closeConfirmClose"
      :modifyBookAction="modifyBookAction" @closeModifyBook="closeModifyBook"
      :createNewNoteAction="createNewNoteAction" @closeCreateNewNote="closeCreateNewNote"
      :createBookAction="createBookAction" @closeCreateBook="closeCreateBook"
    ></dialogs>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Dialogs from './Dialogs'

  export default {
    components: {
      Dialogs
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
        isSticky: false,
        input2: '',
        textarea: '',
        dialogImageUrl: '',
        dialogVisible: false,
        visible2: false,
        isHoverProperty: false,
        confirmCloseAction: false,
        modifyBookAction: false,
        createNewNoteAction: false,
        createBookAction: false
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
      handleIconClick: function () {
      },
      showHoverContentView: function () {
        this.isHoverProperty = true
      },
      hideHoverContentView: function () {
        this.isHoverProperty = false
      },
      closeConfirmClose: function () {
        this.confirmCloseAction = false
      },
      closeModifyBook: function () {
        this.modifyBookAction = false
      },
      closeCreateNewNote: function () {
        this.createNewNoteAction = false
      },
      closeCreateBook: function () {
        this.createBookAction = false
      }
    }
  }
</script>

<style scoped src="./Note.css"></style>
