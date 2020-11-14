import request from '@/utils/request'

//经营报表
export function customerData(data) {
  return request({
    url: '/customer/customer/all-user-data',
    method: 'post',
    data
  })
}