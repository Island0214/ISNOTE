<template>
  <div class="right-wrapper" style="z-index: 1;">

    <div class="collections-wrapper" :style="rightWrapperStyle">
      <h1 style="position: relative; float: right; right: 5%; left: 0; width: 100%; text-align: right;">Ta的笔记</h1>

      <h3 v-if="noteList.length === 0" style="width: 100%; text-align: center; position:absolute; top: 45%; color: #ff94a3;">该用户暂无笔记...</h3>


      <el-col :xs="12" :sm="12" :md="8" :lg="6" style="padding: 0; text-align: center" v-for="note in notes">
        <div class="collection-wrapper">
          <div @click="pushToNoteContent(note.id)">
            <h5>{{ note.note_title }}</h5>
            <p>{{ note.note_body.replace(/<\/?.+?>/g, '').replace(/ /g, '') }}</p>
            <h6 style="font-size: 1.2vmin">更新于<br>{{ note.updated_at }}</h6>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['user'],
    components: {
    },
    data () {
      return {
        mainStyle: {
          minHeight: window.innerHeight - 60 + 'px'
        },
        leftWrapperStyle: {
          minHeight: window.innerHeight - 310 + 'px'
        },
        rightWrapperStyle: {
          minHeight: window.innerHeight - 20 + 'px'
        },
        notes: []
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight',
        scrollTop: 'scrollTop',
        noteList: 'noteList'
      })
    },
    watch: {
      mainHeight: function () {
        this.mainStyle.minHeight = this.mainHeight - 60 + 'px'
        this.leftWrapperStyle.minHeight = this.mainHeight - 310 + 'px'
        this.rightWrapperStyle.height = this.mainHeight - 20 + 'px'
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
      pushToNoteContent: function (id) {
//        console.log(id)
        this.$router.push('/user/' + this.user + '/note/' + id)
      }
    },
    mounted () {
      this.notes = this.noteList
    }
  }
</script>

<style scoped src="./User.css"></style>
<style scoped src="../NoteList/NoteList.css"></style>
<style scoped src="../Note/Note.css"></style>
