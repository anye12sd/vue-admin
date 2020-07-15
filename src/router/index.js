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
            path: "/Login",
            name: "Login",
            component: Login
        },
        {
            path: "/customer/VerifiedCustomer",
            name: "VerifiedCustomer",
            component: VerifiedCustomer,
            meta:{requireAuth:true}
        },
        {
            path: "/message/CustomerMessage",
            name: "CustomerMessage",
            component: CustomerMessage,
            meta:{requireAuth:true}
        },
        {
            path: "/admin/AdminList",
            name: "AdminList",
            component: AdminList,
            meta:{requireAuth:true}
        },
        {
            path: "/admin/AddNewAdmin",
            name: "AddNewAdmin",
            component: AddNewAdmin,
            meta:{requireAuth:true}
        },
        {
            path: "/site/SiteList",
            name: "SiteList",
            component: SiteList,
            meta:{requireAuth:true}
        },
        {
            path: "/access/AccessControl",
            name: "AccessControl",
            component: AccessControl,
            meta:{requireAuth:true}
        },
        {
            path: "/access/AddNewAccessControlAdmin",
            name: "AddNewAccessControlAdmin",
            component: AddNewAccessControlAdmin,
            meta:{requireAuth:true}
        },
        {
            path: "/message/ScreenshotsToCustomer",
            name: "ScreenshotsToCustomer",
            component: ScreenshotsToCustomer,
            meta:{requireAuth:true}
        }
    ]
})
