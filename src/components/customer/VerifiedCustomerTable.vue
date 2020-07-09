<template>
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
        <template slot="id" slot-scope="id">
      <span class="table-content-span-ellipsis" :title="id.value">
        {{ id.value }}
      </span>
        </template>
        <template slot="name">
      <span class="table-content-span-ellipsis" :title="'这是用户名'">
        {{ "这事用户名" }}
      </span>
        </template>
        <template slot="phone" slot-scope="phone">
      <span class="table-content-span-ellipsis" :title="phone">
        {{ phone }}
      </span>
        </template>
        <template slot="dob" slot-scope="dob">
      <span class="table-content-span-ellipsis" :title="dob.date">
        {{ dob.date }}
      </span>
        </template>
        <template slot="email">
      <span class="table-content-span-ellipsis" :title="'未知来源'">
        {{ "未知来源" }}
      </span>
        </template>
        <template slot="cell">
      <span class="table-content-span-ellipsis" :title="'50'">
        {{ "50" }}
      </span>
        </template>
        <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" class="table-content-a">付费审核</a>
            <a-popconfirm
                    v-if="data.length"
                    title="Sure to delete?"
                    @confirm="() => onDelete(record.id.value)"
            >
                <a href="javascript:;" class="table-content-a">删除用户</a>
            </a-popconfirm>
            <a href="javascript:;" class="table-content-a">密码初始化</a>
            <a href="javascript:;" class="table-content-a">停用账号</a>
        </template>
    </a-table>
</template>
<script>
    import reqwest from 'reqwest';

    const columns = [
        {
            title: '企业名称',
            dataIndex: 'id',
            sorter: true,
            width: '10%',
            minWidth: '150px',
            scopedSlots: {customRender: 'id'},
        },
        {
            title: '用户名',
            dataIndex: 'name',
            sorter: true,
            width: '10%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '原始注册手机号码',
            dataIndex: 'phone',
            sorter: true,
            width: '10%',
            scopedSlots: {customRender: 'phone'},
        },
        {
            title: '注册时间',
            dataIndex: 'dob',
            width: '10%',
            scopedSlots: {customRender: 'dob'},
        },
        {
            title: '注册来源',
            dataIndex: 'email',
            width: '10%',
            scopedSlots: {customRender: 'email'},
        },
        {
            title: '代理商',
            dataIndex: 'nat',
            width: '10%',
            scopedSlots: {customRender: 'nat'},
        },
        {
            title: '拥有站点',
            dataIndex: 'cell',
            width: '10%',
            scopedSlots: {customRender: 'cell'},
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
                pagination: {},
                loading: false,
                columns,
                selectedNo:"",
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
            clickRow(record){
                return{
                    on:{
                        click: () => {
                            this.selectedNo = record.id.value
                        }
                    }
                }
            },
            addRowClass(key){
                var styleClassName = ""
                if(key.id.value === this.selectedNo){
                    styleClassName = "selected-tr"
                }
                return styleClassName
            }
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }
</style>

