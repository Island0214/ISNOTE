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
            <div class="name-wrapper">
              <p>{{ username }}</p>
              <el-tooltip class="item" effect="dark" content="点击修改" placement="bottom-end">
                <p class="intro-wrapper" @click="showModifyIntro = true">{{ intro }}</p>
              </el-tooltip>
            </div>
            <div class="prop-wrapper">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>性别</p>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" style="padding: 0; line-height: 5vmin; text-align: left;">
                  <template>
                    <el-radio class="radio" v-model="radio" label="男">男</el-radio>
                    <el-radio class="radio" v-model="radio" label="女">女</el-radio>
                  </template>
                </el-col>
                <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">-->
                  <!--<el-button type="success"  @click="showModifyPassword = true">修改</el-button>-->
                <!--</el-col>-->
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 10%">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>密码</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled value="*****"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success"  @click="showModifyPassword = true">修改</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 15%">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>手机</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled :value="phone"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success" @click="showModifyPhone = true">修改</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 20%">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>邮箱</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled :value="email"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success" @click="showModifyEmail = true">修改</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 25%">
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <p>标签</p>

                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding: 0">
                  <input disabled value="哈哈哈, 嘻嘻嘻"/>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" style="padding: 0">
                  <el-button type="success"  @click="showModifyTags = true">修改</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="info-wrapper" v-show="!userInfo">
            <div class="prop-wrapper" style="top: 5%;">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0">
                  <p>允许谁看我的笔记</p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0;">
                  <el-select v-model="seen" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-col>

              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 15%">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0">
                  <p>允许谁修改我的笔记</p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0;">
                  <el-select v-model="modify" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>

              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 25%">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0">
                  <p>允许谁搜索到我的笔记</p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0;">
                  <el-select v-model="search" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>
            <div class="prop-wrapper" style="top: 35%">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0">
                  <p>将笔记动态显示在社区</p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0;">
                  <el-select v-model="info" placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>

              </el-row>
            </div>
          </div>
        </div>
      </div>

      <div>
        <el-dialog :visible.sync="showModifyIntro"  top="30%">
          <h3 style="top: 0; font-size: 18px;">修改简介</h3>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="newIntro"
          >
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showModifyIntro = false">取 消</el-button>
            <el-button type="primary" @click="modifyInfo">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="showModifyPassword"  top="30%">
          <h3 style="top: 0; font-size: 18px;">修改密码</h3>
          <p style="width: 100%">输入原密码</p>
          <el-input v-model="oldPassword" placeholder="" type="password" class="el-dialog-input"
                    v-bind:class="[!errorOldPassword ? 'input-success' : 'input-error']"
          ></el-input>
          <p style="width: 100%">设置新密码</p>
          <el-input v-model="newPassword1" placeholder="" type="password" class="el-dialog-input"
                    v-bind:class="[!errorNewPassword ? 'input-success' : 'input-error']"
          ></el-input>
          <p style="width: 100%">确认新密码</p>
          <el-input v-model="newPassword2" placeholder="" type="password" class="el-dialog-input"
                    v-bind:class="[!errorNewPassword ? 'input-success' : 'input-error']"
          ></el-input>

          <p class="p-error" style="margin: 0" v-show="errorOldPassword">原密码错误</p>
          <p class="p-error" style="margin: 0" v-show="errorNewPassword">两次密码输入不一致或新密码小于6位</p>

          <div slot="footer" class="dialog-footer">
            <el-button @click="showModifyPassword = false">取 消</el-button>
            <el-button type="primary" @click="modifyPassword">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="showModifyPhone"  top="30%">
          <h3 style="top: 0; font-size: 18px;">修改手机号</h3>
          <p style="width: 100%">输入新手机号</p>
          <el-input class="el-dialog-input" v-on:input="testPhonePattern()"
                    v-bind:class="[!errorPhonePattern ? 'input-success' : 'input-error']" v-model="newPhone"
          ></el-input>
          <p class="p-error" v-show="errorPhonePattern" style="margin: 0;">手机号格式错误</p>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showModifyPhone = false">取 消</el-button>
            <el-button type="primary" @click="modifyPhone">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="showModifyEmail"  top="30%">
          <h3 style="top: 0; font-size: 18px;">修改邮箱</h3>
          <p style="width: 100%">输入新邮箱</p>
          <el-input v-model="newEmail" placeholder="" class="el-dialog-input" v-on:input="testEmailPattern()"
                    v-bind:class="[!errorEmailPattern ? 'input-success' : 'input-error']" :value="newEmail"
          ></el-input>
          <p class="p-error" v-show="errorEmailPattern" style="margin: 0;">邮箱格式错误</p>

          <div slot="footer" class="dialog-footer">
            <el-button @click="showModifyEmail = false">取 消</el-button>
            <el-button type="primary" @click="modifyEmail">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="showModifyTags"  top="30%">
          <h3 style="top: 0; font-size: 18px;">修改标签</h3>

          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            :closable="true"
            :close-transition="false"
            @close="handleCloseTag(tag)"
            style="margin-top: 3vmin"
          >
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button class="button-new-tag" size="small" @click="showInput" v-else>+ New Tag</el-button>


          <div slot="footer" class="dialog-footer">
            <el-button @click="showModifyTags = false">取 消</el-button>
            <el-button type="primary" @click="showModifyTags = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>


    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from '../../store/mutation-types'

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
        userInfo: true,
        options: [{
          value: '选项1',
          label: '所有人'
        }, {
          value: '选项2',
          label: '仅好友'
        }, {
          value: '选项3',
          label: '只有我'
        }],
        options2: [{
          value: '选项4',
          label: '允许'
        }, {
          value: '选项5',
          label: '不允许'
        }],
        showModifyIntro: false,
        showModifyPassword: false,
        showModifyPhone: false,
        showModifyEmail: false,
        showModifyTags: false,
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        newPhone: '',
        newEmail: '',
        newIntro: '',
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        errorPhonePattern: false,
        errorEmailPattern: false,
        errorOldPassword: false,
        errorNewPassword: false,
        textarea: '',
        radio: '无',
        username: '',
        intro: '',
        email: '',
        phone: '',
        seen: '无',
        info: '无',
        search: '无',
        modify: '无',
        count: 0
      }
    },
    computed: {
      ...mapGetters({
        largeSize: 'largeSize',
        mainHeight: 'mainHeight'
      })
    },
    methods: {
      ...mapActions({
        'getUser': 'getUser',
        'modifyUser': 'modifyUser',
        log_in: types.LOG_IN,
        'modifyPasswordAction': 'modifyPassword'
      }),
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
      },
      handleCloseTag (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      testPhonePattern () {
        let phonePattern = /^1[34578]\d{9}$/
        this.errorPhonePattern = !phonePattern.test(this.newPhone)
      },
      testEmailPattern () {
        let emailPattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        this.errorEmailPattern = !emailPattern.test(this.newEmail)
      },
      modifyUserInfo () {
        this.modifyUser({
          body: {
            name: this.username,
            email: this.email,
            phone: this.phone,
            gender: this.radio,
            intro: this.intro,
            icon: '../',
            see: this.seen,
            modify: this.modify,
            search: this.search,
            info: this.info
          },
          onSuccess: (success) => {
            this.$message({
              showClose: true,
              message: success,
              type: 'success'
            })
          },
          onError: (error) => {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          }
        })
      },
      modifyPhone () {
        this.showModifyPhone = false
        if (!this.errorPhonePattern) {
          this.phone = this.newPhone
          this.modifyUserInfo()
        }
      },
      modifyEmail () {
        this.showModifyEmail = false
        if (!this.errorEmailPattern) {
          this.email = this.newEmail
          this.modifyUserInfo()
        }
      },
      modifyInfo () {
        this.showModifyIntro = false
        this.intro = this.newIntro
        this.modifyUserInfo()
      },
      modifyPassword () {
        this.errorNewPassword = false
        this.errorOldPassword = false

        this.log_in({
          body: {
            name: this.username,
            password: this.oldPassword
          },
          onSuccess: () => {
            if (this.newPassword1 !== this.newPassword2 || this.newPassword1.length < 6) {
              this.errorNewPassword = true
            } else {
              this.modifyPasswordAction({
                body: {
                  name: this.username,
                  password: this.newPassword1
                },
                onSuccess: (success) => {
                  this.$message({
                    showClose: true,
                    message: success,
                    type: 'success'
                  })
                  this.showModifyPassword = false
                },
                onError: (error) => {
                  this.$message({
                    showClose: true,
                    message: error,
                    type: 'error'
                  })
                }
              })
            }
          },
          onError: () => {
            this.errorOldPassword = true
          }
        })
      }
    },
    watch: {
      largeSize: function () {
        this.isCollapse = !this.largeSize
      },
      mainHeight: function () {
        this.mainStyle.height = this.mainHeight + 'px'
        this.contentStyle.height = this.mainHeight - 100 + 'px'
      },
      showModifyPhone: function () {
        this.newPhone = ''
        this.errorPhonePattern = false
      },
      showModifyEmail: function () {
        this.newEmail = ''
        this.errorEmailPattern = false
      },
      radio: function () {
        if (this.count > 4) {
          this.modifyUserInfo()
        }
        this.count++
      },
      seen: function () {
        if (this.count > 4) {
          this.modifyUserInfo()
        }
        this.count++
      },
      modify: function () {
        if (this.count > 4) {
          this.modifyUserInfo()
        }
        this.count++
      },
      search: function () {
        if (this.count > 4) {
          this.modifyUserInfo()
        }
        this.count++
      },
      info: function () {
        if (this.count > 4) {
          this.modifyUserInfo()
        }
        this.count++
      }
    },
    mounted () {
      this.getUser({
        onSuccess: (user) => {
          this.newIntro = user.intro
          this.newEmail = user.email
          this.newPhone = user.phone
          this.username = user.name
          this.intro = user.intro
          this.radio = user.gender
          this.phone = user.phone
          this.email = user.email
          this.seen = user.see
          this.modify = user.modify
          this.info = user.info
          this.search = user.search
        },
        onError: (error) => {
          this.$message({
            showClose: true,
            message: error,
            type: 'error'
          })
        }
      })
    }
  }
</script>
<style scoped src="./info.css"></style>
