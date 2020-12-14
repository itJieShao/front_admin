import request from '@/utils/request'

//首页banner图列表
export function indexBarList(data) {
    return request({
        url: '/other/other/get-home-bar-list',
        method: 'post',
        data
    })
}