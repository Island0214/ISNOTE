<template>
  <div class="right-wrapper">
  <div class="search-wrapper">
    <input placeholder="输入标题" value="ISLAND"/>
  </div>
  <div class="collections-wrapper">
    <div class="breadcrumb-wrapper">
      <el-col :xs="24" :sm="24" :md="24" :lg="16" style="padding: 0;">
        <el-breadcrumb separator="/">
          <!--<el-breadcrumb-item :to="{ path: '/' }">笔记本</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>笔记本</el-breadcrumb-item>-->
          <el-breadcrumb-item :to="{ path: '/note/all' }">笔记本</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/note/all' }">笔记本1</el-breadcrumb-item>
          <el-breadcrumb-item>哈哈哈哈</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="8" style="padding: 0;">
        <div>
          <!--<p>点赞和转发在这里</p>-->
          <i :class="" style="margin-top: 10px; float: right; position: relative"></i>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" style="padding: 0; margin-top: 10px;">
        <!--<p style="padding: 0; margin: 0; position: relative; display: inline-block;">笔记权限</p>-->
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0;  margin-top: 10px;">
        <el-input
          placeholder=""
          icon="search"
          v-model="input2"
          style="width: 100%"
        >
          <!--:on-icon-click=""-->
        </el-input>
      </el-col>

    </div>

    <editor></editor>

    <div class="tags-wrapper" >
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :closable="true"
        :close-transition="false"
        @close="handleCloseTag(tag)"
      >
        {{tag}}
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
      <el-button class="button-new-tag" size="small" @click="showInput" v-else>+ 新标签</el-button>
    </div>

  </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'
  import Editor from '../Editor/Editor.vue'

  export default {
    components: {
      Editor
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
        dynamicTags: ['标签一', '标签二', '标签三'],
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
        value1: '',
        input2: '',
        value: ''
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
        this.leftWrapperStyle.minHeight = this.mainHeight - 110 + 'px'
        this.rightWrapperStyle.height = this.mainHeight - 20 + 'px'
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
      handleCloseTag (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to.params.id)
    }
  }
</script>

<style scoped src="./NotePad.css"></style>
