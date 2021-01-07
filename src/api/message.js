import request from '@/utils/request'

//消息列表
export function messageList(data) {
    return request({
        url: '/other/log/list',
        method: 'post',
        data
    })
}

//消息详情
export function messageDetail(data) {
    return request({
        url: '/other/log/detail',
        method: 'post',
        data
    })
}

//审核消息数量
export function messageCount(data) {
    return request({
        url: '/other/get/audit-msg-num',
        method: 'post',
        data
    })
}