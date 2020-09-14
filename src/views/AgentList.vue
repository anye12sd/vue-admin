<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['20']" :opened-key="['sub9']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>代理商管理</a-breadcrumb-item>
                        <a-breadcrumb-item>代理商列表</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box" style="width:260px">
                                <a-input placeholder="请输入姓名或代理商账号" v-model="name" :allowClear="true"
                                         @change="fresh($event)"/>
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
                        <agent-list-table style="margin-top: 20px;" :key="timer"></agent-list-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>

    const AgentListTable = () => import("../components/AgentListTable");
    export default {
        name: "AgentList",
        components: {AgentListTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                name: "",
                timer: 1
            };
        },
        mounted() {
            this.searchContent()
        },
        methods: {
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
                let siteParams = {
                    "name": this.name,
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
