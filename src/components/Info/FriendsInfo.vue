<template>
  <div>
    <div id="main-part" :style="mainStyle">
      <div class="left-wrapper" :style="contentStyle">
        <div class="title-wrapper">
          <h1>好<br><br>友<br><br>信<br><br>息<br>。</h1>
        </div>
        <div class="inner-wrapper">
          <el-menu default-active="1" class="el-menu-vertical-demo left-nav" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapse">
            <el-menu-item index="1" @click="handleNavClick">
              <i class="el-icon-menu i-button"></i>
              <span slot="title">关 注 我 的 人</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleNavClick">
              <i class="el-icon-setting i-button"></i>
              <span slot="title">我 关 注 的 人</span>
            </el-menu-item>
          </el-menu>
        </div>

      </div>
      <div class="right-wrapper" :style="contentStyle">
        <div class="inner-wrapper">
          <!--<input class="file_input" type="file" multiple id="avc"/>-->
          <!--<div class="upload_box">-->
          <!--点我上传图片哦-->
          <!--</div>-->
          <div class="info-wrapper" v-show="follows">
            <div class="friend-wrapper">
              <el-row :gutter="10" style="margin: 0">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <img src="../../assets/icon.png">
                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0; text-align: left;">
                  <a href="#">ISLAND</a>
                  <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success">取消关注</el-button>
                </el-col>

              </el-row>
            </div>
          </div>
          <div class="info-wrapper" v-show="!follows">
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  //  import * as types from '../../store/mutation-types'
  export default {
    data () {
      return {
        isCollapse: false,
        imageUrl: require('../../assets/icon.png'),
        mainStyle: {
          height: window.innerHeight + 'px'
        },
        contentStyle: {
          height: window.innerHeight - 100 + 'px'
        },
        follows: true
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight'
      })
    },
    methods: {
//      ...mapMutations({
//      }),
//      handleSelect (key, keyPath) {
//        console.log(key, keyPath)
//      }
      handleNavClick (key, keyPath) {
        if (key.index === '1') {
          this.follows = true
        }
        if (key.index === '2') {
          this.follows = false
        }
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    watch: {
      largeSize: function () {
        this.isCollapse = !this.largeSize
      },
      mainHeight: function () {
        this.mainStyle.height = this.mainHeight + 'px'
        this.contentStyle.height = this.mainHeight - 100 + 'px'
      }
    }
  }
</script>
<style scoped src="./info.css"></style>
<style scoped src="./friend.css"></style>
