import request from '@/utils/request'

//修改QC/配送人员
export function changeEmployee(data) {
    return request({
        url: '/product/supply-chain/change-employee-id',
        method: 'post',
        data
    })
}