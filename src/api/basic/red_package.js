import request from '@/utils/request'

//优惠红包列表
export function couponList(data) {
  return request({
    url: '/order/coupon/list',
    method: 'post',
    data
  })
}

//禁用优惠红包
export function disableCoupon(data) {
  return request({
    url: '/order/coupon/disable',
    method: 'post',
    data
  })
}

//新增优惠红包
export function addCoupon(data) {
  return request({
    url: '/order/coupon/add',
    method: 'post',
    data
  })
}

//优惠红包详情
export function couponDetail(data) {
  return request({
    url: '/order/coupon/detail',
    method: 'post',
    data
  })
}