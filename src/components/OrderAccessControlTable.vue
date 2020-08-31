<template>
    <a-table
            class="table-content"
            :columns="columns"
            :row-key="record => record.userId"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            :customRow="clickRow"
            :rowClassName="addRowClass"
            @change="handleTableChange"
    >

        <template slot="addTime" slot-scope="addTime">
      <span :title="new Date(addTime).toLocaleString()">
        {{ new Date(addTime).toLocaleString() }}
      </span>
        </template>
        <template slot="address" slot-scope="address">
      <span v-html="address" class="siteLink">

      </span>
        </template>
        <template slot="operation" slot-scope="text, record">
            <div>
                <a href="javascript:;" class="table-content-a">修改权限</a>
                <a-popconfirm
                        v-if="data.length"
                        title="确认删除吗?"
                        okText="确定" cancelText="取消"
                        @confirm="() => onDelete(record.userId)"
                >
                    <a href="javascript:;" class="table-content-a">删除</a>
                </a-popconfirm>
            </div>
        </template>
    </a-table>
</template>
<script>

    const columns = [
        {
            title: '用户名',
            dataIndex: 'entName',
            width: '10%',
            minWidth: '150px',
            scopedSlots: {customRender: 'entName'},
        },
        {
            title: '权限页面',
            dataIndex: 'username',
            width: '10%',
            scopedSlots: {customRender: 'username'},
        },
        {
            title: '姓名',
            dataIndex: 'registerCellphone',
            width: '10%',
            scopedSlots: {customRender: 'registerCellphone'},
        },
        {
            title: '公司',
            dataIndex: 'addTime',
            width: '10%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '手机',
            dataIndex: 'domain',
            width: '10%',
            scopedSlots: {customRender: 'domain'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: 'OrderAccessControlTable',
        data() {
            return {
                console: false,
                data: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
            };
        },
        mounted() {
            this.fetch();
        },
        methods: {
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
                let params = {pageSize: 10, page: this.pagination.current, entName: "", username: "", domain: ""}
                if (sessionStorage.getItem("userMessage")) {
                    let userMessage = JSON.parse(sessionStorage.getItem("userMessage"))
                    // params.entName = userMessage.entName || "";
                    // params.username = userMessage.username || "";
                    // params.domain = userMessage.domain || "";
                    params = {...params, ...userMessage}
                }
                this.console && console.log('params:', params);
                this.loading = true;
                this.$api.getVerifiedCustomerList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.userList
                            this.pagination = pagination
                            this.console && console.log(data)
                        }else{
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            onDelete(key) {
                let params = {userId: key}
                this.$api.deleteVerifiedCustomer(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('删除成功');
                            this.$emit('refresh', 1)
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            resetPassword(key) {
                let params = {id: key}
                this.$api.resetVerifiedCustomerPassword(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('密码重置成功');
                            this.$emit('refresh', 1)
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
                            this.selectedNo = record.userId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.userId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            shutAccount(key) {
                let params = {id: key}
                this.$api.closeVerifiedCustomer(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('该用户账号已停用');
                            // this.$emit('refresh', 1)
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            startAccount(key) {
                let params = {id: key}
                this.$api.startVerifiedCustomer(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('该用户账号已启用');
                            // this.$emit('refresh', 1)
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

