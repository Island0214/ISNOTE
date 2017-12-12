<template>
  <div>
    <el-col :xs="24" :sm="12" :md="12" :lg="8" style="padding: 0; text-align: center">
      <div class="collection-wrapper">
        <div @click="pushToNote(noteResult.user, noteResult.id)">
          <h5>{{ noteResult.note_title }}</h5>
          <p style="border-radius: 0">{{ noteResult.note_body !== null ? noteResult.note_body.replace(/<\/?.+?>/g, '').replace(/ /g, '') : ''}}</p>
          <h6 style="font-size: 1.2vmin">更新于<br>{{ noteResult.updated_at }}</h6>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    props: ['noteResult'],
    components: {
    },
    data () {
      return {
        mainStyle: {
          minHeight: window.innerHeight - 60 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 110 + 'px'
        }
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop',
        curUsername: 'curUsername'
      })
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 60 + 'px'
        this.leftWrapperStyle.minHeight = this.mainHeight - 110 + 'px'
//      this.contentStyle.height = this.mainHeight - 100 + 'px'
      },
      scrollTop: function () {
        if (this.scrollTop > 80) {
          this.isSticky = true
        } else {
          this.isSticky = false
        }
      },
      largeSize: function () {
      }
    },
    methods: {
      ...mapActions({
      }),
      pushToUser (user) {
        if (user === this.curUsername) {
          this.$router.push('/info')
        } else {
          this.$router.push('/user/' + user)
        }
      },
      pushToNote (user, id) {
        console.log(user + '/2/' + id)
        if (this.curUsername !== user) {
          this.$router.push('/user/' + user + '/note/' + id)
        } else {
          this.$router.push('/workbench/0/' + id)
        }
      }
    },
    mounted: function () {
//      console.log(this.noteResulxxt.id)
    }
  }
</script>

<style scoped src="./Content.css"></style>

