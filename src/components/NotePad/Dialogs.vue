<template>
  <div>
    <el-dialog
      title="转载到我的笔记"
      :visible.sync="forkNoteStatus"
      width="20%"
      top="30%"
      :modal=true
      :modal-append-to-body=false
      :show-close=false
      :close-on-click-modal=false
      :close-on-press-escape=false
    >
      <!--<p>所属笔记本</p>-->
      <!--<el-input v-model="newNoteNotebook"></el-input>-->
      <p>目标笔记权限</p>
      <el-select v-model="newNoteAuthority" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p>目标笔记本</p>
      <el-select v-model="newNoteNotebook" placeholder="请选择">
        <el-option
          v-for="item in allNotebooks"
          :key="item.id"
          :label="item.notebook_name"
          :value="item.id">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeForkNote">取 消</el-button>
        <el-button type="primary" @click="confirmForkNote">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分享笔记"
      :visible.sync="shareNoteStatus"
      width="20%"
      top="30%"
      :modal=true
      :modal-append-to-body=false
      :show-close=false
      :close-on-click-modal=false
      :close-on-press-escape=false
    >
      <!--<p>所属笔记本</p>-->
      <!--<el-input v-model="newNoteNotebook"></el-input>-->
      <p>分享内容</p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="shareInfo"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShareNote">取 消</el-button>
        <el-button type="primary" @click="confirmShareNote">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    props: ['forkNoteAction', 'shareNoteAction'],
    data () {
      return {
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
        forkNoteStatus: this.forkNoteAction,
        shareNoteStatus: this.shareNoteAction,
        newNoteAuthority: '',
        newNoteNotebook: '',
        shareInfo: ''
//        allNotebooks: []
      }
    },
    computed: {
      ...mapGetters({
        allNotebooks: 'notebookList',
        singleNote: 'singleNote'
      })
    },
    methods: {
      ...mapActions({
        'getMyNotes': 'getMyNotes',
        'forkNote': 'forkNote',
        'sharePost': 'sharePost',
        'getMyNotebooks': 'getMyNotebooks'
      }),
      closeForkNote: function () {
        this.$emit('closeForkNoteAction')
        this.newNoteAuthority = ''
        this.newNoteNotebook = ''
      },
      confirmForkNote: function () {
//        console.log(this.singleNote.note)

        let body = {
          notebook: this.newNoteNotebook,
          authority: this.newNoteAuthority,
          note: this.singleNote.note.id
        }
        this.forkNote({
          onSuccess: (data) => {
            this.$message({
              showClose: true,
              message: '转载成功！',
              type: 'success'
            })
            this.$emit('addForkNum')
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          },
          body: body
        })
        this.closeForkNote()
      },
      closeShareNote: function () {
        this.$emit('closeShareNoteAction')
        this.shareInfo = ''
      },
      confirmShareNote: function () {
//        if (this.shareInfo)
        let body = {
          note_id: this.singleNote.note.id,
          content: this.shareInfo
        }
        this.sharePost({
          onSuccess: (data) => {
            this.$emit('addPostNum')
            this.$message({
              showClose: true,
              message: '分享成功！',
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
          body: body
        })
        this.closeShareNote()
      }
    },
    mounted () {
//      this.getMyNotebooks({
//        onSuccess: (notebooks) => {
//          this.allNotebooks = notebooks
//          console.log(this.allNotebooks)
//        },
//        onError: (error) => {
//          this.$message({
//            showClose: true,
//            message: error,
//            type: 'error'
//          })
//        }
//      })
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
//      this.allNotebook = this.notebookList
    },
    watch: {
      forkNoteAction: function () {
        this.forkNoteStatus = this.forkNoteAction
      },
      shareNoteAction: function () {
        this.shareNoteStatus = this.shareNoteAction
      }
    }
  }
</script>

<style scoped src="../Note/Dialogs.css"></style>
