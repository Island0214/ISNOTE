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
            <el-menu-item index="1">
              <i class="el-icon-menu i-button"></i>
              <span slot="title">账 户 设 置</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting i-button"></i>
              <span slot="title">隐 私 设 置</span>
            </el-menu-item>
          </el-menu>
        </div>

      </div>
      <div class="right-wrapper" :style="contentStyle">
        <div class="inner-wrapper">

        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  //  import * as types from '../../store/mutation-types'
  //
  export default {
    data () {
      return {
        mainStyle: {
          height: window.innerHeight + 'px'
        },
        contentStyle: {
          height: window.innerHeight - 100 + 'px'
        },
        isCollapse: false
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize'
      })
    },
    methods: {
//      ...mapMutations({
//      }),
//      handleSelect (key, keyPath) {
//        console.log(key, keyPath)
//      }
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
//        alert(this.largeSize)
      }
    }
  }
  //  alert(windowHeight)
</script>
<style scoped src="./info.css"></style>
