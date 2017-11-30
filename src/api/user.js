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
  const data = {
    username,
    password,
    remember
  }
  return fetch({
    url: '/signin/index',
    method: 'post',
    data
  })
}
