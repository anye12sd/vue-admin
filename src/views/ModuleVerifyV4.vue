<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['13']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                        <a-breadcrumb-item>模块审核V4</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box" style="width: 200px;">
                                <a-input placeholder="请输入模块编号" :allowClear="true" @change="fresh($event)"
                                         v-model="moduleType"/>
                            </div>
                            <!--                        <div class="content-top-select">-->
                            <!--                            <a-select style="width: 120px" v-model="caseSelect">-->
                            <!--                                <a-select-option value="">-->
                            <!--                                    全部-->
                            <!--                                </a-select-option>-->
                            <!--                                <a-select-option value="onSale">-->
                            <!--                                    已上架案例-->
                            <!--                                </a-select-option>-->
                            <!--                                <a-select-option value="offSale">-->
                            <!--                                    未上架案例-->
                            <!--                                </a-select-option>-->
                            <!--                            </a-select>-->
                            <!--                        </div>-->
                            <div class="content-top-btn">
                                <a-button type="primary" icon="search" @click="searchSite">
                                </a-button>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="primary" icon="reload" @click="refreshTable">
                                </a-button>
                            </div>
                        </div>
                        <module-verifyV4-table style="margin-top: 20px;" :key="timer"
                                             @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></module-verifyV4-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const ModuleVerifyV4Table = () => import("../components/ModuleVerifyV4Table")

    export default {
        name: "ModuleVerifyV4",
        components: {ModuleVerifyV4Table},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                caseSelect: "",
                moduleType: "",
                templateSelect: "",
                timeSelect: undefined,
                outTradeNo: "",
                username: "",
                page: "1",
                currentPage: "1",
            }
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
                let siteParams = {
                    "type": this.moduleType,
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