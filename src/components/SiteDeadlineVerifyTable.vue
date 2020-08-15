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
            <template slot="picture" slot-scope="picture">
                <a-tooltip placement="right" overlayClassName="toolTip-box">
                    <template slot="title">
                        <img :src="picture.large" alt="">
                    </template>
                    <span class="table-content-span-ellipsis">
                        <img :src="picture.thumbnail" alt="" style="height: 19px;">
                    </span>
                    <a-button v-show="false">Right</a-button>
                </a-tooltip>
            </template>
            <template slot="location" slot-scope="location">
                <span class="table-content-span-ellipsis" :title="location.city">
                    {{location.city}}
                </span>
            </template>
            <template slot="dob" slot-scope="dob">
                <span class="table-content-span-ellipsis">
                    {{  dob.age }}
                </span>
            </template>
            <template slot="id" slot-scope="id">
                <span class="table-content-span-ellipsis" :title="id.name">
                    {{ id.name }}
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
            dataIndex: 'picture',
            width: '10%',
            scopedSlots: {customRender: 'picture'},
        },
        {
            title: '站点名称',
            dataIndex: 'location',
            width: '10%',
            scopedSlots: {customRender: 'location'},
        },
        {
            title: '语言版本',
            dataIndex: 'dob',
            width: '10%',
            scopedSlots: {customRender: 'dob'},
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
    import reqwest from 'reqwest';

    export default {
        name: 'SiteDeadlineVerifyTable',
        data() {
            return {
                console: true,
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
                // let params = {pageSize: 10, page: this.pagination.current}
                // console.log(params)
                // this.$api.getModuleList(params)
                //     .then((data) => {
                //         this.console && console.log(data)
                //         if (data.data.code == 0 && data.data.msg == "success") {
                //             this.loading = false
                //             const pagination = {...this.pagination};
                //             pagination.total = data.data.data.totalElements
                //             this.data = data.data.data.content
                //             this.pagination = pagination
                //         } else {
                //             this.$message.error(data.data.msg);
                //         }
                //     })
                //     .catch((err) => {
                //         console.log(err)
                //     })
                reqwest({
                    url: 'https://randomuser.me/api',
                    method: 'get',
                    data: {
                        results: 10,
                    },
                    type: 'json',
                }).then(data => {
                    const pagination = {...this.pagination};
                    // Read total count from server
                    // pagination.total = data.totalCount;
                    pagination.total = 200;
                    this.loading = false;
                    this.data = data.results;
                    console.log(this.data)
                    this.pagination = pagination;
                });
            },
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.login.uuid
                        },
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.login.uuid === this.selectedNo) {
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

