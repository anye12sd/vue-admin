<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.orderId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="username" slot-scope="username">
                <span class="table-content-span-ellipsis" :title="username">
                    {{username}}
                </span>
            </template>
            <template slot="orderSn" slot-scope="orderSn">
                <span class="table-content-span-ellipsis" :title="orderSn">
                    {{orderSn}}
                </span>
            </template>
            <template slot="addTime" slot-scope="addTime">
                <span class="table-content-span-ellipsis" :title="new Date(addTime).toLocaleString()">
                    {{ new Date(addTime).toLocaleString() }}
                </span>
            </template>
            <template slot="endTime" slot-scope="endTime">
                <span class="table-content-span-ellipsis" :title="new Date(endTime).toLocaleString()">
                    {{ new Date(endTime).toLocaleString() }}
                </span>
            </template>
            <template slot="productName" slot-scope="productName">
                <span class="table-content-span-ellipsis" :title="productName">
                    {{ productName }}
                </span>
            </template>
            <template slot="productId" slot-scope="productId">
                <span class="table-content-span-ellipsis" :title="productId">
                    <a :href="'http://pc.jihui88.com/rest/site/'+productId+'/index'" target="_blank">{{productId}}</a>
                </span>
            </template>
            <template slot="orderType" slot-scope="orderType">
                <span class="table-content-span-ellipsis" :title="orderType == '01'? '购买' : '续费'">
                    {{ orderType == '01'? '购买' : '续费' }}
                </span>
            </template>
            <template slot="orderStatus" slot-scope="orderStatus">
                <span class="table-content-span-ellipsis" :title="getStatus(orderStatus)">
                    {{ getStatus(orderStatus) }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div>
                    <a href="javascript:;" class="block" @click="orderPass(record)" v-if="record.orderStatus != '01'">审核通过</a>
                    <a href="javascript:;" class="block" @click="orderUnpass(record)" v-if="record.orderStatus != '02'">审核不通过</a>
                    <a href="javascript:;" class="block" @click="showDrawer(record)">查看代理商信息</a>
                </div>
            </template>
        </a-table>
        <a-drawer width="640" class="drawer-content" placement="right" :closable="true" :visible="visible"
                  @close="onClose">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-row>
                    <a-col :span="12">
                        <p class="drawer-item drawer-item-title">代理商账号</p>
                        <p class="drawer-item">{{ drawerContent.username }}</p>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <p class="drawer-item drawer-item-title">姓名</p>
                        <p class="drawer-item">{{ drawerContent.name }}</p>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <p class="drawer-item drawer-item-title">公司名称</p>
                        <p class="drawer-item">{{ drawerContent.entName }}</p>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <p class="drawer-item drawer-item-title">email</p>
                        <p class="drawer-item">{{ drawerContent.email }}</p>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <p class="drawer-item drawer-item-title">手机号码</p>
                        <p class="drawer-item">{{ drawerContent.cellphone }}</p>
                    </a-col>
                </a-row>
            </a-spin>
        </a-drawer>
    </div>
</template>
<script>
    const columns = [
        {
            title: '企业账号',
            dataIndex: 'username',
            width: '8%',
            scopedSlots: {customRender: 'username'},
        },
        {
            title: '订单编号',
            dataIndex: 'orderSn',
            width: '10%',
            scopedSlots: {customRender: 'orderSn'},
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            width: '8%',
            scopedSlots: {customRender: 'productName'},
        },
        {
            title: '创建时间',
            dataIndex: 'addTime',
            width: '10%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '站点编号',
            dataIndex: 'productId',
            width: '8%',
            scopedSlots: {customRender: 'productId'},
        },
        {
            title: '金额',
            dataIndex: 'amount',
            width: '6%',
            scopedSlots: {customRender: 'amount'},
        },
        {
            title: '到期时间',
            dataIndex: 'endTime',
            width: '10%',
            scopedSlots: {customRender: 'endTime'},
        },
        {
            title: '订单类型',
            dataIndex: 'orderType',
            width: '8%',
            scopedSlots: {customRender: 'orderType'},
        },
        {
            title: '使用年限',
            dataIndex: 'year',
            width: '7%',
            scopedSlots: {customRender: 'year'},
        },
        {
            title: '审核状态',
            dataIndex: 'orderStatus',
            width: '10%',
            scopedSlots: {customRender: 'orderStatus'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '12%',
            scopedSlots: {customRender: 'operation'},
        }
    ];

    export default {
        name: 'OrderAgentVerifyTable',
        data() {
            return {
                console: false,
                data: [],
                visible: false,
                spinning: true,
                selectedNo: "",
                drawerContent: {},
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
                if (sessionStorage.getItem("siteParams")) {
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    params = {...params, ...siteParams}
                }
                this.$api.getAgentOrderList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.orderList
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
                            this.selectedNo = record.orderId
                        },
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.orderId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            onClose() {
                this.visible = false;
            },
            showDrawer(value) {
                this.visible = true;
                this.spinning = true
                let params = {"agentId": value.agentId}
                this.$api.getAgentDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.spinning = false
                            this.drawerContent = data.data.data
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            orderPass(value){
                let params = {"orderId": value.orderId}
                this.$api.postAgentOrderPass(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("操作成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            orderUnpass(value){
                let params = {"orderId": value.orderId}
                this.$api.postAgentOrderUnpass(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("操作成功")
                            this.$emit('refresh', new Date().getTime())
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
            getStatus(type){
                let status
                switch (type) {
                    case "00":
                        status = "未审核"
                        break;
                    case "01":
                        status = "审核通过"
                        break;
                    case "02":
                        status = "审核未通过"
                        break;
                    case "03":
                        status = "已关闭"
                        break;
                    default :
                        status = "其它"
                        break;
                }
                return status
            }
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

