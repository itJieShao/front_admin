import Layout from '@/layout'

const operateRouter = {
    path: '/operate',
    component: Layout,
    name: 'Operate',
    alwaysShow: true,
    meta: { title: '运营', icon: 'el-icon-s-help' },
    children: [
        {
            path: 'front_menu',
            component: () => import('@/views/operate/front_menu'),
            name: 'FrontMenu',
            meta: { title: '小程序菜单管理', icon: 'el-icon-s-help', auth: "front_menu_list" },
        },
        {
            path: 'questionnaire',
            component: () => import('@/views/operate/questionnaire'),
            name: 'Questionnaire',
            meta: { title: '调查问卷', icon: 'el-icon-s-help', auth: "questionnaire_list" },
        },
        {
            path: 'questionnaire_add',
            component: () => import('@/views/operate/questionnaire/add'),
            name: 'QuestionnaireAdd',
            hidden:true,
            meta: { title: '新增问卷', icon: 'el-icon-s-help', activeMenu:'/operate/questionnaire' },
        },
        {
            path: 'questionnaire_detail',
            component: () => import('@/views/operate/questionnaire/detail'),
            name: 'QuestionnaireDetail',
            hidden:true,
            meta: { title: '问卷详情', icon: 'el-icon-s-help', activeMenu:'/operate/questionnaire' },
        },
        {
            path: 'c_layout',
            component: () => import('@/views/operate/c_layout'),
            name: 'CLayout',
            meta: { title: '用户C端页面布局', icon: 'el-icon-s-help', auth: "layout" },
        },
        {
            path: 'c_layout/index_banner',
            component: () => import('@/views/operate/c_layout/index_banner'),
            name: 'indexBar',
            hidden:true,
            meta: { title: '首页banner图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_banner_add',
            component: () => import('@/views/operate/c_layout/index_banner/edit'),
            name: 'indexBarAdd',
            hidden:true,
            meta: { title: '新增首页banner图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_banner_edit',
            component: () => import('@/views/operate/c_layout/index_banner/edit'),
            name: 'indexBarEdit',
            hidden:true,
            meta: { title: '编辑首页banner图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/user_banner',
            component: () => import('@/views/operate/c_layout/user_banner'),
            name: 'indexBar',
            hidden:true,
            meta: { title: '个人中心banner图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/user_banner_add',
            component: () => import('@/views/operate/c_layout/user_banner/edit'),
            name: 'indexBarAdd',
            hidden:true,
            meta: { title: '新增个人中心banner图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/user_banner_edit',
            component: () => import('@/views/operate/c_layout/user_banner/edit'),
            name: 'indexBarEdit',
            hidden:true,
            meta: { title: '编辑个人中心banner图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/store_notice',
            component: () => import('@/views/operate/c_layout/store_notice'),
            name: 'storeNotice',
            hidden:true,
            meta: { title: '门店优惠促销公告', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/store_notice/add',
            component: () => import('@/views/operate/c_layout/store_notice/edit'),
            name: 'storeNoticeAdd',
            hidden:true,
            meta: { title: '新增门店优惠促销公告', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/store_notice/edit',
            component: () => import('@/views/operate/c_layout/store_notice/edit'),
            name: 'storeNoticeEdit',
            hidden:true,
            meta: { title: '编辑门店优惠促销公告', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/about',
            component: () => import('@/views/operate/c_layout/about'),
            name: 'about',
            hidden:true,
            meta: { title: '关于我们', activeMenu:'/operate/c_layout' },
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
                    meta: { title: '经营报表', icon: 'el-icon-s-help', auth: "manage_list" },
                }
            ]
        },
    ]
}

export default operateRouter