<template>
    <div class="tree">
        <a-spin :spinning="tableSpin" tip="加载中。。。">
            <a-card :bordered="false">
                <a-button type="primary" @click="addMainMenu">添加顶级菜单</a-button>
                <a-button type="primary" @click="addSubMenu" style="margin-left: 10px">添加子菜单</a-button>
                <a-popconfirm
                        title="确认删除吗?" class="popconfirm-box"
                        okText="确定" cancelText="取消"
                        @confirm="deleteMenu"
                >
                    <a-button style="margin-left: 10px">删除</a-button>
                </a-popconfirm>
                <a-button @click="editMenu" style="margin-left: 10px">修改</a-button>
                <div class="tree-box">
                    <a-tree
                            :treeData="treeData"
                            :replaceFields="replaceFields"
                            ref="tree"
                            default-expand-all
                            :key="timer"
                    >
                        <template slot="custom" slot-scope="item">
                            <span @click="setData(item)">{{ item.title }}</span>
                        </template>
                        <template slot="showIcon" slot-scope="item">
                            <a-icon type="setting"></a-icon>
                            <span style="margin-left: 6px" @click="setData(item)">{{item.title}}</span>
                        </template>
                    </a-tree>
                </div>
            </a-card>
        </a-spin>
        <a-modal
                v-model="modal2Visible"
                title="添加菜单"
                centered
                okText="提交" cancelText="取消"
                @ok="submitForm"
                @cancel="cancel"
        >
            <a-form-model ref="adminForm" :rules="rules" :model="form" :label-col="labelCol"
                          :wrapper-col="wrapperCol">
                <a-form-model-item label="组件名称" prop="name">
                    <a-input v-model="form.name"/>
                </a-form-model-item>
                <a-form-model-item label="组件路径" prop="path">
                    <a-input v-model="form.path"/>
                </a-form-model-item>
                <a-form-model-item label="组件component" prop="component">
                    <a-input v-model="form.component"/>
                </a-form-model-item>
                <a-form-model-item label="图标" prop="icon">
                    <a-input v-model="form.icon"/>
                </a-form-model-item>
                <a-form-model-item label="组件层级" prop="level">
                    <a-input v-model="form.level"/>
                </a-form-model-item>
                <a-form-model-item label="父级id" prop="parentId">
                    <a-input v-model="form.parentId" placeholder="如果没有则填top0"/>
                </a-form-model-item>
                <a-form-model-item label="排序" prop="sort">
                    <a-input v-model="form.sort"/>
                </a-form-model-item>
                <a-form-model-item label="类型" prop="type">
                    <a-radio-group v-model="form.type">
                        <a-radio :value="0">
                            页面控制
                        </a-radio>
                        <a-radio :value="1">
                            操作按钮
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="按钮类型" prop="buttonType" v-if="form.type == 1">
                    <a-select v-model="form.buttonType" placeholder="请选择">
                        <a-select-option value="view">
                            查看操作（view）
                        </a-select-option>
                        <a-select-option value="detail">
                            查看详情操作（detail）
                        </a-select-option>
                        <a-select-option value="add">
                            添加操作（add）
                        </a-select-option>
                        <a-select-option value="delete">
                            删除操作（delete）
                        </a-select-option>
                        <a-select-option value="edit">
                            修改操作（edit）
                        </a-select-option>
                        <a-select-option value="clear">
                            清空操作（clear）
                        </a-select-option>
                        <a-select-option value="open">
                            启用操作（open）
                        </a-select-option>
                        <a-select-option value="close">
                            停用操作（close）
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="主导航" prop="mainKey">
                    <a-input v-model="form.mainKey"/>
                </a-form-model-item>
                <a-form-model-item label="副导航" prop="subKey">
                    <a-input v-model="form.subKey"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-drawer width="640" placement="right" :closable="true" :visible="visible" @close="onClose">
            <a-form-model ref="AccessForm" :rules="rules" :model="AccessForm" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="名称" prop="title">
                    <a-input v-model="AccessForm.title"/>
                </a-form-model-item>
                <a-form-model-item label="路径" prop="path">
                    <a-input v-model="AccessForm.path"/>
                </a-form-model-item>
                <a-form-model-item label="前端组件" prop="component">
                    <a-input v-model="AccessForm.component"/>
                </a-form-model-item>
                <a-form-model-item label="图标" prop="icon">
                    <a-input v-model="AccessForm.icon"/>
                </a-form-model-item>
                <a-form-model-item label="层级" prop="level">
                    <a-input v-model="AccessForm.level"/>
                </a-form-model-item>
                <a-form-model-item label="排序" prop="sort">
                    <a-input v-model="AccessForm.sort"/>
                </a-form-model-item>
                <a-form-model-item label="类型" prop="type">
                    <a-radio-group v-model="AccessForm.type">
                        <a-radio :value="0">
                            页面控制
                        </a-radio>
                        <a-radio :value="1">
                            操作按钮
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="按钮类型" prop="buttonType" v-if="AccessForm.type == 1">
                    <a-select v-model="AccessForm.buttonType" placeholder="请选择">
                        <a-select-option value="view">
                            查看列表操作（view）
                        </a-select-option>
                        <a-select-option value="detail">
                            查看详情操作（detail）
                        </a-select-option>
                        <a-select-option value="add">
                            添加操作（add）
                        </a-select-option>
                        <a-select-option value="delete">
                            删除操作（delete）
                        </a-select-option>
                        <a-select-option value="edit">
                            修改操作（edit）
                        </a-select-option>
                        <a-select-option value="clear">
                            清空操作（clear）
                        </a-select-option>
                        <a-select-option value="open">
                            启用操作（open）
                        </a-select-option>
                        <a-select-option value="close">
                            停用操作（close）
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="主导航" prop="mainKey">
                    <a-input v-model="AccessForm.mainKey"/>
                </a-form-model-item>
                <a-form-model-item label="副导航" prop="subKey">
                    <a-input v-model="AccessForm.subKey"/>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="editAccess">
                        提交
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="onClose">
                        取消
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-drawer>
    </div>
