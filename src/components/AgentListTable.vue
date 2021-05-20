<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.adminId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="cellphone" slot-scope="cellphone">
                <span class="table-content-span-ellipsis" :title="cellphone">
                    {{ cellphone }}
                </span>
            </template>
            <template slot="gender" slot-scope="gender">
                <span class="table-content-span-ellipsis">
                    {{ gender == "01" ? "女" : "男" }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" style="display: block" @click="charge(record, 'charge')">充值</a>
                <a href="javascript:;" style="display: block" @click="setAgent(record, 'setAgent')">查看</a>
                <a href="javascript:;" style="display: block" @click="loginAdmin(record, 'loginAdmin')">登录代理后台</a>
            </template>
        </a-table>
        <a-modal
                :title="modalTitle"
                :visible="modalVisible"
                @cancel="cancelModal"
        >
            <div v-if="modalFlag == 'charge'">
                <a-input-number placeholder="请输入充值金额" v-model="chargeAmount" style="width: 100%" :min="0"/>
            </div>
            <div v-else>
                <a-spin :spinning="spinning">
                    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-model-item label="站点价格" prop="layoutPrice">
                            <a-input-number placeholder="（默认300元）" v-model="layoutPrice" style="width: 100%"/>
                        </a-form-model-item>
                        <a-form-model-item label="C2B2C分销商城小程序价格" prop="layoutPrice">
                            <a-input-number placeholder="（默认600元）" v-model="distributionWxappPrice" style="width: 100%"/>
                        </a-form-model-item>
                        <a-form-model-item label="智能拓客小程序价格" prop="smartTalkWxappPrice">
                            <a-input-number placeholder="（默认600元）" v-model="smartTalkWxappPrice" style="width: 100%"/>
                        </a-form-model-item>
                    </a-form-model>
                </a-spin>
            </div>
            <template slot="footer">
                <a-button @click="cancelModal">取消</a-button>
                <a-button type="primary" @click="readySubmit">{{modalFlag == 'charge' ? '充值' : '提交'}}</a-button>
            </template>
        </a-modal>
        <a href="https://i.jihui88.com/agent_v4/index.html" id="target_a" target="_blank" style="display: none">3455</a>
    </div>
</template>
<script>

    const columns = [
        {
            title: '代理商',
            dataIndex: 'entName',
            width: '20%',
            scopedSlots: {customRender: 'entName'},
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width: '15%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '代理商账号',
            dataIndex: 'username',
            width: '15%',
            scopedSlots: {customRender: 'username'},
        },
        {
            title: '手机号',
            dataIndex: 'cellphone',
            width: '15%',
            scopedSlots: {customRender: 'cellphone'},
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: '15%',
            scopedSlots: {customRender: 'gender'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: 'AgentListTable',
        props: ["toChildPage"],
        data() {
            return {
                console: false,
                labelCol: {span: 10},
                wrapperCol: {span: 14},
                visible: false,
                spinning: true,
                data: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selected: {},
                selectedNo: "",
                modalTitle: "",
                modalVisible: false,
                modalFlag: "",
                chargeAmount: "",
                distributionWxappPrice: "",
                layoutPrice: "",
                smartTalkWxappPrice: "",
                configId: ""
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
                    params = {...params, ...siteParams}
                }
                this.console && console.log('params:', params);
                this.loading = true;
                this.$api.getAgentDetailList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.adminList
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
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.adminId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.adminId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            cancelModal() {
                this.modalVisible = false
                this.siteUsername = ""
                this.siteAdmin = ""
            },
            charge(value, type){
                this.selected = value
                this.modalFlag = type;
                this.modalVisible = true
                this.modalTitle = "代理商充值"
            },
            setAgent(value, type){
                this.spinning = true
                this.selected = value
                this.modalFlag = type;
                this.modalVisible = true
                this.modalTitle = "代理商设置"
                let params = {adminId: value.adminId}
                this.$api.getAgentConfigDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.spinning = false
                            this.layoutPrice = data.data.data.layoutPrice
                            this.distributionWxappPrice = data.data.data.distributionWxappPrice
                            this.smartTalkWxappPrice = data.data.data.smartTalkWxappPrice
                            this.configId = data.data.data.configId
                        } else {
                            this.visibility = false
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            readySubmit(){
                this.modalFlag == 'charge' ? this.agentCharge() : this.agentSet()
            },
            agentCharge(){
                if(!this.chargeAmount){
                    this.$message.error("请输入充值金额")
                    return false
                }
                let params = {rechargeAmount: this.chargeAmount, username: this.selected.username}
                this.$api.postAgentCharge(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.modalVisible = false
                            this.chargeAmount = ""
                            this.$message.success("充值成功")
                        } else {
                            this.visibility = false
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            agentSet(){
                let params = {configId: this.configId, layoutPrice: this.layoutPrice, distributionWxappPrice: this.distributionWxappPrice, smartTalkWxappPrice: this.smartTalkWxappPrice}
                this.$api.postAgentConfigEdit(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.modalVisible = false
                            this.layoutPrice = ""
                            this.distributionWxappPrice = ""
                            this.smartTalkWxappPrice = ""
                            this.$message.success("修改成功")
                        } else {
                            this.visibility = false
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            loginAdmin(record){
                let params = {adminId: record.adminId}
                this.$api.getAgentLogin(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            // window.open('https://i.jihui88.com/agent_v4/index.html', '_blank');
                            document.getElementById('target_a').click()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }
</style>
