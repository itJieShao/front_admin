import request from '@/utils/request'

//进货列表
export function purchaseList(data) {
  return request({
    url: '/product/purchase/list',
    method: 'post',
    data
  })
}

//门店套餐列表
export function vendorPackageList(data) {
  return request({
    url: '/product/purchase/get-vendor-package-data',
    method: 'post',
    data
  })
}

//配货管理列表
export function distributionList(data) {
  return request({
    url: '/product/distribution/list',
    method: 'post',
    data
  })
}

//盘货管理列表
export function inventoryList(data) {
  return request({
    url: '/product/inventory/list',
    method: 'post',
    data
  })
}

//QC管理列表
export function allocationList(data) {
  return request({
    url: '/product/allocation/list',
    method: 'post',
    data
  })
}

//供应商管理列表
export function supplierList(data) {
  return request({
    url: '/product/supplier/list',
    method: 'post',
    data
  })
}

