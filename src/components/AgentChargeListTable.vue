<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.accountId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="outTradeNo" slot-scope="outTradeNo">
                <span :title="outTradeNo">
                    {{ outTradeNo ? outTradeNo : "系统后台充值" }}
                </span>
            </template>
            <template slot="recvUser" slot-scope="recvUser">
                <span class="table-content-span-ellipsis" :title="recvUser">
                    {{ recvUser }}
                </span>
            </template>
            <template slot="addTime" slot-scope="addTime">
                <span :title="new Date(addTime).toLocaleString()">
                    {{ new Date(addTime).toLocaleString() }}
                </span>
            </template>
        </a-table>
    </div>
</template>
<script>

    const columns = [
        {
            title: '充值订单号',
            dataIndex: 'outTradeNo',
            width: '10%',
            scopedSlots: {customRender: 'outTradeNo'},
        },
        {
            title: '代理商账号',
            dataIndex: 'agentUsername',
            width: '15%',
            scopedSlots: {customRender: 'agentUsername'},
        },
        {
            title: '代理商姓名',
            dataIndex: 'agentName',
            width: '15%',
            scopedSlots: {customRender: 'agentName'},
        },
        {
            title: '代理商公司名称',
            dataIndex: 'agentEntName',
            width: '15%',
            scopedSlots: {customRender: 'agentEntName'},
        },
        {
            title: '充值金额',
            dataIndex: 'rechargeAmount',
            width: '15%',
            scopedSlots: {customRender: 'rechargeAmount'},
        },
        {
            title: '入账金额',
            dataIndex: 'income',
            width: '15%',
            scopedSlots: {customRender: 'income'},
        },
        {
            title: '充值时间',
            dataIndex: 'addTime',
            width: '15%',
            scopedSlots: {customRender: 'addTime'},
        },
    ];

    export default {
        name: 'AgentChargeListTable',
        props: ["toChildPage"],
        data() {
            return {
                console: false,
                visible: false,
                data: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                drawerContent: {"recvEnt": "", "recvUser": "", "content": "", "addTime": ""}
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
                let params = {pageSize: 10, page: this.pagination.current}
                if (sessionStorage.getItem("siteParams")) {
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    // 如果开始时间结束时间为空则删除这两个属性否则后台会报错
                    if (!siteParams.startDate || !siteParams.endDate) {
                        delete siteParams.startDate
                        delete siteParams.endDate
                    }
                    params = {...params, ...siteParams}
                }
                console.log('params:', params);
                this.loading = true;
                this.$api.getAgentChargeList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.list
                            this.pagination = pagination
                            this.console && console.log(data)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            onDelete(key) {
                const data = [...this.data];
                this.console && console.log(data, key)
                // this.data = data.filter(item => item.id.value !== key);
            },
            showDrawer(value) {
                this.visible = true;
                this.drawerContent = value
            },
            onClose() {
                this.visible = false;
            },
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.accountId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.accountId === this.selectedNo) {
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
