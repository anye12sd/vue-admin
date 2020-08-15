<template>
    <div>
        <a-layout class="layout-outbox">
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="left-nav-box">
                <left-slide-nav :selected-key="['101']" :opened-key="['sub100']" :show-title="collapsed"
                                @DrawerStatus="getDrawerStatus"></left-slide-nav>
            </a-layout-sider>
            <a-layout class="layout-box">
                <a-layout-header class="layout-box-header">
                    <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
                </a-layout-header>
                <a-breadcrumb class="layout-box-breadcrumb">
                    <a-breadcrumb-item>角色权限管理</a-breadcrumb-item>
                    <a-breadcrumb-item>添加菜单权限</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content class="layout-box-content">
                    <add-access-menu-table style="min-height: calc(100vh - 260px)" @timer="refreshTable"
                                           :key="timer"></add-access-menu-table>
                </a-layout-content>
                <Copyright></Copyright>
            </a-layout>
        </a-layout>
        <left-drawer :LeftDrawerShow="LeftDrawerShow"></left-drawer>
    </div>
</template>

<script>
    const AddAccessMenuTable = () => import("../components/AddAccessMenuTable")

    export default {
        name: "AccessControl",
        components: {AddAccessMenuTable},
        data() {
            return {
                console: false,
                modal2Visible: false,
                collapsed: false,
                LeftDrawerShow: false,
                timer: "",
                labelCol: {span: 4},
                wrapperCol: {span: 16},
            };
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
            refreshTable: function (data) {
                this.timer = data
            }
        }
    }
</script>

<style scoped>

</style>
