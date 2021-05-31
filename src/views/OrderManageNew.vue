<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['订单管理']" :opened-key="['sub7']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>订单管理系统</a-breadcrumb-item>
                        <a-breadcrumb-item>订单管理</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex" style="margin-bottom: 15px">
                            <div class="content-top-select">
                                <a-select style="width: 500px" v-model="agentName" placeholder="按代理商帐号搜索">
                                    <a-select-option value="">
                                        全部代理商
                                    </a-select-option>
                                    <a-select-option v-for="item in adminData" :value="item.username" :key="item.username" :title="'代理账号 ['+item.username+']-姓名 ['+item.name+']-公司 ['+item.entName+']'">
                                        代理账号 [{{item.username}}]-姓名 [{{item.name}}]-公司 [{{item.entName}}]
                                    </a-select-option>
                                </a-select>
                            </div>
                        </div>
                        <div class="content-top flex">
<!--                            <div class="input-box" style="width: 200px">-->
<!--                                <a-input placeholder="请输入审核管理员账号" v-model="adminName" :allowClear="true" @change="fresh($event)"/>-->
<!--                            </div>-->
                            <div class="input-box" style="width: 200px">
                                <a-input placeholder="请输入代理商账号" v-model="agentName" :allowClear="true" @change="fresh($event)"/>
                            </div>
                            <div class="input-box" style="width: 200px">
                                <a-input placeholder="请输入订单编号" v-model="outTradeNo" :allowClear="true" @change="fresh($event)"/>
                            </div>
<!--                            <div class="input-box" style="width: 200px">-->
<!--                                <a-input placeholder="请输入会员账号" v-model="username" :allowClear="true" @change="fresh($event)"/>-->
<!--                            </div>-->
                            <div class="content-top-select">
                                <a-select style="width: 200px" placeholder="按分类搜索" v-model="type">
                                    <a-select-option value="">
                                        默认
                                    </a-select-option>
                                    <a-select-option value="01">
                                        代理商订单
                                    </a-select-option>
                                    <a-select-option value="02">
                                        线上直接付费
                                    </a-select-option>
                                    <a-select-option value="03">
                                        线下支付（永进扫码）
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
                        <order-manage-new-table style="margin-top: 20px" :key="timer"
                                            @refresh="refreshTable" @currentPage="getCurrentPage" :toChildPage="page"></order-manage-new-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const OrderManageNewTable = () => import("../components/OrderManageNewTable")

    export default {
        name: "OrderManageNew",
        components: {OrderManageNewTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: 1,
                type: undefined,
                adminName: "",
                agentName: "",
                outTradeNo: "",
                username: "",
                page: "1",
                currentPage: "1",
                adminData: [],
            };
        },
        watch: {
            timer() {
                this.page = this.currentPage
            }
        },
        mounted() {
            this.searchSite()
            this.getAdminData()
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
                let siteParams = {"adminName": this.adminName, "agentName": this.agentName, "outTradeNo": this.outTradeNo, "type": this.type, "username": this.username}
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
            },
            getAdminData(){
                this.$api.getAgentLayoutList()
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log(data)
                            if(data.data.data.adminList.length){
                                this.adminData = data.data.data.adminList
                                console.log(this.adminData)
                            }
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
