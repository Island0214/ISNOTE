<template>
  <div>
    <div id="main-part" :style="mainStyle">
      <el-row :gutter="12" style="margin: 0">
        <el-col :xs="2" :sm="7" :md="7" :lg="7">
          <div class="grid-content"></div>
        </el-col>
        <el-col :xs="20" :sm="10" :md="10" :lg="10">
          <div class="center-panel">
            <div id="login-panel" style="display: none">
              <h1>登录</h1>
              <h2 style="width: 100%; text-align: center; top: 27%;">用户名</h2>
              <input v-model="input" placeholder="请输入内容" class="info-input">
            </div>
            <div id="signin-panel" style="display: none">

            </div>
            <div id="welcome-panel">
              <div class="left-wrapper">
                <div class="inner-border"></div>
                <h1>ISNOTE</h1>
                <h2 style="top: 40%; left: 10%">在这里 <br><br> 一直还有你的样子 <br><br> 被保留。</h2>
                <!--我们同生 我们共享 无法离开 在云端之上-->
                <!--一个人的伤怀 怎好意思感慨-->
                <!--一直还有你的样子 被保留-->
                <!--做个梦给你-->
              </div>
              <div class="right-wrapper">
                <!--<h3 style="width: 100%; text-align: center; top: 15%;">-->
                  <!--一个人的伤怀<br>怎好意思感慨-->
                <!--</h3>-->
                <img src="../../assets/lines.png">
                <el-button type="success" style="top: 75%">做个梦给你</el-button>
              </div>
            </div>
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
          <div class="card"></div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="4" style="padding: 0">
          <div class="card">
            <img width="100%" src="../../assets/logo.png">
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="10" style="padding: 0">
          <div class="card"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mainStyle: {
          height: window.innerHeight + 'px'
        },
        input: ''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
  //  alert(windowHeight)
</script>
<style scoped src="./Main.css"></style>
