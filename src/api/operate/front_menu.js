import request from '@/utils/request'

//新增/编辑小程序菜单
export function saveMenu(data) {
    return request({
        url: '/product/vendor-menu/update',
        method: 'post',
        data
    })
}

//历史版本菜单
export function historyMenu(data) {
    return request({
        url: '/product/vendor-menu/list',
        method: 'post',
        data
    })
}

//小程序菜单详情
export function menuDetail(data) {
    return request({
        url: '/product/vendor-menu/detail',
        method: 'post',
        data
    })
}


//发布小程序菜单
export function releaseMenu(data) {
    return request({
        url: '/product/vendor-menu/release',
        method: 'post',
        data
    })
}

//小程序菜单时段
export function getTimeTypeData(data) {
    return request({
        url: '/vendor/time-type/get-business-data',
        method: 'post',
        data
    })
}