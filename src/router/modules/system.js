import Layout from '@/layout'

const systemRouter = {
    path: '/system',
    component: Layout,
    name: 'System',
    alwaysShow: true,
    meta: { title: '系统设置', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'auth',
            component: () => import('@/views/system/auth'),
            name: 'Auth',
            meta: { title: '账户权限', icon: 'el-icon-s-help' },
            alwaysShow: true,
            children: [
                {
                    path: 'users',
                    name: 'Users',
                    component: () => import('@/views/system/auth/users'),
                    meta: { title: '管理员列表', icon: 'table', auth: "users_list" }
                },
                {
                    path: 'roles',
                    name: 'Roles',
                    component: () => import('@/views/system/auth/roles'),
                    meta: { title: '角色列表', icon: 'table', auth: "roles_list" }
                },
            ]
        },
        {
            path: 'category',
            component: () => import('@/views/system/category'),
            name: 'Category',
            meta: { title: '分类', icon: 'el-icon-s-help', auth: "category_list" },
        },
        {
            path: 'examine',
            component: () => import('@/views/system/examine'),
            name: 'Examine',
            meta: { title: '审核流程', icon: 'el-icon-s-help', auth: "examine_list" },
        },
        {
            path: 'examine_edit',
            component: () => import('@/views/system/examine/edit'),
            name: 'ExamineEdit',
            hidden: true,
            meta: { title: '审核编辑', icon: 'el-icon-s-help', activeMenu: '/system/examine' },
        },
        {
            path: 'personnel_edit',
            component: () => import('@/views/system/personnel_edit'),
            name: 'PersonnelEdit',
            meta: { title: '设置检测/配送人员', icon: 'el-icon-s-help', auth: "change_supply_chain_employee" },
        },
    ],
}

export default systemRouter