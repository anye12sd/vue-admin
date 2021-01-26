<template>
    <a-drawer
            class="drawer-box"
            width="400px"
            title="机汇网"
            placement="left"
            :closable="true"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
    >
        <template v-if="isAdmin">
            <div class="drawer-box-content">
                <a href="https://i.jihui88.com/agent_v4/index.html#/account/info" target="_blank">
                    <p class="drawer-box-content-img">代理</p>
                    <p>代理商后台</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="https://wxapp.jihui88.com/dashboard/#/" target="_blank">
                    <p class="drawer-box-content-img">数据</p>
                    <p>数据中台v3</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="https://cdn.jihuinet.com/s2b2c/dashboard/#/" target="_blank">
                    <p class="drawer-box-content-img">数据</p>
                    <p>数据中台v4</p>
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
                <a href="http://www.jihui88.com/member/login.html" target="_blank">
                    <p class="drawer-box-content-img">v3</p>
                    <p>v3网站后台中文版</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="http://en.jihui88.com/member/login.html" target="_blank">
                    <p class="drawer-box-content-img">v3</p>
                    <p>v3网站后台英文版</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="http://en.jihui88.com/admin/index.html" target="_blank">
                    <p class="drawer-box-content-img">v3</p>
                    <p>V3网站英文版留言后台</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="https://i.jihui88.com/manage_v4/login.html" target="_blank">
                    <p class="drawer-box-content-img">v4</p>
                    <p>v4网站后台</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="http://wxapp.jihui88.com" target="_blank">
                    <p class="drawer-box-content-img">v3</p>
                    <p>v3小程序后台</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="http://wxapp.jihuik.com" target="_blank">
                    <p class="drawer-box-content-img">v4</p>
                    <p>v4小程序后台</p>
                </a>
            </div>
            <div class="drawer-box-content">
                <a href="http://www.jihui88.com/developer_v4/index.html" target="_blank">
                    <p class="drawer-box-content-img">众包</p>
                    <p>众包后台</p>
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
        </template>
        <template v-else>
            <div class="drawer-box-content" v-for="item in siteArr" :key="item.path">
                <a :href="item.path" target="_blank">
                    <p class="drawer-box-content-img">{{item.component}}</p>
                    <p>{{item.name}}</p>
                </a>
            </div>
        </template>
    </a-drawer>
</template>

<script>
    const array = [
        {"name": "代理商后台", "path": "https://i.jihui88.com/agent_v4/index.html#/account/info", "component": "代理"},
        {"name": "数据中台v3", "path": "https://wxapp.jihui88.com/dashboard/#/", "component": "数据"},
        {"name": "数据中台v4", "path": "https://cdn.jihuinet.com/s2b2c/dashboard/#/", "component": "数据"},
        {"name": "邀请函后台", "path": "https://cdn.jihuinet.com/invitation/admin/#/login?redirect=%2F", "component": "邀请"},
        {"name": "海报后台", "path": "https://cdn.jihuinet.com/case_poster/#/", "component": "海报"},
        {"name": "V3网站后台中文版", "path": "http://www.jihui88.com/member/login.html", "component": "v3"},
        {"name": "V3网站后台英文版", "path": "http://en.jihui88.com/member/login.html", "component": "v3"},
        {"name": "V3网站英文版留言后台", "path": "http://en.jihui88.com/admin/index.html", "component": "v3"},
        {"name": "V4网站后台", "path": "https://i.jihui88.com/manage_v4/login.html", "component": "v4"},
        {"name": "V3小程序后台", "path": "http://wxapp.jihui88.com", "component": "v3"},
        {"name": "V4小程序后台", "path": "http://wxapp.jihuik.com", "component": "v4"},
        {"name": "众包后台", "path": "http://www.jihui88.com/developer_v4/index.html", "component": "众包"},
        {"name": "机汇网", "path": "http://www.jihui88.com/", "component": "机汇"},
        {"name": "机汇客", "path": "https://www.jihuik.com/index.html", "component": "机汇"},
        {"name": "又快又好", "path": "https://www.ykyh.com/", "component": "又快"},
        {"name": "东方五金网", "path": "http://www.ykit.net/", "component": "东方"},
        {"name": "网站界面编辑", "path": "http://pc.jihui88.com/pc/admin.html", "component": "界面"},
    ]
    export default {
        name: "LeftDrawer",
        props: ["LeftDrawerShow"],
        data() {
            return {
                console: false,
                visible: false,
                isAdmin: true,
                siteArr: [],
                array
            };
        },
        created() {
            if (sessionStorage.getItem("site")) {
                const site = JSON.parse(sessionStorage.getItem("site"))
                if(!site){
                    return false
                }
                let newArray = this.getArrEqual(array, site.children)
                this.siteArr = newArray
            }
        },
        mounted (){
            const username = sessionStorage.getItem("username");
            if(username === 'jhw_xlk' || username === 'admin'){
                this.isAdmin = true
            }else{
                this.isAdmin = false
            }
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
            getArrEqual(arr1, arr2) {
                let newArr = [];
                for (let i = 0; i < arr1.length; i++) {
                    for (let j = 0; j < arr2.length; j++) {
                        if(arr1[i].name === arr2[j].name){
                            newArr.push(arr1[i]);
                        }
                    }
                }
                return newArr;
            }
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