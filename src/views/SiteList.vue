<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['4']" :opened-key="['sub5']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>站点管理</a-breadcrumb-item>
                        <a-breadcrumb-item>站点列表</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box">
                                <a-input placeholder="微信群编号" v-model="weixinNumber" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 120px" placeholder="注册来源" v-model="domain">
                                    <a-select-option value="ykyh.com">
                                        ykyh.com
                                    </a-select-option>
                                    <a-select-option value="jihui88.com">
                                        jihui88.com
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 230px" placeholder="是否付费用户" v-model="payType">
                                    <a-select-option value="00">
                                        （30天试用）未到期的站点
                                    </a-select-option>
                                    <a-select-option value="01">
                                        （已付费）购买的站点
                                    </a-select-option>
                                    <a-select-option value="02">
                                        （30天试用）到期的站点
                                    </a-select-option>
                                    <a-select-option value="03">
                                        （付费过）到期的站点）
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="timeSelectType">
                                    <a-select-option value="">
                                        搜索时间类型
                                    </a-select-option>
                                    <a-select-option value="1">
                                        到期时间
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select" style="width:260px">
                                <a-range-picker :placeholder="['开始时间', '结束时间']" v-model="timeSelect">
                                </a-range-picker>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="search" @click="searchSite">
                                </a-button>
                            </div>
                        </div>
                        <site-list-table style="margin-top: 20px" :key="timer" :site="site"
                                         @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></site-list-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const SiteListTable = () => import("../components/SiteListTable")

    export default {
        name: "SiteList",
        components: {SiteListTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                domain: "ykyh.com",
                payType: "00",
                timer: 1,
                page: "1",
                currentPage: "1",
                timeSelectType: "",
                timeSelect: undefined,
                weixinNumber: "",
                site: "ykyh.com"
            };
        },
        watch: {
            timer() {
                this.page = this.currentPage
            }
        },
        mounted() {
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
                let siteParams = {"domain": this.domain, "payType": this.payType, "weixinNumber": this.weixinNumber}
                if(this.timeSelectType == 1){
                    siteParams.endTimeStart = this.timeSelect && this.timeSelect[0].format("YYYY-MM-DD")
                    siteParams.endTimeEnd = this.timeSelect && this.timeSelect[1].format("YYYY-MM-DD")
                }
                sessionStorage.setItem("siteParams", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            refreshTable: function (data) {
                this.timer = data
            },
            fresh(e){
                if(e.target.value == ""){
                    this.searchSite()
                }
            }
        }
    }
</script>

<style scoped>

</style>
