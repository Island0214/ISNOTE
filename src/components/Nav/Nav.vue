<template>
  <div class="nav-bar">
    <div v-if="largeSize">
    <img class="nav-logo" src="../../assets/logo.png"/>

    <div class="left-nav">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" @click="showWelcome()">
            <router-link to="/" class="nav-button">首 页</router-link>
          </el-menu-item>
          <el-menu-item index="2">笔 记</el-menu-item>
          <!--<el-submenu index="2">-->
            <!--<template slot="title">呵呵呵</template>-->
            <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
          <!--</el-submenu>-->
          <el-menu-item index="3">社 区</el-menu-item>

        </el-menu>
    </div>

    <div class="right-nav">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="showLogIn()" v-show="!loginState">
          <router-link to="/" class="nav-button">登 录</router-link>
        </el-menu-item>
        <el-menu-item index="2" @click="showSignIn()" v-show="!loginState">
          <router-link to="/" class="nav-button">注 册</router-link>
        </el-menu-item>

        <el-submenu index="3" v-show="loginState">
          <template slot="title">ISLAND</template>
          <el-menu-item index="2-1">
            <router-link to="/info" class="nav-button">个人信息</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/info" class="nav-button">好友信息</router-link>
          </el-menu-item>
          <el-menu-item index="2-3" @click="quitLog()">
            退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    </div>

    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-else>
      <el-submenu index="1">
        <template slot="title">    <img class="nav-logo" src="../../assets/logo.png" style="left: 0; margin-left: 0; width: 55px; height: 55px"/>
          ISNOTE</template>
        <!--<el-menu-item-group>-->
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="1-1" @click="showWelcome()">首 页</el-menu-item>
          <el-menu-item index="1-2">笔 记</el-menu-item>
        <el-menu-item index="1-3">社 区</el-menu-item>
        <div class="nav-breaker"></div>
        <el-menu-item index="1-4" @click="showLogIn()" v-show="!loginState">登 录</el-menu-item>
        <el-menu-item index="1-5" @click="showSignIn()" v-show="!loginState">注 册</el-menu-item>
        <!--</el-menu-item-group>-->
        <el-submenu index="1-6" v-show="loginState">
        <template slot="title">ISLAND</template>
        <el-menu-item index="2-1">个人信息</el-menu-item>
        <el-menu-item index="2-2">好友信息</el-menu-item>
        <el-menu-item index="2-3" @click="quitLog()">退出登录</el-menu-item>
        </el-submenu>

      </el-submenu>
    </el-menu>

  </div>

</template>


<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/mutation-types'

  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        screenWidth: document.body.clientWidth
      }
    },
    computed: {
      ...mapGetters({
        loginState: 'loginState'
      }),
      largeSize: function () {
        return this.screenWidth > 768
      }
    },
    methods: {
      ...mapMutations({
        showWelcome: types.SHOW_MAIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showLogIn: types.SHOW_LOGIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showSignIn: types.SHOW_SIGNIN,
        quitLog: types.QUIT_LOG
      }),
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    watch: {
      screenWidth: function () {
        if (this.screenWidth <= 768) {
          this.largeSize = false
        } else {
          this.largeSize = true
        }
//        if (!this.timer) {
//          this.timer = true
//          let that = this
//          if (this.screenWidth < 768) {
//            this.largeSize = false
//          }
//          setTimeout(function () {
//            // that.screenWidth = that.$store.state.canvasWidth
//            console.log(that.screenWidth)
//            that.init()
//            that.timer = false
//          }, 400)
//        }
      }
    }
  }
</script>

<style scoped src="./Nav.css"></style>
