import Layout from '@/layout'

const financeRouter = {
    path: '/finance',
    component: Layout,
    name: 'Finance',
    meta: { title: '财务', icon: 'el-icon-s-help' },
    alwaysShow: true,
    children: [
        {
            path: 'invoice',
            component: () => import('@/views/finance/invoice'),
            name: 'Invoice',
            meta: { title: '发票', icon: 'el-icon-s-help' },
        },
        {
            path: 'invoice_detail',
            component: () => import('@/views/finance/invoice/detail'),
            name: 'InvoiceDetail',
            hidden:true,
            meta: { title: '发票详情', activeMenu:'/finance/invoice' },
        },
    ]
}

export default financeRouter