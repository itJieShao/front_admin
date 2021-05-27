import request from '@/utils/request'

//套餐报表
export function mealData(data) {
  return request({
    url: '/report/package/get-package-data',
    method: 'post',
    data
  })
}