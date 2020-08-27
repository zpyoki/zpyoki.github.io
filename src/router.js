import Vue from 'vue'
import Router from 'vue-router'
import dink from 'dinkjs'
import index from '@/routers/index'
import admin from '@/routers/admin'
// index
// import loadIndexRouter from '@/routers/index/loadRouter'
// admin
// import loadAdminRouter from '@/routers/admin/loadRouter'
// plugins
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false, trickleSpeed: 200, minimum: 0.3 })

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...index,
    ...admin,
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404'),
      meta: { title: '404' }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // NProgress.start()
  // 页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 路由是否存在
  if (to.matched.length) {
    // auth是否需要登录
    if (to.meta.auth) {
      if (dink.getStorage('token')) {
        next()
        // 缺少checkPagePermission
      } else {
        next({ name: 'adminLogin' })
      }
    } else {
      next()
    }
  } else {
    // 路由不存在
    next('/404')
  }
})

router.afterEach((to, from) => {
  // NProgress.done()
})

export default router
