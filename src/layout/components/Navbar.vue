<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <!--        <error-log class="errLog-container right-menu-item hover-effect" />-->

        <!--        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

        <!--        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">-->
        <!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--        </el-tooltip>-->

        <!--        <lang-select class="right-menu-item hover-effect" />-->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--          <router-link to="/profile/index">-->
          <!--            <el-dropdown-item>-->
          <!--              {{ $t('navbar.profile') }}-->
          <!--            </el-dropdown-item>-->
          <!--          </router-link>-->
          <!--          <router-link to="/">-->
          <!--            <el-dropdown-item>-->
          <!--              {{ $t('navbar.dashboard') }}-->
          <!--            </el-dropdown-item>-->
          <!--          </router-link>-->
          <!--          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">-->
          <!--            <el-dropdown-item>-->
          <!--              {{ $t('navbar.github') }}-->
          <!--            </el-dropdown-item>-->
          <!--          </a>-->
          <!--          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
          <!--            <el-dropdown-item>Docs</el-dropdown-item>-->
          <!--          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="alter">修改密码</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--    修改密码的隐藏框-->
    <el-dialog center title="修改密码" width="500px" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="旧密码" prop="pwdEd">
          <el-input v-model="form.pwdEd" type="password" show-password />
        </el-form-item>
        <el-form-item label="设置新密码" prop="pwdNew">
          <el-input v-model="form.pwdNew" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpwd">
          <el-input v-model="form.checkpwd" type="password" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
import request from '../../utils/request'
import { getRoleType, getAccId } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // LangSelect,
    Search
  },
  data() {
    var checkpwd = (rule, value, callback) => {
      const mailReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('密码必须包含字母和数字，且在6-18位之间'))
        }
      })
    }
    return {
      avatar: require('../../assets/img/rightLogo.png'),
      dialogFormVisible: false,
      form: {
        pwdEd: '',
        pwdNew: '',
        checkpwd: ''
      },
      rules: {
        pwdEd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
          // { validator: checkpwd, trigger: 'blur' }
        ],
        pwdNew: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: checkpwd, trigger: 'blur' }],
        checkpwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入确认密码'))
              } else if (value !== this.form.pwdNew) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      // 'avatar',
      'device'
    ])
  },
  methods: {
    alter() {
      this.dialogFormVisible = true
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/test/updatePWd', {
            adminid: getAccId(),
            roletype: getRoleType(),
            password: this.$md5(this.form.pwdEd),
            newPwd: this.$md5(this.form.pwdNew)
          }).then(res => {
            if (res.sign === 1) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
          this.$refs[form].resetFields()
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
      this.dialogFormVisible = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
