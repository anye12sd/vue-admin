<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['12']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                    <a-breadcrumb-item>模板审核</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入网站编号" :allowClear="true" @change="fresh($event)" v-model="layoutId"/>
                        </div>
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入站点名称" :allowClear="true" @change="fresh($event)" v-model="seoTitle"/>
                        </div>
<!--                        <div class="content-top-select">-->
<!--                            <a-select style="width: 120px" v-model="copyState">-->
<!--                                <a-select-option value="">-->
<!--                                    全部-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="1">-->
<!--                                    已上架模板-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="0">-->
<!--                                    未上架模板-->
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
                    <template-verify-table style="margin-top: 20px;" :key="timer"
                                       @refresh="refreshTable"></template-verify-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>
<script>

    import TemplateVerifyTable from "../components/TemplateVerifyTable";
    export default {
        name: "TemplateVerify",
        components: {TemplateVerifyTable },
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                copyState: "",
                layoutId: "",
                seoTitle: ""
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
                    "seoTitle": this.seoTitle,
                    // "copyState": this.copyState,
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