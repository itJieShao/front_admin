import request from '@/utils/request'

//门店优惠促销公告列表
export function storeNoticeList(data) {
    return request({
        url: '/other/other/get-notice-list',
        method: 'post',
        data
    })
}

//新增/编辑门店优惠促销公告
export function editStoreNotice(data) {
    return request({
        url: '/other/other/update-notice',
        method: 'post',
        data
    })
}

//门店优惠促销公告详情
export function storeNoticeDetail(data) {
    return request({
        url: '/other/other/get-notice',
        method: 'post',
        data
    })
}