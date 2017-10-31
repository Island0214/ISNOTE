<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="confirmCloseAction"
      width="20%"
      top="30%"
    >
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
        <el-button @click="closeCreateBook">取 消</el-button>
        <el-button type="primary" @click="closeCreateBook">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新建笔记"
      :visible.sync="createNewNoteAction"
      width="20%"
      top="30%"
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
  export default {
    props: ['confirmCloseAction', 'modifyBookAction', 'createBookAction', 'createNewNoteAction'],
    data () {
      return {
        options: [{
          value: '选项1',
          label: '所有人可见'
        }, {
          value: '选项2',
          label: '仅好友可见'
        }, {
          value: '选项3',
          label: '只有我可见'
        }],
        options2: [{
          value: '选项4',
          label: '允许'
        }, {
          value: '选项5',
          label: '不允许'
        }],
        value1: ''
      }
    },
    methods: {
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
      }
    }
  }
</script>

<style scoped src="./Dialogs.css"></style>
