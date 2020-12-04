import request from '@/utils/request'

//角色列表
export function roleList(data) {
    return request({
        url: '/admin/admin/get-role-list',
        method: 'post',
        data
    })
}

//启用(禁用)角色
export function roleUpdateStatus(data) {
    return request({
        url: '/admin/admin/set-role',
        method: 'post',
        data
    })
}

//角色菜单列表
export function roleMenuList(data) {
    return request({
        url: '/admin/admin/get-menu-list',
        method: 'post',
        data
    })
}

//角色菜单详情
export function roleDetail(data) {
    return request({
        url: '/admin/admin/get-role-row',
        method: 'post',
        data
    })
}

//添加角色
export function addRole(data) {
    return request({
        url: '/admin/admin/create-role',
        method: 'post',
        data
    })
}

//编辑角色
export function editRole(data) {
    return request({
        url: '/admin/admin/edit-role',
        method: 'post',
        data
    })
}

//获取上级角色下拉框列表
export function roleData(data) {
    return request({
        url: '/admin/admin/get-role-data',
        method: 'post',
        data
    })
}

