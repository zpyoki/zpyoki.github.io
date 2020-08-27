import axios from '@/helper/axios'
import api from '@/helper/api'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    powerList: []
  },
  actions: {
    getPowerList ({ commit }, value = {}) {
      return new Promise((resolve) => {
        value.url = api.getPowerList
        axios.post(value, (res) => {
          resolve(res)
        })
      })
    },
    setPower ({ dispatch }, value) {
      return new Promise((resolve) => {
        value.url = api.setPower
        axios.post(value, (res) => {
          if (res.ret === 1) {
            Message.success(res.msg)
            resolve(res)
          } else {
            Message.error(res.msg)
          }
        })
      })
    }
  },
  mutations: {
    setPowerList (state, res) {
      if (res.ret === 1) {
        state.powerList = res.powerList
      } else {
        state.powerList = []
        Message.error(res.msg)
      }
    }
  }
}
