<template>
  <div>
  <div id="main-part" :style="mainStyle">
    <el-row :gutter="12" style="margin: 0">
      <el-col :xs="2" :sm="7" :md="7" :lg="7"><div class="grid-content"></div></el-col>
      <el-col :xs="20" :sm="10" :md="10" :lg="10">
        <div class="center-panel" style="display: none">
          <div id="login-panel">
            <h1>登录</h1>
            <h2 style="width: 100%; text-align: center; top: 27%;">用户名</h2>
            <input v-model="input" placeholder="请输入内容" class="info-input">
          </div>
          <div id="signin-panel" style="display: none">

          </div>
          <div id="welcome-panel">

          </div>
        </div>
      </el-col>
      <el-col :xs="2" :sm="7" :md="7" :lg="7"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
  <div>
    <el-row :gutter="12" style="margin: 0;">
      <el-col :xs="24" :sm="8" :md="8" :lg="8" style="padding: 0"><div class="card"></div></el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" style="padding: 0">
        <div class="card"></div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" style="padding: 0"><div class="card"></div></el-col>
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
