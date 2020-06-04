import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/userAuth/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/userInfo/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
