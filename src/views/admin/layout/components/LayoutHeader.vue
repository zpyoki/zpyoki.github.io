<template>
  <div id="layout-header">
    <el-menu class="el-menu-demo"
             mode="horizontal"
             :default-active="$route.name"
             :router="true"
             background-color="#262F3E"
             text-color="#C1C6C8"
             active-text-color="#C1C6C8"
    >
      <el-menu-item index="logo" :route="{ name: 'adminIndex' }" class="logo">LOGO</el-menu-item>
      <el-menu-item index="adminUser" :route="{ name: 'adminUserCenter' }">处理中心</el-menu-item>
      <div class="avater">
        <el-menu-item class="header-item collapse el-icon-s-unfold" @click="changeCollapse"></el-menu-item>
        <el-menu-item class="header-item fa fa-arrows-alt" @click="handleScreenfull"></el-menu-item>
        <el-menu-item class="header-item fa fa-envelope-o" @click="sendEmail"></el-menu-item>
        <el-menu-item class="header-item tips el-icon-bell">
          <el-badge :value="tipsValue" :is-dot="tipsDot" :hidden="tipsHidden" class="tips-item"></el-badge>
        </el-menu-item>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="photo-bg"><img :src="userInfo.cover || '/default.gif'"></span>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">我的消息</el-dropdown-item>
            <el-dropdown-item command="logout"><i class="el-icon-switch-button"></i>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import screenfull from 'screenfull'

export default {
  name: 'LayoutHeader',
  props: ['isCollapse'],
  data () {
    return {
      tipsValue: 3,
      tipsDot: false,
      // tipsHidden: true,
      tipsHidden: false,
      drawerShow: false
    }
  },
  watch: {
    tipsValue (val) {
      if (val > 9) {
        this.tipsDot = true
        this.tipsHidden = false
      } else if (val === 0) {
        this.tipsHidden = true
      } else {
        this.tipsDot = false
        this.tipsHidden = false
      }
    }
  },
  computed: {
    ...mapState('admin', ['userInfo'])
  },
  created () {
    // this.setUserInfo(JSON.parse(this.$dink.decrypt(this.$dink.getStorage('ui'))))
  },
  methods: {
    ...mapActions('admin/layout/header', ['sendEmail']),
    ...mapMutations('admin', ['setUserInfo', 'getUserInfo']),
    ...mapMutations('admin/login', ['logout']),
    init () {
      // this.$dink.ws('www.dink.xyz:2346', { target: 'tips' }, (res) => {
      //   if (res.ret === 1) {
      //     this.tipsValue = res.data
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // })
    },
    changeCollapse () {
      this.$emit('changeCollapse', !this.isCollapse)
    },
    handleScreenfull () {
      screenfull.toggle()
    },
    handleCommand (command) {
      if (command === 'userCenter') {
        this.$router.push({ name: 'adminUser' })
        // this.drawerShow = true
      } else if (command === 'logout') {
        this.logout()
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  #layout-header
    width 100%
    //box-shadow 0 2px 2px 0 rgba(0, 0, 0, 0.1)
    .el-menu.el-menu--horizontal
      border-bottom 0
    .el-menu-demo
      height $layout-header-height
    .el-menu-demo >>> li, .el-menu-demo >>> .el-submenu__title
      height inherit
      line-height $layout-header-height
    .el-menu-demo >>> .is-active, .el-menu-demo .is-active >>> .el-submenu__title
        border-bottom-color $theme!important
    .el-menu-demo >>> .el-menu-item:hover
      color #fff!important
    .header-item
      cursor pointer
      height 100%
      line-height $layout-header-height
      width $layout-header-height
      text-align center
    .logo
      color #fff!important
      width 200px
      text-align center
    .avater
      display inline-block
      cursor pointer
      position absolute
      right 10px
      .el-dropdown-link
        display inline-block
        &:hover
          color #fff
        .photo-bg
          display inline-block
          width $layout-header-height
          height $layout-header-height
          line-height $layout-header-height
          img
            width 40px
            height 40px
            margin-left 8px
            vertical-align middle
            border-radius 10px
    .tips
      height $layout-header-height
      .tips-item
        position absolute
        top -15px
        right 5px
</style>
