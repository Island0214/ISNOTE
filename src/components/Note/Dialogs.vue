<template>
  <div>
    <el-dialog title="提示" :visible.sync="confirmCloseAction" width="20%" top="30%" :modal=false>
      <span>确认删除该笔记吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirmClose">取 消</el-button>
        <el-button type="primary" @click="closeConfirmClose">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改笔记设置"
      :visible.sync="modifyBookAction"
      width="20%"
      top="30%"
      :modal=false
    >
      <p>笔记本名称</p>
      <el-input></el-input>
      <p>笔记本权限</p>
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModifyBook">取 消</el-button>
        <el-button type="primary" @click="closeModifyBook">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新建笔记本"
      :visible.sync="createBookAction"
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
      :visible.sync="createNewNoteAction"
      width="20%"
      top="30%"
      :modal=false
    >
      <p>笔记名称</p>
      <el-input></el-input>
      <p>笔记权限</p>
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateNewNote">取 消</el-button>
        <el-button type="primary" @click="closeCreateNewNote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: ['confirmCloseAction', 'modifyBookAction', 'createBookAction', 'createNewNoteAction'],
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
        value1: '',
        newBookName: '',
        newBookAuthority: ''
      }
    },
    methods: {
      ...mapActions({
        'createNoteBookAction': 'createNoteBookAction'
      }),
      closeConfirmClose: function () {
        this.$emit('closeConfirmClose')
      },
      closeModifyBook: function () {
        this.$emit('closeModifyBook')
      },
      closeCreateNewNote: function () {
        this.$emit('closeCreateNewNote')
      },
      closeCreateBook: function () {
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
      }
    }
  }
</script>

<style scoped src="./Dialogs.css"></style>
