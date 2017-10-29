<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0; overflow: scroll" id="left-col" :class="{'largeSticky': largeSize && isSticky, 'smallSticky': (!largeSize) && isSticky}">
        <div class="left-wrapper">
          <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :style="mainStyle">
            <el-menu-item index="0">所有笔记</el-menu-item>
            <el-menu-item index="1">笔记本1</el-menu-item>
            <el-menu-item index="2">笔记本2</el-menu-item>
            <el-menu-item index="3">笔记本3</el-menu-item>
            <el-menu-item index="4">笔记本3</el-menu-item>
            <el-menu-item index="5">笔记本3</el-menu-item>
            <el-menu-item index="6">笔记本3</el-menu-item>
            <el-menu-item index="7">笔记本3</el-menu-item>
            <el-menu-item index="8">笔记本3</el-menu-item>
            <el-menu-item index="9">笔记本3</el-menu-item>
            <el-menu-item index="10">笔记本3</el-menu-item>
            <el-menu-item index="11">笔记本3</el-menu-item>
            <el-menu-item index="12">笔记本3</el-menu-item>
            <el-menu-item index="13">笔记本3</el-menu-item>
            <el-menu-item index="14">笔记本3</el-menu-item>
            <el-menu-item index="15">笔记本3</el-menu-item>
            <el-menu-item index="16">笔记本3</el-menu-item>
          </el-menu>
        </div>
      </el-col>


      <el-col :xs="20" :sm="20" :md="20" :lg="20" style="padding: 0;">
        <div class="right-wrapper" :style="mainStyle">
          <div class="search-wrapper">
            <input placeholder="搜索笔记"/>
            <el-button type="default"><i class="el-icon-search"></i></el-button>
          </div>
        </div>
      </el-col>
      <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">-->
      <!--<el-button type="success"  @click="showModifyPassword = true">修改</el-button>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        mainStyle: {
          height: window.innerHeight - 60 + 'px'
        }
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop'
      })
    },
    method: {
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 60 + 'px'
//      this.contentStyle.height = this.mainHeight - 100 + 'px'
      },
      largeSize: function () {
//        alert(this.largeSize)
      }
    }
  }
</script>

<style scoped src="./Note.css"></style>
