<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" style="padding: 0; overflow: hidden" id="left-col" :class="{'largeSticky': largeSize && isSticky, 'smallSticky': (!largeSize) && isSticky}">
        <div class="left-wrapper" :style="leftWrapperStyle">
          <div class="inner-border">
          </div>
          <h1>笔 记。</h1>
          <el-button type="default" class="create-button" @click="createBookAction=true" style="width: 80%">新建笔记本</el-button>
          <div class="nav-wrapper">
            <el-menu default-active="0" class="el-menu-vertical-demo">
              <el-menu-item index="0" @click="showAllNotes()">所有笔记</el-menu-item>
              <el-menu-item v-for="notebook in notebookList" :index="notebook.id + ''" @click="pushToNotes(notebook.id)">{{ notebook.notebook_name }}</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="8" :md="8" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="18" style="padding: 0;">

        <router-view ></router-view>
        <!--<note-pad></note-pad>-->

      </el-col>
      <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">-->
      <!--<el-button type="success"  @click="showModifyPassword = true">修改</el-button>-->
      <!--</el-col>-->
    </el-row>
    <dialogs
      :createBookAction="createBookAction" @closeCreateBook="closeCreateBook"
      @createNewBook="createNewBook"
    ></dialogs>

  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import Dialogs from './Dialogs'
  import NotePad from '../NotePad/NotePad'
  import * as types from '../../store/mutation-types'

  export default {
    components: {
      Dialogs,
      NotePad
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
          height: window.innerHeight + 140 + 'px'
        },
        isSticky: false,
        input2: '',
        textarea: '',
        dialogImageUrl: '',
        dialogVisible: false,
        visible2: false,
        createBookAction: false
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop',
        notebookList: 'notebookList'
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
      ...mapMutations({
        'setNotebook': types.SET_NOTEBOOK
      }),
      ...mapActions({
        'getMyNotebooks': 'getMyNotebooks',
        'getMyNotes': 'getMyNotes'
      }),
      handleIconClick: function () {
      },
      closeCreateBook: function () {
        this.createBookAction = false
      },
      createNewBook: function (newNotebook) {
        this.notebookList.push(newNotebook)
      },
      pushToNotes: function (id) {
//        console.log(id)
        this.$router.push('/note/' + id + '/notes')
      },
      showAllNotes: function () {
        console.log('all')
        let allNotebook = {
          id: 0,
          notebook_name: '所有笔记'
        }
        this.setNotebook(allNotebook)
        this.getMyNotes({
          onSuccess: (notes) => {
            console.log(notes)
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          }
        })
      }
    },
    mounted () {
      this.showAllNotes()
      this.getMyNotebooks({
        onSuccess: (notebooks) => {
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
    bind (el, binding, vnode) {
      vnode.context.$refs[binding.arg].$refs.reference = el
    }
  }
</script>

<style scoped src="./Note.css"></style>
