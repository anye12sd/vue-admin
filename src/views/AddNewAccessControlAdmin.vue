<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['5']" :opened-key="[]" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>超级管理</a-breadcrumb-item>
                    <a-breadcrumb-item>管理员管理</a-breadcrumb-item>
                    <a-breadcrumb-item>添加管理员</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content
                        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '780px' }"
                >
                    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-model-item label="用户名">
                            <a-input v-model="form.username"/>
                        </a-form-model-item>
                        <a-form-model-item label="密码">
                            <a-input v-model="form.password" type="password"/>
                        </a-form-model-item>
                        <a-form-model-item label="姓名">
                            <a-input v-model="form.realname"/>
                        </a-form-model-item>
                        <a-form-model-item label="状态">
                            <a-select v-model="form.status" placeholder="请选择">
                                <a-select-option value="01">
                                    正常
                                </a-select-option>
                                <a-select-option value="02">
                                    封禁
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" @click="onSubmit">
                                提交
                            </a-button>
                            <a-button style="margin-left: 10px;" @click="$router.back(-1)">
                                返回上一页
                            </a-button>
                        </a-form-model-item>
                    </a-form-model>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    export default {
        name: "AddNewAccessControlAdmin",
        data() {
            return {
                collapsed: false,
                LeftDrawerShow: false,
                labelCol: {span: 4},
                wrapperCol: {span: 4},
                form: {
                    username: "",
                    password: "",
                    realname: "",
                    status: "01",
                },

            }
        },
        methods: {
            onSubmit() {
                console.log('submit!', this.form);
            },
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            }
        },
    }
</script>

<style scoped>

</style>