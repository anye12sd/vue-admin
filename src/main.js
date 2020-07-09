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
  Radio
} from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import LeftSlideNav from './components/LeftSlideNav'
import Copyright from './components/Copyright'
import HeaderNav from './components/HeaderNav'
import LeftDrawer from './components/LeftDrawer'

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

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
