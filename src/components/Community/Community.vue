<template>
  <div id="main-wrapper" :style="mainStyle">
    <el-row :gutter="10" style="margin: 0">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" style="padding: 0; overflow: hidden" id="left-col" :class="{'sticky': isSticky}">
        <div class="left-wrapper" :style="leftWrapperStyle">
          <div class="inner-border">
          </div>
          <h1>社 区。</h1>

        </div>
      </el-col>

      <el-col :xs="6" :sm="6" :md="6" :lg="6" style="padding: 0; overflow: hidden">
        <div style="min-height: 1px; background-color: #ffffff00"></div>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" style="padding: 0;">
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
          minHeight: window.innerHeight - 100 + 'px'
        },
        isSticky: false
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
