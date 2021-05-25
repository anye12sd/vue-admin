<!--未完成页面-->
<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.moduleId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="pic" slot-scope="pic">
                <a-tooltip placement="right" overlayClassName="toolTip-box">
                    <template slot="title">
                        <img :src="'http://cdn.jihui88.com/' + pic" alt="" style="width: 100%;" @error="show404Imgs">
                    </template>
                    <span class="table-content-span-ellipsis">
                        <img :src="'http://cdn.jihui88.com/' + pic" alt="" style="height: 19px;" @error="show404Imgs">
                    </span>
                    <a-button v-show="false">Right</a-button>
                </a-tooltip>
            </template>
            <template slot="type" slot-scope="type">
                <span class="table-content-span-ellipsis" :title="type">
                    {{type}}
                </span>
            </template>
            <template slot="name" slot-scope="name">
                <span class="table-content-span-ellipsis" :title="name">
                    {{ name }}
                </span>
            </template>
            <template slot="price" slot-scope="price">
                <span class="table-content-span-ellipsis">
                    {{  price ? price : "免费" }}
                </span>
            </template>
            <template slot="id" slot-scope="id">
                <span class="table-content-span-ellipsis" :title="id.name">
                    {{ id.name }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div>
                    <template>
                        <a href="javascript:;" class="block" @click="mon(record)" v-if="record.kind != 'c'">上架模块</a>
                        <a href="javascript:;" class="block colorRed" @click="modulf(record)" v-else>下架模块</a>
                    </template>
                </div>
                <div>
                    <a href="javascript:;" class="block" @click="modu(record)">查看</a>
                    <a href="javascript:;" class="block" @click="modle(record)">语言设置</a>
                    <a href="javascript:;" class="block" @click="moduleO(record)">权限管理</a>
                </div>
            </template>
        </a-table>
        <a-modal
                :title="modalTitle"
                :visible="modalVisible"
                @cancel="cancelModal"
        >
            <div>
                <a-input-number placeholder="请输入模块编号，如NavHead1" v-model="moduleName" style="width: 100%" :min="0"/>
                <a-button type="primary" @click="readySubmit">{{modalFlag == 'charge' ? '充值' : '提交'}}</a-button>
            </div>
            <template slot="footer">
                <a-button @click="cancelModal">关闭</a-button>
            </template>
        </a-modal>
    </div>
</template>
<!--未完成页面--><!--未完成页面--><!--未完成页面--><!--未完成页面-->
<script>
    const columns = [
        {
            title: '模块缩略图',
            dataIndex: 'pic',
            width: '10%',
            scopedSlots: {customRender: 'pic'},
        },
        {
            title: '模块编号',
            dataIndex: 'type',
            width: '10%',
            scopedSlots: {customRender: 'type'},
        },
        {
            title: '模块价格',
            dataIndex: 'name',
            width: '10%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '被调用次数',
            dataIndex: 'price',
            width: '10%',
            scopedSlots: {customRender: 'price'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '12%',
            scopedSlots: {customRender: 'operation'},
        }
    ];

    export default {
        name: 'TemplateManageV4Table',
        data() {
            return {
                console: false,
                modalTitle: '查询模块作者',
                modalVisible: false,
                moduleName: '',
                data: [],
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
                this.$api.getModuleVerifyV4List(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.moduleList
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
                            this.selectedNo = record.moduleId
                        },
                    }
                }
            },
            cancelModal(){
                this.modalVisible = false
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.moduleId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            changeImg(value) {
                console.log(value)
            },
            moduleOn(value){
                let params = {"moduleId": value.moduleId}
                this.$api.postSiteModuleOn(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("修改成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            moduleOff(value){
                let params = {"moduleId": value.moduleId}
                this.$api.postSiteModuleOff(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("修改成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            show404Imgs(event) {
                event.target.src = "http://pc.jihui88.com/pc/images/nopic.png?v=002"
            },
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

    .colorOrange{
        color: #faad14;
    }

    .colorRed{
        color: #f5222d;
    }
</style>

