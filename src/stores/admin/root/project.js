import axios from '@/helper/axios'
import api from '@/helper/api'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    projectList: [],
    dialogShow: false,
    totalNum: 0
  },
  actions: {
    getProjectList ({ commit }, value = {}) {
      commit('setDialogShow', false)
      let url = api.getProjectList
      axios.post({ url: url, data: value, loading: '.el-table__body-wrapper' }, (res) => {
        commit('setProjectList', res)
      })
    },
    addProject ({ dispatch }, value) {
      value.url = api.addProject
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getProjectList')
        } else {
          Message.error(res.msg)
        }
      })
    },
    editProject ({ dispatch }, value) {
      value.url = api.editProject
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getProjectList')
        } else {
          Message.error(res.msg)
        }
      })
    },
    deleteProject ({ dispatch }, value) {
      axios.post({ url: api.deleteProject, data: value.data }, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getProjectList', value.cond)
        } else {
          Message.error(res.msg)
        }
      })
    },
    setRoot ({ dispatch }, value) {
      value.url = api.setRoot
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getProjectList')
        } else {
          Message.error(res.msg)
        }
      })
    }
  },
  mutations: {
    setProjectList (state, res) {
      if (res.ret === 1) {
        state.projectList = res.data
        state.totalNum = res.total
      } else {
        state.projectList = []
        state.totalNum = 0
        Message.error(res.msg)
      }
    },
    setDialogShow (state, value) {
      state.dialogShow = value
    }
  }
}
