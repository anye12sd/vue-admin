import Vue from 'vue'
import Router from 'vue-router'
import VerifiedCustomer from '@/components/customer/VerifiedCustomer'
import CustomerMessage from '@/components/message/CustomerMessage'
import AdminList from '@/components/admin/AdminList'
import SiteList from '@/components/site/SiteList'
import AddNewAdmin from '@/components/admin/AddNewAdmin'
import AccessControl from '@/components/access/AccessControl'
import AddNewAccessControlAdmin from '@/components/access/AddNewAccessControlAdmin'
import ScreenshotsToCustomer from '@/components/message/ScreenshotsToCustomer'
import Login from '@/components/Login'

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
            path: "/customer/VerifiedCustomer",
            name: "VerifiedCustomer",
            component: VerifiedCustomer,
            meta: {
                requireAuth: true,
                title: "已验证用户"
            }
        },
        {
            path: "/message/CustomerMessage",
            name: "CustomerMessage",
            component: CustomerMessage,
            meta: {
                requireAuth: true,
                title: "用户后台留言"
            }
        },
        {
            path: "/admin/AdminList",
            name: "AdminList",
            component: AdminList,
            meta: {
                requireAuth: true,
                title: "管理员列表"
            }
        },
        {
            path: "/admin/AddNewAdmin",
            name: "AddNewAdmin",
            component: AddNewAdmin,
            meta: {
                requireAuth: true,
                title: "新增管理员"
            }
        },
        {
            path: "/site/SiteList",
            name: "SiteList",
            component: SiteList,
            meta: {
                requireAuth: true,
                title: "站点管理"
            }
        },
        {
            path: "/access/AccessControl",
            name: "AccessControl",
            component: AccessControl,
            meta: {
                requireAuth: true,
                title: "权限控制"
            }
        },
        {
            path: "/access/AddNewAccessControlAdmin",
            name: "AddNewAccessControlAdmin",
            component: AddNewAccessControlAdmin,
            meta: {
                requireAuth: true,
                title: "新增权限控制"
            }
        },
        {
            path: "/message/ScreenshotsToCustomer",
            name: "ScreenshotsToCustomer",
            component: ScreenshotsToCustomer,
            meta: {
                requireAuth: true,
                title: "截图给客户"
            }
        }
    ]
})
