import request from '@/utils/request'

//订单列表
export function orderList(data) {
  return request({
    url: '/order/order/list',
    method: 'post',
    data
  })
}

//订单详情
export function orderDetail(data) {
  return request({
    url: '/order/order/detail',
    method: 'post',
    data
  })
}

//门店列表
export function storeList(data) {
  return request({
    url: '/vendor/vendor/get-vendor-list',
    method: 'post',
    data
  })
}

//可查看门店列表（用于搜索功能）
export function searchStoreList(data) {
  return request({
    url: '/vendor/vendor/vendor-list',
    method: 'post',
    data
  })
}

//预设套餐列表
export function packageList(data) {
  return request({
    url: '/product/package/list',
    method: 'post',
    data
  })
}

//添加/编辑预设套餐
export function updatePackage(data) {
  return request({
    url: '/product/package/update',
    method: 'post',
    data
  })
}

//添加/编辑门店套餐
export function updateVendorPackage(data) {
  return request({
    url: '/product/vendor-package/update',
    method: 'post',
    data
  })
}

//添加/编辑门店套餐
export function updateProduct(data) {
  return request({
    url: '/product/product/update',
    method: 'post',
    data
  })
}

//门店套餐列表
export function vendorPackageList(data) {
  return request({
    url: '/product/vendor-package/list',
    method: 'post',
    data
  })
}

//门店套餐上下架
export function vendorPackageUpdateStatus(data) {
  return request({
    url: '/product/vendor-package/update-status',
    method: 'post',
    data
  })
}

//优惠列表
export function couponList(data) {
  return request({
    url: '/order/coupon/get-discount-list',
    method: 'post',
    data
  })
}

//预设单品列表
export function productList(data) {
  return request({
    url: '/product/product/list',
    method: 'post',
    data
  })
}

//预设单品详情
export function productDetail(data) {
  return request({
    url: '/product/product/detail',
    method: 'post',
    data
  })
}

//套餐标签列表
export function packageLabelList(data) {
  return request({
    url: '/product/package/get-label-list',
    method: 'post',
    data
  })
}

//预设套餐详情接口
export function packageDetail(data) {
  return request({
    url: '/product/package/detail',
    method: 'post',
    data
  })
}

//门店套餐详情接口
export function vendorPackageDetail(data) {
  return request({
    url: '/product/vendor-package/detail',
    method: 'post',
    data
  })
}

//预设单品标签列表
export function labelList(data) {
  return request({
    url: '/product/label/get-label-list',
    method: 'post',
    data
  })
}

//获取包装
export function packageBox(data) {
  return request({
    url: '/product/package-box/get-data',
    method: 'post',
    data
  })
}

//获取供应商
export function supplierList(data) {
  return request({
    url: '/product/supplier/get-list',
    method: 'post',
    data
  })
}

//获取味型  
export function tasteList(data) {
  return request({
    url: '/product/taste/get-data',
    method: 'post',
    data
  })
}

//获取材料  
export function materialData(data) {
  return request({
    url: '/product/material/get-data',
    method: 'post',
    data
  })
}

//获取调料
export function seasoningData(data) {
  return request({
    url: '/product/seasoning/get-data',
    method: 'post',
    data
  })
}

//会员卡列表
export function memberCardList(data) {
  return request({
    url: '/customer/customer/get-member-card-list',
    method: 'post',
    data
  })
}

//门店单品列表
export function vendorProductList(data) {
  return request({
    url: '/product/vendor-product/list',
    method: 'post',
    data
  })
}

//用户列表
export function userList(data) {
  return request({
    url: '/customer/customer/get-user-list',
    method: 'post',
    data
  })
}

//用户积分列表
export function integralList(data) {
  return request({
    url: '/customer/customer/get-integral-list',
    method: 'post',
    data
  })
}

//用户资料
export function customerDetail(data) {
  return request({
    url: '/customer/customer/get-user-data',
    method: 'post',
    data
  })
}

//上传图片接口
export function uploadImg(data) {
  return request({
    url: '/vendor/vendor/upload_image',
    method: 'post',
    data
  })
}