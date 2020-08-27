import adminLogin from './admin/login'
import adminLayoutTab from './admin/layout/tab'
import adminLayoutHeader from './admin/layout/header'
// import adminProject from './admin/root/project'
// import adminPower from './admin/root/power'
// import adminTest from './admin/test/test'
// import userMember from './admin/user/member'
import userRole from './admin/user/role'
// import userCenter from './admin/user/center'
import axios from '@/helper/axios'
import api from '@/helper/api'
// import dink from 'dinkjs'

export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: {}
  },
  actions: {
    test () {
      return new Promise((resolve) => {
        const url = api.index
        axios.post({ url: url, data: {} }, (res) => {
          resolve(res)
        })
      })
    }
  },
  mutations: {
    // 初始化/更新userInfo
    setUserInfo (state, info) {
      state.userInfo = info
      state.projectId = info.pid
    }
  },
  modules: {
    login: adminLogin,
    layout: {
      namespaced: true,
      modules: {
        tab: adminLayoutTab,
        header: adminLayoutHeader
      }
    },
    // root: {
    //   namespaced: true,
    //   modules: {
    //     project: adminProject,
    //     power: adminPower,
    //     test: adminTest
    //   }
    // },
    user: {
      namespaced: true,
      modules: {
        // member: userMember,
        // role: userRole,
        role: userRole
        // center: userCenter
      }
    }
  }
}
