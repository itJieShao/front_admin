import request from '@/utils/request'

//审核接口
export function audit(data) {
    return request({
        url: '/product/audit/audit',
        method: 'post',
        data
    })
}

//省列表
export function provinceList(data) {
    return request({
        url: '/vendor/vendor/get-province-list',
        method: 'post',
        data
    })
}

//市列表
export function cityList(data) {
    return request({
        url: '/vendor/vendor/get-city-list',
        method: 'post',
        data
    })
}

//区列表
export function districtList(data) {
    return request({
        url: '/vendor/vendor/get-district-list',
        method: 'post',
        data
    })
}

//运营管理人员列表
export function adminList(data) {
    return request({
        url: '/vendor/vendor/get-admin-list',
        method: 'post',
        data
    })
}

//获取所有门店
export function vendorList(data) {
    return request({
        url: '/vendor/vendor/vendor-list',
        method: 'post',
        data
    })
}

//导出Excle
export function exportExcle(data) {
    return request({
        url: '/other/export/excel',
        method: 'post',
        data
    })
}
