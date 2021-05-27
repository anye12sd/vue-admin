<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['模块管理V4']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                        <a-breadcrumb-item>模块管理V4</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="content-top-select">
                                <a-select style="width: 120px" v-model="caseSelect">
                                    <a-select-option value="">
                                        请选择分类
                                    </a-select-option>
                                    <a-select-option value="onSale">
                                        分类1
                                    </a-select-option>
                                    <a-select-option value="offSale">
                                        分类22
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 120px" v-model="caseSelect">
                                    <a-select-option value="">
                                        全部
                                    </a-select-option>
                                    <a-select-option value="onSale">
                                        已上架
                                    </a-select-option>
                                    <a-select-option value="offSale">
                                        未上架
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 200px" v-model="caseSelect">
                                    <a-select-option value="">
                                        请选择排序
                                    </a-select-option>
                                    <a-select-option value="onSale">
                                        按被调用次数升序
                                    </a-select-option>
                                    <a-select-option value="offSale">
                                        按被调用次数降序
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="input-box" style="width: 200px;">
                                <a-input placeholder="请输入管理员账号" :allowClear="true" @change="fresh($event)"
                                         v-model="adminName"/>
                            </div>
                            <div class="input-box" style="width: 200px;">
                                <a-input placeholder="请输入板块编号" :allowClear="true" @change="fresh($event)"
                                         v-model="templateName"/>
                            </div>
                            <div class="content-top-btn">
                                <a-button type="default" @click="searchSite">
                                    查询板块作者
                                </a-button>
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
                        <TemplateManageV4Table style="margin-top: 20px;" :key="timer"
                                             @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></TemplateManageV4Table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    import TemplateManageV4Table from "../components/TemplateManageV4Table";

    export default {
        name: "TemplateManageV4",
        components: {TemplateManageV4Table},
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
