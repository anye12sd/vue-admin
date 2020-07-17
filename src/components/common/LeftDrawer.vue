<template>
    <a-drawer
            class="drawer-box"
            width="400px"
            title="机汇网"
            placement="left"
            :closable="false"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
    >
        <div class="drawer-box-content">
            <a href="https://www.jihui88.com/agent_v4/index.html#/account/info" target="_blank">
                <p class="drawer-box-content-img">经销</p>
                <p>经销商后台</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="https://wxapp.jihui88.com/dashboard/#/" target="_blank">
                <p class="drawer-box-content-img">数据</p>
                <p>数据中心</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="https://cdn.jihuinet.com/invitation/admin/#/login?redirect=%2F" target="_blank">
                <p class="drawer-box-content-img">邀请</p>
                <p>邀请函后台</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="https://cdn.jihuinet.com/case_poster/#/" target="_blank">
                <p class="drawer-box-content-img">海报</p>
                <p>海报后台</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://en.jihui88.com/member/login.html" target="_blank">
                <p class="drawer-box-content-img">英文</p>
                <p>英文版留言</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://www.jihui88.com/" target="_blank">
                <p class="drawer-box-content-img">机汇</p>
                <p>机汇网</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="https://www.jihuik.com/index.html" target="_blank">
                <p class="drawer-box-content-img">机汇</p>
                <p>机汇客</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="https://www.ykyh.com/" target="_blank">
                <p class="drawer-box-content-img">又快</p>
                <p>又快又好</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://www.ykit.net/" target="_blank">
                <p class="drawer-box-content-img">东方</p>
                <p>东方五金网</p>
            </a>
        </div>
        <div class="drawer-box-content">
            <a href="http://pc.jihui88.com/pc/admin.html" target="_blank">
                <p class="drawer-box-content-img">界面</p>
                <p>网站界面编辑</p>
            </a>
        </div>
    </a-drawer>
</template>

<script>
    export default {
        name: "LeftDrawer",
        props: ["LeftDrawerShow"],
        data() {
            return {
                console: false,
                visible: false,
            };
        },
        methods: {
            afterVisibleChange(val) {
                this.console && console.log('visible', val);
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
        },
        watch: {
            LeftDrawerShow: function (n) {
                if (n == false) {
                    this.visible = true
                } else {
                    this.visible = n
                }
            }
        }
    }
</script>

<style scoped>
    .drawer-box-content-img {
        margin: 0 auto;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        border-radius: 50%;
        color: #fff !important;
        background: #1890ff;
    }
</style>