import request from '@/utils/request'

//列表
export function getList(data) {
    return request({
        url: '/other/pull-new/list',
        method: 'post',
        data
    })
}

//详情
export function getDetail(data) {
    return request({
        url: '/other/pull-new/detail',
        method: 'post',
        data
    })
}

//新增
export function addApi(data) {
    return request({
        url: '/other/pull-new/add',
        method: 'post',
        data
    })
}