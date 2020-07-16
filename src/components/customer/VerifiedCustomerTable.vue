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
                <a-popconfirm
                        v-if="data.length"
                        title="确认删除吗?"
                        okText="确定" cancelText="取消"
                        @confirm="() => onDelete(record.userId)"
                >
                    <a href="javascript:;" class="table-content-a" >删除用户</a>
                </a-popconfirm>
                <a-popconfirm
                        v-if="data.length"
                        title="确认初始化该用户密码吗?"
                        okText="确定" cancelText="取消"
                        @confirm="() => resetPassword(record.userId)"
                >
                    <a href="javascript:;" class="table-content-a">密码初始化</a>
                </a-popconfirm>
            </div>
            <div>
                <a href="javascript:;" class="table-content-a" v-if="record.state == '01'" @click="shutAccount(record.userId)">停用账号</a>
                <a href="javascript:;" class="table-content-a" v-else @click="startAccount(record.userId)">启用账号</a>
            </div>
        </template>
    </a-table>
</template>
<script>

    const columns = [
        {
            title: '企业名称',
            dataIndex: 'entName',
            width: '10%',
            minWidth: '150px',
            scopedSlots: {customRender: 'entName'},
        },
        {
            title: '用户名',
            dataIndex: 'username',
            width: '10%',
            scopedSlots: {customRender: 'username'},
        },
        {
            title: '原始注册手机号码',
            dataIndex: 'registerCellphone',
            width: '10%',
            scopedSlots: {customRender: 'registerCellphone'},
        },
        {
            title: '注册时间',
            dataIndex: 'addTime',
            width: '10%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '注册来源',
            dataIndex: 'domain',
            width: '10%',
            scopedSlots: {customRender: 'domain'},
        },
        {
            title: '代理商',
            dataIndex: 'agentUsername',
            width: '10%',
            scopedSlots: {customRender: 'agentUsername'},
        },
        {
            title: '拥有站点',
            dataIndex: 'address',
            width: '10%',
            scopedSlots: {customRender: 'address'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: 'VerifiedCustomerTable',
        data() {
            return {
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
            fetch() {
                let params = {pageSize: 10, page: this.pagination.current, entName:"", username: "", domain: ""}
                if(sessionStorage.getItem("userMessage")){
                    let userMessage = JSON.parse(sessionStorage.getItem("userMessage"))
                    // params.entName = userMessage.entName || "";
                    // params.username = userMessage.username || "";
                    // params.domain = userMessage.domain || "";
                    params = {...params, ...userMessage}
                }
                console.log('params:', params);
                this.loading = true;
                this.$https.fetchGet('/admin/user/list', params)
                    .then((data) => {
                        this.loading = false
                        const pagination = {...this.pagination};
                        pagination.total = data.data.data.count
                        this.data = data.data.data.userList
                        this.pagination = pagination
                        console.log(data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            onDelete(key) {
                let params = {userId: key}
                this.$https.fetchPost('/admin/user/delete', params)
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
                this.$https.fetchPost('/admin/user/password/init', params)
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
                this.$https.fetchPost('/admin/user/close', params)
                    .then((data) => {
                        console.log(data)
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
            startAccount(key){
                let params = {id: key}
                this.$https.fetchPost('/admin/user/open', params)
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

