import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/admin/user-login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/admin/admin/user-logout',
    method: 'post',
    data
  })
}

export function changePwd(data) {
  return request({
    url: '/admin/admin/save-user-password',
    method: 'post',
    data
  })
}