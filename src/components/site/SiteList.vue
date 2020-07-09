<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <left-slide-nav :selected-key="['4']" :opened-key="['sub5']" :show-title="collapsed" @DrawerStatus="getDrawerStatus"></left-slide-nav>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px; position: relative; min-width: 1200px">
        <a-layout-header style="background: #fff; padding: 0 10px;text-align: left">
          <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
        </a-layout-header>
        <a-breadcrumb style="margin: 16px 0;text-align: left">
          <a-breadcrumb-item>站点管理</a-breadcrumb-item>
          <a-breadcrumb-item>站点列表</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px',marginBottom: '70px' }"
        >
          <div class="content-top flex">
            <div class="input-box">
              <a-input placeholder="微信群编号" />
            </div>
            <div class="content-top-select">
              <a-select style="width: 120px" placeholder="注册来源">
                <a-select-option value="ykyh.com">
                  ykyh.com
                </a-select-option>
                <a-select-option value="disabled">
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </div>
            <div class="content-top-select">
              <a-select style="width: 200px" placeholder="是否付费用户">
                <a-select-option value="（30天试用）未到期的站点">
                  （30天试用）未到期的站点
                </a-select-option>
                <a-select-option value="disabled">
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </div>
            <div class="content-top-btn">
              <a-button type="primary" icon="search">
              </a-button>
            </div>
          </div>
          <site-list-table style="margin-top: 20px"></site-list-table>
        </a-layout-content>
        <Copyright></Copyright>
      </a-layout>
    </a-layout>
    <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
  </div>
</template>

<script>
  import SiteListTable from "./SiteListTable";
  export default {
    name: "SiteList",
    components: {SiteListTable},
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
