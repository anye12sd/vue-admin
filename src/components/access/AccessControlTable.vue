<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.login.uuid"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="name" slot-scope="name">
      <span class="table-content-span-ellipsis" :title="name.first">
        {{ name.first }}
      </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">修改权限</a>
                <a-popconfirm
                        v-if="data.length"
                        title="确定删除吗?"
                        okText="确定" cancelText="取消"
                        @confirm="() => onDelete(record.id.value)"
                >
                    <a href="javascript:;" class="table-content-a">删除</a>
                </a-popconfirm>
            </template>
        </a-table>
        <a-drawer width="640" placement="right" :closable="false" :visible="visible" @close="onClose">
            <a-form-model ref="adminForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="用户名" prop="username">
                    <a-input v-model="form.username" read-only/>
                </a-form-model-item>
                <a-form-model-item label="姓名" prop="name">
                    <a-input v-model="form.name"/>
                </a-form-model-item>
                <a-form-model-item label="密码" prop="password">
                    <a href="javascript:;" v-show="changePassword" @click="changePassword = !changePassword">修改密码</a>
                    <a-input v-model="password" style="width:80%" v-show="!changePassword"/>
                    <a href="javascript:;" style="margin-left: 15px" v-show="!changePassword"
                       @click="submitChangePassword()">提交</a>
                    <span v-show="!changePassword">注：更改密码需单独提交</span>
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
                <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="onSubmit">
                        提交
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="onClose">
                        取消
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-drawer>
    </div>
</template>
<script>
    import reqwest from 'reqwest';

    const columns = [
        {
            title: '用户名',
            dataIndex: 'gender',
            width: '10%',
            minWidth: '150px',
            scopedSlots: {customRender: 'gender'},
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width: '15%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '状态',
            dataIndex: 'cell',
            width: '10%',
            scopedSlots: {customRender: 'cell'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: 'AccessControlTable',
        data() {
            return {
                labelCol: {span: 6},
                wrapperCol: {span: 10},
                data: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                visible: false,
                password: "",
                changePassword: true,
                form: {
                    username: "",
                    name: "",
                    state: "",
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    state: [
                        {required: true, message: '请选择账号状态', trigger: 'change'},
                    ]
                }
            };
        },
        mounted() {
            this.fetch();
        },
        methods: {
            onSubmit() {
                this.$refs.adminForm.validate(valid => {
                    if (valid) {
                        console.log('submit!', this.form);
                        // let params = this.form;
                        // this.$https.fetchPost('/admin/edit',params)
                        //     .then((data) => {
                        //         console.log(data)
                        //         if(data.data.code == 0 && data.data.msg == "success"){
                        //             this.$message.success('修改成功');
                        //             this.changePassword = true;
                        //             this.password = "";
                        //             this.$emit('refresh', new Date().getTime())
                        //         }else{
                        //             this.$message.error(data.data.msg);
                        //         }
                        //     })
                        //     .catch((err) => {
                        //         console.log(err)
                        //     })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleTableChange(pagination, filters, sorter) {
                console.log(pagination);
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
            fetch(params = {}) {
                console.log('params:', params);
                this.loading = true;
                reqwest({
                    url: 'https://randomuser.me/api',
                    method: 'get',
                    data: {
                        results: 10,
                        ...params,
                    },
                    type: 'json',
                }).then(data => {
                    console.log(data.results)
                    const pagination = {...this.pagination};
                    // Read total count from server
                    // pagination.total = data.totalCount;
                    pagination.total = 200;
                    this.loading = false;
                    this.data = data.results;
                    this.pagination = pagination;
                });
            },
            onDelete(key) {
                const data = [...this.data];
                this.data = data.filter(item => item.id.value !== key);
            },
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.layoutId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.layoutId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            onClose() {
                this.visible = false
                this.changePassword = true;
                this.password = "";
            },
            showDrawer(key) {
                console.log(key)
                this.form.username = key.gender
                this.form.name = key.name.first
                this.form.state = key.cell
                this.visible = true
            },
            submitChangePassword() {
                console.log(this.password, this.form.adminId)
                if (this.password == "") {
                    this.$message.error("密码不能为空")
                    return false
                }
                // let params = {adminId: this.form.adminId, password: this.password}
                // this.$https.fetchPost('/admin/password/edit', params)
                //     .then((data) => {
                //         console.log(data)
                //         if (data.data.code == 0 && data.data.msg == "success") {
                //             this.$message.success('密码修改成功');
                //         } else {
                //             this.$message.error(data.data.msg);
                //         }
                //     })
                //     .catch((err) => {
                //         console.log(err)
                //     })
            }
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }
</style>

