<template>
    <div>
        <a-layout>
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
                <left-slide-nav :selected-key="['5']" :opened-key="['sub6']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>日志管理</a-breadcrumb-item>
                    <a-breadcrumb-item>日志查询</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="input-box">
                            <a-input placeholder="企业帐号" v-model="weixinNumber"/>
                        </div>
                        <div class="input-box">
                            <a-input placeholder="操作者帐号" v-model="weixinNumber"/>
                        </div>
                        <div class="input-box">
                            <a-input placeholder="功能模块" v-model="weixinNumber"/>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 120px" placeholder="请选择类型" v-model="domain">
                                <a-select-option value="修改">
                                    修改
                                </a-select-option>
                                <a-select-option value="登陆系统">
                                    登陆系统
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-range-picker :placeholder="['开始时间', '结束时间']">
                            </a-range-picker>
                        </div>
                        <div class="input-box">
                            <a-input placeholder="内容" v-model="weixinNumber"/>
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
                    <log-manage-table style="margin-top: 20px" :key="timer" :site="site"
                                      @refresh="refreshTable"></log-manage-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const LogManageTable = () => import("../components/LogManageTable")

    export default {
        name: "LogManage",
        components: {LogManageTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: 1,
                domain: "",
                site: "",
                weixinNumber: "",
            };
        },
        mounted() {
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
                let siteParams = {"domain": this.domain, "payType": this.payType, "weixinNumber": this.weixinNumber}
                sessionStorage.setItem("siteParams", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            refreshTable: function (data) {
                this.timer = data
            }
        }
    }
</script>

<style scoped>

</style>
