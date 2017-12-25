import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Signin from '@/components/signin/signin'
import Layout from '@/components/layout/layout'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = []
export const asyncRouterMap = [
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '',
    component: Layout,
    redirect: 'import',
    hidden: true
  },
  {
    path: '/import',
    component: Layout,
    redirect: '/import/index',
    children: [{
      path: 'index',
      component: _import('import/index'),
      name: 'import',
      meta: {
        title: '导入',
        icon: 'upload',
        noCache: false
      }
    }]
  },
  {
    path: '/sort',
    component: Layout,
    redirect: '/sort/index',
    children: [{
      path: 'index',
      component: _import('sort/index'),
      name: 'sort',
      meta: {
        title: '字段排序',
        icon: 'sort',
        noCache: false
      }
    }]
  },
  {
    path: '/dataquery',
    component: Layout,
    redirect: '/dataquery/index',
    children: [{
      path: 'index',
      component: _import('dataquery/index'),
      name: 'dataquery',
      meta: {
        title: '数据查询',
        icon: 'database',
        noCache: false
      }
    }]
  },
  {
    path: '/resetpassword',
    component: Layout,
    redirect: '/resetpassword/index',
    children: [{
      path: 'index',
      component: _import('resetpassword/index'),
      name: 'resetpassword',
      meta: {
        title: '查看薪资密码重置',
        icon: 'key',
        noCache: false
      }
    }]
  },
  {
    path: '/superresetpassword',
    component: Layout,
    redirect: '/superresetpassword/index',
    children: [{
      path: 'index',
      component: _import('superresetpassword/index'),
      name: 'superresetpassword',
      meta: {
        title: '管理员密码重置',
        icon: 'key',
        noCache: false
      }
    }]
  },
  {
    path: '/signout',
    component: Layout,
    redirect: '/signout/index',
    children: [{
      path: 'index',
      component: _import('signout/index'),
      name: 'signout',
      meta: {
        title: '退出',
        icon: 'sign-out',
        noCache: false
      }
    }]
  }
]

export default new Router({
  routes: asyncRouterMap
})

store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
})
