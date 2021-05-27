import request from '@/utils/request'

//关于我们数据
export function aboutData(data) {
    return request({
        url: '/other/other/get-about-us-new',
        method: 'post',
        data
    })
}

//保存关于我们
export function saveAbout(data) {
    return request({
        url: '/other/other/edit-about-us',
        method: 'post',
        data
    })
}