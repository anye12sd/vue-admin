<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['23']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                        <a-breadcrumb-item>模块审核V5</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box" style="width: 200px;">
                                <a-input placeholder="请输入素材名称" :allowClear="true" @change="fresh($event)"
                                         v-model="moduleName"/>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 120px" v-model="kind">
                                    <a-select-option value="">
                                        按案例筛选
                                    </a-select-option>
                                    <a-select-option value="c">
                                        已上架模块
                                    </a-select-option>
                                    <a-select-option value="s">
                                        未上架模块
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 200px" v-model="parentId">
                                    <a-select-option value="">
                                        按分类名称筛选
                                    </a-select-option>
                                    <template v-for="(item, key) in parentIdSelect">
                                        <a-select-option :value="key" :key="key">
                                            {{item}}
                                        </a-select-option>
                                    </template>
                                </a-select>
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
                        <module-verifyV5-table style="margin-top: 20px;" :key="timer"
                                            @parentIdAll="getParentIdAll" @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></module-verifyV5-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const ModuleVerifyV5Table = () => import("../components/ModuleVerifyV5Table")

    export default {
        name: "ModuleVerifyV5",
        components: {ModuleVerifyV5Table},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                moduleName: "",
                kind: "",
                parentId: "",
                username: "",
                page: "1",
                currentPage: "1",
                parentIdSelect: {}
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
                this.currentPage = 1
                let siteParams = {
                    "name": this.moduleName,
                    "kind": this.kind,
                    "parentId": this.parentId
                }
                sessionStorage.setItem("siteParamsV5", JSON.stringify(siteParams))
                this.timer = new Date().getTime()
            },
            refreshTable: function () {
                this.timer = new Date().getTime()
            },
            fresh(e) {
                if (e.target.value == "") {
                    this.searchSite()
                }
            },
            getParentIdAll(value){
                this.parentIdSelect = value
            }
        }
    }
</script>

<style scoped>

</style>