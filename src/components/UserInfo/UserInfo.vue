<template>
  <div>
    <div id="main-part" :style="mainStyle">
    </div>


  </div>
</template>

<script>
//  import { mapGetters, mapMutations } from 'vuex'
//  import * as types from '../../store/mutation-types'
//
  export default {
    data () {
      return {
        mainStyle: {
          height: window.innerHeight - 30 + 'px'
        }
      }
    },
//    computed: {
//      ...mapGetters({
//      })
//    },
//    methods: {
//      ...mapMutations({
//      }),
//      handleSelect (key, keyPath) {
//        console.log(key, keyPath)
//      }
//    },
    watch: {
    }
  }
  //  alert(windowHeight)
</script>
<style scoped src="./UserInfo.css"></style>
