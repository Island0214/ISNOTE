<template>
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
          <el-breadcrumb-item>笔记本</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.singleNotebook.notebook_name }} <i class="el-icon-setting"  @click="modifyBookAction=true"></i></el-breadcrumb-item>
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
            <i class="el-icon-circle-close" @click="confirmCloseAction=true"></i>
          </div>
        </el-col>
      </el-row>
    </div>

    <dialogs
      :confirmCloseAction="confirmCloseAction" @closeConfirmClose="closeConfirmClose"
      :modifyBookAction="modifyBookAction" @closeModifyBook="closeModifyBook"
      :createNewNoteAction="createNewNoteAction" @closeCreateNewNote="closeCreateNewNote"
    ></dialogs>
  </div>
</template>


<script>
  import {mapGetters, mapActions} from 'vuex'
  import Dialogs from '../Note/Dialogs'
  import NotePad from '../NotePad/NotePad'

  export default {
    components: {
      Dialogs,
      NotePad
    },
    data () {
      return {
        isHoverProperty: false,
        confirmCloseAction: false,
        modifyBookAction: false,
        createNewNoteAction: false,
        mainStyle: {
          minHeight: window.innerHeight - 60 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 110 + 'px'
        },
        rightWrapperStyle: {
          height: window.innerHeight + 140 + 'px'
        },
        name: ''
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop',
        singleNotebook: 'singleNotebook'
      })
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 60 + 'px'
        this.leftWrapperStyle.minHeight = this.mainHeight - 110 + 'px'
        this.rightWrapperStyle.height = this.mainHeight + 140 + 'px'
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
      ...mapActions({
        'getNotebookById': 'getNotebookById'
      }),
      closeModifyBook: function () {
        this.modifyBookAction = false
      },
      closeCreateNewNote: function () {
        this.createNewNoteAction = false
      },
      closeConfirmClose: function () {
        this.confirmCloseAction = false
      },
      showHoverContentView: function () {
        this.isHoverProperty = true
      },
      hideHoverContentView: function () {
        this.isHoverProperty = false
      }
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate (to, from, next) {
//      alert(to.params.id)
      if (to.params.id === 0) {
      } else {
        this.getNotebookById({
          onSuccess: (notebook) => {
//          this.notebook = notebook
//          this.name = notebook.notebook_name
//          console.log(notebook.id)
            console.log(this.singleNotebook)
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          },
          body: {
            id: to.params.id
          }
        })
      }
    }
  }
</script>

<style scoped src="./NoteList.css"></style>

