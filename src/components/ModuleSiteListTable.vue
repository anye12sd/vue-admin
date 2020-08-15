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
            <template slot="location" slot-scope="location, record">
                <span class="table-content-span-ellipsis table-content-span-center" :title="location.city">
                    {{location.city}}
                </span>
                <div class="table-content-span-center">
                    <a-icon type="edit" @click="changeImg(record)"></a-icon>
                </div>
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
                <span class="table-content-span-ellipsis" :title="'未上架'">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="id2">
                <span class="table-content-span-ellipsis" :title="'未上架'">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="id3">
                <span class="table-content-span-ellipsis" :title="'未上架'">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="id4">
                <span class="table-content-span-ellipsis" :title="'未上架'">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="id5">
                <span class="table-content-span-ellipsis" :title="'未上架'">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="id6">
                <span class="table-content-span-ellipsis" :title="'未上架'">
                    {{ '未上架' }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div>
                    <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">审核不通过</a>
                    <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">清页面缓存</a>
                </div>
                <div>
                    <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">清数据缓存</a>
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
            title: '公司logo',
            dataIndex: 'location',
            width: '10%',
            scopedSlots: {customRender: 'location'},
        },
        {
            title: '首屏图片',
            dataIndex: 'dob',
            width: '10%',
            scopedSlots: {customRender: 'dob'},
        },
        {
            title: '移动端首屏图片',
            dataIndex: 'id',
            width: '10%',
            scopedSlots: {customRender: 'id'},
            ellipsis: true
        },
        {
            title: '语言版本',
            dataIndex: 'id1',
            width: '10%',
            scopedSlots: {customRender: 'id1'},
            ellipsis: true
        },
        {
            title: '站点名称',
            dataIndex: 'id2',
            width: '10%',
            scopedSlots: {customRender: 'id2'},
            ellipsis: true
        },
        {
            title: '审核状态',
            dataIndex: 'id3',
            width: '8%',
            scopedSlots: {customRender: 'id3'},
            ellipsis: true
        },
        {
            title: '到期时间',
            dataIndex: 'id4',
            width: '8%',
            scopedSlots: {customRender: 'id4'},
            ellipsis: true
        },
        {
            title: '模板价格（元）',
            dataIndex: 'id5',
            width: '8%',
            scopedSlots: {customRender: 'id5'},
            ellipsis: true
        },
        {
            title: '被调用次数',
            dataIndex: 'id6',
            width: '8%',
            scopedSlots: {customRender: 'id6'},
            ellipsis: true
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
        name: 'ModuleSiteListTable',
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

