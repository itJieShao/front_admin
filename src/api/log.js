import request from '@/utils/request'

//操作日志列表
export function logList(data) {
    return request({
        url: '/admin/get/log-list',
        method: 'post',
        data
    })
}

//日志模块列表
export function logModuleList(data) {
    return request({
        url: '/admin/get/module-list',
        method: 'post',
        data
    })
}