import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/user/center',
        component: () => import('@/views/user/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/book',
    name: 'book',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: '图书管理', icon: 'documentation', roles: ['ceshi'] },
    children: [
      {
        path: '/book/create',
        name: 'BookCreate',
        component: () => import('@/views/book/create'),
        meta: { title: '上传图书', icon: 'edit', roles: ['ceshi'], keepAlive: true }
      },
      {
        path: '/book/edit',
        name: 'bookEdit',
        component: () => import('@/views/book/edit'),
        hidden: true,
        meta: { title: '编辑图书', icon: 'edit', roles: ['ceshi'], activeMenu: '/book/list' }
      },
      {
        path: '/book/list',
        name: 'BookList',
        component: () => import('@/views/book/list'),
        meta: { title: '图书列表', icon: 'list', roles: ['ceshi'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
