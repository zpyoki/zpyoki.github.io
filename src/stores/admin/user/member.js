import axios from '@/helper/axios'
import api from '@/helper/api'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    userList: [],
    roleList: [],
    dialogShow: false,
    totalNum: 0
  },
  actions: {
    getUserList ({ commit, rootState }, value = {}) {
      commit('setDialogShow', false)
      let url = api.getUserList
      value.project_id = rootState.admin.projectId
      axios.post({ url: url, data: value, loading: '.el-table__body-wrapper' }, (res) => {
        commit('setUserList', res)
      })
    },
    getRoleListByUserId ({ commit, rootState }, value = {}) {
      let url = api.getRoleList
      value.project_id = rootState.admin.projectId
      axios.post({ url: url, data: value }, (res) => {
        commit('getRoleListByUserId', res)
      })
    },
    addMember ({ dispatch }, value) {
      value.url = api.addMember
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getUserList')
        } else {
          Message.error(res.msg)
        }
      })
    },
    editMember ({ dispatch }, value) {
      value.url = api.editMember
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getUserList')
        } else {
          Message.error(res.msg)
        }
      })
    },
    deleteMember ({ dispatch }, value) {
      axios.post({ url: api.deleteMember, data: value.data }, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getUserList', value.cond)
        } else {
          Message.error(res.msg)
        }
      })
    }
  },
  mutations: {
    setUserList (state, res) {
      if (res.ret === 1) {
        state.userList = res.data
        state.totalNum = res.total
      } else {
        state.userList = []
        state.totalNum = 0
        Message.error(res.msg)
      }
    },
    getRoleListByUserId (state, res) {
      if (res.ret === 1) {
        state.roleList = res.data
      } else {
        state.roleList = []
        Message.error(res.msg)
      }
    },
    setDialogShow (state, value) {
      state.dialogShow = value
    }
  }
}
