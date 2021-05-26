import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/other/exceptional/list',
        method: 'post',
        data
    })
}

//详情
export function getDetail(data) {
    return request({
        url: '/other/exceptional/detail',
        method: 'post',
        data
    })
}

//新增
export function addApi(data) {
    return request({
        url: '/other/exceptional/add',
        method: 'post',
        data
    })
}

//禁用
export function disableApi(data) {
    return request({
        url: '/other/exceptional/disable',
        method: 'post',
        data
    })
}