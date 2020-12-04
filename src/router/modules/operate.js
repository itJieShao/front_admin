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
            meta: { title: '用户C端页面布局', icon: 'el-icon-s-help', auth: "questionnaire_list" },
        },
        {
            path: 'store_notice',
            component: () => import('@/views/operate/c_layout/store_notice'),
            name: 'storeNotice',
            hidden:true,
            meta: { title: '门店优惠促销公告', activeMenu:'/operate/questionnaire' },
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