<template>
    <div>
        <a-layout>
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
                <left-slide-nav :selected-key="['4']" :opened-key="['sub5']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>站点管理</a-breadcrumb-item>
                    <a-breadcrumb-item>站点列表</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="input-box">
                            <a-input placeholder="微信群编号" v-model="weixinNumber"/>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 120px" placeholder="注册来源" v-model="domain">
                                <a-select-option value="ykyh.com">
                                    ykyh.com
                                </a-select-option>
                                <a-select-option value="jihui88.com">
                                    jihui88.com
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 230px" placeholder="是否付费用户" v-model="payType">
                                <a-select-option value="00">
                                    （30天试用）未到期的站点
                                </a-select-option>
                                <a-select-option value="01">
                                    （已付费）购买的站点
                                </a-select-option>
                                <a-select-option value="02">
                                    （30天试用）到期的站点
                                </a-select-option>
                                <a-select-option value="03">
                                    （付费过）到期的站点）
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-btn">
                            <a-button type="primary" icon="search" @click="searchSite">
                            </a-button>
                        </div>
                    </div>
                    <site-list-table style="margin-top: 20px" :key="timer" :site="site"
                                     @refresh="refreshTable"></site-list-table>
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
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                domain: "ykyh.com",
                payType: "00",
                timer: 1,
                weixinNumber: "",
                site: "ykyh.com"
            };
        },
        mounted() {
            this.searchSite()
        },
        methods: {
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            },
            searchSite: function () {
                let siteParams = {"domain": this.domain, "payType": this.payType, "weixinNumber": this.weixinNumber}
                sessionStorage.setItem("siteParams", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            refreshTable: function (data) {
                this.timer = data
            }
        }
    }
</script>

<style scoped>

</style>
