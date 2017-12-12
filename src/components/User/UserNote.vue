<template>
  <div class="right-wrapper" style="z-index: 1;">
    <div class="collections-wrapper" :style="rightWrapperStyle">
      <h1>{{ note.note_title }}</h1>
      <div class="info-wrapper">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0;"l>
          <p>更新于 {{ note.updated_at }}</p>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0;"l>
          <div style="margin: 0; line-height: 2vmin; width: 100%; text-align: right; margin-right: 4%; float: right;">
            <div style="display: inline-block" @click="likeNoteAction">
              <icon :name="heartName" class="icon"></icon>
            </div>
            <p style="display: inline-block; left: 0;">{{ note.like_count }}</p>
            <div style="display: inline-block" @click="tryForkNote">
              <icon name="reply" class="icon"></icon>
            </div>
            <p style="display: inline-block; left: 0;">{{ note.fork_count }}</p>
            <div style="display: inline-block" @click="shareNoteAction=true">
              <icon name="share-alt" class="icon"></icon>
            </div>
            <p style="display: inline-block; left: 0;">{{ note.post_count }}</p>
          </div>
        </el-col>
      </div>
      <div class="content-wrapper" :style="rightWrapperStyle">
        <div v-html="note.note_body"></div>
        <h3 v-if="note.note_body === ''" style="width: 100%; text-align: center; position:absolute; top: 45%;">暂无笔记内容...</h3>
      </div>

      <div class="tags-wrapper" >
        <p>笔记标签</p>
        <el-tag
          :key="0"
          :closable="false"
          :close-transition="false"
          v-if="noTages"
        >
          暂无标签
        </el-tag>
        <el-tag
          :key="tag.id"
          v-for="tag in note.tags"
          :closable="false"
          :close-transition="false"
        >
          {{tag.tag}}
        </el-tag>
      </div>

      <div class="authority-wrapper">
        <p>笔记权限</p>
        <el-tag
          :key="6"
          :closable="false"
          :close-transition="false"
        >
          {{note.note_authority}}
        </el-tag>
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
  import Dialogs from '../NotePad/Dialogs.vue'

  export default {
    props: ['user', 'userInfo'],
    components: {
      Dialogs
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
        noteID: '',
        note: {},
        forkNoteAction: false,
        shareNoteAction: false,
        heartName: 'heart-o',
        noTages: false
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
        'getNoteById': 'getNoteById',
        'likeNote': 'likeNote',
        'cancelLike': 'cancelLike'
      }),
      likeNoteAction: function () {
        if (this.heartName === 'heart-o') {
          this.likeNote({
            onSuccess: () => {
              this.heartName = 'heart'
              this.note.like_count++
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
              this.note.like_count--
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
      addForkNum () {
        this.note.fork_count++
      },
      addPostNum () {
        this.note.post_count++
      },
      tryForkNote () {
        if (this.userInfo.modify === '只有我') {
          this.$message({
            showClose: true,
            message: '该用户不允许转载笔记！',
            type: 'error'
          })
          return
        }

        if (this.userInfo.modify === '所有人' || (this.userInfo.modify === '仅好友' && this.userInfo.isFriend === '互相关注')) {
          this.forkNoteAction = true
        } else {
          this.$message({
            showClose: true,
            message: '该用户仅允许好友转载笔记！',
            type: 'error'
          })
        }
//        this.getFriendByName
      }
    },
    mounted () {
//      console.log(this.$router.history.current.matched[0])

      this.noteID = this.$router.history.current.params.id
//      console.log(this.noteID)
//      console.log(this.user)

      this.getNoteById({
        onSuccess: (data) => {
//          console.log(data)
          this.note = JSON.parse(JSON.stringify(data))
          if (this.note.tags.length === 0) {
            this.noTages = true
          }
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        },
        body: {
          'id': this.noteID
        }
      })
    }
  }
</script>

<style scoped src="./Note.css"></style>
