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

//员工今日任务表
export function employeeTaskList(data) {
    return request({
        url: '/vendor/vendor/set-employee-task-list',
        method: 'post',
        data
    })
}

//删除员工今日任务
export function delEmployeeTask(data) {
    return request({
        url: '/vendor/vendor/delete-employee-task',
        method: 'post',
        data
    })
}

//禁用（启用）员工
export function disableEmployee(data) {
    return request({
        url: '/vendor/vendor/disable-employee',
        method: 'post',
        data
    })
}

//门店设备列表
export function vendorDeviceList(data) {
    return request({
        url: '/vendor/device/list',
        method: 'post',
        data
    })
}

//门店设备列表
export function cellTemperature(data) {
    return request({
        url: '/vendor/device/cell-temperature-list',
        method: 'post',
        data
    })
}

//任务下拉框列表
export function vendorTaskData(data) {
    return request({
        url: '/vendor/vendor/vendor-task-list',
        method: 'post',
        data
    })
}

//新增员工任务
export function addEmployeeTask(data) {
    return request({
        url: '/vendor/vendor/add-employee-task',
        method: 'post',
        data
    })
}

//获取时段列表
export function getTimeTypeData(data) {
    return request({
        url: '/vendor/time-type/get-data',
        method: 'post',
        data
    })
}