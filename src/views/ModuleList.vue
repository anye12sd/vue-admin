<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['9']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                    <a-breadcrumb-item>模块列表</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入管理员账号" :allowClear="true" @change="fresh($event)" v-model="outTradeNo"/>
                        </div>
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入版块编号" :allowClear="true" @change="fresh($event)" v-model="username"/>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 120px" placeholder="请选择分类" v-model="type">
                                <a-select-option value="ykyh.com">
                                    ykyh.com
                                </a-select-option>
                                <a-select-option value="jihui88.com">
                                    jihui88.com
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 120px" placeholder="显示全部" v-model="state">
                                <a-select-option value="">
                                    显示全部
                                </a-select-option>
                                <a-select-option value="onSale">
                                    已上架
                                </a-select-option>
                                <a-select-option value="offSale">
                                    已下架
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="content-top-select">
                            <a-select style="width: 160px" placeholder="默认排序" v-model="sort">
                                <a-select-option value="">
                                    默认排序
                                </a-select-option>
                                <a-select-option value="onSale">
                                    按被调用次数升序
                                </a-select-option>
                                <a-select-option value="offSale">
                                    按被调用次数降序
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
                        <div class="content-top-btn">
                            <a-button>
                                添加版块
                            </a-button>
                        </div>
                        <div class="content-top-btn">
                            <a-button>
                                全局语言设置
                            </a-button>
                        </div>
                        <div class="content-top-btn">
                            <a-button>
                                查询版块作者
                            </a-button>
                        </div>
                    </div>
                    <module-list-table style="margin-top: 20px;" :key="timer"
                                       @refresh="refreshTable"></module-list-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    import ModuleListTable from "../components/ModuleListTable";

    export default {
        name: "ModuleList",
        components: {ModuleListTable },
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
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