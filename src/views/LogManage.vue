<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['5']" :opened-key="['sub6']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>日志管理</a-breadcrumb-item>
                    <a-breadcrumb-item>日志查询</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="input-box">
                            <a-input placeholder="企业帐号" v-model="entUsername" :allowClear="true" @change="fresh($event)"/>
                        </div>
                        <div class="input-box">
                            <a-input placeholder="操作者帐号" v-model="operateUsername" :allowClear="true" @change="fresh($event)"/>
                        </div>
                        <div class="input-box">
                            <a-input placeholder="功能模块" v-model="name" :allowClear="true" @change="fresh($event)"/>
                        </div>
                        <div class="content-top-select">
                            <a-range-picker :placeholder="['开始时间', '结束时间']" v-model="timeSelect">
                            </a-range-picker>
                        </div>
                        <div class="input-box">
                            <a-input placeholder="内容" v-model="ldesc" :allowClear="true" @change="fresh($event)"/>
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
                    <log-manage-table style="margin-top: 20px" :key="timer"
                                      @refresh="refreshTable"></log-manage-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const LogManageTable = () => import("../components/LogManageTable")
    import moment from 'moment'

    export default {
        name: "LogManage",
        components: {LogManageTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: 1,
                entUsername: "",
                operateUsername: "",
                name: "",
                timeSelect: undefined,
                ldesc: ""
            };
        },
        mounted() {
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
                // const date = new Date();
                // //年
                // const year = date.getFullYear();
                // //月
                // const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
                // //日
                // const day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
                // const today = year + "-" + month + "-" + day
                // 获取当天日期并转换成时间戳格式
                const today = moment(Date.parse(new Date())).hour(23).minute(59).second(59);
                if (this.timeSelect && new Date(this.timeSelect[1].format("YYYY-MM-DD") + " 23:59:59").getTime() > today) {
                    this.$message.error("时间选择有误请重新选择")
                    return false
                }
                let siteParams = {
                    "entUsername": this.entUsername,
                    "operateUsername": this.operateUsername,
                    "name": this.name,
                    "frontTime": this.timeSelect && new Date(this.timeSelect[0].format("YYYY-MM-DD") + " 00:00:00").getTime(),
                    "backTime": this.timeSelect && new Date(this.timeSelect[1].format("YYYY-MM-DD") + " 23:59:59").getTime(),
                    "ldesc": this.ldesc
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
