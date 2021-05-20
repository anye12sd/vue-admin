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
                :scroll="{ x: 1500}"
        >
            <template slot="layoutId" slot-scope="layoutId">
                <span>
                    {{layoutId}}
                </span>
                <a :href="'http://pc.jihui88.com/rest/site/'+layoutId+'/index'" target="_blank">[查看]</a>
            </template>
            <template slot="seoTitle" slot-scope="seoTitle">
                <span class="table-content-span-ellipsis" :title="seoTitle">
                    {{seoTitle}}
                </span>
            </template>
            <template slot="name" slot-scope="name">
                <span class="table-content-span-ellipsis" :title="name">
                    {{name}}
                </span>
            </template>
            <template slot="language" slot-scope="language">
                <span class="table-content-span-ellipsis">
                    {{ getLanguage(language) }}
                </span>
            </template>
            <template slot="url" slot-scope="url">
                <span class="table-content-span-ellipsis" :title="url">
                    <a :href="'http://' + url" target="_blank">{{url}}</a>
                </span>
            </template>
            <template slot="country" slot-scope="country">
                <span class="table-content-span-ellipsis" :title="country">
                    {{getCountry(country)}}
                </span>
            </template>
            <template slot="onLine" slot-scope="onLine">
                <span class="table-content-span-ellipsis">
                    {{ onLine ? '是' : '否' }}
                </span>
            </template>
            <template slot="state" slot-scope="state">
                <span class="table-content-span-ellipsis" :title="getState(state)">
                    {{ getState(state) }}
                </span>
            </template>
            <template slot="endTime" slot-scope="endTime">
                <span class="table-content-span-ellipsis" :title="new Date(endTime).toLocaleString()">
                    {{ new Date(endTime).toLocaleString() }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div>
                    <a href="javascript:;" class="table-content-a-inline" @click="showModal(record)">审核（到期时间）</a>
                </div>
            </template>
        </a-table>
        <a-modal
                title="审核到期时间"
                :visible="modalVisible"
                @cancel="cancelModal"
        >
            <div style="text-align: center">
                <a-date-picker v-model="endTimeSelect" :showToday="false" placeholder="请选择到期时间"/>
            </div>
            <template slot="footer">
                <a-button @click="cancelModal">取消</a-button>
                <a-button type="primary" @click="submitEndTime">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script>
    const columns = [
        {
            title: '网站编号',
            dataIndex: 'layoutId',
            scopedSlots: {customRender: 'layoutId'},
        },
        {
            title: '站点名称',
            dataIndex: 'seoTitle',
            width: '150px',
            scopedSlots: {customRender: 'seoTitle'},
        },
        {
            title: '公司名称',
            dataIndex: 'name',
            width: '150px',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '语言版本',
            dataIndex: 'language',
            width: '150px',
            scopedSlots: {customRender: 'language'},
        },
        {
            title: '域名网址',
            dataIndex: 'url',
            width: '150px',
            scopedSlots: {customRender: 'url'},
        },
        {
            title: '到期时间',
            dataIndex: 'endTime',
            width: '180px',
            scopedSlots: {customRender: 'endTime'},
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            width: '150px',
            scopedSlots: {customRender: 'state'},
        },
        {
            title: '备案服务器',
            dataIndex: 'country',
            width: '110px',
            scopedSlots: {customRender: 'country'},
        },
        {
            title: '是否上线',
            dataIndex: 'onLine',
            width: '150px',
            scopedSlots: {customRender: 'onLine'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '180px',
            scopedSlots: {customRender: 'operation'},
            fixed: 'right',
        }
    ];

    export default {
        name: 'SiteDeadlineVerifyTable',
        props: ["toChildPage"],
        data() {
            return {
                console: false,
                data: [],
                visible: false,
                spinning: true,
                sort: undefined,
                selectedNo: "",
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                endTimeSelect: undefined,
                modalVisible: false
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
                this.$api.getAuditList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.layoutList
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
                            this.selectedNo = record.layoutId
                        },
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
            onClose() {
                this.visible = false;
                this.show.changeDate = true
                this.show.mark = true
                this.show.paidPrice = true
                this.show.agentPrice = true
            },
            showModal(){
                this.modalVisible = true
            },
            cancelModal() {
                this.modalVisible = false
            },
            submitEndTime() {
                let params = {"layoutId": this.selectedNo, "endTime": new Date(this.endTimeSelect.format("YYYY/MM/DD") + " 00:00:00").getTime()}
                this.$api.postEndTimeEdit(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("修改成功")
                            this.cancelModal()
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getState(type) {
                let state
                switch (type) {
                    case "0":
                        state = "未审核"
                        break;
                    case "1":
                        state = "已审核"
                        break;
                    case "2":
                        state = "已过期"
                        break;
                    case "3":
                        state = "已删除"
                        break;
                    case "4":
                        state = "已关闭"
                        break;
                    default:
                        state = "其它"
                }
                return state
            },
            getCountry(type){
                let state
                switch (type) {
                    case "cn":
                        state = "阿里云服务器"
                        break
                    case "hk":
                        state = "香港服务器"
                        break
                    case "en":
                        state = "国外服务器"
                        break
                    default:
                        state = "手动绑定"
                }
                return state
            },
            getLanguage(type){
                let state
                switch (type) {
                    case "1":
                        state = "中文"
                        break;
                    case "2":
                        state = "英语"
                        break;
                    case "3":
                        state = "日语"
                        break;
                    case "4":
                        state = "韩语"
                        break;
                    case "5":
                        state = "德语"
                        break;
                    case "6":
                        state = "法语"
                        break;
                    case "7":
                        state = "西班牙语"
                        break;
                    case "8":
                        state = "俄语"
                        break;
                    case "9":
                        state = "阿拉伯语"
                        break;
                    case "10":
                        state = "葡萄牙语"
                        break;
                    case "11":
                        state = "荷兰语"
                        break;
                    default:
                        state = "其它"
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

