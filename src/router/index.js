// import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import(/* webpackChunkName: "Index" */ '@/views/Index.vue')
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
const ModuleSiteList = () => import(/* webpackChunkName: "ModuleSiteList" */ '@/views/ModuleSiteList.vue')
const SiteVerifyV4 = () => import(/* webpackChunkName: "SiteVerify" */ '@/views/SiteVerifyV4.vue')
const SiteVerifyV5 = () => import(/* webpackChunkName: "SiteVerify" */ '@/views/SiteVerifyV5.vue')
const TemplateVerify = () => import(/* webpackChunkName: "TemplateVerify" */ '@/views/TemplateVerify.vue')
const ModuleVerifyV4 = () => import(/* webpackChunkName: "ModuleVerify" */ '@/views/ModuleVerifyV4.vue')
const ModuleVerifyV5 = () => import(/* webpackChunkName: "ModuleVerify" */ '@/views/ModuleVerifyV5.vue')
const DomainVerify = () => import(/* webpackChunkName: "DomainVerify" */ '@/views/DomainVerify.vue')
const SiteDeadlineVerify = () => import(/* webpackChunkName: "SiteDeadlineVerify" */ '@/views/SiteDeadlineVerify.vue')
const OrderAgentVerify = () => import(/* webpackChunkName: "OrderAgentVerify" */ '@/views/OrderAgentVerify.vue')
const ManageList = () => import(/* webpackChunkName: "ManageList" */ '@/views/ManageList.vue')
const Tools = () => import(/* webpackChunkName: "Tools" */ '@/views/Tools.vue')
const MoreSettings = () => import(/* webpackChunkName: "MoreSettings" */ '@/views/MoreSettings.vue')
const AgentCharge = () => import(/* webpackChunkName: "AgentCharge" */ '@/views/AgentCharge.vue')
const AgentChargeList = () => import(/* webpackChunkName: "AgentChargeList" */ '@/views/AgentChargeList.vue')
const AgentList = () => import(/* webpackChunkName: "AgentList" */ '@/views/AgentList.vue')
const AgentLayoutList = () => import(/* webpackChunkName: "AgentList" */ '@/views/AgentLayoutList.vue')
const DataTransfer = () => import(/* webpackChunkName: "DataTransfer" */ '@/views/DataTransfer.vue')
const TemplateManageV4 = () => import(/* webpackChunkName: "TemplateManageV4" */ '@/views/TemplateManageV4.vue')
const SiteManageV4 = () => import(/* webpackChunkName: "SiteManageV4" */ '@/views/SiteManageV4.vue')
const OrderManageNew = () => import(/* webpackChunkName: "OrderManageNew" */ '@/views/OrderManageNew.vue')

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

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
            path: "/views/Index",
            name: "Index",
            component: Index,
            meta: {
                title: "首页"
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
                title: "订单费用审核（旧）"
            }
        },
        {
            path: "/views/OrderManage",
            name: "OrderManage",
            component: OrderManage,
            meta: {
                requireAuth: true,
                title: "订单列表（旧）"
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
            path: "/views/ModuleSiteList",
            name: "ModuleSiteList",
            component: ModuleSiteList,
            meta: {
                requireAuth: true,
                title: "站点管理"
            }
        },
        {
            path: "/views/TemplateManageV4",
            name: "TemplateManageV4",
            component: TemplateManageV4,
            meta: {
                requireAuth: true,
                title: "模块管理V4"
            }
        },
        {
            path: "/views/SiteManageV4",
            name: "SiteManageV4",
            component: SiteManageV4,
            meta: {
                requireAuth: true,
                title: "站点管理V4"
            }
        },
        {
            path: "/views/SiteVerifyV4",
            name: "SiteVerifyV4",
            component: SiteVerifyV4,
            meta: {
                requireAuth: true,
                title: "网站审核V4"
            }
        },
        {
            path: "/views/SiteVerifyV5",
            name: "SiteVerifyV5",
            component: SiteVerifyV5,
            meta: {
                requireAuth: true,
                title: "网站审核V5"
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
            path: "/views/ModuleVerifyV4",
            name: "ModuleVerifyV4",
            component: ModuleVerifyV4,
            meta: {
                requireAuth: true,
                title: "模块审核V4"
            }
        },
        {
            path: "/views/ModuleVerifyV5",
            name: "ModuleVerifyV5",
            component: ModuleVerifyV5,
            meta: {
                requireAuth: true,
                title: "模块审核V5"
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
        {
            path: "/views/AgentCharge",
            name: "AgentCharge",
            component: AgentCharge,
            meta: {
                requireAuth: true,
                title: "代理商充值"
            }
        },
        {
            path: "/views/AgentChargeList",
            name: "AgentChargeList",
            component: AgentChargeList,
            meta: {
                requireAuth: true,
                title: "代理商充值记录"
            }
        },
        {
            path: "/views/AgentList",
            name: "AgentList",
            component: AgentList,
            meta: {
                requireAuth: true,
                title: "代理商列表"
            }
        },
        {
            path: "/views/AgentLayoutList",
            name: "AgentLayoutList",
            component: AgentLayoutList,
            meta: {
                requireAuth: true,
                title: "代理商的客户"
            }
        },
        {
            path: "/views/DataTransfer",
            name: "DataTransfer",
            component: DataTransfer,
            meta: {
                requireAuth: true,
                title: "数据转移"
            }
        },
        {
            path: "/views/OrderManageNew",
            name: "OrderManageNew",
            component: OrderManageNew,
            meta: {
                requireAuth: true,
                title: "订单管理"
            }
        },
    ]
})
