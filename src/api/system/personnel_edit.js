import request from '@/utils/request'

//获取QC/配送人员列表
export function employeeList(data) {
    return request({
        url: '/vendor/employee/get-list-by-station-id',
        method: 'post',
        data
    })
}

//修改QC/配送人员
export function changeEmployee(data) {
    return request({
        url: '/product/supply-chain/change-employee-id',
        method: 'post',
        data
    })
}