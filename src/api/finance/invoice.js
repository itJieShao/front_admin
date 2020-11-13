import request from '@/utils/request'

//发票列表
export function invoiceList(query) {
  return request({
    url: '/invoice/invoice/list',
    method: 'post',
    data: query
  })
}

//发票详情
export function invoiceDetail(query) {
  return request({
    url: '/invoice/invoice/detail',
    method: 'post',
    data: query
  })
}