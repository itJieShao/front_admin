import request from '@/utils/request'

//管理员列表
export function userList(data) {
    return request({
        url: '/admin/admin/get-user-list',
        method: 'post',
        data
    })
}

//启用(禁用)管理员
export function userUpdateStatus(data) {
    return request({
        url: '/admin/admin/set-user',
        method: 'post',
        data
    })
}

//获取角色（下拉框用）
export function roleData(data) {
    return request({
        url: '/admin/admin/get-role-data',
        method: 'post',
        data
    })
}

//添加管理员
export function userAdd(data) {
    return request({
        url: '/admin/admin/create-user',
        method: 'post',
        data
    })
}

//删除管理员
export function userRemove(data) {
    return request({
        url: '/admin/admin/remove-user',
        method: 'post',
        data
    })
}

//编辑管理员
export function userEdit(data) {
    return request({
        url: '/admin/admin/edit-user',
        method: 'post',
        data
    })
}

//管理员详情
export function userDetail(data) {
    return request({
        url: '/admin/admin/get-user-row',
        method: 'post',
        data
    })
}