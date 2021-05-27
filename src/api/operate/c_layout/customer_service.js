import request from '@/utils/request'

//获取联系客服
export function getServiceData(data) {
    return request({
        url: '/other/other/get-service-list',
        method: 'post',
        data
    })
}
//编辑联系客服
export function editService(data) {
    return request({
        url: '/other/other/update-service',
        method: 'post',
        data
    })
}