</template>

<script>

    export default {
        name: "AddAccessMenuTable",
        data() {
            return {
                console: true,
                tableSpin: true,
                treeData: [],
                visible: false,
                selectedData: null,
                labelCol: {span: 6},
                wrapperCol: {span: 15},
                parentIdCache: '',
                timer: "",
                replaceFields: {
                    'name': 'title',
                    'menuId': 'key',
                },
                form: {
                    name: "",
                    path: "",
                    component: "",
                    level: "",
                    parentId: "",
                    buttonType: undefined,
                    icon: "",
                    sort: "",
                    type: 0,
                    url: "",
                    mainKey: "",
                    subKey: "",
                },
                AccessForm: {
                    name: "",
                    path: "",
                    component: "",
                    level: "",
                    parentId: "",
                    buttonType: undefined,
                    icon: "",
                    sort: "",
                    type: "",
                    url: "",
                    mainKey: "",
                    subKey: ""
                },
                modal2Visible: false,
                // 顶级层级为1，依次向上递增，添加顶级菜单父级id均为top0，添加菜单父级id则为component
                rules: {
                    path: [
                        {required: false, path: false, message: '请输入路径', trigger: 'blur'},
                    ],
                    component: [
                        {required: false, path: false, message: '请输入组件', trigger: 'blur'},
                    ],
                    level: [
                        {required: true, message: '请输入层级', trigger: 'blur'},
                    ],
                    parentId: [
                        {required: true, path: false, message: '请输入父级id', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入组件名', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'blur'},
                    ],
                    buttonType: [
                        {required: true, message: '请选择按钮类型', trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            addMainMenu() {
                this.modal2Visible = true
                this.form.parentId = 'top0'
            },
            submitForm() {
                this.$refs.adminForm.validate(valid => {
                    if (valid) {
                        let params = this.form;
                        this.$api.addAccessMenu(params)
                            .then((data) => {
                                this.console && console.log(data)
                                if (data.data.code == 0 && data.data.msg == "success") {
                                    this.modal2Visible = false
                                    this.$message.success('添加成功');
                                    this.$emit('timer', new Date().getTime())
                                } else {
                                    this.$message.error(data.data.msg);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            deleteMenu() {
                if (!this.selectedData) {
                    alert("先选择data")
                    return
                }
                this.console && console.log(this.selectedData.menuId)
                let params = {id: this.selectedData.menuId}
                this.$api.deleteAccessMenu(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('删除成功');
                            this.$emit('timer', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            setData(data) {
                this.console && console.log(data.menuId)
                this.selectedData = data;
                this.parentIdCache = data.menuId
                if (data.level == 1) {
                    this.form.parentId = 'top0'
                } else {
                    this.form.parentId = data.menuId
                }
            },
            addSubMenu() {
                if (!this.selectedData) {
                    alert("先选择data")
                    return
                }
                this.modal2Visible = true
                this.form.parentId = this.parentIdCache
                // const newChild = {
                //     title: this.form.name,
                //     key: this.form.name,
                //     scopedSlots: {title: 'custom'},
                //     children: []
                // }
                // if (!this.selectedData.children) {
                //     console.log(3454)
                //     this.$set(this.selectedData, 'children', [])
                // }
                // this.selectedData.children.push(newChild)
            },
            cancel() {
                this.modal2Visible = false
            },
            fetch() {
                let params = {}
                this.tableSpin = true
                this.$api.getAccessMenu(params)
                    .then((data) => {
                        this.console && console.log(data)
                        const dataList = data.data.data.list
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.parseJson(dataList)
                            this.treeData = dataList
                            this.timer = new Date().getTime()
                            this.tableSpin = false
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
                arr = arr.slice()

                function toParse(arr) {
                    arr.forEach(function (item) {
                        if (item.children && Array.isArray(item.children)) {
                            item[key] = item.menuId
                            item[title] = item.name
                            item['scopedSlots'] = {title: 'custom'}
                            if(item['type'] == 1){
                                item['scopedSlots'] = {title: 'showIcon'}
                            }
                            let itemChild = item.children
                            toParse(itemChild)
                        }
                        delete item.name
                    })
                    return arr
                }

                return toParse(arr)
            },
            onClose() {
                this.visible = false;
            },
            editAccess() {
                this.$refs.AccessForm.validate(valid => {
                    if (valid) {
                        let params = this.AccessForm;
                        params.name = this.AccessForm.title
                        console.log(params)
                        this.$api.editAccessMenu(params)
                            .then((data) => {
                                this.console && console.log(data)
                                if (data.data.code == 0 && data.data.msg == "success") {
                                    this.$message.success('修改成功');
                                    this.$emit('timer', new Date().getTime())
                                } else {
                                    this.$message.error(data.data.msg);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            editMenu() {
                if (!this.selectedData) {
                    alert("先选择data")
                    return
                }
                this.visible = true;
                this.AccessForm = {...this.selectedData}
                console.log(this.AccessForm)
            }
        }
    }
</script>
<style scoped>
    .ant-tree-title {
        width: 100%;
    }

    .tree-box{
        height: calc(100vh - 300px);
        overflow: auto;
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
