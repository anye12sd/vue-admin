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
    message,
    DatePicker,
    Modal,
    Tree,
    Card,
    Spin,
    Tooltip,
    Pagination,
    Tabs,
    Upload
} from 'ant-design-vue'
import App from './App.vue'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import router from './router'
import api from './api/index'
import LeftSlideNav from './components/LeftSlideNav'
import Copyright from './components/Copyright'
import HeaderNav from './components/HeaderNav'
import LeftDrawer from './components/LeftDrawer'

import './utils/override'
import 'ant-design-vue/dist/antd.css'
import './assets/css/main.css'
import './assets/css/reset.css'

Vue.use(Button).use(Layout).use(Menu).use(Icon).use(Breadcrumb).use(Avatar).use(Select).use(Badge).use(Form).use(Input).use(Checkbox).use(Table).use(Spin).use(Pagination).use(Upload)
Vue.use(Popconfirm).use(FormModel).use(Radio).use(Descriptions).use(Col).use(Row).use(Divider).use(Drawer).use(DatePicker).use(Modal).use(Tree).use(Card).use(Tooltip).use(Tabs)

Vue.component('LeftSlideNav', LeftSlideNav)
Vue.component('Copyright', Copyright)
Vue.component('HeaderNav', HeaderNav)
Vue.component('LeftDrawer', LeftDrawer)

Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.prototype.$api = api;

// console.log(process.env);
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (sessionStorage.getItem('X-CSRF-Token')) { //判断本地是否存在access_token
        next();
    } else {
        if (to.path === '/') {
            next();
        } else {
            next({
                path: '/'
            })
        }
    }
});


new Vue({
    el: '#app',
    render: h => h(App),
    router,
})
