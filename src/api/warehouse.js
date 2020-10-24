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

//配货详情
export function distributionDetail(data) {
  return request({
    url: '/product/distribution/detail',
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

//QC分配列表
export function allocationList(data) {
  return request({
    url: '/product/allocation/list',
    method: 'post',
    data
  })
}

//QC分配详情
export function allocationDetail(data) {
  return request({
    url: '/product/allocation/detail',
    method: 'post',
    data
  })
}

//供应商下拉框
export function supplierList(data) {
  return request({
    url: '/product/supplier/get-list',
    method: 'post',
    data
  })
}

//供应商管理列表
export function getSupplierList(data) {
  return request({
    url: '/product/supplier/list',
    method: 'post',
    data
  })
}

//供应商详情
export function supplierDetail(data) {
  return request({
    url: '/product/supplier/detail',
    method: 'post',
    data
  })
}

//新增/编辑供应商
export function updateSupplier(data) {
  return request({
    url: '/product/supplier/update',
    method: 'post',
    data
  })
}

//新增进货
export function addPurchase(data) {
  return request({
    url: '/product/purchase/add',
    method: 'post',
    data
  })
}
