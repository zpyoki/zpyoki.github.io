import store from '@/store'

const loadTab = function (to, hasPermission) {
  let targetName = to.name
  if (targetName.indexOf('Login') === -1) {
    if (hasPermission) {
      let page = { title: to.meta.title, href: to.name, checked: true, from: 'menu' }
      store.dispatch('admin/layout/tab/checkPage', page)
    } else {
      let page = { title: '首页', href: 'adminIndex', checked: true, from: 'menu' }
      store.dispatch('admin/layout/tab/checkPage', page)
    }
  }
}

export default loadTab
