<template>
    <div class="page-header-index-wide">
        <a-card :bordered="false">
            <a-button @click="append(null,'addCategory')">添加模块分类</a-button>
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-tree
                        :treeData="treeData"
                        class="treeClass"
                >
                    <template slot="custom" slot-scope="item">
                        <span>{{ item.title }}</span>
                        <a-button type="link" class="but_type" style="left: 240px"
                                  @click="()=> edit(item,'editCategory')">
                            编辑分类
                        </a-button>
<!--                        <a-button type="link" class="but_type" style="left:320px;" @click="()=> manage(item, 'manage')">-->
<!--                            管理标签-->
<!--                        </a-button>-->
                        <a-button type="link" class="but_type" style="left:330px;" @click="()=> categoryToUp(item)">
                            上移
                        </a-button>
                        <a-button type="link" class="but_type" style="left:380px;" @click="()=> categoryToDown(item)">
                            下移
                        </a-button>
                        <a-popconfirm
                                v-if="treeData.length"
                                title="确认删除吗?"
                                okText="确定" cancelText="取消"
                                @confirm="() => remove(item)"
                        >
                            <a-button type="link" class="but_type" style="left:430px">
                                删除
                            </a-button>
                        </a-popconfirm>
                    </template>
                </a-tree>
            </a-spin>
        </a-card>
        <a-modal v-model="visible" :title="modalTitle" @ok="submitEdit" okText="确定" cancelText="取消">
            <a-form-model ref="editForm" :model="form" :label-col="labelCol"
                          :wrapper-col="wrapperCol">
                <a-form-model-item label="上级分类" prop="categoryId">
                    <a-select v-model="form.categoryId" placeholder="请选择" @change="getSelectedOption">
                        <a-select-option value="" :parentId="null">
                            请选择
                        </a-select-option>
                        <a-select-option v-for="item in category" :key="item.key" :value="item.key"
                                         :parentId="item.parentId">
                            {{item.title}}
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
    const treeData = [
        {
            title: '0-0',
            key: '0-0',
            scopedSlots: {title: 'custom'},
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0',
                    scopedSlots: {title: 'custom'},
                    children: [
                        {title: '0-0-0-0', key: '0-0-0-0', scopedSlots: {title: 'custom'}},
                        {title: '0-0-0-1', key: '0-0-0-1', scopedSlots: {title: 'custom'}},
                        {title: '0-0-0-2', key: '0-0-0-2', scopedSlots: {title: 'custom'}}
                    ]
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                    scopedSlots: {title: 'custom'},
                    children: [
                        {title: '0-0-1-0', key: '0-0-1-0', scopedSlots: {title: 'custom'}},
                        {title: '0-0-1-1', key: '0-0-1-1', scopedSlots: {title: 'custom'}},
                        {title: '0-0-1-2', key: '0-0-1-2', scopedSlots: {title: 'custom'}}
                    ]
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                    scopedSlots: {title: 'custom'}
                }
            ]
        },
        {
            title: '0-1',
            key: '0-1',
            scopedSlots: {title: 'custom'},
            children: [
                {title: '0-1-0-0', key: '0-1-0-0', scopedSlots: {title: 'custom'}},
                {title: '0-1-0-1', key: '0-1-0-1', scopedSlots: {title: 'custom'}},
                {title: '0-1-0-2', key: '0-1-0-2', scopedSlots: {title: 'custom'}}
            ]
        },
        {
            title: '0-2',
            key: '0-2',
            scopedSlots: {title: 'custom'}
        }
    ]
    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            width: '33%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            width: '33%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '33%',
            scopedSlots: {customRender: 'operation'},
        },
    ]

    export default {
        name: "ModuleCategory",
        data() {
            return {
                treeData,
                columns,
                labelCol: {span: 6},
                wrapperCol: {span: 10},
                console: true,
                spinning: false,
                loading:false,
                pagination: {page: 1, current: 1},
                data: [],
                visible: false,
                modalTitle: "",
                modalType: "",
                category: [],
                selectedNo: "",
                categoryId: "",
                form: {
                    name: "",
                    categoryId: undefined,
                    parentId: ""
                },
            }
        },
        mounted() {
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
                this.spinning = true
                this.$api.getModuleCategoryList()
                    .then((data) => {
                        this.console && console.log(data)
                        const dataList = data.data.data.list
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.parseJson(dataList)
                            this.treeData = dataList
                            this.spinning = false
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            parseJson(arr) {
                let title = 'title'
                let key = 'key'
                let that = this
                arr = arr.slice()
                function toParse(arr) {
                    arr.forEach(function (item) {
                        if (item.children && Array.isArray(item.children)) {
                            item[key] = item.categoryId
                            item[title] = item.name
                            item['scopedSlots'] = {title: 'custom'}
                            const category = {'key': item.categoryId, 'title': item.name, 'parentId': item.parentId}
                            that.category.push(category)
                            let itemChild = item.children
                            toParse(itemChild)
                        }
                        delete item.name
                    })
                    return arr
                }
                return toParse(arr)
            },
            getSelectedOption(value, option) {
                this.form.parentId = option.data.attrs.parentId
            },
            submitEdit() {
                if (this.modalType == 'addCategory') {
                    this.addCategory()
                } else {
                    this.editCategory()
                }
            },
            append(value, type) {
                this.modalType = type
                this.visible = true
                this.modalTitle = '添加模块分类'
            },
            edit(value, type) {
                if(type == 'editCategory'){
                    this.modalType = type
                    this.form.categoryId = value.parentId || undefined
                    this.form.name = value.title
                    this.categoryId = value.categoryId
                    this.visible = true
                    this.modalTitle = '标签分类编辑'
                }
            },
            manage(value, type) {
                this.categoryId = value.categoryId
                this.modalType = type
                this.visible = true
                this.modalTitle = '标签管理'
                this.loading = true
                let categoryId = value.categoryId
                let params = {categoryId: categoryId}
                this.$api.getLayoutCategoryTagList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            const dataList = data.data.data.list
                            this.data = dataList
                            const pagination = {...this.pagination};
                            pagination.total = dataList.length
                            this.pagination = pagination
                            this.loading = false
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            categoryToUp(value) {
                let tagIds = []
                if(value.parentId){
                    // 是子节点
                    const parentIndex = parseInt(value.pos.split("-")[1])
                    const index = parseInt(value.pos.split("-")[2])
                    const categoryChildren = this.treeData[parentIndex].children
                    if(categoryChildren.length == 1){
                        return false
                    }
                    if(index == 0){
                        return false
                    }
                    tagIds.push(categoryChildren[index].categoryId)
                    tagIds.push(categoryChildren[index - 1].categoryId)
                }else{
                    // 是最顶层父节点
                    const index = parseInt(value.pos.split("-")[1])
                    if(index == 0){
                        return false
                    }
                    tagIds.push(this.treeData[index].categoryId)
                    tagIds.push(this.treeData[index - 1].categoryId)
                }
                tagIds = tagIds.toString()
                this.categorySort(tagIds)
            },
            categoryToDown(value) {
                let tagIds = []
                if(value.parentId){
                    // 是子节点
                    const parentIndex = parseInt(value.pos.split("-")[1])
                    const index = parseInt(value.pos.split("-")[2])
                    const categoryChildren = this.treeData[parentIndex].children
                    if(categoryChildren.length == 1){
                        return false
                    }
                    if(index == categoryChildren.length - 1){
                        return false
                    }
                    tagIds.push(categoryChildren[index + 1].categoryId)
                    tagIds.push(categoryChildren[index].categoryId)
                }else{
                    // 是最顶层父节点
                    const index = parseInt(value.pos.split("-")[1])
                    if(index == this.treeData.length - 1){
                        return false
                    }
                    tagIds.push(this.treeData[index + 1].categoryId)
                    tagIds.push(this.treeData[index].categoryId)
                }
                tagIds = tagIds.toString()
                this.categorySort(tagIds)
            },
            categorySort(value){
                let params = {categoryIds: value}
                this.$api.postSortModuleCategory(params)
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
            remove(value) {
                let params = {categoryId: value.categoryId}
                this.$api.postDelModuleCategory(params)
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
            addCategory() {
                let params = {parentId: this.form.categoryId || null, name: this.form.name}
                this.$api.postAddModuleCategory(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("添加成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            editCategory() {
                let params = {parentId: this.form.categoryId || null, name: this.form.name, categoryId: this.categoryId}
                this.$api.postEditModuleCategory(params)
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
        position: absolute;
        height: 24px;
        line-height: 24px;
    }
</style>