export default {
  namespaced: true,
  state: {
    test: 1
  },
  getters: {},
  actions: {},
  mutations: {
    // 测试
    setTest (state) {
      state.test = state.test + 1
    }
  }
}
