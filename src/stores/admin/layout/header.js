import axios from '@/helper/axios'
import api from '@/helper/api'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {},
  actions: {
    sendEmail ({ commit }, value = {}) {
      value.url = api.sendEmail
      value.data = {
        to: { '469516494@qq.com': '草摩', 'zpyoki@aliyun.com': '由希' },
        title: '今天什么节日',
        content: '中秋节啊！！！'
      }
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
        } else {
          Message.error(res.msg)
        }
      })
    }
  },
  mutations: {}
}
