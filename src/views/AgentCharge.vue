<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['20']" :opened-key="['sub9']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>代理商管理</a-breadcrumb-item>
                    <a-breadcrumb-item>代理商充值</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="tools-select-box tabs-box">
                        <a-input-number placeholder="请输入金额" v-model="number" style="width: 200px" :min="0"/>
                        <a-input placeholder="请输入代理商账号" v-model="username" style="width: 200px; display: block; margin-top: 15px"/>
                        <a-popconfirm :visible="visibility" placement="top" ok-text="确定" cancel-text="取消" @confirm="confirm" @cancel="cancel">
                            <template slot="title">
                                <p>确定给{{ username }}充值{{ number }}元吗？</p>
                            </template>
                            <a-button type="primary" @click="check" style="margin-top: 15px">充值</a-button>
                        </a-popconfirm>
                    </div>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    export default {
        name: "AgentCharge",
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                visibility: false,
                timer: "",
                number: "",
                username: ""
            }
        },
        methods: {
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            },
            refreshTable: function () {
                this.timer = new Date().getTime()
            },
            cancel(){
                this.visibility = false
            },
            confirm(){
                let params = {rechargeAmount: this.number, username: this.username}
                this.$api.postAgentCharge(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.visibility = false
                            this.$message.error("充值成功")
                        } else {
                            this.visibility = false
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            check() {
                if(!this.number){
                    this.$message.error("请输入金额")
                    return false
                }
                if(!this.username){
                    this.$message.error("请输入代理商账号")
                    return false
                }
                this.visibility = true
            }
        }
    }
</script>

<style scoped>

</style>