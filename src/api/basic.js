import request from '@/utils/request'

//订单管理模块 --- start
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
//订单管理模块 --- end

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

//禁用/启用预设套餐
export function packageUpdateStatus(data) {
  return request({
    url: '/product/package/update-status',
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

//优惠下拉框列表
export function selectCouponList(data) {
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

//禁用/启用预设单品
export function productUpdateStatus(data) {
  return request({
    url: '/product/product/update-status',
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

//材料列表
export function materialList(data) {
  return request({
    url: '/product/material/list',
    method: 'post',
    data
  })
}

//材料详情
export function materialDetail(data) {
  return request({
    url: '/product/material/detail',
    method: 'post',
    data
  })
}

//新增材料
export function materialAdd(data) {
  return request({
    url: '/product/material/add',
    method: 'post',
    data
  })
}

//编辑材料
export function materialEdit(data) {
  return request({
    url: '/product/material/edit',
    method: 'post',
    data
  })
}

//调料列表
export function seasoningList(data) {
  return request({
    url: '/product/seasoning/list',
    method: 'post',
    data
  })
}

//调料详情
export function seasoningDetail(data) {
  return request({
    url: '/product/seasoning/detail',
    method: 'post',
    data
  })
}

//新增调料
export function seasoningAdd(data) {
  return request({
    url: '/product/seasoning/add',
    method: 'post',
    data
  })
}

//编辑调料
export function seasoningEdit(data) {
  return request({
    url: '/product/seasoning/edit',
    method: 'post',
    data
  })
}

//包装列表
export function packageBoxList(data) {
  return request({
    url: '/product/package-box/list',
    method: 'post',
    data
  })
}

//包装详情
export function packageBoxDetail(data) {
  return request({
    url: '/product/package-box/detail',
    method: 'post',
    data
  })
}

//新增包装
export function packageBoxAdd(data) {
  return request({
    url: '/product/package-box/add',
    method: 'post',
    data
  })
}

//编辑包装
export function packageBoxEdit(data) {
  return request({
    url: '/product/package-box/edit',
    method: 'post',
    data
  })
}

//获取材料/调料/包装标签下拉框数据
export function labelData(data) {
  return request({
    url: '/product/label/get-list',
    method: 'post',
    data
  })
}

//获取单位
export function unitData(data) {
  return request({
    url: '/product/unit/get-list',
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

//获取供应商
export function supplierList(data) {
  return request({
    url: '/product/supplier/get-list',
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

//启用/禁用 用户
export function userUpdateStatus(data) {
  return request({
    url: '/customer/customer/disable-user',
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

//用户资料卡券
export function customerCouponList(data) {
  return request({
    url: '/order/coupon/get-customer-coupon-list',
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
//优惠红包管理模块 --- start
//优惠红包列表
export function couponList(data) {
  return request({
    url: '/order/coupon/list',
    method: 'post',
    data
  })
}
//禁用优惠红包
export function disableCoupon(data) {
  return request({
    url: '/order/coupon/disable',
    method: 'post',
    data
  })
}
//新增优惠红包
export function addCoupon(data) {
  return request({
    url: '/order/coupon/add',
    method: 'post',
    data
  })
}
//优惠红包详情
export function couponDetail(data) {
  return request({
    url: '/order/coupon/detail',
    method: 'post',
    data
  })
}
//发券
export function sendCoupon(data) {
  return request({
    url: '/order/coupon/receive',
    method: 'post',
    data
  })
}
//优惠红包管理模块 --- end

//会员卡管理模块 --- start
//会员卡列表
export function memberCardList(data) {
  return request({
      url: '/customer/customer/get-member-card-list',
      method: 'post',
      data
  })
}
//会员卡详情
export function memberCardDetail(data) {
  return request({
      url: '/customer/customer/get-member-card-data',
      method: 'post',
      data
  })
}

export function memberCardGetList(data) {
  return request({
      url: '/customer/customer/get-member-card-get-list',
      method: 'post',
      data
  })
}
//禁用(启用)会员卡
export function updateMemberCard(data) {
  return request({
      url: '/customer/customer/disable-member-card',
      method: 'post',
      data
  })
}
//添加会员卡
export function addMemberCard(data) {
  return request({
      url: '/customer/customer/add-member-card',
      method: 'post',
      data
  })
}
//会员卡管理模块 --- end

//可查看门店列表（用于搜索功能）
export function searchStoreList(data) {
  return request({
    url: '/vendor/vendor/vendor-list',
    method: 'post',
    data
  })
}