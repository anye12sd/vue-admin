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
                :sortDirections="['ascend']"
        >
            <template slot="layoutId" slot-scope="layoutId">
            <span>
                {{ layoutId }}
                <a :href="'http://pc.'+site+'/rest/site/'+layoutId+'/index'" target="_blank" :key="site">[查看]</a>
            </span>
            </template>
            <template slot="weixinNumber" slot-scope="text, record">
                <div class="change-number-box" v-if="record.editable" :key="editingKey">
                    <a-input type="text" placeholder="请输入编号" v-model="inputId"></a-input>
                    <div class="change-number-btn flex">
                        <a href="javascript:;" class="flex-1" @click="saveEdit(record.layoutId)">保存</a>
                        <a href="javascript:;" class="flex-1" @click="cancelEdit(record.layoutId)">取消</a>
                    </div>
                </div>
                <span :title="record.weixinNumber ? record.weixinNumber : ''"
                      v-if="!record.editable" :key="editingKey">
                {{ record.weixinNumber ? record.weixinNumber : '' }}
                <a href="javascript:;" class="table-content-a" @click="editList(record.layoutId)"
                   :disabled="editingKey !== ''">[编辑]</a>
            </span>
            </template>
            <template slot="payState" slot-scope="payState">
            <span class="table-content-span-ellipsis" :title=" getPayState(payState) ">
                {{ getPayState(payState) }}
            </span>
            </template>
            <template slot="logTime" slot-scope="logTime">
            <span class="table-content-span-ellipsis" :title="new Date(logTime).toLocaleString()">
                {{ new Date(logTime).toLocaleString() }}
            </span>
            </template>
            <template slot="endTime" slot-scope="endTime">
            <span class="table-content-span-ellipsis" :title="new Date(endTime).toLocaleString()">
                {{ endTime.replaceAll('-', '/') }}
            </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="loginTojihui(record)">免密登录</a>
            </template>
            <!--<template slot="operation" slot-scope="text, record">-->
            <!--<a href="javascript:;" class="table-content-a">查看</a>-->
            <!--<a-popconfirm-->
            <!--v-if="data.length"-->
            <!--title="Sure to delete?"-->
            <!--@confirm="() => onDelete(record.layoutId)"-->
            <!--&gt;-->
            <!--<a href="javascript:;" class="table-content-a">删除</a>-->
            <!--</a-popconfirm>-->
            <!--</template>-->
        </a-table>
        <a target="_blank" :href="'https://pc.jihui88.com/pc/design.html?layoutId=' + this.toLayoutId + '&token=' + this.token" id="loginTag"></a>
    </div>
</template>
<script>

    const columns = [
        {
            title: '站点编号',
            dataIndex: 'layoutId',
            width: '10%',
            scopedSlots: {customRender: 'layoutId'},
        },
        {
            title: '微信群编号',
            dataIndex: 'weixinNumber',
            width: '15%',
            scopedSlots: {customRender: 'weixinNumber'},
        },
        {
            title: '是否付费',
            dataIndex: 'payState',
            width: '15%',
            scopedSlots: {customRender: 'payState'},
        },
        {
            title: '最近操作时间',
            dataIndex: 'logTime',
            width: '20%',
            scopedSlots: {customRender: 'logTime'},
        },
        {
            title: '到期时间',
            dataIndex: 'endTime',
            width: '15%',
            scopedSlots: {customRender: 'endTime'},
            sorter: true
        },
        {
            title: '原始注册手机号码',
            dataIndex: 'registerCellphone',
            width: '15%',
            scopedSlots: {customRender: 'registerCellphone'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
        }
    ];

    export default {
        name: 'SiteListTable',
        props: ["toChildPage"],
        data() {
            return {
                console: false,
                data: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                editingKey: "",
                inputId: "",
                site: "",
                sorter: "",
                toLayoutId: "",
                token: ""
            };
        },
        mounted() {
            this.pagination.current = this.toChildPage
            this.fetch();
        },
        methods: {
            handleTableChange(pagination, filters, sorter) {
                this.sorter = sorter.order
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
                let params = {
                    pageSize: 10,
                    page: this.pagination.current,
                    domain: "",
                    payType: "00",
                    weixinNumber: ""
                }
                if(this.sorter == "ascend"){
                    params.sortType = 'asc'
                    params.sortField = 'end_time'
                }else if(this.sorter == "descend"){
                    params.sortType = 'desc'
                    params.sortField = 'end_time'
                }else{
                    console.log(23)
                }
                if (sessionStorage.getItem("siteParams")) {
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    // params.domain = siteParams.domain || "ykyh.com"
                    // params.payType = siteParams.payType || "00"
                    // params.weixinNumber = siteParams.weixinNumber
                    params = {...params, ...siteParams}
                    this.site = params.domain
                }
                this.console && console.log('params:', params);
                this.loading = true;
                this.$api.getSiteList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.layoutList
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
                            this.selectedNo = record.layoutId
                        }
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
            getPayState(type) {
                var payState
                switch (type) {
                    case "00":
                        payState = "否";
                        break;
                    case "01":
                        payState = "是"
                        break;
                    default:
                        payState = "其它"
                        break;
                }
                return payState
            },
            editList(key) {
                const data = [...this.data]
                // this.showEditBox = true
                const target = data.filter(item => key === item.layoutId)[0];
                console.log(data)
                this.editingKey = key;
                if (target) {
                    target.editable = true;
                    this.inputId = target.weixinNumber || ""
                }
            },
            cancelEdit(key) {
                const data = [...this.data]
                // this.showEditBox = true
                const target = data.filter(item => key === item.layoutId)[0];
                if (target) {
                    delete target.editable;
                    this.inputId = ""
                }
                this.editingKey = "";
            },
            saveEdit(key) {
                const data = [...this.data]
                // this.showEditBox = true
                const target = data.filter(item => key === item.layoutId)[0];
                this.editingKey = "";
                if (target) {
                    let params = {"layoutId": target.layoutId, "weixinNumber": this.inputId}
                    this.console && console.log(params)
                    this.$api.editWeixinNumber(params)
                        .then((data) => {
                            this.console && console.log(data)
                            if (data.data.code == 0 && data.data.msg == "success") {
                                this.$message.success("编辑成功")
                                this.$emit('refresh', new Date().getTime())
                            } else {
                                this.$message.error(data.data.msg)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    delete target.editable;
                }
            },
            loginTojihui(key) {
                let params = {layoutId: key.layoutId}
                this.$api.postLoginToJihui(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.toLayoutId = key.layoutId
                            this.token = data.data.data.token
                            this.$message.success('操作成功，即将跳转')
                            setTimeout(function(){
                                document.getElementById('loginTag').click()
                            },1000)
                            console.log(data)
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

