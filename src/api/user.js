import fetch from 'assets/js/util/fetch'

export function getUserInfo (token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

export function loginByUsername (username, password, remember) {
  return fetch({
    url: '/signin/index',
    method: 'post',
    params: {
      username,
      password,
      remember}
  })
}

export function resetPassword (empNo, password) {
  return fetch({
    url: '/user/resetPassword',
    method: 'post',
    params: {empNo, password}
  })
}

export function superResetPassword (returnUrl) {
  return fetch({
    url: '/user/superResetPassword',
    method: 'get',
    params: {returnUrl}
  })
}

export function signout () {
  return fetch({
    url: '/user/signout',
    method: 'get'
  })
}
