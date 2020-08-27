import axios from '@/helper/axios'
import api from '@/helper/api'
import config from '@/helper/config'
import dink from 'dinkjs'
import router from '@/router'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {},
  actions: {
    checkQuickType (ctx, value) {
      switch (value.state) {
        case 'wechatLogin':
          ctx.dispatch('doLogin', { vendor: 1, code: value.code }).then((res) => {
            if (res.code === 0) {
              Message.success('WELCOME TO CHINA')
              ctx.dispatch('successLogin', res.data)
            } else {
              Message.error(res.msg)
            }
          })
          break
        default:
          router.push('/')
      }
    },
    doLogin (ctx, value = {}) {
      return new Promise((resolve) => {
        axios.post({ url: api.login, data: value }, (res) => {
          resolve(res)
        })
      })
    },
    successLogin ({ commit }, value) {
      dink.setStorage('token', value.token)
      // dink.setStorage('ui', value.ui)
      const href = dink.getStorage('redirect') ? dink.getStorage('redirect') : 'adminIndex'
      if (dink.getStorage('redirect')) { dink.removeStorage('redirect') }
      // commit('admin/layout/tab/initPage', {}, { root: true })
      router.replace({ name: href })
    },
    qqLogin ({ dispatch }, value) {
      dink.setStorage('third', dink.encrypt(value.type))
      let url = 'https://graph.qq.com/oauth2.0/authorize'
      url += '?response_type=code'
      url += '&client_id=' + config.qqLogin.appId
      url += '&redirect_uri=' + encodeURI(config.qqLogin.redirect)
      url += '&state=' + value.type
      url += '&scope=get_user_info'
      if (value.type === 'qqBind') {
        return new Promise((resolve) => {
          resolve(url)
        })
      } else {
        dispatch('openThird', url)
      }
    },
    qqLoginCheck ({ dispatch, rootState }, value) {
      value.appid = config.qqLogin.appId
      value.appkey = config.qqLogin.appKey
      value.redirect = encodeURI(config.qqLogin.redirect)
      if (value.state === 'qqBind') {
        value.id = JSON.parse(dink.decrypt(dink.getStorage('ui'))).id
      }
      axios.post({ url: api.qqLoginCheck, data: value }, (res) => {
        dink.setStorage('thirdPlus', dink.encrypt(JSON.stringify(res)))
        window.close()
      })
    },
    openThird ({ dispatch }, value) {
      const win = window.open(value, '', 'width=700, height=400, top=150, left=300')
      const loop = setInterval(() => {
        if (win.closed) {
          clearInterval(loop)
          const third = dink.getStorage('third') ? dink.decrypt(dink.getStorage('third')) : ''
          const thirdPlus = dink.getStorage('thirdPlus') ? JSON.parse(dink.decrypt(dink.getStorage('thirdPlus'))) : ''
          if (thirdPlus) {
            if (thirdPlus.ret === 1) {
              dispatch('successLogin', thirdPlus)
            } else {
              Message.error(thirdPlus.msg)
              router.push('/')
            }
          }
          if (third) { dink.removeStorage('third') }
          if (thirdPlus) { dink.removeStorage('thirdPlus') }
        }
      }, 1000)
    }
  },
  mutations: {
    logout () {
      dink.clearStorage()
      location.reload()
    }
  }
}
