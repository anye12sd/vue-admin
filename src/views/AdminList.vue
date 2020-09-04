<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['3']" :opened-key="['sub4']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>超级管理</a-breadcrumb-item>
                        <a-breadcrumb-item>管理员管理</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="content-top-btn" style="margin-right: 8px">
                                <router-link to="/views/AddNewAdmin">
                                    <a-button type="primary">
                                        <a-icon type="plus"/>
                                        新增管理员
                                    </a-button>
                                </router-link>
                            </div>
                            <div class="input-box" style="width: 200px;">
                                <a-input placeholder="请输入姓名或者用户名" v-model="filterName" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" @click="filterTable">
                                    <a-icon type="search"/>
                                </a-button>
                            </div>
                        </div>
                        <admin-list-table style="margin-top: 20px;" :key="timer" @refresh="refreshTable"></admin-list-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const AdminListTable = () => import("../components/AdminListTable")

    export default {
        name: "AdminList",
        components: {AdminListTable},
        data() {
            return {
                console: false,
                filterName: "",
                collapsed: false,
                LeftDrawerShow: false,
                timer: ""
            };
        },
        mounted() {
            this.filterTable()
        },
        methods: {
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            },
            filterTable: function () {
                sessionStorage.setItem("filterName", this.filterName)
                this.timer = new Date().getTime()
            },
            refreshTable: function (data) {
                this.timer = data
            },
            fresh(e){
                if(e.target.value == ""){
                    this.filterTable()
                }
            }
        }
    }
</script>

<style scoped>

</style>
