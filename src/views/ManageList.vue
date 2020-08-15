<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['17']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                    <a-breadcrumb-item>站点管理列表</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div>
                        <a-tabs default-active-key="1" @change="callback">
                            <a-tab-pane key="1" tab="Tab 1">
                                <site-label-manage></site-label-manage>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="Tab 2" force-render>
                                Content of Tab Pane 2
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="Tab 3">
                                Content of Tab Pane 3
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>

    import SiteLabelManage from "../components/SiteLabelManageFold/SiteLabelManage";
    export default {
        name: "ManageList",
        components: {SiteLabelManage },
        data() {
            return {
                console: true,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                copyState: "",
                isCase: "",
                timeSelect: undefined,
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
                    "isCase": this.isCase,
                    "copyState": this.copyState,
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
            },
            callback(key) {
                console.log(key);
            },
        }
    }
</script>

<style scoped>

</style>