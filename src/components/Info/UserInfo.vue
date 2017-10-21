<template>
  <div>
    <div id="main-part" :style="mainStyle">
      <div class="left-wrapper" :style="contentStyle">
        <div class="title-wrapper">
          <h1>个<br><br>人<br><br>信<br><br>息<br>。</h1>
        </div>
        <div class="inner-wrapper">
          <el-menu default-active="1" class="el-menu-vertical-demo left-nav" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapse">
            <!--<el-submenu index="1">-->
            <!--<template slot="title">-->
            <!--<i class="el-icon-message"></i>-->
            <!--<span slot="title">导航一</span>-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
            <!--<span slot="title">分组一</span>-->
            <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--<el-menu-item-group title="分组2">-->
            <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--<el-submenu index="1-4">-->
            <!--<span slot="title">选项4</span>-->
            <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
            <!--</el-submenu>-->
            <!--</el-submenu>-->
            <el-menu-item index="1" @click="handleNavClick">
              <i class="el-icon-menu i-button"></i>
              <span slot="title">账 户 设 置</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleNavClick">
              <i class="el-icon-setting i-button"></i>
              <span slot="title">隐 私 设 置</span>
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
          <div class="info-wrapper" v-show="userInfo">
            <div class="icon-wrapper">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handleAvatarSuccess"
                :on-failure="handleAvatarFailure"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="name-wrapper"  v-show="!userInfo">
              <p>ISLAND</p>
            </div>
            <div class="prop-wrapper">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>密码</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled value="*****"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success" >修改</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 10%">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>手机</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled value="*****"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success" >修改</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 15%">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>邮箱</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled value="*****"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success" >修改</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 20%">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>标签</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled value="*****"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success" >修改</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="info-wrapper">
            <div class="friend-info-wrapper">

            </div>
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
        userInfo: true
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight'
      })
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      handleAvatarFailure (res, file) {
        alert('fail')
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 4

        if (!isJPG) {
          alert('上传头像图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          alert('上传头像图片大小不能超过 4MB!')
        }
        return isJPG && isLt2M
      },
//      ...mapMutations({
//      }),
//      handleSelect (key, keyPath) {
//        console.log(key, keyPath)
//      }
      handleNavClick (key, keyPath) {
        if (key.index === '1') {
          this.userInfo = true
        }
        if (key.index === '2') {
          this.userInfo = false
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
