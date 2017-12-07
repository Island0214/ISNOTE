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
          <el-breadcrumb-item>{{ this.singleNotebook.notebook_name }} <i class="el-icon-setting"  @click="modifyBookAction=true" v-show="singleNotebook.id !== 0"></i></el-breadcrumb-item>
        </el-breadcrumb>

        <!--<el-button type="default">修改笔记本信息</el-button>-->
      </div>

      <el-row :gutter="10" style="margin: 0">
        <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center" v-show="singleNotebook.id !== 0">
          <div class="collection-wrapper new-wrapper"  @click="createNewNoteAction=true">
            <el-button type="default"><i class="el-icon-plus"></i><br><br><br>新建笔记</el-button>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center" v-for="note in noteList">
          <div class="collection-wrapper" @mouseenter="showHoverContentView()" @mouseleave="hideHoverContentView()">
            <div @click="pushToNoteContent(note.id)">
              <h5>{{ note.note_title }}</h5>
              <p>{{ note.note_body.replace(/<\/?.+?>/g, '').replace(/ /g, '') }}</p>
              <h6 style="font-size: 1.2vmin">更新于<br>{{ note.updated_at }}</h6>
            </div>
            <!--<div v-show="isHoverProperty">-->
              <!--<p><span>笔记内容</span><br>{{ note.note_body }}</p>-->
            <!--</div>-->
            <div @click="showConfirm(note.id)" v-show="singleNotebook.id !== 0">
              <i class="el-icon-circle-close" ></i>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <dialogs
      :confirmCloseAction="confirmCloseAction" @closeConfirmClose="closeConfirmClose"
      :modifyBookAction="modifyBookAction" @closeModifyBook="closeModifyBook"
      :createNewNoteAction="createNewNoteAction" @closeCreateNewNote="closeCreateNewNote"
      @modifyNotebookAction="modifyNotebookAction"
      @createNewNote="createNewNote"
      :noteID="noteID"
      :notebookName="singleNotebook.notebook_name"
      :notebookAuthority="singleNotebook.authority"
    ></dialogs>
  </div>
</template>


<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import Dialogs from '../Note/Dialogs'
  import NotePad from '../NotePad/NotePad'
  import * as types from '../../store/mutation-types'

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
          minHeight: window.innerHeight + 140 + 'px'
        },
        name: '',
        noteID: ''
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop',
        singleNotebook: 'singleNotebook',
        noteList: 'noteList'
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
      }
    },
    methods: {
      ...mapMutations({
        'setNotebook': types.SET_NOTEBOOK
      }),
      ...mapActions({
        'getNotebookById': 'getNotebookById',
        'modifyNotebook': 'modifyNotebook',
        'getMyNotes': 'getMyNotes',
        'getNotesByNotebook': 'getNotesByNotebook'
      }),
      closeModifyBook: function () {
        this.modifyBookAction = false
      },
      closeCreateNewNote: function () {
        this.createNewNoteAction = false
      },
      showConfirm: function (id) {
        this.confirmCloseAction = true
        this.noteID = id
      },
      closeConfirmClose: function () {
        this.confirmCloseAction = false
      },
      showHoverContentView: function () {
        this.isHoverProperty = true
      },
      hideHoverContentView: function () {
        this.isHoverProperty = false
      },
      createNewNote: function (note) {
        this.noteList.push(note)
        this.$router.push('/workbench/' + 0)
        this.$router.push('/workbench/' + this.singleNotebook.id)
      },
      modifyNotebookAction: function (newBookInfo) {
        newBookInfo['id'] = this.singleNotebook.id
        this.modifyNotebook({
          onSuccess: () => {
            this.$message({
              showClose: true,
              message: '修改笔记本设置成功！',
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
          body: newBookInfo
        })
      },
      pushToNoteContent: function (id) {
        console.log('/workbench/' + this.singleNotebook.id + '/note/' + id)
        this.$router.push('/workbench/' + this.singleNotebook.id + '/' + id)
      }
    }
  }
</script>

<style scoped src="./NoteList.css"></style>

