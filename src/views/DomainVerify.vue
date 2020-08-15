<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['14']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                    <a-breadcrumb-item>域名绑定审核</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入网站编号" :allowClear="true" @change="fresh($event)" v-model="layoutId"/>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 120px" v-model="stateSelect" placeholder="请选择状态">
                                <a-select-option value="">
                                    请选择
                                </a-select-option>
                                <a-select-option value="00">
                                    审核中
                                </a-select-option>
                                <a-select-option value="01">
                                    审核通过
                                </a-select-option>
                                <a-select-option value="02">
                                    审核未通过
                                </a-select-option>
                                <a-select-option value="03">
                                    请求清除
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 120px" v-model="onlineSelect" placeholder="是否上线">
                                <a-select-option value="">
                                    是否上线
                                </a-select-option>
                                <a-select-option value="01">
                                    是
                                </a-select-option>
                                <a-select-option value="00">
                                    否
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 160px" v-model="sortName">
                                <a-select-option value="addTime">
                                    按添加时间排序
                                </a-select-option>
                                <a-select-option value="layoutId">
                                    按网站编号排序
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 120px" v-model="sortType">
                                <a-select-option value="asc">
                                    升序
                                </a-select-option>
                                <a-select-option value="desc">
                                    降序
                                </a-select-option>
                            </a-select>
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
                    <domain-verify-table style="margin-top: 20px;" :key="timer"
                                       @refresh="refreshTable"></domain-verify-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>

    import DomainVerifyTable from "../components/DomainVerifyTable";
    export default {
        name: "DomainVerify",
        components: {DomainVerifyTable},
        data() {
            return {
                console: true,
                collapsed: false,
                LeftDrawerShow: false,
                layoutId: "",
                timer: "",
                sortName: "addTime",
                sortType: "desc",
                stateSelect: undefined,
                onlineSelect: undefined,
                stateSelected: "",
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
                    "layoutId": this.layoutId,
                    "state": this.stateSelect || undefined,
                    "online": this.onlineSelect || undefined,
                    "sortName": this.sortName,
                    "sortType": this.sortType
                }
                console.log(siteParams)
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