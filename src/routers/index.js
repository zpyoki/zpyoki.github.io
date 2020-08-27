export default [
  {
    path: '/',
    name: 'default',
    redirect: '/home',
    component: () => import('@/views/index/layout/Layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/index/home/Index'),
        meta: { title: '夏日已逝' }
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/index/test/Index'),
    meta: { title: '夏日已逝' }
  }
]
