<template>
  <div class="info-wrapper">
    <div class="icon-wrapper">
      <img src="../../assets/icon.png" @mouseover="showPopoverView"/>
      <!--<div class="popover-wrapper"></div>-->
      <popover v-if="showPopover" @hidePopoverEvent="hidePopoverView" @enterPopoverEvent="enterPopoverView"></popover>

    </div>
    <div class="content-wrapper">
      <a href="#" @mouseover="showPopoverView">ISLAND</a>
      <p>说：</p>
      <p style="float: right">2017-07-28 11:11:11</p>
      <div class="inner-wrapper">
        <p>HAHAHAHAHAHAHAHHAHAHAHAHAHAHAHAHAHHAHAHAHAHAHAHAHAHAHHAHAHAHAHAHAHAHAHAHHAHAHAHAHAHAHAHAHAHHAHA</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Popover from '../Popover/Popover.vue'

  export default {
    components: {
      Popover
    },
    data () {
      return {
        showPopover: false,
        enterPopover: false
      }
    },
    methods: {
      showPopoverView: function () {
        this.showPopover = true
        window.setTimeout(this.autoClose, 1000)
      },
      hidePopoverView: function () {
        this.showPopover = false
        this.enterPopover = false
      },
      autoClose: function () {
        if (!this.enterPopover) {
          this.hidePopoverView()
        }
      },
      enterPopoverView: function () {
        this.enterPopover = true
      }
    }
  }
</script>

<style scoped src="./Community.css"></style>
