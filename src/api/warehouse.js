import request from '@/utils/request'

//进货列表
export function purchaseList(data) {
  return request({
    url: '/product/purchase/list',
    method: 'post',
    data
  })
}

//生成进货汇总
export function purchaseTotalAdd(data) {
  return request({
    url: '/product/purchase-total/add',
    method: 'post',
    data
  })
}

//进货详情
export function purchaseDetail(data) {
  return request({
    url: '/product/purchase/detail',
    method: 'post',
    data
  })
}

//采购单品列表
export function purchaseProductData(data) {
  return request({
    url: '/product/purchase/product-data',
    method: 'post',
    data
  })
}

//进货汇总列表
export function purchaseTotalList(data) {
  return request({
    url: '/product/purchase-total/list',
    method: 'post',
    data
  })
}

//进货汇总详情
export function purchaseTotalDetail(data) {
  return request({
    url: '/product/purchase-total/detail',
    method: 'post',
    data
  })
}

//更新材料进货价
export function updateMaterialPurchasePrice(data) {
  return request({
    url: '/product/purchase-total/update-material-purchase-price',
    method: 'post',
    data
  })
}

//更新调料进货价
export function updateSeasoningPurchasePrice(data) {
  return request({
    url: '/product/purchase-total/update-seasoning-purchase-price',
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

//盘货管理列表
export function inventoryDetail(data) {
  return request({
    url: '/product/inventory/detail',
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

//报损列表
export function lossList(data) {
  return request({
    url: '/product/loss/list',
    method: 'post',
    data
  })
}

//报损详情
export function lossDetail(data) {
  return request({
    url: '/product/loss/detail',
    method: 'post',
    data
  })
}