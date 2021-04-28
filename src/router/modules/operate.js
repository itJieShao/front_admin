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
            path: 'questionnaire_tpl',
            component: () => import('@/views/operate/questionnaire_tpl'),
            name: 'QuestionnaireTpl',
            meta: { title: '问卷模板', icon: 'el-icon-s-help', auth: "questionnaire_template" },
        },
        {
            path: 'questionnaire_tpl_add',
            component: () => import('@/views/operate/questionnaire_tpl/add'),
            name: 'QuestionnaireTplAdd',
            hidden:true,
            meta: { title: '新增问卷模板', icon: 'el-icon-s-help', activeMenu:'/operate/questionnaire_tpl' },
        },
        {
            path: 'questionnaire_tpl_detail',
            component: () => import('@/views/operate/questionnaire_tpl/detail'),
            name: 'QuestionnaireTplDetail',
            hidden:true,
            meta: { title: '问卷模板详情', icon: 'el-icon-s-help', activeMenu:'/operate/questionnaire_tpl' },
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
            path: 'c_layout/index_poste',
            component: () => import('@/views/operate/c_layout/index_poste/index'),
            name: 'indexPoste',
            hidden:true,
            meta: { title: '首页海报推广图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_md_banner',
            component: () => import('@/views/operate/c_layout/index_md_banner'),
            name: 'indexMdBar',
            hidden:true,
            meta: { title: '首页中部广告图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_md_banner_add',
            component: () => import('@/views/operate/c_layout/index_md_banner/edit'),
            name: 'indexMdBarAdd',
            hidden:true,
            meta: { title: '新增首页中部广告图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_md_banner_edit',
            component: () => import('@/views/operate/c_layout/index_md_banner/edit'),
            name: 'indexMdBarEdit',
            hidden:true,
            meta: { title: '编辑首页中部广告图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_md1_banner',
            component: () => import('@/views/operate/c_layout/index_md1_banner'),
            name: 'indexMd1Bar',
            hidden:true,
            meta: { title: '首页中部宣传图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_md1_banner_add',
            component: () => import('@/views/operate/c_layout/index_md1_banner/edit'),
            name: 'indexMd1BarAdd',
            hidden:true,
            meta: { title: '新增首页中部宣传图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_md1_banner_edit',
            component: () => import('@/views/operate/c_layout/index_md1_banner/edit'),
            name: 'indexMd1BarEdit',
            hidden:true,
            meta: { title: '编辑首页中部宣传图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_bot_banner',
            component: () => import('@/views/operate/c_layout/index_bot_banner'),
            name: 'indexBotBar',
            hidden:true,
            meta: { title: '首页底部广告图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_bot_banner_add',
            component: () => import('@/views/operate/c_layout/index_bot_banner/edit'),
            name: 'indexBotBarAdd',
            hidden:true,
            meta: { title: '新增首页底部广告图', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/index_bot_banner_edit',
            component: () => import('@/views/operate/c_layout/index_bot_banner/edit'),
            name: 'indexBotBarEdit',
            hidden:true,
            meta: { title: '编辑首页底部广告图', activeMenu:'/operate/c_layout' },
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
            path: 'c_layout/customer_service',
            component: () => import('@/views/operate/c_layout/customer_service'),
            name: 'customerService',
            hidden:true,
            meta: { title: '联系客服', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_layout/about',
            component: () => import('@/views/operate/c_layout/about'),
            name: 'about',
            hidden:true,
            meta: { title: '关于我们', activeMenu:'/operate/c_layout' },
        },
        {
            path: 'c_active',
            component: () => import('@/views/operate/c_active'),
            name: 'cActive',
            meta: { title: '运营活动', icon: 'el-icon-s-help', auth: "layout" },
        },
        {
            path: 'c_active/pull_new',
            component: () => import('@/views/operate/c_active/pull_new/index'),
            name: 'pullNew',
            hidden:true,
            meta: { title: '拉新活动', activeMenu:'/operate/c_active' },
        },
        {
            path: 'c_active/pull_new_add',
            component: () => import('@/views/operate/c_active/pull_new/add'),
            name: 'pullNewAdd',
            hidden:true,
            meta: { title: '拉新活动', activeMenu:'/operate/c_active' },
        },
        {
            path: 'c_active/pull_new_detail',
            component: () => import('@/views/operate/c_active/pull_new/detail'),
            name: 'pullNewDetail',
            hidden:true,
            meta: { title: '拉新活动', activeMenu:'/operate/c_active' },
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
                },
                {
                    path: 'user',
                    component: () => import('@/views/operate/data_report/user'),
                    name: 'User',
                    meta: { title: '用户报表', icon: 'el-icon-s-help', auth: "customer_report" },
                },
                {
                    path: 'meal',
                    component: () => import('@/views/operate/data_report/meal'),
                    name: 'Meal',
                    meta: { title: '套餐报表', icon: 'el-icon-s-help', auth: "package_report" },
                },
                {
                    path: 'questionnaire',
                    component: () => import('@/views/operate/data_report/questionnaire'),
                    name: 'Questionnaire',
                    meta: { title: '问卷报表', icon: 'el-icon-s-help', auth: "questionnaire_report" },
                },
            ]
        },
    ]
}

export default operateRouter