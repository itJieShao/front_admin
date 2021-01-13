import request from '@/utils/request'

//问卷列表
export function questionnaireList(data) {
    return request({
        url: '/customer/questionnaire/list',
        method: 'post',
        data
    })
}

//新增问卷
export function questionnaireAdd(data) {
    return request({
        url: '/customer/questionnaire/add',
        method: 'post',
        data
    })
}

//红包/优惠券列表
export function couponData(data) {
    return request({
        url: '/order/coupon/get-data',
        method: 'post',
        data
    })
}

//次数卡列表
export function memberCardData(data) {
    return request({
        url: '/customer/customer/survey-get-member-card-list',
        method: 'post',
        data
    })
}

//问卷详情
export function questionnaireDetail(data) {
    return request({
        url: '/customer/questionnaire/detail',
        method: 'post',
        data
    })
}

//下架问卷
export function questionnaireDisable(data) {
    return request({
        url: '/customer/questionnaire/disable',
        method: 'post',
        data
    })
}

//最近一周客户订单数据
export function getOrderData(data) {
    return request({
        url: '/order/questionnaire/get-order-data',
        method: 'post',
        data
    })
}

//问卷模板列表
export function questionnaireTplList(data) {
    return request({
        url: '/customer/questionnaire-template/list',
        method: 'post',
        data
    })
}

//新增问卷模板
export function questionnaireTplAdd(data) {
    return request({
        url: '/customer/questionnaire-template/add',
        method: 'post',
        data
    })
}

//问卷模板详情
export function questionnaireTplDetail(data) {
    return request({
        url: '/customer/questionnaire-template/detail',
        method: 'post',
        data
    })
}