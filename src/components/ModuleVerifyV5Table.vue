<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.materialId"
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
            <template slot="addTime" slot-scope="addTime">
                <span class="table-content-span-ellipsis" :title="new Date(addTime).toLocaleString()">
                    {{ new Date(addTime).toLocaleString() }}
                </span>
            </template>
            <template slot="parentId" slot-scope="parentId">
                <span class="table-content-span-ellipsis" :title="parentIdAll[parentId] || ''">
                    {{ parentIdAll[parentId] || '' }}
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
                        <a href="javascript:;" class="table-content-a-inline" @click="moduleOn(record)" v-if="record.kind != 'c'">上架模块</a>
                        <a href="javascript:;" class="table-content-a-inline colorRed" @click="moduleOff(record)" v-else>下架模块</a>
                    </template>
                </div>
            </template>
        </a-table>
        <a-modal v-model="visible" title="选择分类" @ok="submitEdit" okText="确定"
                 :wrapClassName="'label-manage-modal'">
<!--            modal底部的cancel按钮被css隐藏了，翻到最底下的style可修改，不要再slot上浪费时间了-->
            <div>
                <a-input v-model="filterText" @change="inputChange" placeholder="可输入模块名称筛选" style="width: 200px"></a-input>
                <a-table :data-source="categoryDataFilter" :columns="categoryColumns" @change="handleTableChange" :loading="loading"
                         :pagination="false" :row-key="record => record.moduleId" :customRow="clickRow"
                >
<!--                    <template slot="pic" slot-scope="pic">-->
<!--                        <a-tooltip placement="right" overlayClassName="toolTip-box">-->
<!--                            <template slot="title">-->
<!--                                <img :src="'http://cdn.jihui88.com' + pic" alt="" style="width: 100%;" @error="show404Imgs">-->
<!--                            </template>-->
<!--                            <span class="table-content-span-ellipsis">-->
<!--                                <img :src="'http://cdn.jihui88.com' + pic" alt="" style="height: 19px;" @error="show404Imgs">-->
<!--                            </span>-->
<!--                            <a-button v-show="false">Right</a-button>-->
<!--                        </a-tooltip>-->
<!--                    </template>-->
                    <template slot="kind">
                        <span>已上架</span>
                    </template>
                    <template slot="operate" slot-scope="text, record">
                        <a-popconfirm
                                v-if="data.length"
                                title="确认上架至该分类下吗？"
                                okText="确定" cancelText="取消"
                                @confirm="() => tagOn(record)"
                        >
                            <a href="javascript:;" class="table-content-a">选中</a>
                        </a-popconfirm>
                    </template>
                </a-table>
            </div>
        </a-modal>
    </div>
</template>
<script>
    const columns = [
        {
            title: '模块缩略图',
            dataIndex: 'pic',
            width: '10%',
            scopedSlots: {customRender: 'pic'},
        },
        {
            title: '模块名称',
            dataIndex: 'name',
            width: '10%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '创建时间',
            dataIndex: 'addTime',
            width: '10%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '模块价格（元）',
            dataIndex: 'price',
            width: '10%',
            scopedSlots: {customRender: 'price'},
        },
        {
            title: '模块分类名称',
            dataIndex: 'parentId',
            width: '10%',
            scopedSlots: {customRender: 'parentId'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '12%',
            scopedSlots: {customRender: 'operation'},
        }
    ];
    const categoryColumns = [
        // {
        //     title: '模块略缩图',
        //     dataIndex: 'pic',
        //     scopedSlots: {customRender: 'pic'},
        // },
        {
            title: '模块名称',
            dataIndex: 'name',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '状态',
            dataIndex: 'kind',
            scopedSlots: {customRender: 'kind'},
        },
        {
            title: '操作',
            dataIndex: 'operate',
            scopedSlots: {customRender: 'operate'},
        },
    ]

    export default {
        name: 'ModuleVerifyV5Table',
        props: ["toChildPage"],
        data() {
            return {
                console: true,
                data: [],
                selectedNo: "",
                pagination: {page: 1, current: 1},
                loading: false,
                visible: false,
                materialId: "",
                materialName: "",
                filterText: "",
                categoryDataFilter: [],
                columns,
                categoryColumns,
                categoryData: [],
                parentIdAll: {}
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
                if (sessionStorage.getItem("siteParamsV5")) {
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParamsV5"))
                    params = {...params, ...siteParams}
                }
                console.log(params)
                this.$api.getModuleVerifyV5List(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            this.categoryData = data.data.data.rootList
                            // 将所有的模块分类父级做成对象方便遍历
                            // this.getParentIdAll(data.data.data.rootList)
                            // this.categoryDataFilter = data.data.data.rootList
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
                            this.selectedNo = record.materialId
                        },
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.materialId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            changeImg(value) {
                console.log(value)
            },
            moduleOn(value){
                this.visible = true
                this.materialId = value.materialId
                this.materialName = value.name
                this.getCategoryDataFilter()
            },
            getCategoryDataFilter(){
                this.spinning = true
                if(this.categoryDataFilter.length){
                    return -1
                }
                this.$api.getModuleCategoryList()
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.categoryDataFilter = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            tagOn(value){
                let params = {"parentId": value.moduleId, "materialId": this.materialId, "name": this.materialName}
                this.$api.postSiteModuleOnV5(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("上架成功")
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
                let params = {"materialId": value.materialId}
                this.$api.postSiteModuleOffV5(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("下架成功")
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
            submitEdit(){
                this.visible = false
            },
            inputChange(){
                this.categoryDataFilter = this.categoryData.filter(item => item.name.indexOf(this.filterText) > -1);
            },
            getParentIdAll(list){
                let parentIdAll = {}
                for( var i = 0; i < list.length; i++){
                    parentIdAll[list[i].moduleId] = list[i].name
                }
                this.parentIdAll = parentIdAll
                this.$emit("parentIdAll", parentIdAll)
                // 传给父级一个parentIdAll顶部筛选框要用
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

    .colorRed{
        color: #f5222d;
    }

    /deep/ .label-manage-modal .ant-modal-footer .ant-btn:nth-child(1){
        display: none;
    }
</style>

