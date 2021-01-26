<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['22']" :opened-key="['sub2']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <div class="table-wrapper">
                    <a-breadcrumb class="layout-box-breadcrumb">
                        <a-breadcrumb-item>数据转移</a-breadcrumb-item>
                        <a-breadcrumb-item>数据转移</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content class="layout-box-content">
                        <data-transfer-table></data-transfer-table>
                    </a-layout-content>
                    <Copyright></Copyright>
                </div>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    import DataTransferTable from "../components/DataTransferTable";

    export default {
        name: "DataTransfer",
        components: {DataTransferTable},
        data() {
            return {
                console: false,
                collapsed: false,
                LeftDrawerShow: false,
                entName: "",
                username: "",
                domain: "",
                timer: 1,
                page: "1",
                currentPage: "1",
            };
        },
        watch: {
            timer() {
                this.page = this.currentPage
            }
        },
        mounted() {
            this.searchData()
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
            refreshTable: function () {
                this.timer = new Date().getTime()
            }
            , searchData: function () {
                let userMessage = {entName: this.entName, username: this.username, domain: this.domain}
                sessionStorage.setItem("userMessage", JSON.stringify(userMessage))
                this.timer = new Date().getTime()
            },
            fresh(e){
                if(e.target.value == ""){
                    this.searchData()
                }
            }
        }
    }
</script>

<style scoped>

</style>
