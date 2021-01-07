import Layout from '@/layout'

const logRouter = {
    path: '/log',
    component: Layout,
    name: 'Log',
    redirect: '/log/index',
    meta: { title: '操作日志', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'index',
            component: () => import('@/views/log'),
            name: 'Index',
            meta: { title: '操作日志', icon: 'el-icon-s-help', auth: "operation_log" },
        },
    ]
}

export default logRouter