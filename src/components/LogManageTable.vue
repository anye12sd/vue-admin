<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.logId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="addTime" slot-scope="addTime">
      <span class="table-content-span-ellipsis" :title="new Date(addTime).toLocaleString()">
        {{ new Date(addTime).toLocaleString() }}
      </span>
            </template>
            <template slot="ldesc" slot-scope="ldesc">
      <span class="table-content-span-ellipsis" :title="ldesc">
        {{ ldesc }}
      </span>
            </template>
            <template slot="UA">
      <span class="table-content-span-ellipsis" :title="'chrome'">
        {{ 'chrome' }}
      </span>
            </template>
            <template slot="type" slot-scope="type">
      <span class="table-content-span-ellipsis">
        {{ getType(type) }}
      </span>
            </template>
            <template slot="ip" slot-scope="ip">
      <span class="table-content-span-ellipsis" :title="ip">
        {{ ip }}
      </span>
            </template>
            <template slot="location" slot-scope="location">
      <span class="table-content-span-ellipsis" :title="location">
        {{ location }}
      </span>
            </template>
            <template slot="domain" slot-scope="domain">
      <span class="table-content-span-ellipsis" :title="domain">
        {{ domain }}
      </span>
            </template>
            <template slot="agent" slot-scope="agent">
      <span class="table-content-span-ellipsis" :title="agent">
        {{ agent }}
      </span>
            </template>
        </a-table>
    </div>
</template>
<script>
    const columns = [
        {
            title: '企业帐号',
            dataIndex: 'entUsername',
            width: '8%',
            scopedSlots: {customRender: 'entUsername'},
        },
        {
            title: '操作者帐号',
            dataIndex: 'operateUsername',
            width: '8%',
            scopedSlots: {customRender: 'operateUsername'},
        },
        {
            title: '功能模块',
            dataIndex: 'name',
            width: '10%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: '8%',
            scopedSlots: {customRender: 'type'},
        },
        {
            title: '描述',
            dataIndex: 'ldesc',
            width: '15%',
            scopedSlots: {customRender: 'ldesc'},
        },
        {
            title: '时间',
            dataIndex: 'addTime',
            width: '10%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            width: '10%',
            scopedSlots: {customRender: 'ip'},
        },
        {
            title: '地区',
            dataIndex: 'location',
            width: '10%',
            scopedSlots: {customRender: 'location'},
        },
        {
            title: '应用',
            dataIndex: 'domain',
            width: '10%',
            scopedSlots: {customRender: 'domain'},
        },
        {
            title: '浏览器',
            dataIndex: 'agent',
            width: '10%',
            scopedSlots: {customRender: 'agent'},
        }
    ];

    export default {
        name: 'LogManageTable',
        prop: ['site'],
        data() {
            return {
                console: false,
                data: [],
                pagination: {page: 1, current: 1},
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
                let params = {pageSize: 10, page:this.pagination.current}
                if(sessionStorage.getItem("siteParams")){
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    // 如果开始时间结束时间为空则删除这两个属性否则后台会报错
                    if(!siteParams.frontTime || !siteParams.backTime){
                        delete siteParams.frontTime
                        delete siteParams.backTime
                    }
                    params = {...params,...siteParams}
                }
                console.log(params)
                this.loading = true
                this.$api.getAdminLogList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.logList
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
                            this.selectedNo = record.logId
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
                if (key.logId === this.selectedNo) {
                    styleClassName = "selected-tr"
                    this.console && console.log(key)
                }
                return styleClassName
            },
            onClose() {
                this.visible = false;
            },
            getType(type){
                var operationType
                switch (type) {
                    case "01":
                        operationType = "添加"
                        break;
                    case "02":
                        operationType = "修改"
                        break;
                    case "03":
                        operationType = "删除"
                        break;
                    case "04":
                        operationType = "登录"
                        break;
                    case "05":
                        operationType = "登出"
                        break;
                    case "07":
                        operationType = "新闻"
                        break;
                    case "08":
                        operationType = "PC端员工账号登录"
                        break;
                    case "09":
                        operationType = "手机端员工账号登录"
                        break;
                    default:
                        operationType = "其它"
                        break;
                }
                return operationType
            }
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

