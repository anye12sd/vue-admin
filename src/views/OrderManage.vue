<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['7']" :opened-key="['sub7']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>订单管理系统</a-breadcrumb-item>
                        <a-breadcrumb-item>订单列表</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box">
                                <a-input placeholder="请输入订单编号" v-model="outTradeNo" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="input-box">
                                <a-input placeholder="请输入客户账号" v-model="username" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="search" @click="searchSite">
                                </a-button>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="reload" @click="refreshTable">
                                </a-button>
                            </div>
                        </div>
                        <order-manage-table style="margin-top: 20px" :key="timer"
                                            @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></order-manage-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const OrderManageTable = () => import("../components/OrderManageTable")

    export default {
        name: "OrderManage",
        components: {OrderManageTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: 1,
                outTradeNo: "",
                username: "",
                page: "1",
                currentPage: "1",
            };
        },
        watch: {
            timer() {
                this.page = this.currentPage
            }
        },
        mounted() {
            this.searchSite()
        },
        methods: {
            getCurrentPage: function(data){
                this.currentPage = data
            },
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            },
            searchSite: function () {
                this.currentPage = 1
                let siteParams = {"outTradeNo": this.outTradeNo, "username": this.username,}
                sessionStorage.setItem("siteParams", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            refreshTable: function (data) {
                this.timer = data
            },
            fresh(e){
                if(e.target.value == ""){
                    this.searchSite()
                }
            }
        }
    }
</script>

<style scoped>

</style>
