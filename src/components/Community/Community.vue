<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="8" :sm="8" :md="6" :lg="6" style="padding: 0; overflow: hidden" id="left-col" :class="{'sticky': isSticky}">
        <div class="left-wrapper" >
          <div class="inner-border">
            <el-input
              placeholder=""
              icon="search"
              v-model="input2"
              :on-icon-click="handleIconClick">
            </el-input>

            <h2>热门笔记</h2>
              <ul>
                <li><a href="#">1. sagascaxsfasd</a></li>
                <li><a href="#">2. xwxzxas</a></li>
                <li><a href="#">3. asfxzcas</a></li>
                <li><a href="#">4. sadasfsaf</a></li>
                <li><a href="#">5. asfgasgdsgsdf</a></li>
              </ul>

            <h2 style="margin-top: 3vmin;">推荐关注</h2>
            <div class="user-wrapper" style="margin-top: 8vmin;">
              <img src="../../assets/icon.png"/>
              <a class="name-wrapper">ISLAND</a>
              <p class="info-wrapper">哈哈哈哈哈哈哈哈哈</p>
              <el-button type="default">关<br><br>注</el-button>
            </div>
            <div class="user-wrapper">
              <img src="../../assets/icon.png"/>
              <a class="name-wrapper">ISLAND</a>
              <p class="info-wrapper">哈哈哈哈哈哈哈哈哈</p>
              <el-button type="default">关<br><br>注</el-button>
            </div>
            <div class="user-wrapper">
              <img src="../../assets/icon.png"/>
              <a class="name-wrapper">ISLAND</a>
              <p class="info-wrapper">哈哈哈哈哈哈哈哈哈</p>
              <el-button type="default">关<br><br>注</el-button>
            </div>

          </div>
          <h1>社 区。</h1>
        </div>
      </el-col>

      <el-col :xs="8" :sm="8" :md="6" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="18" :lg="18" style="padding: 0;">
        <div class="right-wrapper" :style="leftWrapperStyle">
          <!--<div class="inner-border">-->
          <!--</div>-->
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
          minHeight: window.innerHeight - 80 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 160 + 'px'
//          minHeight: '380px'
        },
        isSticky: false,
        input2: ''
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
      handleIconClick: function () {
      }
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 80 + 'px'
        this.leftWrapperStyle.minHeight = this.mainHeight - 100 + 'px'
//      this.contentStyle.height = this.mainHeight - 100 + 'px'
      },
      scrollTop: function () {
        if (this.scrollTop > 80) {
          this.isSticky = true
        } else {
          this.isSticky = false
        }
      }
    }
  }
</script>

<style scoped src="./Community.css"></style>
