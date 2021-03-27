<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['21']" :opened-key="['sub9']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>代理商管理</a-breadcrumb-item>
                        <a-breadcrumb-item>代理商充值记录</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box">
                                <a-input placeholder="请输入订单编号" v-model="outTradeNo" :allowClear="true"
                                         @change="fresh($event)"/>
                            </div>
                            <div class="input-box">
                                <a-input placeholder="请输入代理商账号" v-model="username" :allowClear="true"
                                         @change="fresh($event)"/>
                            </div>
                            <div class="content-top-select">
                                <a-range-picker :placeholder="['开始时间', '结束时间']" v-model="timeSelect">
                                </a-range-picker>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="search" @click="searchContent">
                                </a-button>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="reload" @click="refreshTable">
                                </a-button>
                            </div>
                        </div>
                        <agent-charge-list-table style="margin-top: 20px;" :key="timer" @currentPage="getCurrentPage" :toChildPage="page"></agent-charge-list-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>

    import AgentChargeListTable from "../components/AgentChargeListTable";
    export default {
        name: "AgentChargeList",
        components: {AgentChargeListTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                outTradeNo: "",
                username: "",
                timeSelect: undefined,
                timer: 1,
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
            this.searchContent()
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
            refreshTable: function () {
                this.timer = new Date().getTime()
            },
            searchContent: function () {
                this.currentPage = 1
                let siteParams = {
                    "outTradeNo": this.outTradeNo,
                    "username": this.username,
                    "startTime": this.timeSelect && this.timeSelect[0].format("YYYY-MM-DD"),
                    "endTime": this.timeSelect && this.timeSelect[1].format("YYYY-MM-DD")
                }
                sessionStorage.setItem("siteParams", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            fresh(e) {
                if (e.target.value == "") {
                    this.searchContent()
                }
            }
        }
    }
</script>

<style scoped>

</style>
