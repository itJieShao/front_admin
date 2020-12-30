import request from '@/utils/request'

//经营报表
export function customerData(data) {
  return request({
    url: '/order/report/business',
    method: 'post',
    data
  })
}

//用户报表 - 用户数据
export function userData(data) {
  return request({
    url: '/report/user/get-all-user-data',
    method: 'post',
    data
  })
}

//用户报表 - 复购数据
export function repurchaseData(data) {
  return request({
    url: '/report/order/get-re-purchase',
    method: 'post',
    data
  })
}