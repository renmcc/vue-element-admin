import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/userAuth/',
    method: 'post',
    data
  })
}

export function getInfo(name) {
  return request({
    url: `/api/userInfo/${name}/`,
    method: 'get'
  })
}

export function updateInfo(name, data) {
  return request({
    url: `/api/userInfo/${name}/`,
    method: 'patch',
    data
  })
}

export function changePassword(data) {
  return request({
    url: `/api/changePassword/`,
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
