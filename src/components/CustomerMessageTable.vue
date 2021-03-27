<template>
    <div>
        <a-table
                class="table-content"
                :columns="columns"
                :row-key="record => record.messageId"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                :customRow="clickRow"
                :rowClassName="addRowClass"
                @change="handleTableChange"
        >
            <template slot="recvUser" slot-scope="recvUser">
                <span class="table-content-span-ellipsis" :title="recvUser">
                    {{ recvUser }}
                </span>
            </template>
            <template slot="addTime" slot-scope="addTime">
                <span :title="new Date(addTime).toLocaleString()">
                {{ new Date(addTime).toLocaleString() }}
                </span>
            </template>
            <template slot="content" slot-scope="content">
                <span v-html="content">

                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <router-link :to="{name:'ScreenshotsToCustomer',query:{messageId:record.messageId}}" target="_blank">
                    截图给客户
                </router-link>
                <!--<a href="javascript:;" class="table-content-a">截图给客户</a>-->
                <!--<a-popconfirm-->
                <!--v-if="data.length"-->
                <!--title="Sure to delete?"-->
                <!--@confirm="() => onDelete(record.id.value)"-->
                <!--&gt;-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <a-divider type="vertical"></a-divider>
                <a href="javascript:;" class="table-content-a" @click="showDrawer(record)">查看</a>
            </template>
        </a-table>
        <a-drawer width="640" placement="right" :closable="true" :visible="visible" @close="onClose">
            <a-row>
                <a-col :span="12">
                    <p class="drawer-item drawer-item-title">接收人</p>
                    <p class="drawer-item">{{ drawerContent.recvUser }}</p>
                </a-col>
                <a-col :span="12">
                    <p class="drawer-item drawer-item-title">接收企业</p>
                    <p class="drawer-item">{{ drawerContent.recvEnt }}</p>
                </a-col>
                <a-col :span="12">
                    <p class="drawer-item drawer-item-title">发送时间</p>
                    <p class="drawer-item">{{ new Date(drawerContent.addTime).toLocaleString() }}</p>
                </a-col>
            </a-row>
            <a-divider/>
            <a-row>
                <a-col>
                    <p class="drawer-item drawer-item-title">内容</p>
                    <p class="drawer-item" v-html="drawerContent.content"></p>
                </a-col>
            </a-row>
            <a-divider/>
        </a-drawer>
    </div>
</template>
<script>

    const columns = [
        {
            title: '内容',
            dataIndex: 'content',
            width: '40%',
            scopedSlots: {customRender: 'content'},
        },
        {
            title: '接收人',
            dataIndex: 'recvUser',
            width: '15%',
            scopedSlots: {customRender: 'recvUser'},
        },
        {
            title: '接收企业',
            dataIndex: 'recvEnt',
            width: '15%',
            scopedSlots: {customRender: 'recvEnt'},
        },
        {
            title: '发送时间',
            dataIndex: 'addTime',
            width: '15%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            scopedSlots: {customRender: 'operation'},
        },
    ];

    export default {
        name: 'CustomerMessageTable',
        props: ["toChildPage"],
        data() {
            return {
                console: false,
                visible: false,
                data: [],
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                selectedNo: "",
                drawerContent: {"recvEnt": "", "recvUser": "", "content": "", "addTime": ""}
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
                let params = {pageSize: 10, page: this.pagination.current}
                if (sessionStorage.getItem("siteParams")) {
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    params = {...params, ...siteParams}
                }
                this.console && console.log('params:', params);
                this.loading = true;
                this.$api.getCustomerMessageList(params)
                    .then((data) => {
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
                            this.data = data.data.data.messageList
                            this.pagination = pagination
                            this.console && console.log(data)
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            onDelete(key) {
                const data = [...this.data];
                this.console && console.log(data, key)
                // this.data = data.filter(item => item.id.value !== key);
            },
            showDrawer(value) {
                this.visible = true;
                this.drawerContent = value
            },
            onClose() {
                this.visible = false;
            },
            clickRow(record) {
                return {
                    on: {
                        click: () => {
                            this.selectedNo = record.messageId
                        }
                    }
                }
            },
            addRowClass(key) {
                var styleClassName = ""
                if (key.messageId === this.selectedNo) {
                    styleClassName = "selected-tr"
                }
                return styleClassName
            }
        },
    };
</script>

<style scoped>
    .table-content {
        min-width: 1104px;
    }
</style>
