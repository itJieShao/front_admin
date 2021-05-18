import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/product/vendor-menu-purchased/list',
        method: 'post',
        data
    })
}

//详情
export function getDetail(data) {
    return request({
        url: '/product/vendor-menu-purchased/detail',
        method: 'post',
        data
    })
}

//禁用/启用
export function updateStatus(data) {
    return request({
        url: '/product/vendor-menu-purchased/update-status',
        method: 'post',
        data
    })
}