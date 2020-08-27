<template>
  <div id="app">
    <transition name="fade-page" mode="out-in">
      <template v-if="keepAlive">
        <keep-alive v-if="keepAlive">
          <router-view/>
        </keep-alive>
      </template>
      <template v-else>
        <router-view/>
      </template>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      keepAlive: false
    }
  },
  created () {
    this.$store.commit('setPlatform', this.isMobile() ? 'mobile' : 'pc')
  },
  methods: {
    isMobile () {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      const flagPad = navigator.userAgent.match(/(iPad)/i)
      return flag && !flagPad
    }
  }
}
</script>

<style lang='stylus'>
  html, body, #app
    user-select auto
    height 100%
    margin 0
    padding 0
    /*dialog样式修改*/
    .el-dialog__wrapper
      position absolute
  /*overflow hidden*/
</style>
