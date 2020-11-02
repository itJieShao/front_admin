import request from '@/utils/request'

//审核流程列表
export function auditList(data) {
    return request({
        url: '/product/audit/list',
        method: 'post',
        data
    })
}

//获取审核编辑数据
export function auditEditData(data) {
    return request({
        url: '/product/audit/get-edit-data',
        method: 'post',
        data
    })
}

//获取用户(下拉框)
export function userData(data) {
    return request({
        url: '/admin/admin/get-user-data',
        method: 'post',
        data
    })
}

//审核流程编辑
export function auditEdit(data) {
    return request({
        url: '/product/audit/edit',
        method: 'post',
        data
    })
}