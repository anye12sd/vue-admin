<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.outTradeNo"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                :scroll="{ x: 1500 }"
                @change="handleTableChange"
        >
            <template slot="outTradeNo" slot-scope="outTradeNo">
      <span class="table-content-span-ellipsis" :title="outTradeNo">
        {{ outTradeNo }}
      </span>
            </template>
            <template slot="addTime" slot-scope="addTime">
      <span class="table-content-span-ellipsis" :title="new Date(addTime).toLocaleString()">
        {{ new Date(addTime).toLocaleString() }}
      </span>
            </template>
            <template slot="endTime" slot-scope="endTime">
      <span class="table-content-span-ellipsis" :title="endTime ? new Date(endTime).toLocaleString() : ''">
        {{ endTime ? new Date(endTime).toLocaleString() : '' }}
      </span>
            </template>
            <template slot="totalPrice" slot-scope="totalPrice">
      <span class="table-content-span-ellipsis order-price" :title="'￥' + totalPrice">
        ￥{{ totalPrice }}
      </span>
            </template>
            <template slot="payType" slot-scope="payType">
      <span class="table-content-span-ellipsis" :title="getPayType(payType)">
        {{  getPayType(payType) }}
      </span>
            </template>
            <template slot="orderBuyTypeEnum" slot-scope="orderBuyTypeEnum">
      <span class="table-content-span-ellipsis" :title="getBuyType(orderBuyTypeEnum)">
        {{  getBuyType(orderBuyTypeEnum) }}
      </span>
            </template>
        </a-table>
    </div>
</template>
<script>
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'outTradeNo',
            width: '10%',
            scopedSlots: {customRender: 'outTradeNo'},
        },
        {
            title: '公司名称',
            dataIndex: 'name',
            width: '10%',
            scopedSlots: {customRender: 'name'},
            ellipsis: true
        },
        {
            title: '站点编号',
            dataIndex: 'layoutId',
            width: '8%',
            scopedSlots: {customRender: 'layoutId'},
        },
        {
            title: '域名',
            dataIndex: 'bindAddress',
            width: '10%',
            scopedSlots: {customRender: 'bindAddress'},
            ellipsis: true
        },
        {
            title: '到期时间',
            dataIndex: 'endTime',
            width: '10%',
            scopedSlots: {customRender: 'endTime'},
            ellipsis: true
        },
        {
            title: '类型',
            dataIndex: 'orderBuyTypeEnum',
            width: '8%',
            scopedSlots: {customRender: 'orderBuyTypeEnum'},
            ellipsis: true
        },
        {
            title: '来源',
            dataIndex: 'domain',
            width: '8%',
            scopedSlots: {customRender: 'domain'},
            ellipsis: true
        },
        {
            title: '支付方式',
            dataIndex: 'payType',
            width: '8%',
            scopedSlots: {customRender: 'payType'},
        },
        {
            title: '费用',
            dataIndex: 'totalPrice',
            width: '8%',
            scopedSlots: {customRender: 'totalPrice'},
            ellipsis: true
        },
        {
            title: '订单创建时间',
            dataIndex: 'addTime',
            width: '8%',
            scopedSlots: {customRender: 'addTime'},
        }
    ];

    export default {
        name: 'OrderManageNewTable',
        props: ["toChildPage"],
        data() {
            return {
                console: true,
                data: [],
                dataDetail:{},
                pagination: {page: 0, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                comment: ""
            };
        },
        mounted() {
            this.pagination.current = this.toChildPage
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
                let params = {pageSize: 10, page: this.pagination.current,}
                if(sessionStorage.getItem("siteParams")){
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    params = {...params,...siteParams}
                }
                this.$api.getOrderList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.list
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
                            this.selectedNo = record.outTradeNo
                        },
                        onDoubleClick: () => {
                            console.log(record)
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.outTradeNo === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            getPayType(type) {
                var payType;
                switch (type) {
                    case "WX":
                        payType = "微信"
                        break;
                    case "ALI":
                        payType = "支付宝"
                        break;
                    case "BANK":
                        payType = "银行转账"
                        break;
                    case "PFA":
                        payType = "找人代付"
                        break;
                    case "OFFLINE":
                        payType = "线下支付"
                        break;
                    case "INVITATION":
                        payType = "邀请码支付"
                        break;
                    default:
                        payType = "其他"
                        break;
                }
                return payType
            },
            getBuyType(type) {
                var buyType;
                switch (type) {
                    case "BUY":
                        buyType = "购买"
                        break;
                    case "UPDATE":
                        buyType = "升级"
                        break;
                    case "RENEW":
                        buyType = "续费"
                        break;
                    default:
                        buyType = "其他"
                        break;
                }
                return buyType
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

