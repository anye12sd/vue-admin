<template>
    <div>
        <!--<div class="logo" />-->
        <div class="silde-title" :class="{'isFold':isFold == true}">
            <a-icon type="ellipsis" style="cursor: pointer" @click="showDrawer"></a-icon>
            <span v-show="!showTitle" style="padding-left: 10px">系统后台</span></div>
        <a-menu
                theme="dark"
                mode="inline"
                :default-selected-keys="selectedKey"
                :default-open-keys="openedKey"
                :style="{ textAlign: 'left'}"
        >
            <a-menu-item key="sub1">
                <a-icon type="home" />
                <router-link tag="span" to="/views/Index" style="display: inline-block">
                    首页
                </router-link>
            </a-menu-item>
            <template v-if="showLeftNav">
                <a-sub-menu v-for="(item,i) in leftSlide" :key="item.mainKey">
                    <span slot="title"><a-icon :type="item.icon"/><span>{{item.name}}</span></span>
                    <a-menu-item :key="itemChild.subKey" v-for="itemChild in leftSlide[i].children">
                        <router-link :to="itemChild.path">{{itemChild.name}}</router-link>
                    </a-menu-item>
                </a-sub-menu>
            </template>
            <template v-else>
                <a-sub-menu key="sub2">
                    <span slot="title"><a-icon type="user"/><span>会员管理</span></span>
                    <a-menu-item key="1">
                        <router-link to="/views/VerifiedCustomer">已验证客户【正常】</router-link>
                    </a-menu-item>
                    <a-menu-item key="22">
                        <router-link to="/views/DataTransfer">数据转移</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub3">
                    <span slot="title"><a-icon type="mail"/><span>留言管理</span></span>
                    <a-menu-item key="2">
                        <router-link to="/views/CustomerMessage">客户网站留言</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                    <span slot="title"><a-icon type="team"/><span>超级管理</span></span>
                    <a-menu-item key="3">
                        <router-link to="/views/AdminList">管理员管理</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub5">
                    <span slot="title"><a-icon type="notification"/><span>站点管理</span></span>
                    <a-menu-item key="4">
                        <router-link to="/views/SiteList">站点列表</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub6">
                    <span slot="title"><a-icon type="file-text"/><span>日志管理</span></span>
                    <a-menu-item key="5">
                        <router-link to="/views/logManage">日志查询</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub7">
                    <span slot="title"><a-icon type="file-text"/><span>订单管理系统</span></span>
                    <a-menu-item key="订单管理">
                        <router-link to="/views/OrderManageNew">订单管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="6">
                        <router-link to="/views/FareVerify">费用审核（旧）</router-link>
                    </a-menu-item>
                    <a-menu-item key="7">
                        <router-link to="/views/OrderManage">订单列表（旧）</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub8">
                    <span slot="title"><a-icon type="edit"/><span>界面编辑</span></span>
                    <a-menu-item key="模块管理V4">
                        <router-link to="/views/TemplateManageV4">模块管理V4</router-link>
                    </a-menu-item>
                    <a-menu-item key="26">
                        <router-link to="/views/SiteManageV4">站点管理V4</router-link>
                    </a-menu-item>
                    <a-menu-item key="11">
                        <router-link to="/views/SiteVerifyV4">网站审核V4</router-link>
                    </a-menu-item>
<!--                    <a-menu-item key="13">-->
<!--                        <router-link to="/views/ModuleVerifyV4">模块审核V4</router-link>-->
<!--                    </a-menu-item>-->
                    <a-menu-item key="23">
                        <router-link to="/views/ModuleVerifyV5">模块审核V5</router-link>
                    </a-menu-item>
                    <a-menu-item key="站点管理V5">
                        <router-link to="/views/SiteManageV5">站点管理V5</router-link>
                    </a-menu-item>
                    <a-menu-item key="24">
                        <router-link to="/views/SiteVerifyV5">网站审核V5</router-link>
                    </a-menu-item>
<!--                    <a-menu-item key="12">-->
<!--                        <router-link to="/views/TemplateVerify">模板审核V4</router-link>-->
<!--                    </a-menu-item>-->
                    <a-menu-item key="14">
                        <router-link to="/views/DomainVerify">域名绑定审核</router-link>
                    </a-menu-item>
                    <a-menu-item key="15">
                        <router-link to="/views/SiteDeadlineVerify">站点过期审核</router-link>
                    </a-menu-item>
                    <a-menu-item key="16">
                        <router-link to="/views/OrderAgentVerify">代理订单审核</router-link>
                    </a-menu-item>
                    <a-menu-item key="17">
                        <router-link to="/views/ManageList">系统设置</router-link>
                    </a-menu-item>
                    <a-menu-item key="18">
                        <router-link to="/views/Tools">相关工具</router-link>
                    </a-menu-item>
                    <a-menu-item key="19">
                        <router-link to="/views/MoreSettings">更多设置</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub9">
                    <span slot="title"><a-icon type="pay-circle"/><span>代理商管理</span></span>
                    <a-menu-item key="20">
                        <router-link to="/views/AgentList">代理商列表</router-link>
                    </a-menu-item>
                    <a-menu-item key="21">
                        <router-link to="/views/AgentChargeList">代理商充值记录</router-link>
                    </a-menu-item>
                    <a-menu-item key="25">
                        <router-link to="/views/AgentLayoutList">代理商的客户</router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub100">
                    <span slot="title"><a-icon type="unlock"/><span>角色权限管理</span></span>
                    <a-menu-item key="100">
                        <router-link to="/views/AccessControl">角色管理</router-link>
                    </a-menu-item>
                    <a-menu-item key="101">
                        <router-link to="/views/AddAccessMenu">添加菜单权限</router-link>
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>

<script>

    export default {
        name: "LeftSlideNav",
        props: ["selected-key", "opened-key", "show-title"],
        data() {
            return {
                console: false,
                isFold: false,
                Drawer: true,
                accessList: "",
                leftSlide: "",
                showLeftNav: true
            }
        },
        mounted() {
            this.fetch()
        },
        watch: {
            showTitle: function (n) {
                this.isFold = n
            }
        },
        methods: {
            showDrawer: function () {
                this.$emit('DrawerStatus', this.Drawer)
                this.Drawer = !this.Drawer
            },
            fetch() {
                if (sessionStorage.getItem("username") === "jhw_xlk" || sessionStorage.getItem("username") === "admin") {
                    this.showLeftNav = false
                } else {
                    this.showLeftNav = true
                }
                let leftSlide = JSON.parse(sessionStorage.getItem("adminPermissionMenus"))
                this.leftSlide = leftSlide
            },
            getArrEqual(arr1, arr2) {
                let newArr = [];
                for (let i = 0; i < arr1.length; i++) {
                    for (let j = 0; j < arr2.length; j++) {
                        if(arr1[i].name === arr2[j].name){
                            newArr.push(arr2[j]);
                        }
                    }
                }
                return newArr;
            }
        }
    }
</script>

<style scoped>
    .isFold {
        text-align: center;
        padding-left: 0;
    }
</style>
