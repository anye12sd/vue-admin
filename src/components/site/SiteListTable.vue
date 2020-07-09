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
      <span class="table-content-span-ellipsis" :title="'编辑'">
        {{ "编辑" }}
      </span>
        </template>
        <template slot="gender" slot-scope="gender">
      <span class="table-content-span-ellipsis" :title=" gender === 'female' ? '是' : '否' ">
        {{ gender === "female" ? "是" : "否" }}
      </span>
        </template>
        <template slot="dob" slot-scope="dob">
      <span class="table-content-span-ellipsis" :title="dob.date">
        {{ dob.date }}
      </span>
        </template>
        <template slot="cell" slot-scope="cell">
      <span class="table-content-span-ellipsis" :title="cell">
        {{ cell }}
      </span>
        </template>
        <template slot="email" slot-scope="email">
      <span class="table-content-span-ellipsis" :title="email">
        {{ email }}
      </span>
        </template>
        <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" class="table-content-a">查看</a>
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
    import reqwest from 'reqwest';

    const columns = [
        {
            title: '站点编号',
            dataIndex: 'id',
            sorter: true,
            width: '20%',
            minWidth: '150px',
            scopedSlots: {customRender: 'id'},
        },
        {
            title: '微信群编号',
            dataIndex: 'name',
            sorter: true,
            width: '15%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '是否付费',
            dataIndex: 'gender',
            sorter: true,
            width: '15%',
            scopedSlots: {customRender: 'gender'},
        },
        {
            title: '最近操作时间',
            dataIndex: 'dob',
            sorter: true,
            width: '20%',
            scopedSlots: {customRender: 'dob'},
        },
        {
            title: '原始注册手机号码',
            dataIndex: 'cell',
            sorter: true,
            width: '20%',
            scopedSlots: {customRender: 'cell'},
        }
    ];

    export default {
        name: 'SiteListTable',
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
                    console.log(data)
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

