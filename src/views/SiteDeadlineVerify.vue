<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['15']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                        <a-breadcrumb-item>站点过期审核</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="网站编号" :allowClear="true" @change="fresh($event)" v-model="layoutId"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="站点名称" :allowClear="true" @change="fresh($event)" v-model="seoTitle"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="公司名称" :allowClear="true" @change="fresh($event)" v-model="companyName"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="域名网址" :allowClear="true" @change="fresh($event)" v-model="bindUrl"/>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="state" placeholder="审核状态">
                                    <a-select-option value="0">
                                        未审核
                                    </a-select-option>
                                    <a-select-option value="1">
                                        已审核
                                    </a-select-option>
                                    <a-select-option value="2">
                                        已过期
                                    </a-select-option>
                                    <a-select-option value="3">
                                        已删除
                                    </a-select-option>
                                    <a-select-option value="4">
                                        已关闭
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="userType">
                                    <a-select-option value="">
                                        请选择用户类型
                                    </a-select-option>
                                    <a-select-option value="free">
                                        30天试用
                                    </a-select-option>
                                    <a-select-option value="vip">
                                        付费用户
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-range-picker :placeholder="['开始时间', '结束时间']" v-model="timeSelect">
                                </a-range-picker>
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
                        <site-deadline-verify-table style="margin-top: 20px;" :key="timer"
                                           @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></site-deadline-verify-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const SiteDeadlineVerifyTable = () => import("../components/SiteDeadlineVerifyTable")
    export default {
        name: "SiteDeadlineVerify",
        components: {SiteDeadlineVerifyTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                companyName: "",
                userType: "vip",
                timeSelect: undefined,
                state: undefined,
                layoutId: "",
                seoTitle: "",
                bindUrl: "",
                page: "1",
                currentPage: "1",
            }
        },
        watch: {
            timer() {
                this.page = this.currentPage
            }
        },
        mounted(){
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
                let siteParams = {
                    "layoutId": this.layoutId,
                    "seoTitle": this.seoTitle,
                    "bindUrl": this.bindUrl,
                    "userType": this.userType,
                    "state": this.state,
                    "entName": this.companyName,
                    "startDate": this.timeSelect && this.timeSelect[0].format("YYYY-MM-DD"),
                    "endDate": this.timeSelect && this.timeSelect[1].format("YYYY-MM-DD")
                }
                sessionStorage.setItem("siteParams", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            refreshTable: function () {
                this.timer = new Date().getTime()
            },
            fresh(e) {
                if (e.target.value == "") {
                    this.searchSite()
                }
            }
        }
    }
</script>

<style scoped>

</style>