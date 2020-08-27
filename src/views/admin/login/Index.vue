<template>
  <div style="height: 100%;background: #7CD33B;">
    <el-row type="flex" justify="center" align="middle" style="height: 100%;">
      <div style="box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.2);border-radius: 10px;">
        <el-col class="col-left">
          <img src="@/static/img/loginBg.jpg" style="width: 100%;height: 100%;">
        </el-col>
        <el-col class="col-right">
          <transition name="fade-rotate" mode="out-in">
            <account v-if="loginType === 'account'" @changeLoginType="changeLoginType"></account>
            <wechat v-if="loginType === 'wechat'" @changeLoginType="changeLoginType"></wechat>
          </transition>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import Account from './components/Account'
import Wechat from './components/Wechat'

export default {
  name: 'Index',
  components: { Account, Wechat },
  data () {
    return {
      loginType: 'account'
    }
  },
  methods: {
    changeLoginType (value) {
      this.loginType = value
    }
  }
}
</script>

<style lang='stylus' scoped>
  .el-col
    height 350px
    //box-shadow 0 2px 12px 2px rgba(0, 0, 0, 0.2)
  .col-left
    width 500px
    border-radius 10px 0 0 10px
    img
      border-radius inherit
  .col-right
    width 300px
    background #fff
    border-radius 0 10px 10px 0
    padding 20px
    text-align center
  .col-right >>> .login-title
    padding-bottom 20px
    font-size 20px
    font-weight bold
  .col-right >>> #login
    width 200px
    height 200px
    margin 0 auto
  .col-right >>> .el-button
    margin-top 10px
</style>
