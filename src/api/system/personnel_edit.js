import request from '@/utils/request'

//修改QC/配送人员
export function auditList(data) {
    return request({
        url: '/product/audit/list',
        method: 'post',
        data
    })
}