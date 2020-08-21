<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.bindId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="layoutId" slot-scope="layoutId">
                {{layoutId}}
                <a :href="'http://pc.jihui88.com/rest/site/'+layoutId+'/index'" target="_blank">[查看]</a>
            </template>
            <template slot="address" slot-scope="address">
                <span class="table-content-span-ellipsis" :title="address">
                    <a :href="'http://'+address" target="_blank">{{address}}</a>
                </span>
            </template>
            <template slot="secondDomain" slot-scope="secondDomain">
                <span class="table-content-span-ellipsis" :title="secondDomain ? secondDomain : ''">
                    {{ secondDomain ? secondDomain : '' }}
                </span>
            </template>
            <template slot="userSecondDomain" slot-scope="userSecondDomain">
                <span class="table-content-span-ellipsis" :title="userSecondDomain ? userSecondDomain : ''">
                    {{ userSecondDomain ? userSecondDomain : '' }}
                </span>
            </template>
            <template slot="country" slot-scope="country">
                <span class="table-content-span-ellipsis" :title="getCountry(country)">
                    {{ getCountry(country) }}
                </span>
            </template>
            <template slot="state" slot-scope="state">
                <span class="table-content-span-ellipsis" :title="getState(state)">
                    {{ getState(state) }}
                </span>
            </template>
            <template slot="online" slot-scope="online">
                <span class="table-content-span-ellipsis" :title="online == '00' ? '否' : '是'">
                    {{ online == '00' ? '否' : '是' }}
                </span>
            </template>
            <template slot="addTime" slot-scope="addTime">
                <span class="table-content-span-ellipsis" :title="new Date(addTime).toLocaleString()">
                    {{ new Date(addTime).toLocaleString() }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div>
                    <template>
                        <a href="javascript:;" class="block" @click="bindUnpass(record)" v-if="record.state == '01'">审核不通过</a>
                        <a href="javascript:;" class="block" @click="bindPass(record)" v-else-if="record.state == '00' || record.state == '02'">审核通过</a>
                        <a href="javascript:;" class="block" v-else>其他</a>
                    </template>
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
            dataIndex: 'layoutId',
            width: '10%',
            scopedSlots: {customRender: 'layoutId'},
        },
        {
            title: '域名网址',
            dataIndex: 'address',
            width: '10%',
            scopedSlots: {customRender: 'address'},
        },
        {
            title: '机汇网二级域名',
            dataIndex: 'secondDomain',
            width: '10%',
            scopedSlots: {customRender: 'secondDomain'},
        },
        {
            title: '客户二级域名',
            dataIndex: 'userSecondDomain',
            width: '10%',
            scopedSlots: {customRender: 'userSecondDomain'},
        },
        {
            title: '服务器',
            dataIndex: 'country',
            width: '10%',
            scopedSlots: {customRender: 'country'},
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            width: '7%',
            scopedSlots: {customRender: 'state'},
        },
        {
            title: '是否上线',
            dataIndex: 'online',
            width: '7%',
            scopedSlots: {customRender: 'online'},
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            width: '10%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '8%',
            scopedSlots: {customRender: 'operation'},
        }
    ];

    export default {
        name: 'DomainVerifyTable',
        data() {
            return {
                console: false,
                data: [],
                visible: false,
                spinning: true,
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
                let params = {pageSize: 10, page: this.pagination.current}
                if (sessionStorage.getItem("siteParams")) {
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    params = {...params, ...siteParams}
                }
                console.log(params)
                this.$api.getDomainBindList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.bindList
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
                            this.selectedNo = record.bindId
                        },
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.bindId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            bindPass(value){
                let params = {"bindId": value.bindId}
                console.log(params)
                this.$api.postDomainBindPass(params)
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
            bindUnpass(value){
                let params = {"bindId": value.bindId}
                console.log(params)
                this.$api.postDomainBindUnpass(params)
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
            getState(type){
                let state
                switch (type) {
                    case "00":
                        state = "审核中"
                        break;
                    case "01":
                        state = "审核通过"
                        break;
                    case "02":
                        state = "审核不通过"
                        break;
                    case "03":
                        state = "请求清除"
                        break;
                    default :
                        state = "其它"
                        break;
                }
                return state
            },
            getCountry(country){
                let state
                switch (country) {
                    case "cn":
                        state = "国内服务器"
                        break;
                    case "hk":
                        state = "香港服务器"
                        break;
                    case "en":
                        state = "国外服务器"
                        break;
                    default :
                        state = "其它"
                        break;
                }
                return state
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

