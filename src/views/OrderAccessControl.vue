<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['8']" :opened-key="['sub7']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>订单管理系统</a-breadcrumb-item>
                    <a-breadcrumb-item>权限管理</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="content-top-btn" style="margin-right: 8px">
                            <a-button type="primary" @click="showModal">
                                <a-icon type="plus"/>
                                添加权限
                            </a-button>
                        </div>
                        <div class="input-box">
                            <a-input placeholder="请输入用户名" v-model="username" :allowClear="true"
                                     @change="fresh($event)"/>
                        </div>
                        <div class="content-top-btn">
                            <a-button type="primary" icon="search" @click="searchData">
                            </a-button>
                        </div>
                        <div class="content-top-btn">
                            <a-button type="primary" icon="reload" @click="refreshTable">
                            </a-button>
                        </div>
                    </div>
                    <order-access-control-table style="margin-top: 20px;" :key="timer"
                                                @refresh="refreshTable"></order-access-control-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
        <a-modal
                v-model="modal2Visible"
                title="添加权限"
                centered
                okText="提交" cancelText="取消"
                @ok="submitForm"
        >
            <a-form-model ref="adminForm" :rules="rules" :model="form" :label-col="labelCol"
                          :wrapper-col="wrapperCol">
                <a-form-model-item label="用户帐号" prop="name">
                    <a-input v-model="form.name" placeholder="用户帐号"/>
                </a-form-model-item>
                <a-form-model-item label="权限" prop="state">
                    <a-select v-model="form.state" placeholder="请选择">
                        <a-select-option value="01">
                            订单管理
                        </a-select-option>
                        <a-select-option value="02">
                            权限管理
                        </a-select-option>
                        <a-select-option value="03">
                            代理商补单
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    const OrderAccessControlTable = () => import("../components/OrderAccessControlTable")

    export default {
        name: "OrderAccessControl",
        components: {OrderAccessControlTable},
        data() {
            return {
                console: false,
                collapsed: false,
                labelCol: {span: 4},
                wrapperCol: {span: 16},
                LeftDrawerShow: false,
                timer: 1,
                username: "",
                modal2Visible: false,
                form: {
                    name: "",
                    description: "",
                },
                rules: {
                    description: [
                        {required: false, message: '请输入用户名', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                }
            };
        },
        mounted() {
            this.searchData()
        },
        methods: {
            submitForm() {
                this.$refs.adminForm.validate(valid => {
                    if (valid) {
                        this.console && console.log('submit!', this.form);
                        let params = this.form;
                        this.$api.addAccessControlAdmin(params)
                            .then((data) => {
                                this.console && console.log(data)
                                if (data.data.code == 0 && data.data.msg == "success") {
                                    this.$message.success('添加成功');
                                    this.timer = new Date().getTime()
                                    this.modal2Visible = !this.modal2Visible
                                } else {
                                    this.$message.error(data.data.msg);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            },
            refreshTable: function () {
                this.timer = new Date().getTime()
            },
            searchData: function () {

                this.timer = new Date().getTime()
            },
            fresh(e) {
                if (e.target.value == "") {
                    this.searchData()
                }
            },
            showModal: function () {
                this.modal2Visible = !this.modal2Visible
            },
        }
    }
</script>

<style scoped>

</style>
