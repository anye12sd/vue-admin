<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['1']" :opened-key="['sub2']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>会员管理</a-breadcrumb-item>
                        <a-breadcrumb-item>已验证用户【正常】</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box">
                                <a-input placeholder="请输入企业名" v-model="entName" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="input-box">
                                <a-input placeholder="请输入用户名" v-model="username" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="input-box">
                                <a-input placeholder="请输入注册来源" v-model="domain" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="search" @click="searchData">
                                </a-button>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="reload" @click="refreshTable">
                                </a-button>
                            </div>
                        </div>
                        <verified-customer-table style="margin-top: 20px;" :key="timer"
                                                 @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></verified-customer-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const VerifiedCustomerTable = () => import("../components/VerifiedCustomerTable")

    export default {
        name: "VerifiedCustomer",
        components: {VerifiedCustomerTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                entName: "",
                username: "",
                domain: "",
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
            this.searchData()
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
            searchData: function () {
                this.currentPage = 1
                let userMessage = {entName: this.entName, username: this.username, domain: this.domain}
                sessionStorage.setItem("userMessage", JSON.stringify(userMessage))
                this.timer = new Date().getTime()
            },
            fresh(e){
                if(e.target.value == ""){
                    this.searchData()
                }
            }
        }
    }
</script>

<style scoped>

</style>
