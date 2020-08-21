<template>
    <div class="page-header-index-wide">
        <a-card :bordered="false">
            <a-button type="primary">添加顶级菜单</a-button>
            <a-tree
                    :treeData="treeData"
            >
                <template slot="custom" slot-scope="item">
                    <span>{{ item.title }}</span>
                    <a-button
                            type="link"
                            class="but_type"
                            style="left: 300px"
                            @click="()=> append(item)"
                    >新增
                    </a-button>
                    <a-button
                            type="link"
                            class="but_type"
                            style="left:350px;"
                            @click="()=> edit(item)"
                    >编辑
                    </a-button>
                    <a-button type="link" class="but_type" style="left:400px" @click="(e)=> remove(item)">删除</a-button>
                </template>
            </a-tree>
        </a-card>
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

    export default {
        name: "TreeDemo",
        data() {
            return {
                treeData,
                console: false
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            // 递归查找
            searchOption(option, arr, type = 'delect') {
                console.log(option, arr)
                for (let s = 0; s < arr.length; s++) {
                    console.log(arr[s].key, option.key)
                    if (arr[s].key === option.key) {
                        if (type === 'delect') {
                            arr.splice(s, 1)
                        } else {
                            //这是模拟数据编辑数据
                            this.$set(arr, s, {
                                title: '12121212',
                                key: '12121212',
                                scopedSlots: {title: 'custom'}
                            })
                        }
                        break
                    } else if (arr[s].children && arr[s].children.length > 0) { // 递归条件
                        this.searchOption(option, arr[s].children)
                    } else {
                        continue
                    }
                }
            },
            append(data) {
                //模拟添加
                const newChild = {
                    title: 'ceshi1',
                    key: 'ceshi1',
                    scopedSlots: {title: 'custom'},
                    children: []
                }
                if (!data.children) {
                    this.$set(data, 'children', [])
                }
                data.children.push(newChild)
            },
            remove(data) {
                //先请求后端接口，删除成功后执行
                this.searchOption(data, this.treeData)
            },
            edit(data) {
                //先请求后端接口，编辑成功后执行
                this.searchOption(data, this.treeData, 'edit')
            },
            fetch() {
                this.loading = true
                let params = {"layoutId": 5730}
                this.$api.getCategoryTagList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.totalElements
                            this.data = data.data.data.content
                            this.pagination = pagination
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
        float: right;
        position: absolute;
        right: 40px;
    }

</style>