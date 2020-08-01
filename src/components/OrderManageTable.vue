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
            <template slot="paidPrice" slot-scope="paidPrice">
      <span class="table-content-span-ellipsis order-price">
        {{  paidPrice ? '￥'+paidPrice : paidPrice == 0 ? '￥'+paidPrice : '-' }}
      </span>
            </template>
            <template slot="totalPrice" slot-scope="totalPrice">
      <span class="table-content-span-ellipsis order-price" :title="'￥' + totalPrice">
        ￥{{ totalPrice }}
      </span>
            </template>
            <template slot="agentPrice" slot-scope="agentPrice">
      <span class="table-content-span-ellipsis order-price">
        {{ agentPrice ? '￥'+agentPrice : agentPrice == 0 ? '￥'+agentPrice : '-' }}
      </span>
            </template>
            <template slot="payType" slot-scope="payType">
      <span class="table-content-span-ellipsis" :title="getPayType(payType)">
        {{  getPayType(payType) }}
      </span>
            </template>
            <template slot="paymentType" slot-scope="paymentType">
      <span class="table-content-span-ellipsis" :class="getClass(paymentType)" :title="getPaymentType(paymentType)">
        {{  getPaymentType(paymentType) }}
      </span>
            </template>
            <template slot="agentId" slot-scope="agentId">
      <span class="table-content-span-ellipsis" :title=" agentId ? '线下订单' :'线上订单'">
        {{agentId ? '线下订单' :'线上订单' }}
      </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">详情</a>
            </template>
            <template slot="auditId" slot-scope="auditId">
      <span class="table-content-span-ellipsis" :title="getAuditId(auditId)">
        {{getAuditId(auditId) }}
      </span>
            </template>
        </a-table>
        <a-drawer width="640" class="drawer-content" placement="right" :closable="true" :visible="visible" @close="onClose">
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-descriptions title="订单摘要" :column="2">
                    <a-descriptions-item label="订单编号">
                        {{dataDetail.outTradeNo || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="标记">
                        {{dataDetail.agentId ? '线下订单' :'线上订单'}}
                    </a-descriptions-item>
                    <a-descriptions-item label="订单创建时间">
                        {{new Date(dataDetail.addTime).toLocaleString()}}
                    </a-descriptions-item>
                    <a-descriptions-item label="使用年限">
                        {{dataDetail.year || "-"}}年
                    </a-descriptions-item>
                    <a-descriptions-item label="到期时间">
                        {{new Date(dataDetail.endTime).toLocaleString()}}
                    </a-descriptions-item>
                    <a-descriptions-item label="支付来源">
                        {{getPayType(dataDetail.payType) || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="总计">
                        <span class="order-price">￥{{dataDetail.totalPrice || "0"}}</span>
                    </a-descriptions-item>
                    <a-descriptions-item label="客户应付金额">
                        <span class="order-price">￥{{dataDetail.paidPrice || "0"}}</span>
                    </a-descriptions-item>
                </a-descriptions>
                <a-divider/>
                <a-descriptions title="订单明细" :column="2">
                    <a-descriptions-item label="产品名称">
                        {{dataDetail.name || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="数量">
                        1个
                    </a-descriptions-item>
                    <a-descriptions-item label="使用年限">
                        {{dataDetail.year || "-"}}年
                    </a-descriptions-item>
                    <a-descriptions-item label="原价">
                        <span class="order-price">￥{{dataDetail.totalPrice}}×1</span>
                    </a-descriptions-item>
                    <a-descriptions-item label="网站编号">
                        {{dataDetail.layoutId || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="小计">
                        <span class="order-price">￥{{dataDetail.totalPrice || "-"}}</span>
                    </a-descriptions-item>
                </a-descriptions>
                <a-divider/>
                <a-descriptions title="客户资料" :column="2">
                    <a-descriptions-item label="客户账号">
                        {{dataDetail.username || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="客户公司全称">
                        {{dataDetail.userEntName || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="公司法人">
                        {{dataDetail.userLegalPre || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="法人手机号">
                        {{dataDetail.userCellphone || "-"}}
                    </a-descriptions-item>
                </a-descriptions>
                <a-divider/>
                <a-descriptions title="经销商详情" :column="2">
                    <a-descriptions-item label="经销商支付金额">
                        <span class="order-price">￥{{dataDetail.agentPrice || "0"}}</span>
                    </a-descriptions-item>
                    <a-descriptions-item label="订单创建公司">
                        {{dataDetail.agentEntName || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="订单创建者姓名">
                        {{dataDetail.agentName || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="订单创建者手机号">
                        {{dataDetail.agentCellphone || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="备注">
                        <a-textarea auto-size class="order-comment"/>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
        </a-drawer>
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
            title: '产品名称',
            dataIndex: 'name',
            width: '10%',
            scopedSlots: {customRender: 'name'},
            ellipsis: true
        },
        {
            title: '原价',
            dataIndex: 'totalPrice',
            width: '8%',
            scopedSlots: {customRender: 'totalPrice'},
        },
        {
            title: '客户应付金额',
            dataIndex: 'paidPrice',
            width: '10%',
            scopedSlots: {customRender: 'paidPrice'},
            ellipsis: true
        },
        {
            title: '经销商支付金额',
            dataIndex: 'agentPrice',
            width: '10%',
            scopedSlots: {customRender: 'agentPrice'},
            ellipsis: true
        },
        {
            title: '订单创建者',
            dataIndex: 'agentName',
            width: '8%',
            scopedSlots: {customRender: 'agentName'},
            ellipsis: true
        },
        {
            title: '来源网站',
            dataIndex: 'domain',
            width: '8%',
            scopedSlots: {customRender: 'domain'},
            ellipsis: true
        },
        {
            title: '标记',
            dataIndex: 'agentId',
            width: '8%',
            scopedSlots: {customRender: 'agentId'},
        },
        {
            title: '订单创建时间',
            dataIndex: 'addTime',
            width: '8%',
            scopedSlots: {customRender: 'addTime'},
            ellipsis: true
        },
        {
            title: '状态',
            dataIndex: 'paymentType',
            width: '8%',
            scopedSlots: {customRender: 'paymentType'},
        },
        {
            title: '支付来源',
            dataIndex: 'payType',
            width: '8%',
            scopedSlots: {customRender: 'payType'},
            ellipsis: true
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '8%',
            scopedSlots: {customRender: 'operation'},
        },
        {
            title: '审核',
            dataIndex: 'auditId',
            width: '8%',
            scopedSlots: {customRender: 'auditId'},
        }
    ];

    export default {
        name: 'LogManageTable',
        prop: ['site'],
        data() {
            return {
                console: true,
                data: [],
                dataDetail:{},
                visible: false,
                spinning: true,
                pagination: {page: 0, current: 1},
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
            fetch() {
                this.loading = true
                let params = {pageSize: 10, page: this.pagination.current - 1, state: "NORMAL"}
                if(sessionStorage.getItem("siteParams")){
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    params = {...params,...siteParams}
                }
                this.$api.getOrderList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.totalElements
                            this.data = data.data.data.content
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
                            this.visible = true
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
            onClose() {
                this.visible = false;
            },
            showDrawer(value) {
                this.visible = true;
                console.log(value)
                this.spinning = true
                let params = {"orderId":value.orderId}
                this.$api.getOrderListDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.dataDetail = data.data.data
                            this.comment = this.dataDetail.comment
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
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
            getPaymentType(type) {
                var paymentType;
                switch (type) {
                    case "UN_PAY":
                        paymentType = "未支付"
                        break;
                    case "PAID":
                        paymentType = "已支付"
                        break;
                    case "PART_PAY":
                        paymentType = "部分支付"
                        break;
                    default:
                        paymentType = "其他"
                        break;
                }
                return paymentType
            },
            getClass(type) {
                var className;
                switch (type) {
                    case "UN_PAY":
                        className = "UN_PAY"
                        break;
                    case "PAID":
                        className = "PAID"
                        break;
                    case "PART_PAY":
                        className = "PART_PAY"
                        break;
                }
                return className
            },
            getAuditId(type) {
                var auditId;
                if(type){
                    auditId = "通过"
                    if(type == "NOTPASS"){
                        auditId = "审核不通过"
                    }
                }else{
                    auditId = "待审核"
                }
                return auditId
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

