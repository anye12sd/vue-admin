<template>
    <div>
        <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="sendCollapsedStatus"
        />
        <div class="login-status-bar">
            <!--<a-icon type="search" style="margin-right: 20px"/>-->
            <!--<a-badge dot style="margin-right: 20px">-->
                <!--<a-icon type="bell"/>-->
            <!--</a-badge>-->
            <span>欢迎你！{{username}}</span>
            <a-popconfirm placement="bottom" ok-text="确定" cancel-text="取消" @confirm="confirm">
                <template slot="title">
                    <p>确定退出登录吗？</p>
                </template>
                <a-avatar icon="user" size="small" class="icon"/>
            </a-popconfirm>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderNav",
        data() {
            return{
                collapsed: false,
                username: "",
            }
        },
        mounted() {
            this.username = sessionStorage.getItem("username")
        },
        methods: {
            sendCollapsedStatus:function (){
                this.$emit('collapsedStatus',!this.collapsed)
                this.collapsed = !this.collapsed
            },
            confirm: function() {
                sessionStorage.removeItem("X-CSRF-Token")
                this.$router.push({name: "Login", path: '/Login'})
            }
        }
    }
</script>

<style scoped>
    .login-status-bar span{
        margin-right: 15px;
    }
    .login-status-bar .icon{
        margin-right: 20px;
    }
</style>