import Vue from 'vue'
import Router from 'vue-router'
const VerifiedCustomer = () => import(/* webpackChunkName: "VerifiedCustomer" */ '@/views/VerifiedCustomer.vue')
const CustomerMessage = () => import(/* webpackChunkName: "CustomerMessage" */ '@/views/CustomerMessage.vue')
const AdminList = () => import(/* webpackChunkName: "AdminList" */ '@/views/AdminList.vue')
const SiteList = () => import(/* webpackChunkName: "SiteList" */ '@/views/SiteList.vue')
const AddNewAdmin = () => import(/* webpackChunkName: "AddNewAdmin" */ '@/views/AddNewAdmin.vue')
const AccessControl = () => import(/* webpackChunkName: "AccessControl" */ '@/views/AccessControl.vue')
const AddNewAccessControlAdmin = () => import(/* webpackChunkName: "AddNewAccessControlAdmin" */ '@/views/AddNewAccessControlAdmin.vue')
const ScreenshotsToCustomer = () => import(/* webpackChunkName: "ScreenshotsToCustomer" */ '@/views/ScreenshotsToCustomer.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
const LogManage = () => import(/* webpackChunkName: "LogManage" */ '@/views/LogManage.vue')
const OrderManage = () => import(/* webpackChunkName: "OrderManage" */ '@/views/OrderManage.vue')
const FareVerify = () => import(/* webpackChunkName: "FareVerify" */ '@/views/FareVerify.vue')
const AddAccessMenu = () => import(/* webpackChunkName: "AddAccessMenu" */ '@/views/AddAccessMenu.vue')
const OrderAccessControl = () => import(/* webpackChunkName: "OrderAccessControl" */ '@/views/OrderAccessControl.vue')
const ModuleList = () => import(/* webpackChunkName: "ModuleList" */ '@/views/ModuleList.vue')
const ModuleSiteList = () => import(/* webpackChunkName: "ModuleSiteList" */ '@/views/ModuleSiteList.vue')
const SiteVerify = () => import(/* webpackChunkName: "SiteVerify" */ '@/views/SiteVerify.vue')
const TemplateVerify = () => import(/* webpackChunkName: "TemplateVerify" */ '@/views/TemplateVerify.vue')
const ModuleVerify = () => import(/* webpackChunkName: "ModuleVerify" */ '@/views/ModuleVerify.vue')
const DomainVerify = () => import(/* webpackChunkName: "DomainVerify" */ '@/views/DomainVerify.vue')
const SiteDeadlineVerify = () => import(/* webpackChunkName: "SiteDeadlineVerify" */ '@/views/SiteDeadlineVerify.vue')
const OrderAgentVerify = () => import(/* webpackChunkName: "OrderAgentVerify" */ '@/views/OrderAgentVerify.vue')
const ManageList = () => import(/* webpackChunkName: "ManageList" */ '@/views/ManageList.vue')
const Tools = () => import(/* webpackChunkName: "ManageList" */ '@/views/Tools.vue')
const MoreSettings = () => import(/* webpackChunkName: "ManageList" */ '@/views/MoreSettings.vue')

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
            meta: {
                title: "登录后台管理系统"
            }
        },
        {
            path: "/views/VerifiedCustomer",
            name: "VerifiedCustomer",
            component: VerifiedCustomer,
            meta: {
                requireAuth: true,
                title: "已验证用户"
            }
        },
        {
            path: "/views/CustomerMessage",
            name: "CustomerMessage",
            component: CustomerMessage,
            meta: {
                requireAuth: true,
                title: "用户后台留言"
            }
        },
        {
            path: "/views/AdminList",
            name: "AdminList",
            component: AdminList,
            meta: {
                requireAuth: true,
                title: "管理员列表"
            }
        },
        {
            path: "/views/AddNewAdmin",
            name: "AddNewAdmin",
            component: AddNewAdmin,
            meta: {
                requireAuth: true,
                title: "新增管理员"
            }
        },
        {
            path: "/views/SiteList",
            name: "SiteList",
            component: SiteList,
            meta: {
                requireAuth: true,
                title: "站点管理"
            }
        },
        {
            path: "/views/AccessControl",
            name: "AccessControl",
            component: AccessControl,
            meta: {
                requireAuth: true,
                title: "权限控制"
            }
        },
        {
            path: "/views/AddNewAccessControlAdmin",
            name: "AddNewAccessControlAdmin",
            component: AddNewAccessControlAdmin,
            meta: {
                requireAuth: true,
                title: "新增权限控制"
            }
        },
        {
            path: "/views/LogManage",
            name: "LogManage",
            component: LogManage,
            meta: {
                requireAuth: true,
                title: "日志查询"
            }
        },
        {
            path: "/views/ScreenshotsToCustomer",
            name: "ScreenshotsToCustomer",
            component: ScreenshotsToCustomer,
            meta: {
                requireAuth: true,
                title: "截图给客户"
            }
        },
        {
            path: "/views/FareVerify",
            name: "FareVerify",
            component: FareVerify,
            meta: {
                requireAuth: true,
                title: "订单费用审核"
            }
        },
        {
            path: "/views/OrderManage",
            name: "OrderManage",
            component: OrderManage,
            meta: {
                requireAuth: true,
                title: "订单管理"
            }
        },
        {
            path: "/views/AddAccessMenu",
            name: "AddAccessMenu",
            component: AddAccessMenu,
            meta: {
                requireAuth: true,
                title: "菜单权限"
            }
        },
        {
            path: "/views/OrderAccessControl",
            name: "OrderAccessControl",
            component: OrderAccessControl,
            meta: {
                requireAuth: true,
                title: "订单权限控制"
            }
        },
        {
            path: "/views/ModuleList",
            name: "ModuleList",
            component: ModuleList,
            meta: {
                requireAuth: true,
                title: "模块列表"
            }
        },
        {
            path: "/views/ModuleSiteList",
            name: "ModuleSiteList",
            component: ModuleSiteList,
            meta: {
                requireAuth: true,
                title: "站点管理"
            }
        },
        {
            path: "/views/SiteVerify",
            name: "SiteVerify",
            component: SiteVerify,
            meta: {
                requireAuth: true,
                title: "网站审核"
            }
        },
        {
            path: "/views/TemplateVerify",
            name: "TemplateVerify",
            component: TemplateVerify,
            meta: {
                requireAuth: true,
                title: "模板审核"
            }
        },
        {
            path: "/views/ModuleVerify",
            name: "ModuleVerify",
            component: ModuleVerify,
            meta: {
                requireAuth: true,
                title: "模块审核"
            }
        },
        {
            path: "/views/DomainVerify",
            name: "DomainVerify",
            component: DomainVerify,
            meta: {
                requireAuth: true,
                title: "域名绑定审核"
            }
        },
        {
            path: "/views/SiteDeadlineVerify",
            name: "SiteDeadlineVerify",
            component: SiteDeadlineVerify,
            meta: {
                requireAuth: true,
                title: "站点过期审核"
            }
        },
        {
            path: "/views/OrderAgentVerify",
            name: "OrderAgentVerify",
            component: OrderAgentVerify,
            meta: {
                requireAuth: true,
                title: "代理订单审核"
            }
        },
        {
            path: "/views/ManageList",
            name: "ManageList",
            component: ManageList,
            meta: {
                requireAuth: true,
                title: "代理订单审核"
            }
        },
        {
            path: "/views/Tools",
            name: "Tools",
            component: Tools,
            meta: {
                requireAuth: true,
                title: "相关工具"
            }
        },
        {
            path: "/views/MoreSettings",
            name: "MoreSettings",
            component: MoreSettings,
            meta: {
                requireAuth: true,
                title: "更多设置"
            }
        },
    ]
})
