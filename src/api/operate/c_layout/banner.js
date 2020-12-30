import request from '@/utils/request'

//首页/个人中心banner图列表
export function bannerList(data) {
    return request({
        url: '/other/other/get-home-bar-list',
        method: 'post',
        data
    })
}

//首页/个人中心banner图详情
export function bannerDetail(data) {
    return request({
        url: '/other/other/bar-detail',
        method: 'post',
        data
    })
}

//新增/编辑 首页/个人banner图
export function saveBanner(data) {
    return request({
        url: '/other/other/update-home-bar',
        method: 'post',
        data
    })
}

//排序 首页/个人banner图
export function sortBanner(data) {
    return request({
        url: '/other/other/bar-order',
        method: 'post',
        data
    })
}

//删除 首页/个人banner图
export function delBanner(data) {
    return request({
        url: '/other/other/delete-home-bar',
        method: 'post',
        data
    })
}