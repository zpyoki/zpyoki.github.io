import user from './admin/user'

export default [
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/index',
    component: () => import('@/views/admin/layout/Layout'),
    children: [
      {
        path: 'index',
        name: 'adminIndex',
        component: () => import('@/views/admin/index/Index'),
        meta: { title: '项目首页', icon: 'el-icon-s-help', show: true, auth: true }
      },
      {
        path: 'user/center',
        name: 'adminUserCenter',
        component: () => import('@/views/admin/user/center/Center'),
        meta: { title: '个人中心', show: false, auth: true }
      },
      user,
      {
        path: 'test',
        name: 'adminTest',
        component: () => import('@/views/admin/test/test/Test'),
        meta: { title: '测试', show: true, auth: true }
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('@/views/admin/login/Index'),
    meta: { title: '登录' }
  },
  {
    path: '/admin/quick',
    name: 'adminQuick',
    component: () => import('@/views/admin/common/Quick'),
    meta: { title: '跳转中...' }
  },
  {
    path: '/admin/loginThird',
    name: 'adminLoginThird',
    component: () => import('@/views/admin/login/LoginThird'),
    meta: { title: '第三方登录' }
  }
]
