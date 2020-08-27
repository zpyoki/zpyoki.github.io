export default {
  path: 'user',
  name: 'adminUser',
  redirect: '/admin/user/role',
  component: () => import('@/views/admin/common/Layout'),
  meta: { title: '用户模块', show: true, auth: true },
  children: [
    {
      path: 'role',
      name: 'adminUserRole',
      component: () => import('@/views/admin/user/role/Index'),
      meta: { title: '角色管理', show: true, auth: true }
    }
  ]
}
