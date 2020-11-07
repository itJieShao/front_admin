import Layout from '@/layout'

const messageRouter = {
    path: '/message',
    component: Layout,
    name: 'Message',
    meta: { title: '消息中心', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'index',
            component: () => import('@/views/message'),
            name: 'Index',
            meta: { title: '消息中心', icon: 'el-icon-s-help' },
        },
        {
            path: 'detail',
            component: () => import('@/views/message/detail'),
            name: 'Detail',
            hidden:true,
            meta: { title: '消息详情', activeMenu:'/message/index' },
        },
    ]
}

export default messageRouter