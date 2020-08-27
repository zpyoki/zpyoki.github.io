<template>
  <div id="center">
    <el-avatar :size="100" :src="cover">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
    </el-avatar>
    <div class="user-center-item">
      <label>帐户余额</label>
      10
      <el-button @click="handlerClick">充值</el-button>
    </div>
    <div class="user-center-item">
      <label>QQ登录</label>
      <el-switch v-model="qq" @change="changeTencentLogin"></el-switch>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Center',
  data () {
    return {
      cover: '',
      qq: false
    }
  },
  computed: {
    ...mapState('admin', ['userInfo'])
  },
  activated () {
    // this.getLatestUserInfo()
    this.cover = this.userInfo.cover
    this.qq = this.userInfo.qq
  },
  methods: {
    ...mapActions('admin', ['setUserInfo']),
    ...mapActions('admin/login', ['qqLogin']),
    ...mapActions('admin/user/center', ['qqUnbind']),
    changeTencentLogin () {
      if (this.qq) {
        this.qq = !this.qq
        this.qqLogin({ type: 'qqBind' }).then((value) => {
          const win = window.open(value, '', 'width=700, height=400, top=150, left=300')
          const loop = setInterval(() => {
            if (win.closed) {
              clearInterval(loop)
              const third = this.$dink.getStorage('third') ? this.$dink.decrypt(this.$dink.getStorage('third')) : ''
              const thirdPlus = this.$dink.getStorage('thirdPlus') ? JSON.parse(this.$dink.decrypt(this.$dink.getStorage('thirdPlus'))) : ''
              if (thirdPlus) {
                if (thirdPlus.ret === 1) {
                  this.qq = !this.qq
                  const tmpUserInfo = JSON.parse(this.$dink.decrypt(this.$dink.getStorage('ui')))
                  tmpUserInfo.qq = this.qq
                  this.$dink.setStorage('ui', this.$dink.encrypt(JSON.stringify(tmpUserInfo)))
                  this.setUserInfo(tmpUserInfo)
                  this.$message.success(thirdPlus.msg)
                } else {
                  this.$message.error(thirdPlus.msg)
                }
              }
              if (third) { this.$dink.removeStorage('third') }
              if (thirdPlus) { this.$dink.removeStorage('thirdPlus') }
            }
          }, 1000)
        })
      } else {
        this.qqUnbind().then((res) => {
          if (res.ret === 1) {
            this.qq = false
            const tmpUserInfo = JSON.parse(this.$dink.decrypt(this.$dink.getStorage('ui')))
            tmpUserInfo.qq = this.qq
            this.$dink.setStorage('ui', this.$dink.encrypt(JSON.stringify(tmpUserInfo)))
            this.$message.success(res.msg)
          } else {
            this.qq = true
            this.$message.error(res.msg)
          }
        })
      }
    },
    handlerClick () {
      this.$router.push({ name: 'default' })
    }
  }
}
</script>

<style lang='stylus' scoped>
  #center
    height 100%
</style>
