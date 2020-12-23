import request from '@/utils/request'

//首页/个人中心banner图列表
export function bannerList(data) {
    return request({
        url: '/other/other/get-home-bar-list',
        method: 'post',
        data
    })
}