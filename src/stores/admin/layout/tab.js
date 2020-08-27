import router from '@/router'

export default {
  namespaced: true,
  state: {
    pageMap: ['adminIndex'],
    pageList: [
      { title: '首页', href: 'adminIndex', checked: true, fixed: true }
    ]
  },
  actions: {
    // 右键菜单操作页面tab
    handlerPage ({ commit }, value) {
      if (value.type === '关闭标签' || value.type === '关闭其他标签' || value.type === '关闭全部标签') {
        commit('closePage', value)
      } else if (value.type === '刷新') {
        commit('refreshPage', value.page)
      }
    },
    // 切换页面tab
    checkPage ({ state, commit }, page) {
      if (state.pageMap.indexOf(page.href) > -1) {
        commit('changePage', page)
      } else {
        commit('addPage', page)
      }
    }
  },
  mutations: {
    // 切换页面tab
    changePage (state, page) {
      state.pageList.forEach((item, index) => {
        if (page.href === item.href) {
          state.pageList[index].checked = true
          if (page.from === 'tab') {
            router.push({ name: item.href, params: { activated: false } })
          }
        } else {
          state.pageList[index].checked = false
        }
      })
    },
    // 新增页面tab标签
    addPage (state, page) {
      state.pageList.forEach((item, index) => {
        state.pageList[index].checked = false
      })
      state.pageMap.push(page.href)
      state.pageList.push(page)
    },
    // 关闭页面tab标签
    closePage (state, value) {
      if (value.type === '关闭标签') {
        if (value.page.checked) {
          const href = state.pageMap[state.pageMap.indexOf(value.page.href) - 1]
          router.push({ name: href, params: { activated: false } })
        }
        state.pageMap.splice(state.pageMap.indexOf(value.page.href), 1)
        state.pageList.splice(state.pageList.indexOf(value.page), 1)
      } else if (value.type === '关闭其他标签' || value.type === '关闭全部标签') {
        const closeArr = []
        let href = ''
        state.pageList.forEach(item => {
          if (value.type === '关闭其他标签') {
            if (!item.fixed && item.href !== value.page.href) { closeArr.push(item) }
            href = value.page.href
          }
          if (value.type === '关闭全部标签') {
            if (!item.fixed) { closeArr.push(item) } else { href = item.href }
          }
        })
        closeArr.forEach(item => {
          setTimeout(() => {
            state.pageMap.splice(state.pageMap.indexOf(item.href), 1)
            state.pageList.splice(state.pageList.indexOf(item), 1)
          }, 1)
        })
        router.push({ name: href, params: { activated: false } })
      }
    },
    // 刷新页面
    refreshPage (state, page) {
      if (page.checked) {
        router.push({ name: 'adminIndex' }, () => {
          setTimeout(() => {
            router.push({ name: page.href })
          }, 1)
        })
      } else {
        router.push({ name: page.href })
      }
    },
    // 初始化页面tab
    initPage (state) {
      state.pageMap = ['adminIndex']
      state.pageList = [
        { title: '首页', href: 'adminIndex', checked: true, fixed: true }
      ]
    }
  }
}
