import Layout from '@/layout'

const storeRouter = {
    path: '/store',
    component: Layout,
    name: 'Store',
    alwaysShow: true,
    meta: { title: '门店管理', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'store_list',
            name: 'StoreList',
            component: () => import('@/views/store/store'),
            meta: { title: '门店列表', icon: 'table', auth: "store_list" }
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
                    meta: { title: '员工列表', icon: 'table', auth: "staff_list" }
                },
                {
                    path: 'staff_add',
                    name: 'StaffAdd',
                    component: () => import('@/views/store/staff/list/edit'),
                    hidden: true,
                    meta: { title: '添加员工', activeMenu: '/store/staff/staff_list' }
                },
                {
                    path: 'staff_edit',
                    name: 'StaffEdit',
                    component: () => import('@/views/store/staff/list/edit'),
                    hidden: true,
                    meta: { title: '编辑员工', activeMenu: '/store/staff/staff_list' }
                },
                {
                    path: 'staff_detail',
                    name: 'StaffDetail',
                    component: () => import('@/views/store/staff/list/detail'),
                    hidden: true,
                    meta: { title: '员工详情', activeMenu: '/store/staff/staff_list' }
                },
                {
                    path: 'staff_task',
                    name: 'StaffTask',
                    component: () => import('@/views/store/staff/task'),
                    meta: { title: '员工任务', icon: 'table', auth: "staff_task_list" }
                },
                {
                    path: 'staff_task_detail',
                    name: 'StaffTaskDetail',
                    component: () => import('@/views/store/staff/task/detail'),
                    hidden: true,
                    meta: { title: '员工任务详情', icon: 'table', activeMenu: "/store/staff/staff_task" }
                },

                {
                    path: 'task_template',
                    name: 'TaskTemplate',
                    component: () => import('@/views/store/staff/task_template'),
                    meta: { title: '任务模板', icon: 'table', auth: "staff_task_list" }
                },
                {
                    path: 'task_template_add',
                    name: 'TaskTemplateAdd',
                    component: () => import('@/views/store/staff/task_template/add'),
                    hidden: true,
                    meta: { title: '添加任务模板', icon: 'table', activeMenu: "/store/staff/task_template" }
                },
                {
                    path: 'task_template_detail',
                    name: 'TaskTemplateDetail',
                    component: () => import('@/views/store/staff/task_template/detail'),
                    hidden: true,
                    meta: { title: '任务模板详情', icon: 'table', activeMenu: "/store/staff/task_template" }
                },
            ]
        },
    ]
}

export default storeRouter