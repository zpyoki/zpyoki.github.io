import axios from '@/helper/axios'
import api from '@/helper/api'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    roleList: [],
    dialogShow: false,
    totalNum: 0
  },
  actions: {
    getRoleList ({ commit, rootState }, value = {}) {
      commit('setDialogShow', false)
      const url = api.getRoleList
      value.project_id = rootState.admin.projectId
      axios.post({ url: url, data: value, loading: '.el-table__body-wrapper' }, (res) => {
        commit('setRoleList', res)
      })
    },
    addRole ({ dispatch }, value) {
      value.url = api.addRole
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getRoleList')
        } else {
          Message.error(res.msg)
        }
      })
    },
    editRole ({ dispatch }, value) {
      value.url = api.editRole
      axios.post(value, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getRoleList')
        } else {
          Message.error(res.msg)
        }
      })
    },
    deleteRole ({ dispatch }, value) {
      axios.post({ url: api.deleteRole, data: value.data }, (res) => {
        if (res.ret === 1) {
          Message.success(res.msg)
          dispatch('getRoleList', value.cond)
        } else {
          Message.error(res.msg)
        }
      })
    }
  },
  mutations: {
    setRoleList (state, res) {
      if (res.ret === 1) {
        state.roleList = res.data
        state.totalNum = res.total
      } else {
        state.roleList = []
        state.totalNum = 0
        Message.error(res.msg)
      }
    },
    setDialogShow (state, value) {
      state.dialogShow = value
    }
  }
}
