<template>
  <div>
    <el-form ref="form" :model="form" @keyup.enter.native="handlerLogin">
      <div class="login-title">夏日已逝</div>
      <el-form-item prop="name">
        <el-input ref="name" v-model="form.name" placeholder="登录ID：邮箱/手机号"
                  prefix-icon="el-icon-user-solid" autofocus :disabled="loading"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input ref="password" v-model="form.password" placeholder="密码" prefix-icon="el-icon-lock"
                  type="password" show-password :disabled="loading"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="handlerLogin" style="width: 100%;">
          {{login}}
        </el-button>
      </el-form-item>
      <el-form-item style="margin-top: -10px;">
        <el-divider>其他方式登录</el-divider>
        <div class="other-login">
          <div class="other-login-item fa fa-wechat" @click="$emit('changeLoginType', 'wechat')"></div>
          <!--<div class="other-login-item fa fa-qq" @click="qqLogin({ type: 'qqLogin' })"></div>-->
          <div class="other-login-item fa fa-qq"></div>
          <div class="other-login-item fa fa-weibo"></div>
          <div class="other-login-item fa fa-facebook"></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Account',
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      loading: false,
      login: '登录'
    }
  },
  watch: {
    loading (value) {
      this.login = value ? '正在登录' : '登录'
    }
  },
  methods: {
    // 处理登录
    handlerLogin () {
      if (this.form.name === '') {
        this.$message.error('登录ID不能为空')
        this.$refs.name.focus()
      } else if (this.form.password === '') {
        this.$message.error('密码不能为空')
        this.$refs.password.focus()
      } else {
        this.form.vendor = 0
        this.loading = true
        this.doLogin(this.form).then((res) => {
          this.loading = false
          if (res.code === 0) {
            this.$message.success('WELCOME TO CHINA')
            this.$refs.form.resetFields()
            this.successLogin(res.data)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    ...mapActions('admin/login', ['doLogin', 'successLogin'])
  }
}
</script>

<style lang='stylus' scoped>
  .el-input >>> .el-input__inner
    background none
  .other-login
    display flex
    justify-content: space-around
    margin-top 25px
    .other-login-item
      width 30px
      height 30px
      line-height 30px
      border-radius 50%
      cursor pointer
      color #fff
      transition .5s
      &:nth-child(1)
        background #7CD33B
      &:nth-child(2)
        background #0188FB
      &:nth-child(3)
        background #EF0000
      &:nth-child(4)
        background #2B5A99
      &:hover
        transform: scale(1.3, 1.3)
</style>
