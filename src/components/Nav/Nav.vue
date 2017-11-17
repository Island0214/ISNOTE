<template>
  <div v-bind:class="['nav-bar']">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-if="!largeSize">
      <el-submenu index="1">
        <template slot="title">
          <img class="nav-logo" src="../../assets/logo.png" style="left: 0; margin-left: 0; width: 55px; height: 55px"/>
          ISNOTE
        </template>
        <!--<el-menu-item-group>-->
        <!--<template slot="title">分组一</template>-->
        <router-link to="/" class="nav-button">
          <el-menu-item index="1-1" @click="showWelcome()">
            首 页
          </el-menu-item>
        </router-link>
        <router-link to="/note" class="nav-button">
          <el-menu-item index="1-2">
            笔 记
          </el-menu-item>
        </router-link>
        <router-link to="/community" class="nav-button">
          <el-menu-item index="1-3">
            社 区
          </el-menu-item>
        </router-link>
        <div class="nav-breaker"></div>
        <router-link to="/" class="nav-button">
          <el-menu-item index="1-4" @click="showLogIn()" v-show="!loginState">
            登 录
          </el-menu-item>
        </router-link>
        <router-link to="/" class="nav-button">
          <el-menu-item index="1-5" @click="showSignIn()" v-show="!loginState">
            注 册
          </el-menu-item>
        </router-link>
        <!--</el-menu-item-group>-->
        <el-submenu index="1-6" v-show="loginState">
          <template slot="title">{{ user }}</template>
          <router-link to="/info" class="nav-button">
            <el-menu-item index="2-1">
              个人信息
            </el-menu-item>
          </router-link>
          <router-link to="/friends" class="nav-button">
            <el-menu-item index="2-2">
              好友信息
            </el-menu-item>
          </router-link>
          <el-menu-item index="2-3" @click="quit()">退出登录</el-menu-item>
        </el-submenu>

      </el-submenu>
    </el-menu>

    <div v-if="largeSize">
      <img class="nav-logo" src="../../assets/logo.png"/>

      <div class="left-nav">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" @click="showWelcome()">
            <router-link to="/" class="nav-button">首 页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/note" class="nav-button">笔 记</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/community" class="nav-button">社 区</router-link>
          </el-menu-item>

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
            <template slot="title">{{ user }}</template>
            <el-menu-item index="2-1">
              <router-link to="/info" class="nav-button">个人信息</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/friends" class="nav-button">好友信息</router-link>
            </el-menu-item>
            <el-menu-item index="2-3" @click="quit()">
              退出登录
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>


  </div>

</template>


<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import * as types from '../../store/mutation-types'

  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        screenWidth: document.body.clientWidth,
        overflowType: {
          'overflow': 'visible'
        },
        user: ''
      }
    },
    computed: {
      ...mapGetters({
        loginState: 'loginState',
        largeSize: 'largeSize',
        curUsername: 'curUsername'
      })
    },
    methods: {
      ...mapMutations({
        showWelcome: types.SHOW_MAIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showLogIn: types.SHOW_LOGIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showSignIn: types.SHOW_SIGNIN
      }),
      ...mapActions({
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
      },
      quit () {
        this.quitLog({
          onSuccess: (info) => {
            this.$message({
              showClose: true,
              message: info,
              type: 'success'
            })
            this.$router.push('/')
          }
        })
      }
    },
    mounted () {
      this.user = this.curUsername
    },
    watch: {
      curUsername: function () {
        this.user = this.curUsername
      }
    }
  }
</script>

<style scoped src="./Nav.css"></style>
