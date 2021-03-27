<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.productId"
                :data-source="list"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="productId" slot-scope="productId">
                <span>
                    {{ productId}}
                    <a :href="'http://pc.jihui88.com/rest/site/'+productId+'/index'" target="_blank">[查看]</a>
                </span>
            </template>
            <template slot="agentName" slot-scope="agentName, record">
                <span>
                    {{ agentName }}
                    <a-button @click="showDrawer(record)" type="link" style="padding: 0" v-if="agentName">[查看]</a-button>
                </span>
            </template>
            <template slot="bindUrl" slot-scope="bindUrl">
                <span>
                    <a :href="'http://' + bindUrl" target="_blank">{{bindUrl}}</a>
                </span>
            </template>
            <template slot="addTime" slot-scope="addTime">
                <span class="table-content-span-ellipsis">
                    {{ addTime == null ? "未付款" : new Date(addTime).toLocaleString() }}
                </span>
            </template>
            <template slot="endTime" slot-scope="endTime">
                <span class="table-content-span-ellipsis">
                    {{ new Date(endTime).toLocaleString() }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="charge(record, 'charge')">充值</a>
                <a-divider type="vertical"></a-divider>
                <a href="javascript:;" @click="setAgent(record, 'setAgent')">查看</a>
            </template>
        </a-table>
<!--        <a-modal-->
<!--                title="查看代理商"-->
<!--                :visible="modalVisible"-->
<!--                @cancel="cancelModal"-->
<!--        >-->
<!--            <div v-if="modalFlag == 'charge'">-->
<!--                <a-input-number placeholder="请输入充值金额" v-model="chargeAmount" style="width: 100%" :min="0"/>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--                <a-spin :spinning="spinning">-->
<!--                    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--                        <a-form-model-item label="站点价格" prop="layoutPrice">-->
<!--                            <a-input-number placeholder="（默认300元）" v-model="layoutPrice" style="width: 100%"/>-->
<!--                        </a-form-model-item>-->
<!--                        <a-form-model-item label="C2B2C分销商城小程序价格" prop="layoutPrice">-->
<!--                            <a-input-number placeholder="（默认600元）" v-model="distributionWxappPrice" style="width: 100%"/>-->
<!--                        </a-form-model-item>-->
<!--                        <a-form-model-item label="智能拓客小程序价格" prop="smartTalkWxappPrice">-->
<!--                            <a-input-number placeholder="（默认600元）" v-model="smartTalkWxappPrice" style="width: 100%"/>-->
<!--                        </a-form-model-item>-->
<!--                    </a-form-model>-->
<!--                </a-spin>-->
<!--            </div>-->
<!--            <template slot="footer">-->
<!--&lt;!&ndash;                <a-button @click="cancelModal">取消</a-button>&ndash;&gt;-->
<!--                <a-button type="primary" @click="readySubmit">确定</a-button>-->
<!--            </template>-->
<!--        </a-modal>-->
        <a-drawer width="440" class="drawer-content" placement="right" :closable="true" :visible="visible"
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
            title: '站点',
            dataIndex: 'productId',
            width: '10%',
            scopedSlots: {customRender: 'productId'},
        },
        {
            title: '帐号',
            dataIndex: 'username',
            width: '10%',
            scopedSlots: {customRender: 'username'},
        },
        {
            title: '客户名称',
            dataIndex: 'entName',
            width: '15%',
            scopedSlots: {customRender: 'entName'},
        },
        {
            title: '最新付款时间',
            dataIndex: 'addTime',
            width: '15%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '到期时间',
            dataIndex: 'endTime',
            width: '15%',
            scopedSlots: {customRender: 'endTime'},
        },
        {
            title: '域名',
            dataIndex: 'bindUrl',
            width: '15%',
            scopedSlots: {customRender: 'bindUrl'},
        },
        {
            title: '代理商',
            dataIndex: 'agentName',
            width: '15%',
            scopedSlots: {customRender: 'agentName'},
        },
    ];

    export default {
        name: 'AgentLayoutListTable',
        props: ["toChildPage"],
        data() {
            return {
                console: false,
                labelCol: {span: 10},
                wrapperCol: {span: 14},
                visible: false,
                spinning: true,
                adminData: [],
                drawerContent: {},
                list: [],
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
                    if (!siteParams.startDate || !siteParams.endDate) {
                        delete siteParams.startDate
                        delete siteParams.endDate
                    }
                }
                this.console && console.log('params:', params);
                this.loading = true;
                this.$api.getAgentLayoutList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            if(!this.adminData.length){
                                this.adminData = data.data.data.adminList
                                this.$emit('adminData', data.data.data.adminList)
                            }
                            this.list = data.data.data.list
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
                            this.selectedNo = record.productId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.productId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            cancelModal() {
                this.modalVisible = false
                this.siteUsername = ""
                this.siteAdmin = ""
            },
            checkAgent(){
                this.modalVisible = true
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
                let params = {layoutId: value.adminId}
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
                this.modalVisible = false
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
            }
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }
</style>
