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
  }
]

export default new Router({
  routes: asyncRouterMap
})

store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
})
