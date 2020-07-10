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
            <template slot="location">
        <span :title="'浙江省某某某某有限公司'">
          {{ "浙江省某某某某有限公司" }}
        </span>
            </template>
            <template slot="dob">
        <span :title="'2012-05-08 08:06'">
          {{ "2012-05-08 08:06" }}
        </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <router-link :to="{name:'ScreenshotsToCustomer',query:{id:1}}" target="_blank">截图给客户</router-link>
                <!--<a href="javascript:;" class="table-content-a">截图给客户</a>-->
                <!--<a-popconfirm-->
                <!--v-if="data.length"-->
                <!--title="Sure to delete?"-->
                <!--@confirm="() => onDelete(record.id.value)"-->
                <!--&gt;-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">查看</a>
            </template>
        </a-table>
        <a-drawer width="640" placement="right" :closable="false" :visible="visible" @close="onClose">
            <a-row>
                <a-col :span="12">
                    <p class="drawer-item drawer-item-title">接收人</p>
                    <p class="drawer-item">{{ drawerContent.id.name }}</p>
                </a-col>
                <a-col :span="12">
                    <p class="drawer-item drawer-item-title">接收企业</p>
                    <p class="drawer-item">{{ drawerContent.id.value }}</p>
                </a-col>
                <a-col :span="12">
                    <p class="drawer-item drawer-item-title">发送时间</p>
                    <p class="drawer-item">{{ drawerContent.nat }}</p>
                </a-col>
            </a-row>
            <a-divider/>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">内容</p>
                    <p class="drawer-item">这是内容内容这是内容内容这是内容内容这是内容内容这是内容内容这是内容内容这是内容内容这是内容内容这是内容内容</p>
                </a-col>
            </a-row>
            <a-divider/>
        </a-drawer>
    </div>
</template>
<script>
    import reqwest from 'reqwest';

    const columns = [
        {
            title: '内容',
            dataIndex: 'nat',
            sorter: true,
            width: '40%',
        },
        {
            title: '接收人',
            dataIndex: 'phone',
            sorter: true,
            width: '15%',
            scopedSlots: {customRender: 'phone'},
        },
        {
            title: '接收企业',
            dataIndex: 'location',
            width: '15%',
            scopedSlots: {customRender: 'location'},
        },
        {
            title: '发送时间',
            dataIndex: 'dob',
            width: '15%',
            scopedSlots: {customRender: 'dob'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: 'CustomerMessageTable',
        data() {
            return {
                visible: false,
                data: [],
                pagination: {},
                loading: false,
                columns,
                selectedNo:"",
                drawerContent: {"id": {"name": "", "value": ""}, nat: ""}
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
            showDrawer(value) {
                this.visible = true;
                this.drawerContent = value
            },
            onClose() {
                this.visible = false;
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
