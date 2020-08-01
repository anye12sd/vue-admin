<template>
    <div>
        <a-layout>
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
                <left-slide-nav :selected-key="['100']" :opened-key="['sub100']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>角色权限管理</a-breadcrumb-item>
                    <a-breadcrumb-item>角色管理</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <div class="content-top flex">
                        <div class="content-top-btn" style="margin-right: 8px">
                            <!--<router-link to="/views/AddNewAccessControlAdmin">-->
                            <!--<a-button type="primary">-->
                            <!--<a-icon type="plus"/>-->
                            <!--新增管理员-->
                            <!--</a-button>-->
                            <!--</router-link>-->
                            <a-button type="primary" @click="showModal">
                                <a-icon type="plus"/>
                                添加角色
                            </a-button>
                        </div>
                        <!--<div class="input-box" style="width: 200px;">-->
                        <!--<a-input placeholder="请输入姓名或者用户名" v-model="filterName" :allowClear="true" @change="fresh($event)"/>-->
                        <!--</div>-->
                        <!--<div class="content-top-btn">-->
                        <!--<a-button type="primary" @click="filterTable">-->
                        <!--<a-icon type="search"/>-->
                        <!--</a-button>-->
                        <!--</div>-->
                    </div>
                    <access-control-table style="margin-top: 20px;" @timer="refresh" :key="timer"
                                          @editAccessAdmin="editAccessAdmin"></access-control-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
        <a-modal
                v-model="modal2Visible"
                :title="modalTitle"
                centered
                okText="提交" cancelText="取消"
                @ok="submitForm"
        >
            <a-form-model ref="adminForm" :rules="rules" :model="form" :label-col="labelCol"
                          :wrapper-col="wrapperCol">
                <a-form-model-item label="用户名" prop="name">
                    <a-input v-model="form.name" placeholder="按照Spring Security约定建议以ROLE_为开头"/>
                </a-form-model-item>
                <a-form-model-item label="备注" prop="description">
                    <a-input v-model="form.description"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    const AccessControlTable = () => import("../components/AccessControlTable")
    export default {
        name: "AccessControl",
        components: {AccessControlTable},
        data() {
            return {
                console: false,
                modal2Visible: false,
                collapsed: false,
                filterName: "",
                LeftDrawerShow: false,
                labelCol: {span: 4},
                wrapperCol: {span: 16},
                modalTitle: "",
                roleId: "",
                timer: "",
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
                        {
                            pattern: new RegExp(/^(ROLE_)/),
                            message: '请输入ROLE_开头的用户名',
                            trigger: 'blur'
                        }
                    ],
                }
            };
        },
        methods: {
            submitForm() {
                this.$refs.adminForm.validate(valid => {
                    if (valid) {
                        this.console && console.log('submit!', this.form);
                        let params = this.form;
                        if (this.modalTitle == "添加角色") {
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
                        } else if (this.modalTitle == "编辑角色") {
                            params.roleId = this.roleId
                            this.$api.editAccessControlAdmin(params)
                                .then((data) => {
                                    this.console && console.log(data)
                                    if (data.data.code == 0 && data.data.msg == "success") {
                                        this.$message.success('修改成功');
                                        this.timer = new Date().getTime()
                                        this.modal2Visible = !this.modal2Visible
                                    } else {
                                        this.$message.error(data.data.msg);
                                    }
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            refresh: function (data) {
                this.timer = data
            },
            filterTable: function () {
                sessionStorage.setItem("filterName", this.filterName)
                this.timer = new Date().getTime()
            },
            getCollapsedStatus: function (data) {
                this.collapsed = data
            },
            getDrawerStatus: function (data) {
                this.LeftDrawerShow = data
            },
            showModal: function () {
                this.modalTitle = "添加角色"
                this.modal2Visible = !this.modal2Visible
            },
            editAccessAdmin: function (data) {
                this.modalTitle = "编辑角色"
                this.form.name = data.name
                this.form.description = data.description
                this.roleId = data.roleId
                this.modal2Visible = true
            },
            fresh(e) {
                if (e.target.value == "") {
                    this.filterTable()
                }
            }
        }
    }
</script>

<style scoped>

</style>
