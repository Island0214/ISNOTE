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
              <el-menu-item index="0" @click="pushToNotes(0)">所有笔记</el-menu-item>
              <el-menu-item v-for="notebook in notebookList" :index="notebook.id + ''" @click="pushToNotes(notebook.id)">{{ notebook.notebook_name }}</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="8" :md="8" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="18" style="padding: 0;">

        <router-view @getAllNotebooks="getAllNotebooks"></router-view>
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
      '$route' (to, from) {
//        console.log(to)
        console.log('nav-change: ' + to.params.id)
        if (to.params.id === 0 || to.params.id === '0') {
          this.showAllNotes()
        } else {
          this.getNotebookById({
            onSuccess: (notebook) => {
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

          this.getNotesByNotebook({
            onSuccess: (notebook) => {
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
    },
    methods: {
      ...mapMutations({
        'setNotebook': types.SET_NOTEBOOK
      }),
      ...mapActions({
        'getMyNotebooks': 'getMyNotebooks',
        'getMyNotes': 'getMyNotes',
        'getNotebookById': 'getNotebookById',
        'getNotesByNotebook': 'getNotesByNotebook'
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
        this.$router.push('/workbench/' + id)
      },
      showAllNotes: function () {
//        console.log('all')
//        this.pushToNotes(0)
        let allNotebook = {
          id: 0,
          notebook_name: '所有笔记',
          authority: '只有我'
        }
        this.setNotebook({allNotebook})
//        this.singleNotebook = allNotebook
        this.getMyNotes({
          onSuccess: (notes) => {
            console.log('getAll')
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
      getAllNotebooks: function () {
        this.getMyNotebooks({
          onSuccess: (notebooks) => {
//            console.log(notebooks)
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
//      if (this.singleNotebook !== null) {
//      }
      this.getAllNotebooks()
      this.showAllNotes()
    },
    bind (el, binding, vnode) {
      vnode.context.$refs[binding.arg].$refs.reference = el
    }
  }
</script>

<style scoped src="./Note.css"></style>
