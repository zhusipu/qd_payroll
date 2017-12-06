import fetch from 'assets/js/util/fetch'

export function getUploadUrl () {
  return process.env.BASE_API + '/import/upload'
}

export function save (data) {
  return fetch({
    url: '/sort/save',
    method: 'post',
    data: {data: data}
  })
}
