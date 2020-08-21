<template>
    <div class="page-header-index-wide">
        <a-card :bordered="false">
            <a-button @click="showModal(null,'new')">添加标签</a-button>
            <a-table
                    class="module-table-content"
                    :columns="columns"
                    :row-key="record => record.tagId"
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
                <template slot="operation" slot-scope="text, record, index">
                    <a href="javascript:;" class="table-content-a" @click="showModal(record,'edit')">编辑</a>
                    <a-divider type="vertical"></a-divider>
                    <a href="javascript:;" class="table-content-a" @click="toUp(record, index)">上移</a>
                    <a-divider type="vertical"></a-divider>
                    <a href="javascript:;" class="table-content-a" @click="toDown(record, index)">下移</a>
                    <!--<a href="javascript:;" class="table-content-a" @click="changeAccess(record)">修改权限</a>-->
                    <!--<a href="javascript:;" class="table-content-a" @click="getAccess(record)">获取权限</a>-->
                    <a-divider type="vertical"></a-divider>
                    <a-popconfirm
                            v-if="data.length"
                            title="确认删除吗?"
                            okText="确定" cancelText="取消"
                            @confirm="() => onDelete(record.tagId)"
                    >
                        <a href="javascript:;" class="table-content-a">删除</a>
                    </a-popconfirm>
                </template>
            </a-table>
        </a-card>
        <a-modal v-model="visible" :title="modalTitle" @ok="submitEdit" okText="确定" cancelText="取消">
            <a-form-model ref="editForm" :model="form" :label-col="labelCol"
                          :wrapper-col="wrapperCol">
                <a-form-model-item label="上级分类" prop="categoryId">
                    <a-select v-model="form.categoryId" placeholder="请选择" v-for="item in category" :key="item.categoryId">
                        <a-select-option :value="item.categoryId">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="标签名称" prop="name">
                    <a-input v-model="form.name"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            // sorter: true,
            width:"33%",
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            // sorter: true,
            width:"33%",
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width:"33%",
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: "ModuleTagsManage",
        data() {
            return {
                console: false,
                labelCol: {span: 6},
                wrapperCol: {span: 10},
                data: [],
                pagination: {
                    page: 1,
                    current: 1,
                    // showSizeChanger: true,
                    // pageSizeOptions: ["10", "20", "30", "40"],//每页中显示的数据
                },
                loading: false,
                columns,
                selectedNo: "",
                visible: false,
                modalTitle: "",
                category: "",
                editType: "",
                form: {
                    name:"",
                    categoryId: 41
                }
            }
        },
        mounted() {
            const page = parseInt(sessionStorage.getItem("page")) || 1
            sessionStorage.removeItem("page")
            page && (this.pagination.current = page)
            this.fetch()
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
                let params={pageSize:10, page:this.pagination.current}
                this.loading = true
                this.$api.getModuleTagList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.list.length
                            this.category = data.data.data.categoryList
                            this.data = data.data.data.list
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
                            this.selectedNo = record.tagId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.tagId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            showModal(value, type){
                this.visible = true
                this.editType = type
                if(type == 'new'){
                    this.modalTitle = "添加标签"
                }else{
                    this.modalTitle = "编辑标签"
                    this.form.name = value.name
                }
            },
            submitEdit(){
                if(this.editType == 'new'){
                    this.newLabel()
                }else{
                    this.editLabel()
                }
            },
            editLabel(){
                let params = {categoryId: this.form.categoryId, name: this.form.name, tagId: this.selectedNo}
                console.log(params)
                this.$api.postModuleTagEdit(params)
                    .then((data) => {
                        this.console && console.log(data)
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
            newLabel(){
                let params = {categoryId: this.form.categoryId, name: this.form.name}
                console.log(params)
                this.$api.postModuleTagAdd(params)
                    .then((data) => {
                        this.console && console.log(data)
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
            onDelete(value){
                let params = {tagId: value}
                this.$api.postModuleTagDelete(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("删除成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            toUp(value, index){
                let i = index + (this.pagination.current - 1) * 10
                let newIds = [];
                if(i == 0){
                    return false
                }
                newIds.push(this.data[i].tagId)
                newIds.push(this.data[i - 1].tagId)
                newIds = newIds.toString()
                this.postNewIds(newIds)
            },
            toDown(value, index){
                let i = index + (this.pagination.current - 1) * 10
                let newIds = [];
                if(i == this.data.length - 1){
                    return false
                }
                newIds.push(this.data[i + 1].tagId)
                newIds.push(this.data[i].tagId)
                newIds = newIds.toString()
                console.log(newIds)
                this.postNewIds(newIds)
            },
            postNewIds(value){
                this.loading = true
                let params = {tagIds: value}
                this.$api.postModuleTagSort(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            sessionStorage.setItem("page",this.pagination.current)
                            this.loading = false
                            this.$message.success("操作成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>
    .ant-tree-title {
        width: 100%;
    }
    .title {
        float: left;
    }
    .ant-card-body :global .ant-tree {
        line-height: 3;
    }
    .ant-card-body :global .ant-tree li {
        position: relative;
    }
    .ant-card-body .but_type {
        float: right;
        position: absolute;
        right: 40px;
    }

</style>