import Vue from 'vue'
import {
    Drawer,
    Divider,
    Row,
    Col,
    Descriptions,
    Button,
    Layout,
    Menu,
    Icon,
    Breadcrumb,
    Avatar,
    Select,
    Badge,
    Form,
    Input,
    Checkbox,
    Table,
    Popconfirm,
    FormModel,
    Radio,
    message
} from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import https from './utils/https'
import LeftSlideNav from './components/common/LeftSlideNav'
import Copyright from './components/common/Copyright'
import HeaderNav from './components/common/HeaderNav'
import LeftDrawer from './components/common/LeftDrawer'

import 'ant-design-vue/dist/antd.css'
import './assets/css/main.css'
import './assets/css/reset.css'

Vue.use(Button).use(Layout).use(Menu).use(Icon).use(Breadcrumb).use(Avatar).use(Select).use(Badge).use(Form).use(Input).use(Checkbox).use(Table)
Vue.use(Popconfirm).use(FormModel).use(Radio).use(Descriptions).use(Col).use(Row).use(Divider).use(Drawer)

Vue.component('LeftSlideNav', LeftSlideNav)
Vue.component('Copyright', Copyright)
Vue.component('HeaderNav', HeaderNav)
Vue.component('LeftDrawer', LeftDrawer)

Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.prototype.$https = https;

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if(sessionStorage.getItem('X-CSRF-Token')){ //判断本地是否存在access_token
            next();
        }else {
            if(to.path === '/Login'){
                next();
            }else {
                next({
                    path:'/Login'
                })
            }
        }
    }
    else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if(to.fullPath == "/Login"){
        if(localStorage.getItem('X-CSRF-Token')){
            next({
                path:from.fullPath
            });
        }else {
            next();
        }
    }
});


new Vue({
    el: '#app',
    render: h => h(App),
    router,
})
