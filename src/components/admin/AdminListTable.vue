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
        <template slot="name" slot-scope="name">
      <span class="table-content-span-ellipsis" :title="name.first+name.last">
        {{ name.first }}{{name.last}}
      </span>
        </template>
        <template slot="phone" slot-scope="phone">
      <span class="table-content-span-ellipsis" :title="phone">
        {{ phone }}
      </span>
        </template>
        <template slot="gender" slot-scope="gender">
      <span class="table-content-span-ellipsis" :title="gender === 'female' ? '女' : '男'">
        {{ gender === 'female' ? '女' : '男' }}
      </span>
        </template>
        <template slot="nat">
      <span class="table-content-span-ellipsis" :title="'管理员'">
        {{ '管理员' }}
      </span>
        </template>
        <template slot="location">
      <span class="table-content-span-ellipsis" :title="'未知'">
        {{ "未知" }}
      </span>
        </template>
        <template slot="email" slot-scope="email">
      <span class="table-content-span-ellipsis" :title="email">
        {{ email }}
      </span>
        </template>
        <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" class="table-content-a">修改</a>
            <a-popconfirm
                    v-if="data.length"
                    title="Sure to delete?"
                    @confirm="() => onDelete(record.id.value)"
            >
                <a href="javascript:;" class="table-content-a">删除</a>
            </a-popconfirm>
        </template>
    </a-table>
</template>
<script>
    import https from '../../utils/https'
    // import reqwest from 'reqwest'
    const columns = [
        {
            title: '用户名',
            dataIndex: 'id',
            sorter: true,
            width: '10%',
            minWidth: '150px',
            scopedSlots: {customRender: 'id'},
        },
        {
            title: '姓名',
            dataIndex: 'name',
            sorter: true,
            width: '15%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: 'email',
            dataIndex: 'email',
            sorter: true,
            width: '15%',
            scopedSlots: {customRender: 'email'},
        },
        {
            title: '手机',
            dataIndex: 'phone',
            sorter: true,
            width: '10%',
            scopedSlots: {customRender: 'phone'},
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: '10%',
            scopedSlots: {customRender: 'gender'},
        },
        {
            title: '部门/角色',
            dataIndex: 'nat',
            width: '10%',
            scopedSlots: {customRender: 'nat'},
        },
        {
            title: '类型',
            dataIndex: 'location',
            width: '10%',
            scopedSlots: {customRender: 'location'},
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
        name: 'AdminListTable',
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
                // reqwest({
                //     url: 'https://randomuser.me/api',
                //     data: {
                //         results: 10,
                //         ...params,
                //     },
                //     type: 'json',
                // }).then(data => {
                //     const pagination = {...this.pagination};
                //     // Read total count from server
                //     // pagination.total = data.totalCount;
                //     pagination.total = 200;
                //     this.loading = false;
                //     this.data = data.results;
                //     this.pagination = pagination;
                // });
                https.fetchGet('https://randomuser.me/api', params={})
                    .then((data) => {
                        this.loading = false
                        console.log(data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            onDelete(key) {
                const data = [...this.data];
                this.data = data.filter(item => item.id.value !== key);
            },
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.id.value
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.id.value === this.selectedNo) {
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

