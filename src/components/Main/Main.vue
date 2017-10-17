<template>
  <div id="main-part" :style="mainStyle">

  </div>
</template>

<script>
  export default {
    data () {
      return {
        mainStyle: {
          height: window.innerHeight + 'px'
        }
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
