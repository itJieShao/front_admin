import request from '@/utils/request'

//分类列表
export function categoryList(data) {
    return request({
        url: '/product/category/list',
        method: 'post',
        data
    })
}

//获取分类(下拉框)
export function categoryData(data) {
    return request({
        url: '/product/category/get-data',
        method: 'post',
        data
    })
}

//新增/修改分类
export function categoryUpdate(data) {
    return request({
        url: '/product/category/update',
        method: 'post',
        data
    })
}