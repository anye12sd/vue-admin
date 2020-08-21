<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.layoutId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="layoutId" slot-scope="layoutId">
                <span>
                    {{layoutId}}
                </span>
                <a :href="'http://pc.jihui88.com/rest/site/'+layoutId+'/index'" target="_blank">[查看]</a>
            </template>
            <template slot="seoTitle" slot-scope="seoTitle">
                <span class="table-content-span-ellipsis" :title="seoTitle">
                    {{seoTitle}}
                </span>
            </template>
            <template slot="language" slot-scope="language">
                <span class="table-content-span-ellipsis">
                    {{  language == "1" ? "中文" : "英文" }}
                </span>
            </template>
            <template slot="id">
                <span class="table-content-span-ellipsis" :title="' '">

                </span>
            </template>
            <template slot="id1">
                <span class="table-content-span-ellipsis">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="id2">
                <span class="table-content-span-ellipsis">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="id3">
                <span class="table-content-span-ellipsis">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div>
                    <a href="javascript:;" class="table-content-a-inline" @click="showDrawer(record)">审核（到期时间）</a>
                </div>
            </template>
        </a-table>
        <a-drawer width="640" class="drawer-content" placement="right" :closable="true" :visible="visible"
                  @close="onClose" v-if="false">
            <a-spin :spinning="spinning" tip="加载中。。。">

            </a-spin>
        </a-drawer>
    </div>
</template>
<script>
    const columns = [
        {
            title: '网站编号',
            dataIndex: 'layoutId',
            width: '10%',
            scopedSlots: {customRender: 'layoutId'},
        },
        {
            title: '站点名称',
            dataIndex: 'seoTitle',
            width: '10%',
            scopedSlots: {customRender: 'seoTitle'},
        },
        {
            title: '语言版本',
            dataIndex: 'language',
            width: '10%',
            scopedSlots: {customRender: 'language'},
        },
        {
            title: '域名网址',
            dataIndex: 'id',
            width: '10%',
            scopedSlots: {customRender: 'id'},
        },
        {
            title: '是否上线',
            dataIndex: 'id1',
            width: '10%',
            scopedSlots: {customRender: 'id1'},
        },
        {
            title: '审核状态',
            dataIndex: 'id2',
            width: '10%',
            scopedSlots: {customRender: 'id2'},
        },
        {
            title: '到期时间',
            dataIndex: 'id3',
            width: '10%',
            scopedSlots: {customRender: 'id3'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '12%',
            scopedSlots: {customRender: 'operation'},
        }
    ];

    export default {
        name: 'SiteDeadlineVerifyTable',
        data() {
            return {
                console: false,
                data: [],
                visible: false,
                spinning: true,
                sort: undefined,
                selectedNo: "",
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
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
                this.loading = true
                let params = {pageSize: 10, page: this.pagination.current}
                this.$api.getAuditList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.layoutList
                            this.pagination = pagination
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
                            this.selectedNo = record.layoutId
                        },
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
                this.visible = false;
                this.show.changeDate = true
                this.show.mark = true
                this.show.paidPrice = true
                this.show.agentPrice = true
            },
            showDrawer(value) {
                this.visible = true;
                console.log(value)
                this.spinning = true
                let params = {"orderId": value.orderId}
                this.$api.getOrderListDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.dataDetail = data.data.data
                            this.comment = this.dataDetail.comment
                            this.changeDate = new Date(this.dataDetail.addTime).toLocaleString()
                            this.dataDetail.agentId ? this.mark = 'WX' : this.mark = undefined
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            changeImg(value) {
                console.log(value)
            },
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }

    .ant-tooltip-inner {
        background-color: #fff;
    }
</style>

