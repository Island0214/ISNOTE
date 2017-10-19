<template>
  <div class="nav-bar">
    <img class="nav-logo" src="../../assets/logo.png"/>

    <div class="left-nav">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" @click="showWelcome()">首页</el-menu-item>
          <el-menu-item index="2">笔记</el-menu-item>
          <!--<el-submenu index="2">-->
            <!--<template slot="title">呵呵呵</template>-->
            <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
          <!--</el-submenu>-->
          <el-menu-item index="3">交流</el-menu-item>
        </el-menu>
    </div>

    <div class="right-nav">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="showLogIn()">登录</el-menu-item>
        <el-menu-item index="2" @click="showSignIn()">注册</el-menu-item>
      </el-menu>
    </div>
    <!--<el-collapse v-model="activeName" accordion>-->
      <!--<el-collapse-item title="一致性 Consistency" name="1">-->
        <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
        <!--<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
      <!--</el-collapse-item>-->
    <!--</el-collapse>-->
  </div>

</template>


<script>
  import { mapMutations } from 'vuex'
  import * as types from '../../store/mutation-types'

  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      ...mapMutations({
        showWelcome: types.SHOW_MAIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showLogIn: types.SHOW_LOGIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showSignIn: types.SHOW_SIGNIN
      }),
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped src="./Nav.css"></style>
