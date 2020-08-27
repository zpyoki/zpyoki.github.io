import axios from '@/helper/axios'
import api from '@/helper/api'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {},
  actions: {
    // qqBindSuccess ({ rootState }, value) {
    //   if (value.ret === 1) {
    //     Message.success(value.msg)
    //   } else {
    //     Message.error(value.msg)
    //   }
    // },
    qqUnbind ({ rootState }) {
      return new Promise((resolve) => {
        let url = api.qqUnbind
        axios.post({ url: url, data: { uid: rootState.admin.userInfo.id }, loading: '#center' }, (res) => {
          resolve(res)
        })
      })
    }
  },
  mutations: {}
}
