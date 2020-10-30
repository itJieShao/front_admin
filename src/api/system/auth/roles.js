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