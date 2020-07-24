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
            <template slot="layoutId">
      <span class="table-content-span-ellipsis" :title="'企业账号'">
        {{ '企业账号' }}
      </span>
            </template>
            <template slot="dob" slot-scope="dob">
      <span class="table-content-span-ellipsis" :title="dob.date">
        {{ dob.date }}
      </span>
            </template>
            <template slot="payState">
      <span class="table-content-span-ellipsis" :title="'这是功能模块'">
        {{ '这是功能模块' }}
      </span>
            </template>
            <template slot="description">
      <span class="table-content-span-ellipsis" :title="'这是描述'">
        {{ '这是描述' }}
      </span>
            </template>
            <template slot="UA">
      <span class="table-content-span-ellipsis" :title="'chrome'">
        {{ 'chrome' }}
      </span>
            </template>
            <template slot="ip">
      <span class="" :title="'192.168.1.1'">
        {{ '192.168.1.1' }}
      </span>
            </template>
            <template slot="region">
      <span class="table-content-span-ellipsis" :title="'浙江省永康市'">
        {{ '浙江省永康市' }}
      </span>
            </template>
            <template slot="application">
      <span class="table-content-span-ellipsis" :title="'www.baidu.com'">
        {{ 'www.baidu.com' }}
      </span>
            </template>
        </a-table>
        <a-drawer width="640" placement="right" :closable="false" :visible="visible" @close="onClose">
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">企业账号</p>
                    <p class="drawer-item drawer-item-content">{{
                        '操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">操作者帐号</p>
                    <p class="drawer-item drawer-item-content">{{
                        '操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号操作者帐号' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">功能模块</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">类型</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">描述</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">时间</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">IP</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">地区</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">应用</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">浏览器</p>
                    <p class="drawer-item drawer-item-content">{{ '1' }}</p>
                </a-col>
            </a-row>
        </a-drawer>
    </div>
</template>
<script>

    import reqwest from 'reqwest'

    const columns = [
        {
            title: '企业帐号',
            dataIndex: 'layoutId',
            width: '10%',
            scopedSlots: {customRender: 'layoutId'},
        },
        {
            title: '操作者帐号',
            dataIndex: 'cell',
            width: '10%',
            scopedSlots: {customRender: 'cell'},
        },
        {
            title: '功能模块',
            dataIndex: 'payState',
            width: '10%',
            scopedSlots: {customRender: 'payState'},
        },
        {
            title: '类型',
            dataIndex: 'gender',
            width: '10%',
            scopedSlots: {customRender: 'gender'},
        },
        {
            title: '描述',
            dataIndex: 'description',
            width: '10%',
            scopedSlots: {customRender: 'description'},
        },
        {
            title: '时间',
            dataIndex: 'dob',
            width: '10%',
            scopedSlots: {customRender: 'dob'},
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            width: '10%',
            scopedSlots: {customRender: 'ip'},
        },
        {
            title: '地区',
            dataIndex: 'region',
            width: '10%',
            scopedSlots: {customRender: 'region'},
        },
        {
            title: '应用',
            dataIndex: 'application',
            width: '10%',
            scopedSlots: {customRender: 'application'},
        },
        {
            title: '浏览器',
            dataIndex: 'UA',
            width: '10%',
            scopedSlots: {customRender: 'UA'},
        }
    ];

    export default {
        name: 'LogManageTable',
        prop: ['site'],
        data() {
            return {
                console: false,
                data: [],
                visible: false,
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
            fetch(params = {}) {
                reqwest({
                    url: 'https://randomuser.me/api',
                    data: {
                        results: 10,
                        ...params,
                    },
                    type: 'json',
                }).then(data => {
                    const pagination = {...this.pagination};
                    // Read total count from server
                    // pagination.total = data.totalCount;
                    console.log(345634, data)
                    pagination.total = 200;
                    this.loading = false;
                    this.data = data.results;
                    this.pagination = pagination;
                });
            },
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.login.uuid
                        },
                        onDoubleClick: () => {
                            this.visible = true
                            console.log(record)
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.login.uuid === this.selectedNo) {
                    styleClassName = "selected-tr"
                    this.console && console.log(key)
                }
                return styleClassName
            },
            onClose() {
                this.visible = false;
            },
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }

    .drawer-item-title {
        width: 100px;
    }

    .drawer-item-content {
        width: 480px;
    }
</style>

