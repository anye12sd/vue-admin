<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['25']" :opened-key="['sub9']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>代理商管理</a-breadcrumb-item>
                        <a-breadcrumb-item>代理商的客户</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="content-top-select">
                                <a-select style="width: 500px" v-model="adminId" placeholder="按代理商搜索">
                                    <a-select-option value="">
                                        全部代理商
                                    </a-select-option>
                                    <a-select-option v-for="item in adminList" :value="item.adminId" :key="item.adminId" :title="'代理账号 ['+item.username+']-姓名 ['+item.name+']-公司 ['+item.entName+']'">
                                        代理账号 [{{item.username}}]-姓名 [{{item.name}}]-公司 [{{item.entName}}]
                                    </a-select-option>
                                </a-select>
                            </div>
                        </div>
                        <div class="content-top flex" style="margin-top: 12px">
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="timeSelectType">
                                    <a-select-option value="1">
                                        按到期时间搜索
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-range-picker style="width: 332px" :placeholder="['开始时间', '结束时间']" v-model="timeSelect">
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
                        <agent-layout-list-table style="margin-top: 20px;" :key="timer" @adminData="getAdminData" @currentPage="getCurrentPage" :toChildPage="page"></agent-layout-list-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>

    import AgentLayoutListTable from "../components/AgentLayoutListTable";
    export default {
        name: "AgentLayoutList",
        components: {AgentLayoutListTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                adminId: undefined,
                adminList: [],
                timeSelect: undefined,
                timeSelectType: "1",
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
                    "agentId": this.adminId,
                    "startDate": this.timeSelect && this.timeSelect[0].format("YYYY/MM/DD"),
                    "endDate": this.timeSelect && this.timeSelect[1].format("YYYY/MM/DD")
                }
                sessionStorage.setItem("siteParams", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            fresh(e) {
                if (e.target.value == "") {
                    this.searchContent()
                }
            },
            getAdminData(value){
                this.adminList = value
            }
        }
    }
</script>

<style scoped>

</style>
