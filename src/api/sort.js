import fetch from 'assets/js/util/fetch'

export function getList () {
  return fetch({
    url: '/sort/getList',
    method: 'get'
  })
}

export function save (data) {
  return fetch({
    url: '/sort/save',
    method: 'post',
    data: {data: data}
  })
}
