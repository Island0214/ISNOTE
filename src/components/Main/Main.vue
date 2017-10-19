<template>
  <div>
    <div id="main-part" :style="mainStyle">
      <el-row :gutter="12" style="margin: 0">
        <el-col :xs="2" :sm="7" :md="7" :lg="7">
          <div class="grid-content"></div>
        </el-col>
        <el-col :xs="20" :sm="10" :md="10" :lg="10">
          <div class="center-panel">
            <transition name="el-zoom-in-center">
              <div v-show="logIn">
                <div id="login-panel">
                  <!--<h1>登录</h1>-->
                  <!--<h2 style="width: 100%; text-align: center; top: 27%;">用户名</h2>-->
                  <!--<input v-model="input" placeholder="请输入内容" class="info-input">-->

                  <div class="left-wrapper">
                    <div class="inner-border"></div>
                    <h1>ISNOTE</h1>
                    <h1 style="top: 40%; left: 60%"> 登 <br><br> 录 <br>。 </h1>
                  </div>
                  <div class="right-wrapper">
                    <div class="inner-wrapper">
                      <div class="switch-wrapper">
                        <p>没有账户？</p>
                        <a href="#" @click="showSignIn()">前往注册</a>
                      </div>

                      <!--<img src="../../assets/lines.png">-->
                      <h3 style="top: 15%;">账户</h3>
                      <input style="top: 30%;" v-model="username"/>
                      <h3 style="top: 45%;">密码</h3>
                      <input style="top: 60%;" type="password" v-model="password"/>
                      <el-button type="success" style="top: 85%">登 录</el-button>
                    </div>
                  </div>

                </div>
              </div>
            </transition>
            <transition name="el-zoom-in-center">
              <div v-show="signIn">
                <div id="signin-panel">
                  <div class="left-wrapper">
                    <div class="inner-border"></div>
                    <h1>ISNOTE</h1>
                    <h1 style="top: 40%; left: 60%"> 注 <br><br> 册 <br>。 </h1>
                  </div>
                  <div class="right-wrapper">
                    <!--<img src="../../assets/lines.png">-->
                    <div class="inner-wrapper">

                      <div class="switch-wrapper">
                        <p>已有账户？</p>
                        <a href="#" @click="showLogIn()">前往登录</a>
                      </div>

                      <h3 style="top: 15%;">账户</h3>
                      <input style="top: 30%;" v-model="username" v-bind:class="{ 'input-error': !correctUsername }"
                             v-on:input="testUsername()"/>
                      <p style="top: 35%; left: 20%;" class="p-error" v-if="!correctUsername">账户至多12位</p>

                      <h3 style="top: 45%;">密码</h3>
                      <input style="top: 60%;" v-bind:class="{ 'input-error': !correctPassword }" type="password"
                             id="signInPasswordInput" v-model="password" v-on:input="testPassword()"/>
                      <p style="top: 65%; left: 20%;" class="p-error" v-if="!correctPassword">密码至多16位</p>

                      <i class="el-icon-fa-eye" @mouseover="showPassword()" @mouseout="hidePassword()"></i>

                      <input style="top: 60%;" id="hiddenPasswordInput" :value="password" v-if="show"
                             v-bind:class="{ 'input-error': !correctPassword }"/>
                      <el-button type="success" style="top: 85%">注 册</el-button>
                    </div>
                  </div>

                </div>
              </div>
            </transition>
            <transition name="el-zoom-in-center">
              <div v-show="welcome">
                <div id="welcome-panel">
                  <div class="left-wrapper">
                    <div class="inner-border"></div>
                    <h1>ISNOTE</h1>
                    <h2 style="top: 40%; left: 10%">在这里， <br><br> 一直还有你的笔记 <br><br> 被保留。</h2>
                    <!--我们同生 我们共享 无法离开 在云端之上-->
                    <!--一个人的伤怀 怎好意思感慨-->
                    <!--一直还有你的样子 被保留-->
                    <!--做个梦给你-->
                  </div>
                  <div class="right-wrapper">
                    <!--<h3 style="width: 100%; text-align: center; top: 15%;">-->
                    <!--一个人的伤怀<br>怎好意思感慨-->
                    <!--</h3>-->
                    <div class="inner-wrapper">

                      <img src="../../assets/lines.png">
                      <el-button type="success" style="top: 75%" @click="startExplore()">做个梦给你</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </el-col>
        <el-col :xs="2" :sm="7" :md="7" :lg="7">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom-wrapper">
      <el-row :gutter="12" style="margin: 0;">
        <el-col :xs="24" :sm="8" :md="8" :lg="10" style="padding: 0">
          <div class="card">
            <h2 style="left: 10%; top: 2%;" class="contents">岛<br><br>屿<br><br>笔<br><br>记</h2>
            <h4 style="left: 30%; top: -10%;">我<br><br>们<br><br>同<br><br>生<br>，</h4>
            <h4 style="left: 50%; top: -10%;">我<br><br>们<br><br>共<br><br>享<br>，</h4>
            <h4 style="left: 70%; top: -10%;">无<br><br>法<br><br>离<br><br>开<br>，</h4>
            <h4 style="left: 90%; top: -10%;">在<br><br>云<br><br>端<br><br>之<br><br>上<br>。</h4>
          </div>
        </el-col>
        <el-col :xs="8" :sm="0" :md="0" :lg="0" style="padding: 0">
          <div class="card">
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" style="padding: 0">
          <div class="card">
            <img width="100%" src="../../assets/logo.png">
          </div>
        </el-col>
        <el-col :xs="8" :sm="0" :md="0" :lg="0" style="padding: 0">
          <div class="card">
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="10" style="padding: 0">
          <div class="card">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="contact-wrapper">
      <h5 style="position: absolute; right: 10%; bottom: -10%; text-align: right">Create By @ISLAND<br>Email : islandq0214@gmail.com
      </h5>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/mutation-types'

  export default {
    data () {
      return {
        mainStyle: {
          height: window.innerHeight + 'px'
        },
        input: '',
        show: false,
        password: '',
        username: '',
        correctUsername: true,
        correctPassword: true
      }
    },
    computed: {
      ...mapGetters({
        welcome: 'welcome',
        logIn: 'logIn',
        signIn: 'signIn'
      })
    },
    methods: {
      ...mapMutations({
        showWelcome: types.SHOW_MAIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showLogInMutation: types.SHOW_LOGIN, // 将 `this.add()` 映射为 `this.$store.commit('increment')`,
        showSignInMutation: types.SHOW_SIGNIN
      }),
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      showPassword () {
        this.show = true
      },
      hidePassword () {
        this.show = false
      },
      testUsername () {
        if (this.username.length > 12) {
          this.correctUsername = false
        } else {
          this.correctUsername = true
        }
      },
      testPassword () {
        if (this.password.length > 16) {
          this.correctPassword = false
        } else {
          this.correctPassword = true
        }
      },
      showLogIn () {
        this.showLogInMutation()
        this.username = ''
        this.password = ''
      },
      showSignIn () {
        this.showSignInMutation()
        this.username = ''
        this.password = ''
        this.correctUsername = true
        this.correctPassword = true
      },
//      showWelcome () {
//        this.showMainMutation()
//      },
      startExplore () {
        this.showLogIn()
      }
    },
    watch: {
      logIn: function () {
        this.username = ''
        this.password = ''
      }
    }
  }
  //  alert(windowHeight)
</script>
<style scoped src="./Main.css"></style>
