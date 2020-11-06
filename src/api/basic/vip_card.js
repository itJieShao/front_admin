import request from '@/utils/request'

//会员卡列表
export function memberCardList(data) {
    return request({
        url: '/customer/customer/get-member-card-list',
        method: 'post',
        data
    })
}

//禁用(启用)会员卡
export function updateMemberCard(data) {
    return request({
        url: '/customer/customer/disable-member-card',
        method: 'post',
        data
    })
}

//添加会员卡
export function addMemberCard(data) {
    return request({
        url: '/customer/customer/add-member-card',
        method: 'post',
        data
    })
}
