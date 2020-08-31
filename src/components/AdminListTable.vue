<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.adminId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="cellphone" slot-scope="cellphone">
                <span :title="cellphone">
                    {{ cellphone }}
                </span>
            </template>
            <template slot="state" slot-scope="state">
               <span class="table-content-span-ellipsis" :title="state == '01' ? '正常' : '封禁'">
                    {{ state == '01' ? '正常' : '封禁' }}
                 </span>
            </template>
            <template slot="email" slot-scope="email">
                 <span :title="email">
                    {{ email }}
                 </span>
            </template>
            <template slot="type" slot-scope="type">
                 <span class="table-content-span-ellipsis" :title="getType(type)">
                 {{ getType(type) }}
                </span>
            </template>
            <template slot="groupId" slot-scope="groupId">
                 <span class="table-content-span-ellipsis" :title="getGroupId(groupId)">
                    {{ getGroupId(groupId) }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" class="table-content-a" @click="changeInfo(record)">修改信息</a>
                <!--<a href="javascript:;" class="table-content-a" @click="changeAccess(record)">修改权限</a>-->
                <!--<a href="javascript:;" class="table-content-a" @click="getAccess(record)">获取权限</a>-->
                <a-popconfirm
                        v-if="data.length"
                        title="确认删除吗?"
                        okText="确定" cancelText="取消"
                        @confirm="() => onDelete(record.adminId)"
                >
                    <a href="javascript:;" class="table-content-a">删除</a>
                </a-popconfirm>
            </template>
        </a-table>
        <a-drawer width="640" placement="right" :closable="true" :visible="visible" @close="onClose"
                  class="drawer-content">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-form-model ref="adminForm" :rules="rules" :model="form" :label-col="labelCol"
                              :wrapper-col="wrapperCol">
                    <div class="drawer-scroll">
                        <a-form-model-item label="所属企业" prop="domain">
                            <a-select v-model="form.domain" placeholder="请选择">
                                <a-select-option value="www.jihui88.com">
                                    机汇网
                                </a-select-option>
                                <a-select-option value="cn.easthardware.com">
                                    东方五金网
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="所属部门" prop="groupId">
                            <a-select v-model="form.groupId" placeholder="请选择">
                                <a-select-option value="8a9e457e5e035029015e11b634ea046d">
                                    机汇网技术部
                                </a-select-option>
                                <a-select-option value="ff8081815092e4800150a7b522830453">
                                    微传单事业部
                                </a-select-option>
                                <a-select-option value="8a9e457e7074df1401707f7dffe50067">
                                    设计部
                                </a-select-option>
                                <a-select-option value="402881e44ccadc61014ccae3e35d0002">
                                    代理商
                                </a-select-option>
                                <a-select-option value="ff80818153e8ef49015407fd6a63079c">
                                    留言管理
                                </a-select-option>
                                <a-select-option value="ff8081815a3a1f1a015a3b3c5b4e0067">
                                    机汇网销售部
                                </a-select-option>
                                <a-select-option value="ff8081815a144ab9015a1628c45d0006">
                                    东方五金网技术部
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="用户名" prop="username">
                            <a-input v-model="form.username" read-only/>
                        </a-form-model-item>
                        <a-form-model-item label="姓名" prop="name">
                            <a-input v-model="form.name"/>
                        </a-form-model-item>
                        <a-form-model-item label="密码" prop="password">
                            <a href="javascript:;" v-show="changePassword"
                               @click="changePassword = !changePassword">修改密码</a>
                            <a-input v-model="password" style="width:80%" v-show="!changePassword"/>
                            <a href="javascript:;" style="margin-left: 15px" v-show="!changePassword"
                               @click="submitChangePassword()">提交</a>
                            <span v-show="!changePassword">注：更改密码需单独提交</span>
                        </a-form-model-item>
                        <a-form-model-item label="权限" prop="roleIds">
                            <a-select v-model="form.roleIds" placeholder="请选择" mode="multiple">
                                <a-select-option v-for="(item) in accessRole" :value="item.roleId" :key="item.roleId">
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
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
                                <a-select-option value="01" title="表示这个账号只能在这个总系统后台可以操作">
                                    系统后台管理员
                                </a-select-option>
                                <a-select-option value="02" title="表示这个账号可以在网站用户后台上传产品、新闻等操作
">
                                    网站用户后台操作账号
                                </a-select-option>
                                <a-select-option value="03" title="表示代理商可以在代理商后台添加用户、站点等操作">
                                    代理商后台账号
                                </a-select-option>
                                <a-select-option value="04" title="技术部那边的人可以进入模块制作后台制作站点模块">
                                    外包后台设计师账号
                                </a-select-option>
                                <a-select-option value="05" title="与admin账号一样的权限，可以有多个超级管理员">
                                    超级管理员
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="登录ip限制" prop="loginIpLimit">
                            <a-textarea auto-size class="order-comment" v-model="form.loginIpLimit"/>
                            <span>注：多个ip以逗号隔开</span>
                        </a-form-model-item>
                    </div>
                    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="margin-top: 15px">
                        <a-button type="primary" @click="onSubmit">
                            提交
                        </a-button>
                        <a-button style="margin-left: 10px;" @click="onClose">
                            取消
                        </a-button>
                    </a-form-model-item>
                </a-form-model>
            </a-spin>
        </a-drawer>

    </div>
</template>
<script>
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            // sorter: true,
            width: '10%',
            minWidth: '150px',
            scopedSlots: {customRender: 'username'},
        },
        {
            title: '姓名',
            dataIndex: 'name',
            // sorter: true,
            width: '15%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: 'email',
            dataIndex: 'email',
            // sorter: true,
            width: '15%',
            scopedSlots: {customRender: 'email'},
        },
        {
            title: '手机',
            dataIndex: 'cellphone',
            // sorter: true,
            width: '10%',
            scopedSlots: {customRender: 'cellphone'},
        },
        {
            title: '部门',
            dataIndex: 'groupId',
            width: '10%',
            scopedSlots: {customRender: 'groupId'},
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: '10%',
            scopedSlots: {customRender: 'type'},
        },
        {
            title: '状态',
            dataIndex: 'state',
            width: '10%',
            scopedSlots: {customRender: 'state'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: 'AdminListTable',
        data() {
            return {
                console: false,
                spinning: false,
                labelCol: {span: 6},
                wrapperCol: {span: 10},
                visible: false,
                data: [],
                defaultRoleIds: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                password: "",
                changePassword: true,
                accessRole: "",
                form: {
                    domain: "",
                    groupId: "",
                    username: "",
                    name: "",
                    email: "",
                    cellphone: "",
                    entName: "",
                    roleIds: "",
                    gender: "",
                    state: "",
                    type: "",
                    loginIpLimit: ""
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    domain: [
                        {required: true, message: '请选择企业', trigger: 'change'},
                    ],
                    groupId: [
                        {required: true, message: '请选择部门/角色', trigger: 'change'},
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    cellphone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {
                            pattern: new RegExp(/^((13[0-9])|(14[5,7])|(15[^4,\\D])|(17[0,1,3,6-8])|(18[0-9])|(19[8,9])|(166))[0-9]{8}$/, "g"),
                            message: '请输入正确的手机号码',
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            pattern: new RegExp(/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/, "g"),
                            message: '请输入正确的邮箱',
                            trigger: 'blur'
                        }
                    ],
                    entName: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'},
                    ],
                    roleIds: [
                        {required: true, message: '请选择权限', trigger: 'change'},
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'},
                    ],
                    state: [
                        {required: true, message: '请选择账号状态', trigger: 'change'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'},
                    ]
                }
            };
        },
        mounted() {
            const page = parseInt(sessionStorage.getItem("page")) || 1
            sessionStorage.removeItem("page")
            page && (this.pagination.current = page)
            this.fetch();
            this.fetchMenu();
        },
        methods: {
            onSubmit() {
                this.$refs.adminForm.validate(valid => {
                    if (valid) {
                        this.form.roleIds = this.form.roleIds.toString()
                        this.console && console.log('submit!', this.form);
                        let params = this.form;
                        params.loginIpLimit = this.form.loginIpLimit || ""
                        this.$api.changeAdmin(params)
                            .then((data) => {
                                this.console && console.log(data)
                                if (data.data.code == 0 && data.data.msg == "success") {
                                    this.$message.success('修改成功');
                                    sessionStorage.setItem("page", this.pagination.current)
                                    this.changePassword = true;
                                    this.password = "";
                                    this.visible = false
                                    this.$emit('refresh', new Date().getTime())
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
            handleTableChange(pagination, filters, sorter) {
                const pager = {...this.pagination};
                pager.current = pagination.current;
                this.pagination = pager;
                this.fetch({
                    results: pagination.pageSize,
                    page: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters,
                });
            },
            fetch() {
                let filterName = sessionStorage.getItem("filterName");
                const params = {pageSize: 10, page: this.pagination.current, name: filterName ? filterName : ""}
                this.console && console.log('params:', params);
                this.loading = true;
                this.$api.getAdminList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.adminList
                            this.pagination = pagination
                            this.console && console.log(data)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            fetchMenu() {
                this.$api.getAccessControlAdminList()
                    .then((data) => {
                        this.console && console.log(data)
                        this.accessRole = data.data.data.roleList
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            onDelete(key) {
                // console.log(key,this.pagination.current)
                const params = {adminId: key}
                this.$api.deleteAdmin(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('删除成功');
                            sessionStorage.setItem("page", this.pagination.current)
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.adminId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.adminId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            getType(type) {
                var adminType
                switch (type) {
                    case "01":
                        adminType = "系统后台管理员";
                        break;
                    case "02":
                        adminType = "网站用户后台操作账号"
                        break;
                    case "03":
                        adminType = "代理商后台账号"
                        break;
                    case "04":
                        adminType = "外包后台设计师账号"
                        break;
                    case "05":
                        adminType = "超级管理员"
                        break;
                    default:
                        adminType = "其它"
                        break;
                }
                return adminType
            },
            getGroupId(groupId) {
                var GroupType
                switch (groupId) {
                    case "ff8081815092e4800150a7b522830453":
                        GroupType = "微传单事业部";
                        break;
                    case "ff80818153e8ef49015407fd6a63079c":
                        GroupType = "留言管理"
                        break;
                    case "ff8081815a144ab9015a1628c45d0006":
                        GroupType = "东方五金网技术部"
                        break;
                    case "ff8081815a3a1f1a015a3b3c5b4e0067":
                        GroupType = "机汇网销售部"
                        break;
                    case "8a9e457e5e035029015e11b634ea046d":
                        GroupType = "机汇网技术部"
                        break;
                    case "402881e44ccadc61014ccae3e35d0002":
                        GroupType = "代理商"
                        break;
                    case "8a9e457e7074df1401707f7dffe50067":
                        GroupType = "设计师"
                        break;
                    default:
                        GroupType = "其它"
                        break;
                }
                return GroupType
            },
            onClose() {
                this.visible = false;
                this.changePassword = true;
                this.password = "";
            },
            changeInfo(value) {
                this.visible = true;
                this.spinning = true;
                this.console && console.log(value)
                let params = {id: value.adminId}
                this.$api.getAdminListDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            let role = data.data.data.roleIds.split(',')
                            this.form = {...value, roleIds: role, loginIpLimit: data.data.data.loginIpLimit}
                            // this.$emit('refresh', new Date().getTime())
                            this.spinning = false
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            submitChangePassword() {
                this.console && console.log(this.password, this.form.adminId)
                if (this.password == "") {
                    this.$message.error("密码不能为空")
                    return false
                }
                let params = {adminId: this.form.adminId, password: this.password}
                this.$api.changeAdminPassword(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('密码修改成功');
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }

</style>

