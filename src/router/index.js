import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demo from '@/components/Demo'
import VerifiedCustomer from '@/components/customer/VerifiedCustomer'
import CustomerMessage from '@/components/message/CustomerMessage'
import AdminList from '@/components/admin/AdminList'
import SiteList from '@/components/site/SiteList'
import AddNewAdmin from '@/components/admin/AddNewAdmin'
import AccessControl from '@/components/access/AccessControl'
import AddNewAccessControlAdmin from '@/components/access/AddNewAccessControlAdmin'

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: "/Demo",
      name: "Demo",
      component: Demo
    },
    {
      path: "/customer/VerifiedCustomer",
      name: "VerifiedCustomer",
      component: VerifiedCustomer
    },
    {
      path: "/message/CustomerMessage",
      name: "CustomerMessage",
      component: CustomerMessage
    },
    {
      path: "/admin/AdminList",
      name: "AdminList",
      component: AdminList,
    },
    {
      path: "/admin/AddNewAdmin",
      name: "AddNewAdmin",
      component: AddNewAdmin,
    },
    {
      path: "/site/SiteList",
      name: "SiteList",
      component: SiteList
    },
    {
      path: "/access/AccessControl",
      name: "AccessControl",
      component: AccessControl
    },
    {
      path: "/access/AddNewAccessControlAdmin",
      name: "AddNewAccessControlAdmin",
      component: AddNewAccessControlAdmin,
    }
  ]
})
