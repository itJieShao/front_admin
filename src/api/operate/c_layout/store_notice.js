import request from '@/utils/request'

//门店优惠促销公告列表
export function storeNoticeList(data) {
    return request({
        url: '/other/other/get-notice-list-new',
        method: 'post',
        data
    })
}