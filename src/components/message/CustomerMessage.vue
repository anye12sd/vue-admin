<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <left-slide-nav :selected-key="['2']" :opened-key="['sub3']" :show-title="collapsed" @DrawerStatus="getDrawerStatus"></left-slide-nav>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px; position: relative; min-width: 1200px">
        <a-layout-header style="background: #fff; padding: 0 24px;text-align: left">
          <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
        </a-layout-header>
        <a-breadcrumb style="margin: 16px 0;text-align: left;padding:0 24px;">
          <a-breadcrumb-item>留言管理</a-breadcrumb-item>
          <a-breadcrumb-item>客户网站留言</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px',marginBottom: '70px' }"
        >
          <div class="content-top flex">
            <div class="input-box">
              <a-input placeholder="请输入发送人" />
            </div>
            <div class="input-box">
              <a-input placeholder="请输入接收人" />
            </div>
            <div class="input-box">
              <a-input placeholder="接收企业" />
            </div>
            <div class="input-box">
              <a-input placeholder="请输入留言内容" />
            </div>
            <div class="content-top-btn">
              <a-button type="primary" icon="search">
              </a-button>
            </div>
            <div class="content-top-btn">
              <a-button type="primary" icon="reload">
              </a-button>
            </div>
          </div>
          <customer-message-table style="margin-top: 20px;"></customer-message-table>
        </a-layout-content>
        <Copyright></Copyright>
      </a-layout>
    </a-layout>
    <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
  </div>
</template>

<script>
  import CustomerMessageTable from "./CustomerMessageTable";
  export default {
    name: "CustomerMessage",
    components: {CustomerMessageTable},
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
