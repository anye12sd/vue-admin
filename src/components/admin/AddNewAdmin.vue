<template>
  <div>
    <a-layout>
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <left-slide-nav :selected-key="['3']" :opened-key="['sub4']" @DrawerStatus="getDrawerStatus" :show-title="collapsed"></left-slide-nav>
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
                <a-form-model ref="adminForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="所属企业" prop="domain">
                        <a-select v-model="form.domain" placeholder="请选择">
                            <a-select-option value="www.jihui88.com:机汇网">
                                机汇网
                            </a-select-option>
                            <a-select-option value="www.easthardware.com:东方五金网">
                                东方五金网
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="所属部门/角色" prop="groupId">
                        <a-select v-model="form.groupId" placeholder="请选择">
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
                    <a-form-model-item label="用户名" prop="username">
                        <a-input v-model="form.username"/>
                    </a-form-model-item>
                    <a-form-model-item label="密码" prop="password">
                        <a-input v-model="form.password" type="password"/>
                    </a-form-model-item>
                    <a-form-model-item label="姓名" prop="name">
                        <a-input v-model="form.name"/>
                    </a-form-model-item>
                    <a-form-model-item label="email" prop="email">
                        <a-input v-model="form.email"/>
                    </a-form-model-item>
                    <a-form-model-item label="手机" prop="cellphone">
                        <a-input v-model="form.cellphone"/>
                    </a-form-model-item>
                    <a-form-model-item label="性别" prop="gender">
                        <a-radio-group v-model="form.gender">
                            <a-radio value="00">
                                男
                            </a-radio>
                            <a-radio value="01">
                                女
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item label="公司名称" prop="entName">
                        <a-input v-model="form.entName"/>
                    </a-form-model-item>
                    <a-form-model-item label="状态" prop="state">
                        <a-select v-model="form.state" placeholder="请选择">
                            <a-select-option value="01">
                                正常
                            </a-select-option>
                            <a-select-option value="02">
                                封禁
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="类型" prop="type">
                        <a-select v-model="form.type" placeholder="请选择">
                            <a-select-option value="01">
                                系统管理员
                            </a-select-option>
                            <a-select-option value="02">
                                用户后台管理员
                            </a-select-option>
                            <a-select-option value="05">
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
                    domain: "",
                    groupId: "",
                    username: "",
                    password: "",
                    name: "",
                    email: "",
                    cellphone: "",
                    entName: "",
                    gender: "",
                    state: "",
                    type: "",
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    domain: [
                        { required: true, message: '请选择企业', trigger: 'change' },
                    ],
                    groupId: [
                        { required: true, message: '请选择部门/角色', trigger: 'change' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    cellphone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { pattern: new RegExp(/^((13[0-9])|(14[5,7])|(15[^4,\\D])|(17[0,1,3,6-8])|(18[0-9])|(19[8,9])|(166))[0-9]{8}$/, "g"), message: '请输入正确的手机号码', trigger: 'blur'}
                    ],
                    email :[
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { pattern: new RegExp(/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/, "g"), message: '请输入正确的邮箱' ,trigger: 'blur'}
                    ],
                    entName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' },
                    ],
                    state: [
                        { required: true, message: '请选择账号状态', trigger: 'change' },
                    ],
                    type:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.adminForm.validate(valid => {
                    if (valid) {
                        console.log('submit!',this.form);
                        let params = this.form;
                        this.$https.fetchPost('/admin/add',params)
                            .then((data) => {
                                console.log(data)
                                if(data.data.code == 0 && data.data.msg == "success"){
                                    this.$message.success('添加成功');
                                    this.$router.push({name: 'AdminList', path: '/admin/AdminList'})
                                }else{
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
            getCollapsedStatus:function(data){
                this.collapsed = data
                console.log(data)
            },
            getDrawerStatus:function(data){
                this.LeftDrawerShow = data
            },
        },
    }
</script>

<style scoped>

</style>