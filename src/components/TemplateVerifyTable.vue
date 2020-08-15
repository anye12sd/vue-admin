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
        >
            <template slot="layoutId" slot-scope="layoutId">
                {{layoutId}}
                <a :href="'http://pc.jihui88.com/rest/site/'+layoutId+'/index'" target="_blank">[浏览网站]</a>
            </template>
            <template slot="logo" slot-scope="logo, record">
                <div class="table-content-span-ellipsis table-content-img-box flex">
                    <img :src="'http://cdn.jihui88.com/' + logo" class="table-content-img" alt="" @error="show404Imgs">
                </div>
                <div class="table-content-span-edit">
                    <a @click="changeImg(record)">[上传]</a>
                </div>
            </template>
            <template slot="pic" slot-scope="pic, record">
                <div class="table-content-span-ellipsis table-content-img-box flex">
                    <img :src="'http://cdn.jihui88.com/' + pic " class="table-content-img" alt="" @error="show404Imgs">
                </div>
                <div class="table-content-span-edit">
                    <a @click="changeImg(record)">[上传]</a>
                </div>
            </template>
            <template slot="language" slot-scope="language">
                <span class="table-content-span-ellipsis" :title="language == 1 ? '中文' : '英文'">
                    {{ language == 1 ? '中文' : '英文' }}
                </span>
            </template>
            <template slot="seoTitle" slot-scope="seoTitle">
                <span :title="'seoTitle'">
                    {{ seoTitle }}
                </span>
            </template>
            <template slot="endTime" slot-scope="endTime">
                <span class="table-content-span-ellipsis" :title="new Date(endTime).toLocaleString()">
                    {{ new Date(endTime).toLocaleString() }}
                </span>
            </template>
            <template slot="price" slot-scope="price">
                <span class="table-content-span-ellipsis" :title="price ? price : '免费'">
                    {{ price ? price : '免费' }}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div>
                    <template>
                        <a href="javascript:;" class="table-content-a-inline" @click="templateOn(record)" v-if="record.copyState != 1">上架模板</a>
                        <a href="javascript:;" class="table-content-a-inline" @click="templateOff(record)" v-else>下架模板</a>
                    </template>
                    <a href="javascript:;" class="table-content-a-inline" @click="showModal(record)">设置标签</a>
                </div>
                <div>
                    <a href="javascript:;" class="table-content-a-inline" @click="showModal('endTime', record)">设置模板到期时间</a>
                </div>
            </template>
        </a-table>
        <a-modal
                :title="modalTitle"
                :visible="modalVisible"
                @cancel="cancelModal"
        >
            <div v-if="modalFlag == 'endTime'" style="text-align: center">
                <template>
                    <a-date-picker v-model="endTimeSelect" :showToday="false" placeholder="请选择到期时间"/>
                </template>
            </div>
            <div v-else>

            </div>
            <template slot="footer">
                <a-button @click="cancelModal">取消</a-button>
                <a-button type="primary" @click="readySubmit">确定</a-button>
            </template>
        </a-modal>
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
            title: '公司logo',
            dataIndex: 'logo',
            width: '10%',
            scopedSlots: {customRender: 'logo'},
        },
        {
            title: '首屏图片',
            dataIndex: 'pic',
            width: '10%',
            scopedSlots: {customRender: 'pic'},
        },
        {
            title: '语言版本',
            dataIndex: 'language',
            width: '10%',
            scopedSlots: {customRender: 'language'},
        },
        {
            title: '站点名称',
            dataIndex: 'seoTitle',
            width: '10%',
            scopedSlots: {customRender: 'seoTitle'},
        },
        {
            title: '模板价格（元）',
            dataIndex: 'price',
            width: '8%',
            scopedSlots: {customRender: 'price'},
        },
        {
            title: '到期时间',
            dataIndex: 'endTime',
            width: '8%',
            scopedSlots: {customRender: 'endTime'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '12%',
            scopedSlots: {customRender: 'operation'},
        }
    ];

    export default {
        name: 'TemplateVerifyTable',
        data() {
            return {
                console: true,
                data: [],
                visible: false,
                spinning: true,
                modalVisible: false,
                modalTitle: "",
                modalFlag: "",
                selectedNo: "",
                endTimeSelect: undefined,
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
                this.$api.getTemplateList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
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
            readySubmit() {
                if (this.modalFlag == 'label') {
                    this.submitLabelSelect()
                } else {
                    this.submitEndTime()
                }
            },
            showModal(type, value) {
                if (type == 'label') {
                    this.modalTitle = "管理案例分类"
                    this.modalFlag = type
                    this.getTagList(value.layoutId)
                } else {
                    this.modalTitle = "网站审核"
                    this.modalFlag = type
                }
                this.modalVisible = true
            },
            cancelModal() {
                this.modalVisible = false
                this.siteUsername = ""
            },
            submitEndTime() {
                console.log(new Date(this.endTimeSelect.format("YYYY-MM-DD") + " 00:00:00").getTime())
                let params = {"layoutId": this.selectedNo, "endTime": new Date(this.endTimeSelect.format("YYYY-MM-DD") + " 00:00:00").getTime()}
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
            onClose() {
                this.visible = false;
                this.show.changeDate = true
                this.show.mark = true
                this.show.paidPrice = true
                this.show.agentPrice = true
            },
            changeImg(value) {
                console.log(value)
            },
            templateOn(value){
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteTemplateOn(params)
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
            templateOff(value){
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteTemplateOff(params)
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
                event.target.src = "http://cdn.jihui88.com/upload/j/j2/jhw_xlk/picture/2020/08/14/b4527c4b-f1f6-4e63-bef2-7daf7dd64b32.png"
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
    .table-content-img-box {
        width: 100px;
        height: 100px;
    }

    .table-content-img-box.flex {
        align-items: center;
    }

    .table-content-img {
        align-items: center;
    }

</style>

