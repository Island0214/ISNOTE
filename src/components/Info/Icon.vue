<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    action="http://localhost:8000/api/user/uploadIcon"
    :on-success="handleAvatarSuccess"
    :on-failure="handleAvatarFailure"
    :before-upload="beforeAvatarUpload">
    <img v-if="iconImage" :src="iconImage" class="avatar" >
    <!--<div :style="{ backgroundImage: 'url(' + iconImage + ')' }"></div>-->
    <i class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'

  export default {
    props: ['curUserInfo'],
    components: {
    },
    data () {
      return {
        defaultIcon: require('../../assets/icon.png'),
        photoName: '',
        iconUser: {}
      }
    },
    watch: {
      iconUser: function () {
        console.log('watchhhhhhhh:')
      }
    },
    methods: {
      ...mapActions({
        'uploadImage': 'uploadImage',
        'getUser': 'getUser'
      }),
      ...mapMutations('photos', [
        'saveCurrentPhoto'
      ]),
      handleAvatarSuccess (res, file) {
//        this.imageUrl = URL.createObjectURL(file.raw)
//        console.log(this.imageUrl)
      },
      handleAvatarFailure (res, file) {
        alert('fail')
      },
      beforeAvatarUpload (file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 4

        if (!isJPG) {
          alert('上传头像图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          alert('上传头像图片大小不能超过 4MB!')
        }

        let formData = new FormData()
        formData.append('image', file)
//        console.log(formData.get('image'))
//        console.log(formData)
//        console.log(file)

        this.uploadImage({
          onSuccess: (path) => {
            console.log('图片路径：' + path)
            this.iconUser.icon = path.url
            //     Editor.insertEmbed(cursorLocation, 'image', this.path)
//            let url = data.url // Get url from response
//            let name = url.split('/')[url.split('/').length - 1]
//            let path = require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/' + name)
//            require.ensure([], function(require){
//              url = require.context('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/', false, path)
//            });
//            this.imageName.push(JSON.parse(JSON.stringify(path)))
//            Editor.insertEmbed(cursorLocation, 'image', require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/pics/' + this.imageName[0]))
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          },
          body: formData
        })

        return false
      }
    },
    created () {
      this.getUser({
        onSuccess: (user) => {
          this.iconUser = JSON.parse(JSON.stringify(user))
          console.log('iconnnnnnnnnnnnnnnnnnnnnnnnnnn')
          console.log(this.iconUser)
//          let name = user.icon
//          this.imageUrl = require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/local/' + name)
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        }
      })
//      this.photoName = this.curUserInfo.icon
    },
    computed: {
      iconImage: function () {
//        console.log('sad')
        console.log('photoname:' + this.iconUser.icon)
        console.log('iconUser:')
        console.log(this.iconUser)
        if (this.iconUser.icon !== undefined) {
          let name = this.iconUser.icon.split('/')[this.iconUser.icon.split('/').length - 1]
          return require('/Users/island/PhpstormProjects/ISNOTE-SERVER/storage/app/local/' + name)
        } else {
          return require('../../assets/icon.png')
        }
      }
    }
  }
</script>

<style scoped src="./info.css"></style>
