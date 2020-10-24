import Layout from '@/layout'

const basicRouter = {
    path: '/basic',
    component: Layout,
    redirect: '/basic/order',
    meta: { title: '基础管理', icon: 'el-icon-menu' },
    children: [
        {
            path: 'order',
            name: 'Order',
            component: () => import('@/views/basic/order'),
            meta: { title: '订单管理', icon: 'el-icon-message-solid' }
        },
        {
            path: 'order_detail',
            name: 'OrderDetail',
            hidden: true,
            component: () => import('@/views/basic/order/detail'),
            meta: { title: '订单详情', activeMenu: '/basic/order' }
        },
        {
            path: 'goods',
            name: 'Goods',
            component: () => import('@/views/basic/goods'),
            meta: { title: '商品管理', icon: 'el-icon-s-goods' },
            children: [
                {
                    path: 'preinstall_meal',
                    name: 'PreinstallMeal',
                    component: () => import('@/views/basic/goods/preinstall_meal/index'),
                    meta: { title: '预设套餐', icon: 'table' }
                },
                {
                    path: 'preinstall_meal_add',
                    name: 'PreinstallMealAdd',
                    hidden: true,
                    component: () => import('@/views/basic/goods/preinstall_meal/edit'),
                    meta: { title: '新增预设套餐', activeMenu: '/basic/goods/preinstall_meal' }
                },
                {
                    path: 'preinstall_meal_edit',
                    name: 'PreinstallMealEdit',
                    hidden: true,
                    component: () => import('@/views/basic/goods/preinstall_meal/edit'),
                    meta: { title: '编辑预设套餐', activeMenu: '/basic/goods/preinstall_meal' }
                },
                {
                    path: 'preinstall_meal_detail',
                    name: 'PreinstallMealDetail',
                    hidden: true,
                    component: () => import('@/views/basic/goods/preinstall_meal/detail'),
                    meta: { title: '预设套餐详情', activeMenu: 'preinstall_meal' }
                },
                {
                    path: 'store_meal',
                    name: 'StoreMeal',
                    component: () => import('@/views/basic/goods/store_meal'),
                    meta: { title: '门店套餐', icon: 'tree' }
                },
                {
                    path: 'store_meal_add',
                    name: 'StoreMealAdd',
                    hidden: true,
                    component: () => import('@/views/basic/goods/store_meal/edit'),
                    meta: { title: '新增门店套餐', activeMenu: '/basic/goods/store_meal' }
                },
                {
                    path: 'store_meal_edit',
                    name: 'StoreMealEdit',
                    hidden: true,
                    component: () => import('@/views/basic/goods/store_meal/edit'),
                    meta: { title: '编辑门店套餐', activeMenu: '/basic/goods/store_meal' }
                },
                {
                    path: 'preinstall_item',
                    name: 'PreinstallItem',
                    component: () => import('@/views/basic/goods/preinstall_item'),
                    meta: { title: '预设单品', icon: 'tree' }
                },
                {
                    path: 'preinstall_item_add',
                    name: 'PreinstallItemAdd',
                    hidden: true,
                    component: () => import('@/views/basic/goods/preinstall_item/edit'),
                    meta: { title: '新增预设单品', activeMenu: '/basic/goods/preinstall_item' }
                },
                {
                    path: 'preinstall_item_edit',
                    name: 'PreinstallItemEdit',
                    hidden: true,
                    component: () => import('@/views/basic/goods/preinstall_item/edit'),
                    meta: { title: '编辑预设单品', activeMenu: '/basic/goods/preinstall_item' }
                },
                {
                    path: 'store_item',
                    name: 'StoreItem',
                    component: () => import('@/views/basic/goods/store_item'),
                    meta: { title: '门店单品', icon: 'tree' }
                },
                {
                    path: 'store_item_detail',
                    name: 'StoreItemDetail',
                    hidden: true,
                    component: () => import('@/views/basic/goods/store_item/detail'),
                    meta: { title: '门店单品详情', icon: 'tree',activeMenu: '/basic/goods/store_item' }
                },
                {
                    path: 'material_seasoning',
                    name: 'MaterialSeasoning',
                    component: () => import('@/views/basic/goods/material_seasoning'),
                    meta: { title: '材料调料管理', icon: 'tree' }
                },
            ]
        },
        {
            path: 'red_package',
            name: 'RedPackage',
            component: () => import('@/views/basic/red_package'),
            meta: { title: '优惠红包管理', icon: 'el-icon-s-ticket' }
        },
        {
            path: 'vip_card',
            name: 'VipCard',
            component: () => import('@/views/basic/vip_card'),
            meta: { title: '会员卡管理', icon: 'el-icon-platform-eleme' }
        },
        {
            path: 'user',
            name: 'User',
            component: () => import('@/views/basic/user'),
            meta: { title: '用户管理', icon: 'el-icon-s-custom' },
            children: [
                {
                    path: 'list',
                    name: 'List',
                    component: () => import('@/views/basic/user/list'),
                    meta: { title: '用户列表', icon: 'table' }
                },
                {
                    path: 'detail',
                    name: 'Detail',
                    hidden: true,
                    component: () => import('@/views/basic/user/detail'),
                    meta: { title: '用户资料', icon: 'table', activeMenu: '/basic/user/list' }
                },
                {
                    path: 'integral',
                    name: 'Integral',
                    component: () => import('@/views/basic/user/integral'),
                    meta: { title: '积分列表', icon: 'table' }
                }
            ]
        },
    ]
}

export default basicRouter