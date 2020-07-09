<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <left-slide-nav :selected-key="['1']" :opened-key="['sub2']" :show-title="collapsed" @DrawerStatus="getDrawerStatus"></left-slide-nav>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px; position: relative; min-width: 1200px">
        <a-layout-header style="background: #fff; padding: 0 10px;text-align: left">
          <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
        </a-layout-header>
        <a-breadcrumb style="margin: 16px 0;text-align: left">
          <a-breadcrumb-item>会员管理</a-breadcrumb-item>
          <a-breadcrumb-item>已验证用户【正常】</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px',marginBottom: '70px' }"
        >
          <div class="content-top flex">
            <div class="input-box">
              <a-input placeholder="请输入企业名" />
            </div>
            <div class="input-box">
              <a-input placeholder="请输入用户名" />
            </div>
            <div class="input-box">
              <a-input placeholder="请输入客服" />
            </div>
            <div class="input-box">
              <a-input placeholder="请输入注册来源" />
            </div>
            <div class="content-top-btn">
              <a-button type="primary" icon="search">
              </a-button>
            </div>
            <div class="content-top-btn">
              <a-button type="primary" icon="reload">
              </a-button>
            </div>
            <!--<div class="input-box flex-1">-->
              <!--<template>-->
                <!--<a-input placeholder="Basic usage" v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"/>-->
              <!--</template>-->
            <!--</div>-->
            <!--<div class="input-box flex-1">-->
              <!--<template>-->
                <!--<span>客服：</span><a-input placeholder="Basic usage" />-->
              <!--</template>-->
            <!--</div>-->
            <!--<div class="input-box flex-1">-->
              <!--<template>-->
                <!--<span>注册来源：</span><a-input placeholder="Basic usage" />-->
              <!--</template>-->
            <!--</div>-->
          </div>
          <verified-customer-table style="margin-top: 20px;"></verified-customer-table>
        </a-layout-content>
        <Copyright></Copyright>
      </a-layout>
    </a-layout>
    <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
  </div>
</template>

<script>
  // import TableDemo from "../TableDemo";
  import VerifiedCustomerTable from "./VerifiedCustomerTable";
  export default {
    name: "VerifiedCustomer",
    components: {VerifiedCustomerTable},
    data() {
      return {
        collapsed: false,
        LeftDrawerShow: false
      };
    },
    methods: {
      getCollapsedStatus:function(data){
        this.collapsed = data
      },
      getDrawerStatus:function(data){
        this.LeftDrawerShow = data
      }
    }
  }
</script>

<style scoped>

</style>
