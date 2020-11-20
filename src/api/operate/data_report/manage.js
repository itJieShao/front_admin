import request from '@/utils/request'

//经营报表
export function customerData(data) {
  return request({
    url: '/order/report/business',
    method: 'post',
    data
  })
}