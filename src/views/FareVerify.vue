<template>
    <div>
        <a-layout>
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
                <left-slide-nav :selected-key="['6']" :opened-key="['sub7']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>订单管理系统</a-breadcrumb-item>
                    <a-breadcrumb-item>费用审核</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content
                        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px',marginBottom: '70px' }"
                >
                    <div class="content-top flex">
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入订单编号"/>
                        </div>
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入客户账号"/>
                        </div>
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入经销商编号"/>
                        </div>
                        <div class="content-top-btn">
                            <a-button type="primary" icon="search">
                            </a-button>
                        </div>
                        <div class="content-top-btn">
                            <a-button type="primary" icon="reload" @click="refreshTable">
                            </a-button>
                        </div>
                    </div>
                    <fare-verify-table style="margin-top: 20px;"></fare-verify-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const FareVerifyTable = () => import("../components/FareVerifyTable")

    export default {
        name: "FareVerify",
        components: {FareVerifyTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
            }
        }
    }
</script>

<style scoped>

</style>