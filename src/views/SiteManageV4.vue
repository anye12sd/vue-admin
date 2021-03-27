<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['26']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                        <a-breadcrumb-item>站点管理V4</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入网站编号" :allowClear="true" @change="fresh($event)" v-model="layoutId"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入站点名称" :allowClear="true" @change="fresh($event)" v-model="seoTitle"/>
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
                        <site-manage-v4-table style="margin-top: 20px;" :key="timer"
                                           @refresh="refreshTable" @toFindParent="findParent" @currentPage="getCurrentPage" :toChildPage="page"></site-manage-v4-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    import SiteManageV4Table from "../components/SiteManageV4Table";

    export default {
        name: "SiteManageV4",
        components: {SiteManageV4Table },
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: 1,
                layoutId: "",
                seoTitle: "",
                // imgUploadAction: `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/logo/edit`,
                headers:{
                    "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
                },
                // uploadData:{
                //     layoutId:5730
                // }
                page: "1",
                currentPage: "1",
            }
        },
        watch: {
            timer() {
                this.page = this.currentPage
            }
        },
        mounted(){
            if(this.$route.query.layoutId){
                this.layoutId = this.$route.query.layoutId
            }
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
                    "layoutId": this.layoutId,
                    "seoTitle": this.seoTitle,
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
            },
            findParent(value){
                this.layoutId = value
                this.searchSite()
            }
            // handleChange(info) {
            //     if (info.file.status !== 'uploading') {
            //         console.log(info.file, info.fileList);
            //     }
            //     if (info.file.status === 'done') {
            //         this.$message.success(`${info.file.name} file uploaded successfully`);
            //     } else if (info.file.status === 'error') {
            //         this.$message.error(`${info.file.name} file upload failed.`);
            //     }
            // },
        }
    }
</script>

<style scoped>

</style>