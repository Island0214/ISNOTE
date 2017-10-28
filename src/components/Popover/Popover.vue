<template>
  <div class="popover-wrapper" v-if="showPopover1" @mouseover="sendEnterPopoverView" @mouseleave="sendHidePopoverView">
    <div class="up-wrapper"></div>
    <div class="icon-wrapper">
      <img src="../../assets/icon.png"/>
    </div>
    <div class="info-wrapper">
      <h3>ISLAND</h3>
      <p>safdgfhfjgkhfgdsdsfgfdhgjknb</p>
    </div>
    <div class="button-wrapper">
      <el-button type="default">关 注</el-button>
    </div>
    <div class="follow-wrapper">
      <p>关注</p>
      <a href="">12</a>
      <p>被关注</p>
      <a href="">11</a>
    </div>
  </div>
</template>

<script>
  export default {
//    props: ['showPopover'],
    data () {
      return {
        showPopover1: true
      }
    },
    methods: {
      sendHidePopoverView: function () {
        this.$emit('hidePopoverEvent')
      },
      sendEnterPopoverView: function () {
        this.$emit('enterPopoverEvent')
      }
    }
  }
</script>

<style scoped src="./Popover.css"></style>

