<template>
  <div>
    <div class="login-title">微信登录</div>
    <div id="login"></div>
    <el-button @click="$emit('changeLoginType', 'account')" type="primary" style="width: 180px;">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'Wechat',
  mounted () {
    this.$dink.login.wechat({
      appid: this.$config.login.wechat.appId,
      redirect_uri: encodeURI('https://www.dink.xyz/admin/quick'),
      state: 'wechatLogin'
    })
  }
}
</script>

<style lang='stylus' scoped></style>
