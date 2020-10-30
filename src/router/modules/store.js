import Layout from '@/layout'

const storeRouter = {
    path: '/store',
    component: Layout,
    name: 'Store',
    meta: { title: '门店管理', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'store_list',
            name: 'StoreList',
            component: () => import('@/views/store/store'),
            meta: { title: '门店列表', icon: 'table' }
        },
        {
            path: 'store_detail',
            name: 'StoreDetail',
            hidden: true,
            component: () => import('@/views/store/store/detail'),
            meta: { title: '门店详情', icon: 'table', activeMenu: '/store/store_list' }
        },
        {
            path: 'store_add',
            name: 'StoreAdd',
            hidden: true,
            component: () => import('@/views/store/store/edit'),
            meta: { title: '新增门店', icon: 'table', activeMenu: '/store/store_list' }
        },
        {
            path: 'store_edit',
            name: 'StoreEdit',
            hidden: true,
            component: () => import('@/views/store/store/edit'),
            meta: { title: '编辑门店', icon: 'table', activeMenu: '/store/store_list' }
        },
        {
            path: 'staff',
            name: 'Staff',
            component: () => import('@/views/store/staff'),
            meta: { title: '员工管理', icon: 'table' },
            children: [
                {
                    path: 'staff_list',
                    name: 'StaffList',
                    component: () => import('@/views/store/staff/list'),
                    meta: { title: '员工列表', icon: 'table' }
                },
                {
                    path: 'staff_add',
                    name: 'StaffAdd',
                    component: () => import('@/views/store/staff/list/edit'),
                    hidden: true,
                    meta: { title: '添加员工', icon: 'table', activeMenu: '/store/staff/staff_list' }
                },
                {
                    path: 'staff_edit',
                    name: 'StaffEdit',
                    component: () => import('@/views/store/staff/list/edit'),
                    hidden: true,
                    meta: { title: '编辑员工', icon: 'table', activeMenu: '/store/staff/staff_list' }
                },
                {
                    path: 'staff_task',
                    name: 'StaffTask',
                    component: () => import('@/views/store/staff/task'),
                    meta: { title: '员工任务', icon: 'table' }
                },
                {
                    path: 'staff_task_detail',
                    name: 'StaffTaskDetail',
                    component: () => import('@/views/store/staff/task/detail'),
                    hidden: true,
                    meta: { title: '员工任务详情', icon: 'table', activeMenu: "/store/staff/staff_task" }
                },
            ]
        },
    ]
}

export default storeRouter