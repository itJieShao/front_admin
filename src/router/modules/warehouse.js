import Layout from '@/layout'

const warehouseRouter = {
    path: '/warehouse',
    component: Layout,
    name: 'Warehouse',
    meta: { title: '仓库管理', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'purchase',
            name: 'Purchase',
            component: () => import('@/views/warehouse/purchase'),
            meta: { title: '进货管理', icon: 'table' }
        },
        {
            path: 'purchase_add',
            name: 'Purchase_add',
            hidden: true,
            component: () => import('@/views/warehouse/purchase/add'),
            meta: { title: '新增进货', activeMenu: '/warehouse/purchase' }
        },
        {
            path: 'distribution',
            name: 'Distribution',
            component: () => import('@/views/warehouse/distribution'),
            meta: { title: '配货管理', icon: 'tree' },
        },
        {
            path: 'distribution_detail',
            name: 'DistributionDetail',
            hidden: true,
            component: () => import('@/views/warehouse/distribution/detail'),
            meta: { title: '配货详情', activeMenu: '/warehouse/distribution' }
        },
        {
            path: 'inventory',
            name: 'Inventory',
            component: () => import('@/views/warehouse/inventory'),
            meta: { title: '盘货管理', icon: 'tree' }
        },
        {
            path: 'frmLoss',
            name: 'FrmLoss',
            component: () => import('@/views/warehouse/frmLoss'),
            meta: { title: '报损管理', icon: 'tree' }
        },
        {
            path: 'allocation',
            name: 'Allocation',
            component: () => import('@/views/warehouse/allocation'),
            meta: { title: '调拨管理', icon: 'tree' }
        },
        {
            path: 'qc',
            name: 'Qc',
            component: () => import('@/views/warehouse/qc'),
            meta: { title: 'QC管理', icon: 'tree' }
        },
        {
            path: 'supplier',
            name: 'Supplier',
            component: () => import('@/views/warehouse/supplier'),
            meta: { title: '供应商管理', icon: 'tree' }
        }
    ]
}

export default warehouseRouter