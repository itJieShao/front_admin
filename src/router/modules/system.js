import Layout from '@/layout'

const systemRouter = {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统设置', icon: 'el-icon-s-help' },
    children: [
        {
            path: '/auth',
            component: () => import('@/views/system/auth'),
            name: 'Auth',
            meta: { title: '账户权限', icon: 'el-icon-s-help' },
            children: [
                {
                    path: 'users',
                    name: 'Users',
                    component: () => import('@/views/system/auth/users'),
                    meta: { title: '管理员列表', icon: 'table' }
                },
                {
                    path: 'roles',
                    name: 'Roles',
                    component: () => import('@/views/system/auth/roles'),
                    meta: { title: '角色列表', icon: 'table' }
                },
            ]
        }
    ],
}

export default systemRouter