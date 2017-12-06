import fetch from 'assets/js/util/fetch'

export function getFields () {
  return fetch({
    url: '/dataquery/getFields',
    method: 'get'
  })
}

export function getList (f2, f4, date, page, limit) {
  const data = {
    f2,
    f4,
    date,
    page,
    limit
  }
  return fetch({
    url: '/dataquery/getList',
    method: 'get',
    params: data
  })
}
