<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['2']" :opened-key="['sub3']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>留言管理</a-breadcrumb-item>
                        <a-breadcrumb-item>客户网站留言</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box">
                                <a-input placeholder="请输入留言内容" v-model="searchKey" :allowClear="true"
                                         @change="fresh($event)"/>
                            </div>
                            <div class="input-box">
                                <a-input placeholder="请输入接收人" v-model="recvName" :allowClear="true"
                                         @change="fresh($event)"/>
                            </div>
                            <div class="input-box">
                                <a-input placeholder="接收企业" v-model="entName" @change="fresh($event)" :allowClear="true"/>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" placeholder="选择留言查询类型" v-model="listType">
                                    <a-select-option value="00">
                                        查询全部
                                    </a-select-option>
                                    <a-select-option value="01">
                                        查询前一天
                                    </a-select-option>
                                </a-select>
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
                        <customer-message-table style="margin-top: 20px;" :key="timer" @currentPage="getCurrentPage" :toChildPage="page"></customer-message-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
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
                searchKey: "",
                entName: "",
                recvName: "",
                listType: undefined,
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
                    "listType": this.listType,
                    "searchKey": this.searchKey,
                    "entName": this.entName,
                    "recvName": this.recvName
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
