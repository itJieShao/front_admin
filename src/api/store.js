import request from '@/utils/request'

//门店列表
export function vendorList(data) {
    return request({
        url: '/vendor/vendor/get-vendor-list',
        method: 'post',
        data
    })
}

//新增门店
export function vendorAdd(data) {
    return request({
        url: '/vendor/vendor/add-vendor',
        method: 'post',
        data
    })
}

//编辑门店
export function vendorEdit(data) {
    return request({
        url: '/vendor/vendor/save-vendor',
        method: 'post',
        data
    })
}

//门店详情
export function vendorDetail(data) {
    return request({
        url: '/vendor/vendor/get-vendor-data',
        method: 'post',
        data
    })
}

//禁用(启用)门店
export function vendorUpdateStatus(data) {
    return request({
        url: '/vendor/vendor/disable-vendor',
        method: 'post',
        data
    })
}

//门店员工列表
export function vendorStaffList(data) {
    return request({
        url: '/vendor/vendor/get-employee-list',
        method: 'post',
        data
    })
}

//员工任务列表
export function vendorTaskList(data) {
    return request({
        url: '/vendor/vendor/get-employee-task-list',
        method: 'post',
        data
    })
}

//新增员工任务
export function vendorTaskAdd(data) {
    return request({
        url: '/vendor/vendor/add-vendor-task',
        method: 'post',
        data
    })
}

//员工任务详情
export function vendorTaskDetail(data) {
    return request({
        url: '/vendor/vendor/get-employee-task-data',
        method: 'post',
        data
    })
}

//新增员工
export function vendorEmployeeAdd(data) {
    return request({
        url: '/vendor/vendor/add-vendor-employee',
        method: 'post',
        data
    })
}

//编辑员工
export function vendorEmployeeEdit(data) {
    return request({
        url: '/vendor/vendor/save-vendor-employee',
        method: 'post',
        data
    })
}

//员工详情接口
export function vendorEmployeeDetail(data) {
    return request({
        url: '/vendor/vendor/get-employee-data',
        method: 'post',
        data
    })
}