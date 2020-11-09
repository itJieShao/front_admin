import Layout from '@/layout'

const operateRouter = {
    path: '/operate',
    component: Layout,
    name: 'Operate',
    meta: { title: '运营', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'front_menu',
            component: () => import('@/views/operate/front_menu'),
            name: 'FrontMenu',
            meta: { title: '小程序菜单管理', icon: 'el-icon-s-help' },
        },
        {
            path: 'data_report',
            component: () => import('@/views/operate/data_report'),
            name: 'DataReport',
            meta: { title: '数据报表', icon: 'el-icon-s-help' },
            children: [
                {
                    path: 'manage',
                    component: () => import('@/views/operate/data_report/manage'),
                    name: 'Manage',
                    meta: { title: '经营报表', icon: 'el-icon-s-help', },
                }
            ]
        },
    ]
}

export default operateRouter