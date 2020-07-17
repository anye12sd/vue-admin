<template>
    <div>
        <a-layout>
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
                <left-slide-nav :selected-key="['5']" :opened-key="['sub6']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>超级管理</a-breadcrumb-item>
                    <a-breadcrumb-item>管理员管理</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content
                        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px',marginBottom: '70px' }"
                >
                    <div class="content-top flex">
                        <div class="content-top-btn" style="margin-right: 8px">
                            <router-link to="/access/AddNewAccessControlAdmin">
                                <a-button type="primary">
                                    <a-icon type="plus"/>
                                    新增管理员
                                </a-button>
                            </router-link>
                        </div>
                        <div class="input-box" style="width: 200px;">
                            <a-input placeholder="请输入姓名或者用户名"/>
                        </div>
                        <div class="content-top-btn">
                            <a-button type="primary">
                                <a-icon type="search"/>
                            </a-button>
                        </div>
                    </div>
                    <access-control-table style="margin-top: 20px;"></access-control-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    import AccessControlTable from "./AccessControlTable";

    export default {
        name: "AccessControl",
        components: {AccessControlTable},
        data() {
            return {
                collapsed: false,
                LeftDrawerShow: false
            };
        },
        methods: {
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            }
        }
    }
</script>

<style scoped>

</style>
