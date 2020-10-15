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

//门店套餐列表
export function vendorPackageList(data) {
  return request({
    url: '/product/vendor-package/list',
    method: 'post',
    data
  })
}

//预约单品列表
export function productList(data) {
  return request({
    url: '/product/product/list',
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

//预约单品列表
export function labelList(data) {
  return request({
    url: '/product/label/get-label-list',
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

//用户列表
export function userList(data) {
  return request({
    url: '/customer/customer/get-user-list',
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