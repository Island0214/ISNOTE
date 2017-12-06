<template>
  <div>
    <el-dialog title="提示" :visible.sync="confirmCloseStatus" width="20%" top="30%" :modal=false>
      <span>确认删除该笔记吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirmClose">取 消</el-button>
        <el-button type="primary" @click="deleteNoteAction">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改笔记本设置"
      :visible.sync="modifyBookStatus"
      width="20%"
      top="30%"
      :modal=false
    >
      <p>笔记本名称</p>
      <el-input v-model="moBookName"></el-input>
      <p>笔记本权限</p>
      <el-select v-model="moBookAuthority" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModifyBook">取 消</el-button>
        <el-button type="primary" @click="modifyNotebookSetting">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新建笔记本"
      :visible.sync="createBookStatus"
      width="20%"
      top="30%"
      :modal=false
    >
      <p>笔记本名称</p>
      <el-input v-model="newBookName"></el-input>
      <p>笔记本权限</p>
      <el-select v-model="newBookAuthority" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateBook">取 消</el-button>
        <el-button type="primary" @click="createNewNoteBook">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新建笔记"
      :visible.sync="createNewNoteStatus"
      width="20%"
      top="30%"
      :modal=false
    >
      <p>笔记名称</p>
      <el-input v-model="newNoteName"></el-input>
      <p>笔记权限</p>
      <el-select v-model="newNoteAuthority" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateNewNote">取 消</el-button>
        <el-button type="primary" @click="createNewNote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    props: ['confirmCloseAction', 'modifyBookAction', 'createBookAction', 'createNewNoteAction', 'noteID', 'notebookName', 'notebookAuthority'],
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
        newBookName: '',
        newBookAuthority: '',
        newNoteName: '',
        newNoteAuthority: '',
        moBookName: '',
        moBookAuthority: '',
        confirmCloseStatus: this.confirmCloseAction,
        modifyBookStatus: this.modifyBookAction,
        createBookStatus: this.createBookAction,
        createNewNoteStatus: this.createNewNoteAction
      }
    },
    computed: {
      ...mapGetters({
        singleNotebook: 'singleNotebook'
      })
//      moBookName: this.singleNotebook.notebook_name,
//      moBookAuthority: this.singleNotebook.authority
      //      moBookName: notebookName,
//      moBookAuthority: notebookAuthority
    },
    methods: {
      ...mapActions({
        'createNoteBookAction': 'createNoteBookAction',
        'createNoteAction': 'createNoteAction',
        'deleteNote': 'deleteNote'
      }),
      closeConfirmClose: function () {
        this.confirmCloseStatus = false
        this.$emit('closeConfirmClose')
      },
      closeModifyBook: function () {
        this.$emit('closeModifyBook')
        this.moBookName = this.singleNotebook.notebook_name
        this.moBookAuthority = this.singleNotebook.authority
      },
      closeCreateNewNote: function () {
        this.$emit('closeCreateNewNote')
        this.newNoteName = ''
        this.newNoteAuthority = ''
      },
      closeCreateBook: function () {
        this.newBookName = ''
        this.newBookAuthority = ''
        this.$emit('closeCreateBook')
      },
      createNewNoteBook: function () {
        console.log(this.newBookName)
        console.log(this.newBookAuthority)
        this.createNoteBookAction({
          onSuccess: (notebook) => {
            this.$emit('createNewBook', notebook)
            this.newBookName = ''
            this.newBookAuthority = ''
            this.closeCreateBook()

            this.$message({
              showClose: true,
              message: '创建笔记本成功！',
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
            'name': this.newBookName,
            'authority': this.newBookAuthority
          }
        })
      },
      modifyNotebookSetting: function () {
        let newInfo = {
          name: this.moBookName,
          authority: this.moBookAuthority
        }
        this.$emit('modifyNotebookAction', newInfo)
        this.closeModifyBook()
      },
      createNewNote: function () {
        let newNote = {
          notebook: this.singleNotebook.id,
          note_title: this.newNoteName,
          note_authority: this.newNoteAuthority
        }
        this.createNoteAction({
          onSuccess: (note) => {
            this.closeCreateNewNote()
            this.$emit('createNewNote', note)

            this.$message({
              showClose: true,
              message: '成功创建新笔记！',
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
          body: newNote
        })
      },
      deleteNoteAction: function () {
        this.deleteNote({
          onSuccess: (success) => {
            this.closeConfirmClose()
            this.$router.push('/workbench/0')
            this.$router.push('/workbench/' + this.singleNotebook.id)
            this.$message({
              showClose: true,
              message: success,
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
            id: this.noteID
          }
        })
      }
    },
    mounted () {
//      modifyBookAction: function () {
//        console.log(this.singleNotebook.notebook_name)
//        console.log(this.singleNotebook.notebook_name)
//        console.log(this.$route)
      this.moBookName = this.singleNotebook.notebook_name
      this.moBookAuthority = this.singleNotebook.authority
//      }
    },
    watch: {
      confirmCloseAction: function () {
        this.confirmCloseStatus = this.confirmCloseAction
      },
      modifyBookAction: function () {
        this.modifyBookStatus = this.modifyBookAction
        this.moBookName = this.singleNotebook.notebook_name
        this.moBookAuthority = this.singleNotebook.authority
      },
      createBookAction: function () {
        this.createBookStatus = this.createBookAction
      },
      createNewNoteAction: function () {
        this.createNewNoteStatus = this.createNewNoteAction
      }
    }
  }
</script>

<style scoped src="./Dialogs.css"></style>
