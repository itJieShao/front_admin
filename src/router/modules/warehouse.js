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
            meta: { title: '进货管理', icon: 'table' },
            children: [
                {
                    path: 'purchase_list',
                    name: 'PurchaseList',
                    component: () => import('@/views/warehouse/purchase/list'),
                    meta: { title: '进货列表', icon: 'table' }
                },
                {
                    path: 'purchase_detail',
                    name: 'PurchaseDetail',
                    hidden: true,
                    component: () => import('@/views/warehouse/purchase/list/detail'),
                    meta: { title: '进货详情', activeMenu: '/warehouse/purchase/purchase_list' }
                },
                {
                    path: 'purchase_add',
                    name: 'PurchaseAdd',
                    hidden: true,
                    component: () => import('@/views/warehouse/purchase/list/add'),
                    meta: { title: '新增进货', activeMenu: '/warehouse/purchase/purchase_list' }
                },
                {
                    path: 'summary_list',
                    name: 'SummaryList',
                    component: () => import('@/views/warehouse/purchase/summary'),
                    meta: { title: '进货汇总管理', icon: 'table' }
                },
                {
                    path: 'summary_detail',
                    name: 'SummaryDetail',
                    hidden: true,
                    component: () => import('@/views/warehouse/purchase/summary/detail'),
                    meta: { title: '进货汇总详情', activeMenu: '/warehouse/purchase/summary_list' }
                },
            ]
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
            path: 'inventory_detail',
            name: 'InventoryDetail',
            hidden: true,
            component: () => import('@/views/warehouse/inventory/detail'),
            meta: { title: '盘货详情', icon: 'tree', activeMenu: '/warehouse/inventory' }
        },
        {
            path: 'frmloss',
            name: 'Frmloss',
            component: () => import('@/views/warehouse/frmloss'),
            meta: { title: '报损管理', icon: 'tree' }
        },
        {
            path: 'frmloss_detail',
            name: 'frmlossDetail',
            hidden: true,
            component: () => import('@/views/warehouse/frmloss/detail'),
            meta: { title: '报损详情', activeMenu: '/warehouse/frmloss' }
        },
        {
            path: 'qc',
            name: 'Qc',
            component: () => import('@/views/warehouse/qc'),
            meta: { title: 'QC分配', icon: 'tree' }
        },
        {
            path: 'qc_detail',
            name: 'QcDetail',
            hidden: true,
            component: () => import('@/views/warehouse/qc/detail'),
            meta: { title: 'QC分配详情', icon: 'tree', activeMenu: '/warehouse/qc' }
        },
        {
            path: 'supplier',
            name: 'Supplier',
            component: () => import('@/views/warehouse/supplier'),
            meta: { title: '供应商管理', icon: 'tree' }
        },
        {
            path: 'supplier_add',
            name: 'supplier_add',
            hidden: true,
            component: () => import('@/views/warehouse/supplier/edit'),
            meta: { title: '新增供应商', activeMenu: '/warehouse/supplier' }
        },
        {
            path: 'supplier_edit',
            name: 'supplier_edit',
            hidden: true,
            component: () => import('@/views/warehouse/supplier/edit'),
            meta: { title: '编辑供应商', activeMenu: '/warehouse/supplier' }
        },
    ]
}

export default warehouseRouter