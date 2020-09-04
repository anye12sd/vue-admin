<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['16']" :opened-key="['sub8']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>界面编辑</a-breadcrumb-item>
                        <a-breadcrumb-item>代理订单审核</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <div class="content-top flex">
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入企业账号" :allowClear="true" @change="fresh($event)"
                                         v-model="username"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入订单编号" :allowClear="true" @change="fresh($event)"
                                         v-model="orderSn"/>
                            </div>
                            <div class="input-box" style="width: 160px;">
                                <a-input placeholder="请输入站点编号" :allowClear="true" @change="fresh($event)"
                                         v-model="layoutId"/>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="orderType" placeholder="请选择订单类型">
                                    <a-select-option value="">
                                        请选择
                                    </a-select-option>
                                    <a-select-option value="01">
                                        购买
                                    </a-select-option>
                                    <a-select-option value="02">
                                        续费
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 160px" v-model="orderStatus" placeholder="请选择审核状态">
                                    <a-select-option value="">
                                        请选择
                                    </a-select-option>
                                    <a-select-option value="00">
                                        未审核
                                    </a-select-option>
                                    <a-select-option value="01">
                                        审核通过
                                    </a-select-option>
                                    <a-select-option value="02">
                                        审核未通过
                                    </a-select-option>
                                    <a-select-option value="03">
                                        已关闭
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="content-top-select">
                                <a-select style="width: 240px" v-model="adminId" placeholder="请选择代理账号">
                                    <a-select-option value="">
                                        请选择代理帐号
                                    </a-select-option>
                                    <a-select-option v-for="(item) in agentList" :value="item.adminId"
                                                     :key="item.adminId"
                                                     :title="'代理账号[' + item.username +']-姓名[' +item.name +']-公司['+item.entName+']'">
                                        代理帐号[{{item.username || ""}}]-姓名[{{item.name || ""}}]-公司[{{item.entName || ""}}]
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
                        <order-agent-verify-table style="margin-top: 20px;" :key="timer"
                                                  @refresh="refreshTable"></order-agent-verify-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>

    const OrderAgentVerifyTable = () => import("../components/OrderAgentVerifyTable")

    export default {
        name: "OrderAgentVerify",
        components: {OrderAgentVerifyTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                orderType: undefined,
                orderSn: "",
                username: "",
                adminId: undefined,
                orderStatus: undefined,
                layoutId: "",
                agentList: [],
            }
        },
        mounted() {
            this.searchSite()
            this.fetch()
        },
        methods: {
            fetch() {
                this.$api.getAgentList()
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.agentList = data.data.data.agentList
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            },
            searchSite: function () {
                let siteParams = {
                    "layoutId": this.layoutId,
                    "username": this.username,
                    "orderSn": this.orderSn,
                    "orderType": this.orderType || undefined,
                    "adminId": this.adminId || undefined,
                    "orderStatus": this.orderStatus || undefined
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