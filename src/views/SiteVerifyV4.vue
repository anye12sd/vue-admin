<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['11']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                        <a-breadcrumb-item>网站审核</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入网站编号" :allowClear="true" @change="fresh($event)" v-model="layoutId"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入站点名称" :allowClear="true" @change="fresh($event)" v-model="seoTitle"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入绑定域名" :allowClear="true" @change="fresh($event)" v-model="bindUrl"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入用户名称" :allowClear="true" @change="fresh($event)" v-model="username"/>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 120px" v-model="isCase">
                                    <a-select-option value="">
                                        按案例筛选
                                    </a-select-option>
                                    <a-select-option value="1">
                                        已上架案例
                                    </a-select-option>
                                    <a-select-option value="0">
                                        未上架案例
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 120px" v-model="copyState">
                                    <a-select-option value="">
                                        按模板筛选
                                    </a-select-option>
                                    <a-select-option value="1">
                                        已上架模板
                                    </a-select-option>
                                    <a-select-option value="0">
                                        未上架模板
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="state">
                                    <a-select-option value="">
                                        按审核状态筛选
                                    </a-select-option>
                                    <a-select-option value="0">
                                        未审核
                                    </a-select-option>
                                    <a-select-option value="1">
                                        已审核
                                    </a-select-option>
                                    <a-select-option value="2">
                                        已过期
                                    </a-select-option>
                                    <a-select-option value="3">
                                        已删除
                                    </a-select-option>
                                    <a-select-option value="4">
                                        已关闭
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="userType">
                                    <a-select-option value="">
                                        按用户类型筛选
                                    </a-select-option>
                                    <a-select-option value="free">
                                        免费用户
                                    </a-select-option>
                                    <a-select-option value="vip">
                                        付费用户
                                    </a-select-option>
                                </a-select>
                            </div>
    <!--                        <div class="content-top-select">-->
    <!--                            <a-upload-->
    <!--                                    name="Filedata"-->
    <!--                                    :multiple="true"-->
    <!--                                    action="http://www.baidu.com/imgUploadAction"-->
    <!--                                    @change="handleChange"-->
    <!--                                    :headers="headers"-->
    <!--                                    :data="uploadData"-->
    <!--                            >-->
    <!--                                <a-button> <a-icon type="upload" /> Click to Upload </a-button>-->
    <!--                            </a-upload>-->
    <!--                        </div>-->
                        </div>
                        <div class="content-top flex" style="margin-top: 20px">
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="timeSelectType">
                                    <a-select-option value="">
                                        搜索时间类型
                                    </a-select-option>
                                    <a-select-option value="1">
                                        创建时间
                                    </a-select-option>
                                    <a-select-option value="2">
                                        开通时间
                                    </a-select-option>
                                    <a-select-option value="3">
                                        到期时间
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select" style="width:260px">
                                <a-range-picker :placeholder="['开始时间', '结束时间']" v-model="timeSelect">
                                </a-range-picker>
                            </div>
    <!--                        <div class="content-top-select">-->
    <!--                            <a-upload-->
    <!--                                    name="Filedata"-->
    <!--                                    :multiple="true"-->
    <!--                                    action="http://www.baidu.com/imgUploadAction"-->
    <!--                                    @change="handleChange"-->
    <!--                                    :headers="headers"-->
    <!--                                    :data="uploadData"-->
    <!--                            >-->
    <!--                                <a-button> <a-icon type="upload" /> Click to Upload </a-button>-->
    <!--                            </a-upload>-->
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
                        <site-verify-v4-table style="margin-top: 20px;" :key="timer"
                                           @refresh="refreshTable" @toFindParent="findParent"></site-verify-v4-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const SiteVerifyV4Table = () => import("../components/SiteVerifyV4Table");

    export default {
        name: "SiteVerifyV4",
        components: { SiteVerifyV4Table },
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: 1,
                copyState: "",
                isCase: "",
                state: "",
                userType: "",
                bindUrl: "",
                timeSelect: undefined,
                timeSelectType: "",
                layoutId: "",
                seoTitle: "",
                username: "",
                // imgUploadAction: `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/logo/edit`,
                headers:{
                    "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
                },
                // uploadData:{
                //     layoutId:5730
                // }
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
                    "bindUrl": this.bindUrl,
                    "username": this.username,
                    "state": this.state,
                    "userType": this.userType,
                    // "createStartTime": this.timeSelect && this.timeSelect[0].format("YYYY-MM-DD"),
                    // "createEndTime": this.timeSelect && this.timeSelect[1].format("YYYY-MM-DD")
                }
                if(this.timeSelectType == 1){
                    siteParams.createStartTime = this.timeSelect && this.timeSelect[0].format("YYYY-MM-DD")
                    siteParams.createEndTime = this.timeSelect && this.timeSelect[1].format("YYYY-MM-DD")
                }else if(this.timeSelectType == 2){
                    siteParams.onlineStartTime = this.timeSelect && this.timeSelect[0].format("YYYY-MM-DD")
                    siteParams.onlineEndTime = this.timeSelect && this.timeSelect[1].format("YYYY-MM-DD")
                }else if(this.timeSelectType == 3){
                    siteParams.startDate = this.timeSelect && this.timeSelect[0].format("YYYY-MM-DD")
                    siteParams.endDate = this.timeSelect && this.timeSelect[1].format("YYYY-MM-DD")
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