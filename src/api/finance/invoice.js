import request from '@/utils/request'

//发票列表
export function invoiceList(data) {
  return request({
    url: '/invoice/invoice/list',
    method: 'post',
    data
  })
}

//发票详情
export function invoiceDetail(data) {
  return request({
    url: '/invoice/invoice/detail',
    method: 'post',
    data
  })
}

//上传发票
export function invoiceUpload(data) {
  return request({
    url: '/invoice/invoice/upload',
    method: 'post',
    data
  })
}