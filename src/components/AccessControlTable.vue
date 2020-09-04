<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.roleId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="addTime" slot-scope="addTime">
        <span :title="new Date(addTime).toLocaleString()">
          {{ new Date(addTime).toLocaleString() }}
        </span>
            </template>
            <template slot="updateTime" slot-scope="updateTime">
        <span :title="updateTime ? new Date(updateTime).toLocaleString() : ''">
          {{ updateTime ? new Date(updateTime).toLocaleString() : '' }}
        </span>
            </template>
            <!--<template slot="setDefault">-->
        <!--<span>-->
          <!--{{ '设为默认' }}-->
        <!--</span>-->
            <!--</template>-->
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">菜单权限</a>
                <!--<a href="javascript:;" class="table-content-a" @click="showDrawer(record)">数据权限</a>-->
                <a href="javascript:;" class="table-content-a" @click="editAccessAdmin(record)">编辑</a>
                <a-popconfirm
                        v-if="data.length"
                        title="确定删除吗?"
                        okText="确定" cancelText="取消"
                        @confirm="() => deleteAccessAdmin(record)"
                >
                    <a href="javascript:;" class="table-content-a">删除</a>
                </a-popconfirm>
            </template>
        </a-table>
        <a-drawer width="640" placement="right" :closable="true" :visible="visible" @close="onClose">
            <a-spin :spinning="spinning" tip="加载中。。。">
            <p>分配{{roleName}}的菜单权限</p>
                <a-divider></a-divider>
                <a-tree
                        v-model="checkedKeys"
                        checkable
                        :selected-keys="selectedKeys"
                        :checkStrictly="checkStrictly"
                        :tree-data="treeData"
                        @expand="onExpand"
                        @select="onSelect"
                        class="drawer-scroll"
                >
                    <template slot="showIcon" slot-scope="item">
                        <a-icon type="setting"></a-icon>
                        <span style="margin-left: 6px">{{item.title}}</span>
                    </template>
                </a-tree>
                <a-button type="primary" class="drawer-btn" @click="saveAccess">保存</a-button>
            </a-spin>
        </a-drawer>
    </div>
</template>
<script>

    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            width: '10%',
            minWidth: '150px',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '备注',
            dataIndex: 'description',
            width: '15%',
            scopedSlots: {customRender: 'description'},
        },
        {
            title: '创建时间',
            dataIndex: 'addTime',
            width: '10%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width: '10%',
            scopedSlots: {customRender: 'updateTime'},
        },
        // {
        //     title: '是否设置为用户注册默认角色',
        //     dataIndex: 'setDefault',
        //     width: '10%',
        //     scopedSlots: {customRender: 'setDefault'},
        // },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    const treeData = [
        // {
        //     title: '会员管理',
        //     key: 'sub2',
        //     children: [
        //         {
        //             title: '已验证用户【正常】',
        //             key: '1'
        //         }
        //     ],
        // },
        // {
        //     title: '留言管理',
        //     key: 'sub3',
        //     children: [
        //         { title: '客户网站留言', key: '2' },
        //     ],
        // },
        // {
        //     title: '超级管理',
        //     key: 'sub4',
        //     children: [
        //         { title: '管理员管理', key: '3' },
        //     ],
        // },
        // {
        //     title: '站点管理',
        //     key: 'sub5',
        //     children: [
        //         { title: '站点列表', key: '4' },
        //     ],
        // },
        // {
        //     title: '日志管理',
        //     key: 'sub6',
        //     children: [
        //         { title: '日志查询', key: '5' },
        //     ],
        // },
        // {
        //     title: '订单管理系统',
        //     key: 'sub7',
        //     children: [
        //         { title: '费用审核', key: '6' },
        //         { title: '订单管理', key: '7' },
        //     ],
        // },
    ];

    export default {
        name: 'AccessControlTable',
        data() {
            return {
                console: false,
                autoExpandParent: true,
                checkStrictly: true,
                checkedKeys: [],
                selectedKeys: [],
                spinning: true,
                roleName: "",
                treeData,
                data: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                visible: false,
                roleId: "",
            };
        },
        mounted() {
            this.fetch();
            this.fetchMenu()
        },
        watch: {
            checkedKeys(val) {
                this.console && console.log('onCheck', val);
            },
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
                let params = {pageSize: 10, page: this.pagination.current}
                this.console && console.log('params:', params);
                this.loading = true;
                this.$api.getAccessControlAdminList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false;
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count;
                            this.data = data.data.data.roleList
                            this.pagination = pagination
                            this.console && console.log(data)
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            fetchMenu() {
                let params = {}
                this.$api.getAccessMenu(params)
                    .then((data) => {
                        this.console && console.log(data)
                        const dataList = data.data.data.list
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.parseJson(dataList)
                            this.treeData = dataList
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
                            // item['scopedSlots'] = {title: 'custom'}
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
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.roleId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.roleId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            },
            onClose() {
                this.visible = false
                this.checkedKeys = []
            },
            showDrawer(key) {
                this.console && console.log(key)
                this.spinning = true
                this.roleId = key.roleId
                this.roleName = key.name
                let params = {roleId: this.roleId}
                this.$api.getAssignedAccessControl(params)
                    .then((data) => {
                        this.console && console.log(data)
                        const dataList = data.data.data.list
                        if (data.data.code == 0 && data.data.msg == "success") {
                            let menuIdArr = []
                            for (let i = 0; i < dataList.length; i++) {
                                menuIdArr.push(dataList[i].menuId)
                                this.checkedKeys = menuIdArr
                            }
                            this.spinning = false
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                this.visible = true
            },
            onExpand(expandedKeys) {
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys;
                this.autoExpandParent = false;
            },
            onCheck(checkedKeys) {
                this.console && console.log('onCheck', checkedKeys.checked);
                this.checkedKeys = checkedKeys.checked;
            },
            onSelect(selectedKeys, info) {
                this.console && console.log('onSelect', info);
                this.selectedKeys = selectedKeys;
            },
            saveAccess() {
                let params = {roleId: this.roleId, menuIds:this.checkedKeys.checked ? this.checkedKeys.checked.toString() : this.checkedKeys.toString()}
                this.$api.assignAccessControl(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("添加成功");
                            this.visible = false
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            deleteAccessAdmin(data) {
                let params = {roleId: data.roleId}
                this.$api.deleteAccessControlAdmin(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("删除成功");
                            this.$emit("timer", new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            editAccessAdmin(key) {
                this.$emit("editAccessAdmin", key)
            }
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }

    .drawer-btn {
        margin-left: 10px;
        margin-top: 10px;
    }
</style>

