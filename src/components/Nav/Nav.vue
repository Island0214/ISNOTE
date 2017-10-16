<template>
  <div class="nav-bar">
    <img class="nav-logo" src="../../assets/logo.png"/>

    <div class="left-nav">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">哈哈哈</el-menu-item>
          <el-menu-item index="2">呵呵呵</el-menu-item>
          <!--<el-submenu index="2">-->
            <!--<template slot="title">呵呵呵</template>-->
            <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
          <!--</el-submenu>-->
          <el-menu-item index="3">嘻嘻嘻</el-menu-item>
        </el-menu>
    </div>

    <div class="right-nav">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">登陆</el-menu-item>
        <el-menu-item index="2">注册</el-menu-item>
      </el-menu>
    </div>
    <!--<el-collapse v-model="activeName" accordion>-->
      <!--<el-collapse-item title="一致性 Consistency" name="1">-->
        <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
        <!--<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
      <!--</el-collapse-item>-->
    <!--</el-collapse>-->

    <!--<el-menu :default-active="activeIndex2" class="el-menu-demo nav-bar" mode="horizontal" @select="handleSelect">-->
    <!--<el-menu-item index="1">处理中心</el-menu-item>-->
    <!--<el-submenu index="2">-->
    <!--<template slot="title">我的工作台</template>-->
    <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
    <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
    <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
    <!--</el-submenu>-->
    <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    <!--</el-menu>-->
    <!--<div class="right-wrapper">-->
    <!--<div class="input-wrapper">-->
    <!--<el-input class="search-input"-->
    <!--placeholder="搜索图片、作者"-->
    <!--icon="search"-->
    <!--v-model="input2"-->
    <!--:on-icon-click="handleIconClick">-->
    <!--</el-input>-->
    <!--</div>-->

    <!--<div class="button-wrapper">-->
    <!--<el-button type="text">首页</el-button>-->
    <!--<el-button type="text">注册</el-button>-->
    <!--<el-button type="text">登录</el-button>-->
    <!--<el-button type="text">帮助</el-button>-->
    <!--</div>-->
  </div>

</template>


<script>
  import {Input, Button} from 'element-ui'

  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    components: {
      elInput: Input,
      elButton: Button
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped src="./Nav.css"></style>
