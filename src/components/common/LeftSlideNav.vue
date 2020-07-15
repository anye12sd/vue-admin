<template>
    <div>
        <!--<div class="logo" />-->
        <div class="silde-title" :class="{'isFold':isFold == true}"><a-icon type="ellipsis" style="cursor: pointer" @click="showDrawer"></a-icon><span v-show="!showTitle" style="padding-left: 10px">系统后台</span></div>
        <a-menu
                theme="dark"
                mode="inline"
                :default-selected-keys="selectedKey"
                :default-open-keys="openedKey"
                :style="{ textAlign: 'left'}"
        >
            <!--<a-menu-item key="sub1">-->
            <!--<a-icon type="home" />-->
            <!--<span>首页</span>-->
            <!--</a-menu-item>-->
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="user" /><span>会员管理</span></span>
                <a-menu-item key="1">
                    <router-link to="/customer/VerifiedCustomer">已验证客户【正常】</router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <span slot="title"><a-icon type="mail" /><span>留言管理</span></span>
                <a-menu-item key="2">
                    <router-link to="/message/CustomerMessage">客户网站留言</router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
                <span slot="title"><a-icon type="team" /><span>超级管理</span></span>
                <a-menu-item key="3">
                    <router-link to="/admin/AdminList">管理员管理</router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub5">
                <span slot="title"><a-icon type="notification" /><span>站点管理</span></span>
                <a-menu-item key="4">
                    <router-link to="/site/SiteList">站点列表</router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="5">
                <router-link to="/access/AccessControl" tag="a"><a-icon type="unlock" /><span>权限管理</span></router-link>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
    export default {
      name: "LeftSlideNav",
      props:["selected-key","opened-key","show-title"],
      data () {
        return {
            isFold: false,
            Drawer:true
        }
      },
      watch: {
        showTitle: function(n) {
          this.isFold = n
        }
      },
      methods: {
        showDrawer: function() {
          this.$emit('DrawerStatus',this.Drawer)
          this.Drawer = !this.Drawer
        }
      }
    }
</script>

<style scoped>
    .isFold{
        text-align: center;
        padding-left: 0;
    }
</style>