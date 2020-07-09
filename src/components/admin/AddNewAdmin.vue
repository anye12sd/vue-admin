<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <left-slide-nav :selected-key="['3']" :opened-key="['sub4']" @DrawerStatus="getDrawerStatus" :show-title="collapsed"></left-slide-nav>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px; position: relative; min-width: 1200px">
            <a-layout-header style="background: #fff; padding: 0 10px;text-align: left">
                <header-nav @collapsedStatus="getCollapsedStatus"></header-nav>
            </a-layout-header>
            <a-breadcrumb style="margin: 16px 0;text-align: left">
                <a-breadcrumb-item>超级管理</a-breadcrumb-item>
                <a-breadcrumb-item>管理员管理</a-breadcrumb-item>
                <a-breadcrumb-item>添加管理员</a-breadcrumb-item>
            </a-breadcrumb>
            <a-layout-content
                    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '780px' }"
            >
                <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="所属网站">
                        <a-select v-model="form.region" placeholder="请选择">
                            <a-select-option value="机汇网">
                                机汇网
                            </a-select-option>
                            <a-select-option value="东方五金网">
                                东方五金网
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="所属部门/角色">
                        <a-select v-model="form.character" placeholder="请选择">
                            <a-select-option value="机汇网技术部">
                                机汇网技术部
                            </a-select-option>
                            <a-select-option value="机汇网事业部">
                                机汇网事业部
                            </a-select-option>
                            <a-select-option value="设计师">
                                设计师
                            </a-select-option>
                            <a-select-option value="代理商">
                                代理商
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="用户名">
                        <a-input v-model="form.username" />
                    </a-form-model-item>
                    <a-form-model-item label="密码">
                        <a-input v-model="form.password" type="password"/>
                    </a-form-model-item>
                    <a-form-model-item label="姓名">
                        <a-input v-model="form.realname" />
                    </a-form-model-item>
                    <a-form-model-item label="email">
                        <a-input v-model="form.email" />
                    </a-form-model-item>
                    <a-form-model-item label="手机">
                        <a-input v-model="form.cell" />
                    </a-form-model-item>
                    <a-form-model-item label="性别">
                        <a-radio-group v-model="form.sex">
                            <a-radio value="1">
                                男
                            </a-radio>
                            <a-radio value="2">
                                女
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item label="公司名称">
                        <a-input v-model="form.companyname" />
                    </a-form-model-item>
                    <a-form-model-item label="状态">
                        <a-select v-model="form.status" placeholder="请选择">
                            <a-select-option value="正常">
                                正常
                            </a-select-option>
                            <a-select-option value="封禁">
                                封禁
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="类型">
                        <a-select v-model="form.type" placeholder="请选择">
                            <a-select-option value="系统后台管理员">
                                系统后台管理员
                            </a-select-option>
                            <a-select-option value="员工">
                                员工
                            </a-select-option>
                            <a-select-option value="超级管理员">
                                超级管理员
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
        name: "AddNewAdmin",
        data() {
            return {
                collapsed: false,
                LeftDrawerShow: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 4 },
                form: {
                    region: undefined,
                    character: undefined,
                    username: "",
                    password: "",
                    realname: "",
                    email: "",
                    cell: "",
                    companyname: "",
                    sex: "",
                    status: undefined,
                    type: undefined,
                },
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!', this.form);
            },
            getCollapsedStatus:function(data){
                this.collapsed = data
            }
        },
    }
</script>

<style scoped>

</style>