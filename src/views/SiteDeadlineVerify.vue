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
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                    <a-breadcrumb-item>站点过期审核</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="input-box" style="width: 160px;">
                            <a-input placeholder="请输入网站编号" :allowClear="true" @change="fresh($event)" v-model="outTradeNo"/>
                        </div>
                        <div class="input-box" style="width: 160px;">
                            <a-input placeholder="请输入站点名称" :allowClear="true" @change="fresh($event)" v-model="outTradeNo"/>
                        </div>
                        <div class="input-box" style="width: 160px;">
                            <a-input placeholder="请输入域名网址" :allowClear="true" @change="fresh($event)" v-model="outTradeNo"/>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 160px" v-model="caseSelect">
                                <a-select-option value="">
                                    请选择审核状态
                                </a-select-option>
                                <a-select-option value="onSale">
                                    审核通过
                                </a-select-option>
                                <a-select-option value="offSale">
                                    未审核
                                </a-select-option>
                                <a-select-option value="offSale">
                                    审核通过
                                </a-select-option>
                                <a-select-option value="offSale">
                                    审核未通过
                                </a-select-option>
                                <a-select-option value="offSale">
                                    请求清除
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 160px" v-model="caseSelect">
                                <a-select-option value="">
                                    请选择用户类型
                                </a-select-option>
                                <a-select-option value="onSale">
                                    30天试用
                                </a-select-option>
                                <a-select-option value="offSale">
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
                                       @refresh="refreshTable"></site-deadline-verify-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    import SiteDeadlineVerifyTable from "../components/SiteDeadlineVerifyTable";
    export default {
        name: "SiteDeadlineVerify",
        components: {SiteDeadlineVerifyTable},
        data() {
            return {
                console: true,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                caseSelect: "",
                templateSelect: "",
                timeSelect: undefined,
                outTradeNo: "",
                username: ""
            }
        },
        mounted(){
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
                let siteParams = {
                    "outTradeNo": this.outTradeNo,
                    "username": this.username,
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