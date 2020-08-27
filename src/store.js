import Vue from 'vue'
import Vuex from 'vuex'
import admin from '@/stores/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    platform: ''
  },
  mutations: {
    // isMobile
    setPlatform (state, value) {
      state.platform = value
    }
  },
  modules: {
    admin
  }
})
