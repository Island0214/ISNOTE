<template>
  <div class="right-wrapper">
  <div class="search-wrapper">
    <input placeholder="输入标题" v-model="curNote.note_title"/>
  </div>
  <div class="collections-wrapper">
    <div class="breadcrumb-wrapper">
      <el-col :xs="24" :sm="24" :md="24" :lg="16" style="padding: 0;">
        <el-breadcrumb separator="/">
          <!--<el-breadcrumb-item :to="{ path: '/' }">笔记本</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>笔记本</el-breadcrumb-item>-->
          <el-breadcrumb-item :to="{ path: '/workbench/0' }">笔记本</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/workbench/' + this.curNote.notebook }">{{ this.curNote.notebook_name }}</el-breadcrumb-item>
          <el-breadcrumb-item>笔记详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" style="padding: 0;">
        <div>
          <!--<p>点赞和转发在这里</p>-->
          <!--<i class="address-book-o" style="margin-top: 10px; float: right; position: relative"></i>-->
          <div style="margin: 0; line-height: 2vmin; left: 0">
            <div style="display: inline-block" @click="likeNoteAction">
              <icon :name="heartName" class="icon"></icon>
            </div>
            <p style="display: inline-block">{{ curNote.like_count }}</p>
            <div style="display: inline-block" @click="forkNoteAction=true">
              <icon name="reply" class="icon"></icon>
            </div>
            <p style="display: inline-block">{{ curNote.fork_count }}</p>
            <div style="display: inline-block" @click="shareNoteAction=true">
              <icon name="share-alt" class="icon"></icon>
            </div>
            <p style="display: inline-block">{{ curNote.post_count }}</p>
          </div>

        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" style="padding: 0; margin-top: 10px;">
        <!--<p style="padding: 0; margin: 0; position: relative; display: inline-block;">笔记权限</p>-->
        <el-select v-model="curNote.note_authority" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" style="padding: 0;  margin-top: 10px;">
        <el-input
          placeholder=""
          icon="search"
          v-model="searchInput"
          style="width: 100%"
          :on-icon-click="searchContain"
        >
        </el-input>
      </el-col>

    </div>

    <editor useCustomImageHandler
            @imageAdded="handleImageAdded"  v-model="editorContent"></editor>

    <p style="position:absolute; left: 1%; font-size: 1.3vmin">上次更新于 {{ this.curNote.updated_at }}</p>
    <el-button type="default" class="save-button" @click="modifyNotesAction()">保 存</el-button>

    <div class="tags-wrapper" >
      <p style="font-size: 1.3vmin">最多添加五个标签</p>

      <el-tag
        :key="tag.id"
        v-for="tag in dynamicTags"
        :closable="true"
        :close-transition="false"
        @close="handleCloseTag(tag)"
      >
        {{tag.tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-show="showInputStatus" class="button-new-tag" size="small" @click="showInput" v-else>+ 新标签</el-button>
    </div>

  </div>

    <dialogs
      :forkNoteAction="forkNoteAction" @closeForkNoteAction="forkNoteAction=false"
      @addForkNum="addForkNum" @addPostNum="addPostNum"
      :shareNoteAction="shareNoteAction"  @closeShareNoteAction="shareNoteAction=false"
    ></dialogs>
  </div>
</template>


<script>
  import {mapGetters, mapActions} from 'vuex'
  import Editor from '../Editor/Editor.vue'
  import Dialogs from './Dialogs'

  export default {
    components: {
      Editor,
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
        editorContent: '',
        dynamicTags: [],
        inputVisible: false,
        options: [{
          value: '所有人',
          label: '所有人'
        }, {
          value: '仅好友',
          label: '仅好友'
        }, {
          value: '只有我',
          label: '只有我'
        }],
        options2: [{
          value: '选项4',
          label: '允许'
        }, {
          value: '选项5',
          label: '不允许'
        }],
        curNote: '',
        noteID: '',
        notebookOfNote: '',
        searchInput: '',
        heartName: 'heart-o',
        showInputStatus: true,
        inputValue: '',
        imageName: [],
        forkNoteAction: false,
        shareNoteAction: false,
        curNoteBody: '',
        isSearching: false
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop',
        singleNotebook: 'singleNotebook',
        singleNote: 'singleNote'
      })
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 60 + 'px'
        this.leftWrapperStyle.minHeight = this.mainHeight - 110 + 'px'
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
      },
      dynamicTags: function () {
        if (this.dynamicTags.length > 4) {
          this.showInputStatus = false
        } else {
          this.showInputStatus = true
        }
      },
      editorContent: function () {
        if (!this.isSearching) {
          this.curNoteBody = this.editorContent
        } else {
          this.isSearching = false
        }
      }
    },
    methods: {
      ...mapActions({
        'getNoteById': 'getNoteById',
        'likeNote': 'likeNote',
        'cancelLike': 'cancelLike',
        'addTag': 'addTag',
        'deleteTag': 'deleteTag',
        'uploadImage': 'uploadImage',
        'modifyNote': 'modifyNote',
        'getHotNotes': 'getHotNotes'
      }),
      handleCloseTag (tag) {
        this.deleteTag({
          onSuccess: () => {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
            this.$message({
              showClose: true,
              message: '删除标签成功！',
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
          body: {
            id: tag.id
          }
        })
      },
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue.length > 10) {
          this.$message({
            showClose: true,
            message: '单个标签不能超过10个字！',
            type: 'error'
          })
          this.inputVisible = false
          this.inputValue = ''
          return
        }
        if (inputValue) {
          this.addTag({
            onSuccess: (tag) => {
              console.log(tag.tag)
              this.dynamicTags.push(tag.tag)
              this.$message({
                showClose: true,
                message: '增加标签成功！',
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
            body: {
              note_id: this.curNote.id,
              tag: this.inputValue
            }
          })
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      likeNoteAction () {
        console.log('heart')
        if (this.heartName === 'heart-o') {
          this.likeNote({
            onSuccess: () => {
              this.heartName = 'heart'
              this.curNote.like_count++
              this.$message({
                showClose: true,
                message: '点赞成功！',
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
            body: {
              note_id: this.noteID
            }
          })
        }
        if (this.heartName === 'heart') {
          this.cancelLike({
            onSuccess: () => {
              this.heartName = 'heart-o'
              this.curNote.like_count--
              this.$message({
                showClose: true,
                message: '取消点赞成功！',
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
            body: {
              note_id: this.noteID
            }
          })
        }
      },
      handleImageAdded: function (file, Editor, cursorLocation) {
//        alert('sad')
        let formData = new FormData()
        formData.append('image', file)
        console.log(formData)
        console.log(file)

        this.uploadImage({
          onSuccess: (path) => {
            //     Editor.insertEmbed(cursorLocation, 'image', this.path)
//            let url = data.url // Get url from response
//            let name = url.split('/')[url.split('/').length - 1]
//            let path = require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/' + name)
//            require.ensure([], function(require){
//              url = require.context('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/', false, path)
//            });
//            this.imageName.push(JSON.parse(JSON.stringify(path)))
//            Editor.insertEmbed(cursorLocation, 'image', require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/' + this.imageName[0]))
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          },
          body: formData
        })
      },
      modifyNotesAction: function () {
        this.modifyNote({
          onSuccess: (note) => {
//            this.curNote = JSON.parse(JSON.stringify(note))
//            console.log(note)
            this.curNote.updated_at = note.note.updated_at
            this.$message({
              showClose: true,
              message: '保存成功！',
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
          body: {
            id: this.curNote.id,
            title: this.curNote.note_title,
            body: this.curNoteBody,
            authority: this.curNote.note_authority
          }
        })
      },
      addForkNum () {
        this.curNote.fork_count++
      },
      addPostNum () {
        this.curNote.post_count++
      },
      searchContain () {
        if (this.searchInput.length > 0) {
          this.isSearching = true
          this.editorContent = this.curNoteBody
//        let tmpBody = this.curNoteBody
//        console.log('/' + this.searchInput + '/g')
          let pattern = new RegExp(this.searchInput, 'g')
          this.editorContent = this.editorContent.replace(pattern, '<span style="background-color: #B2DDAC; color: #333;">' + this.searchInput + '</span>')
//        this.curNoteBody = tmpBody
//        let sad =
//          console.log(this.editorContent)
//          console.log(this.curNoteBody)
        } else {
          this.editorContent = this.curNoteBody
        }
      }
    },
    mounted () {
      this.noteID = this.$router.history.current.params.id
      console.log('noteID: ' + this.$router.history.current.params.id)
      this.getNoteById({
        onSuccess: (note) => {
//          console.log(note)
          this.curNote = JSON.parse(JSON.stringify(note))
          console.log(this.curNote)
          if (this.curNote.isLike === true) {
            this.heartName = 'heart'
          }
          this.dynamicTags = JSON.parse(JSON.stringify(this.curNote.tags))
          this.editorContent = JSON.parse(JSON.stringify(this.curNote.note_body))
//          console.log(this.note_authority)
//          console.log(note.note_authority)
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        },
        body: {
          id: this.noteID
        }
      })
    }
  }
</script>

<style scoped src="./NotePad.css"></style>
