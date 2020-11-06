import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/admin/user-login',
    method: 'post',
    data
  })
}

export function getUserMenu(role_id) {
  return request({
    url: '/admin/admin/get-home-menu-list',
    method: 'post',
    params: { role_id }
  })
}

export function logout(data) {
  return request({
    url: '/admin/admin/user-logout',
    method: 'post',
    data
  })
}
