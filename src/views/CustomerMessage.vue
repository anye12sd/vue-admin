<template>
    <div>
        <a-layout>
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
                <left-slide-nav :selected-key="['2']" :opened-key="['sub3']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>留言管理</a-breadcrumb-item>
                    <a-breadcrumb-item>客户网站留言</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <!--<div class="input-box">-->
                            <!--<a-input placeholder="请输入接收人" v-model="receiveUser"/>-->
                        <!--</div>-->
                        <!--<div class="input-box">-->
                            <!--<a-input placeholder="接收企业" v-model="receiveEnt"/>-->
                        <!--</div>-->
                        <div class="input-box">
                            <a-input placeholder="请输入留言内容" v-model="receiveContent"/>
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
                    <customer-message-table style="margin-top: 20px;" :key="timer"></customer-message-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const CustomerMessageTable = () => import("../components/CustomerMessageTable")

    export default {
        name: "CustomerMessage",
        components: {CustomerMessageTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                receiveContent: "",
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
            refreshTable: function(){
                this.timer = new Date().getTime()
            },
            searchContent: function() {
                sessionStorage.setItem("message", this.receiveContent)
                this.timer = new Date().getTime()
            }
        }
    }
</script>

<style scoped>

</style>
