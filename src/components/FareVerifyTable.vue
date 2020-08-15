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
        {{  paidPrice ? '￥'+paidPrice : paidPrice == 0 ? '￥'+ paidPrice : '-' }}
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
        <a-drawer width="640" class="drawer-content" placement="right" :closable="true" :visible="visible"
                  @close="onClose">
            <a-spin :spinning="spinning" tip="加载中。。。" wrapperClassName="spin-box">
                <a-descriptions title="订单摘要" :column="2">
                    <a-descriptions-item label="订单编号">
                        {{dataDetail.outTradeNo || "-"}}
                    </a-descriptions-item>
                    <a-descriptions-item label="标记">
                        <span v-show="show.mark">{{dataDetail.agentId ? '线下订单' :'线上订单'}}</span>
                        <div v-show="!show.mark">
                            <a-select style="width: 120px" placeholder="请选择" v-model="mark">
                                <a-select-option value="0">
                                    线上订单
                                </a-select-option>
                                <a-select-option value="WX">
                                    微信支付
                                </a-select-option>
                                <a-select-option value="ALI">
                                    支付宝支付
                                </a-select-option>
                                <a-select-option value="BANK">
                                    银行卡支付
                                </a-select-option>
                                <a-select-option value="PFA">
                                    代付
                                </a-select-option>
                                <a-select-option value="INVITATION">
                                    线下订单
                                </a-select-option>
                            </a-select>
                        </div>
                        <a href="javascript:;" v-show="show.mark" @click="changeShowStatus('mark')"> 修改</a>
                    </a-descriptions-item>
                    <a-descriptions-item label="订单创建时间">
                        <span v-show="show.changeDate">{{new Date(dataDetail.addTime).toLocaleString()}}</span>
                        <div v-show="!show.changeDate">
                            <a-date-picker @ok="showDate" show-time size="small" :locale="locale" v-model="changeDate"/>
                        </div>
                        <a href="javascript:;" v-show="show.changeDate" @click="changeShowStatus('changeDate')"> 修改</a>
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
                        <span class="order-price" v-show="show.paidPrice">￥{{dataDetail.paidPrice || "0"}}</span>
                        <div v-show="!show.paidPrice">
                            <a-input
                                    :value="dataDetail.paidPrice"
                                    placeholder="输入金额"
                                    :max-length="25"
                                    style="width: 120px"
                                    @blur="priceOnBlur($event,'paidPrice')"
                            />
                        </div>
                        <a href="javascript:;" @click="changeShowStatus('paidPrice')" v-show="show.paidPrice"> 修改</a>
                    </a-descriptions-item>
                </a-descriptions>
                <a href="javascript:;" class="verify verify-pass" @click="passOrder">审核通过</a>
                <a href="javascript:;" class="verify verify-notPass" @click="notPassOrder">审核不通过</a>
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
                <a-descriptions title="代理商详情" :column="2">
                    <a-descriptions-item label="代理商支付金额">
                        <span class="order-price" v-show="show.agentPrice">￥{{dataDetail.agentPrice || "0"}}</span>
                        <div v-show="!show.agentPrice">
                            <a-input
                                    :value="dataDetail.agentPrice"
                                    placeholder="输入金额"
                                    :max-length="25"
                                    style="width: 120px"
                                    @blur="priceOnBlur($event,'agentPrice')"
                            />
                        </div>
                        <a href="javascript:;" v-show="show.agentPrice" @click="changeShowStatus('agentPrice')"> 修改</a>
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
                        <a-textarea auto-size class="order-comment" v-model="comment"/>
                    </a-descriptions-item>
                </a-descriptions>
            </a-spin>
            <a-button type="primary" @click="submitChange">
                提交
            </a-button>
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
            title: '代理商支付金额',
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
        name: 'FareVerifyTable',
        prop: ['site'],
        data() {
            return {
                console: true,
                data: [],
                visible: false,
                comment: "",
                dataDetail: {},
                spinning: true,
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                changeDate: "",
                mark: undefined,
                show: {
                    changeDate: true,
                    mark: true,
                    paidPrice: true,
                    agentPrice: true
                },
                locale: {
                    "lang": {
                        placeholder: "请选择日期",
                        ok: "确定",
                        timeSelect: "选择时间",
                        dateSelect: "选择日期",
                        now: "此刻",
                        yearFormat: "YYYY",
                        dateTimeFormat: "YYYY-MM-DD HH:mm",
                        monthFormat: "MM",
                        dayFormat: "DD"
                    }
                }
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
                console.log(params)
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
            passOrder() {
                let params = {"orderId": this.dataDetail.orderId}
                this.$api.doPassOrder(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("操作成功");
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            notPassOrder() {
                let params = {"orderId": this.dataDetail.orderId}
                this.$api.doNotPassOrder(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("操作成功");
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            submitChange() {
                const {paidPrice, agentPrice, addTime, agentId} = this.dataDetail
                let params = {
                    "addTime": addTime,
                    "paidPrice": paidPrice,
                    "agentPrice": agentPrice,
                    "agentId": agentId,
                    "comment": this.comment
                }
                if(this.mark == 0){
                    params.agentId = null
                }
                params.paidPrice = params.paidPrice || 0
                params.agentPrice = params.agentPrice || 0
                console.log(params)
                this.$api.submitOrder(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("提交成功");
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            showDate() {
                this.changeDate = new Date(this.changeDate).toLocaleString()
                this.dataDetail.addTime = new Date(this.changeDate).getTime()
                this.show.changeDate = !this.show.changeDate
            },
            priceOnBlur(e, type) {
                const {value} = e.target;
                const reg = /^-?[0-9]*(\.[0-9]*)?$/;
                if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                    this.dataDetail[type] = value
                    this.show[type] = !this.show[type]
                } else {
                    this.$message.error("请输入正确的金额")
                }
            },
            changeShowStatus(type) {
                this.show[type] = !this.show[type]
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
                if (type) {
                    auditId = "通过"
                    if (type == "NOTPASS") {
                        auditId = "审核不通过"
                    }
                } else {
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

    .verify {
        color: #fff;
        font-size: 14px;
        padding: 10px;
    }

    .spin-box{
        max-height: calc(100vh - 80px);
        overflow: auto;
    }

    .verify-pass {
        background: #4D7321;
    }

    .verify-notPass {
        background: #c02828;
        margin-left: 14px;
    }
</style>

