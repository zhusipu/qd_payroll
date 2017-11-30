import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getToken} from 'assets/js/util/auth'
import store from './store'
import { Message } from 'element-ui'
const whiteList = ['/signin', '/authredirect']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/signin') {
      next({path: '/'})
      NProgress.done()
    } else {
      store.dispatch('GetUserInfo').then(res => {
        store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          console.log(1)
          next()
          NProgress.done()
        })
      }).catch(() => {
        store.dispatch('FedLogOut').then(() => {
          Message.error('验证失败,请重新登录')
          next({ path: '/signin' })
        })
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      console.log(111)
      next('/signin') // 否则全部重定向到登录页
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})
