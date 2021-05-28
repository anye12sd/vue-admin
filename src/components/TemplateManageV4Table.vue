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
                        <a href="javascript:;" class="block" @click="moduleOn(record)" v-if="record.kind != 'c'">上架模块</a>
                        <a href="javascript:;" class="block colorRed" @click="moduleOff(record)" v-else>下架模块</a>
                    </template>
                </div>
                <div>
                    <a href="javascript:;" class="block" @click="getDetail(record)">查看</a>
                    <a href="javascript:;" class="block" @click="showLangControl(record)">语言设置</a>
                    <a href="javascript:;" class="block" @click="setAdmin(record)">权限管理</a>
                </div>
            </template>
        </a-table>
        <a-modal
                :title="modalTitle"
                :visible="checkVisible"
                @cancel="cancelModal"
        >
            <div>
                <a-input placeholder="请输入模块编号，如NavHead1" v-model="moduleType" style="width: 50%"/>
                <div class="result-content" v-if="form.name">
                    <div style="margin-top: 15px">
                        <span>昵称：</span>
                        <span>{{form.name}}</span>
                    </div>
                    <div style="margin-top: 15px">
                        <span>邮箱：</span>
                        <span>{{form.email}}</span>
                    </div>
                    <div style="margin-top: 15px">
                        <span>手机：</span>
                        <span>{{form.cellphone}}</span>
                    </div>
                    <div style="margin-top: 15px">
                        <span>管理员账号：</span>
                        <span>{{form.username}}</span>
                    </div>
                </div>
            </div>
            <template slot="footer">
                <a-button type="primary" @click="readySubmit" style="margin-left: 50px">搜索</a-button>
                <a-button @click="cancelModal">关闭</a-button>
            </template>
        </a-modal>
        <a-modal
                :title="langTitle"
                :visible="langVisible"
                @cancel="langCancelModal"
                :width="800"
        >
            <div>
                <div class="content-top-select">
                    <a-select v-if="isLang" style="width: 200px; margin-bottom: 30px" @change="getLanId" v-model="lanId">
                        <a-select-option value="1">
                            中文
                        </a-select-option>
                        <a-select-option value="2">
                            英文
                        </a-select-option>
                        <a-select-option value="3">
                            日语
                        </a-select-option>
                        <a-select-option value="4">
                            韩语
                        </a-select-option>
                        <a-select-option value="5">
                            德语
                        </a-select-option>
                        <a-select-option value="6">
                            法语
                        </a-select-option>
                        <a-select-option value="7">
                            西班牙语
                        </a-select-option>
                        <a-select-option value="8">
                            俄语
                        </a-select-option>
                        <a-select-option value="9">
                            阿拉伯语
                        </a-select-option>
                        <a-select-option value="10">
                            繁体
                        </a-select-option>
                    </a-select>
                    <a-table
                            :columns="isLang ? langColumns : adminColumns"
                            :row-key="(record => record.langConfigId)"
                            :data-source="isLang ? langData : adminData"
                            :customRow="tableClickRow"
                            :pagination="false"
                    >
                        <template slot="key" slot-scope="key, record">
                            <a-input v-if="record.langConfigId == langConfigId" type="text" v-model="langSelect.key" style="width: 50%"/>
                            <span v-else>{{key}}</span>
                        </template>
                        <template slot="value" slot-scope="value, record">
                            <a-input v-if="record.langConfigId == langConfigId" type="text" v-model="langSelect.value" style="width: 50%"/>
                            <span v-else>{{value}}</span>
                        </template>
                        <template slot="operation" slot-scope="text, record, index">
                            <a href="javascript:;" @click="saveLang(index)">保存</a>
                            <a href="javascript:;" style="margin-left: 8px" @click="deleteLang(record)">删除</a>
                        </template>
                        <template slot="adminOperation" slot-scope="text, record">
                            <a href="javascript:;" @click="deleteAdmin(record)">删除</a>
                        </template>
                    </a-table>
                </div>
            </div>
            <template slot="footer">
                <a-button v-if="isLang" type="primary" @click="addLan" style="margin-left: 50px">添加选项</a-button>
                <a-button v-else type="primary" @click="addAdmin" style="margin-left: 50px">添加管理员</a-button>
                <a-button @click="langCancelModal">关闭</a-button>
            </template>
        </a-modal>
        <a-modal
                title="添加管理员"
                :visible="adminAddVisible"
                @cancel="adminAddCancelModal"
        >
            <div>
                <a-form-model :model="adminForm" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="管理员账号">
                        <a-input v-model="adminForm.username" />
                    </a-form-model-item>
                    <a-form-model-item label="模块归属到当前账号">
                        <a-radio-group v-model="adminForm.move">
                            <a-radio value="1">
                                是
                            </a-radio>
                            <a-radio value="2">
                                否
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </a-form-model>
            </div>
            <template slot="footer">
                <a-button type="primary" @click="sureAddAdmin">确定</a-button>
                <a-button @click="adminAddCancelModal">关闭</a-button>
            </template>
        </a-modal>
        <a-drawer
                title="查看详情"
                placement="right"
                width="40%"
                :visible="drawerVisible"
                @close="onDrawerClose"
        >
            <a-tabs>
                <a-tab-pane key="1" tab="选择分类">
                    <a-descriptions title="">
                        <a-descriptions-item label="上架模块" :span="3">
                            {{moduleDetail.kind == 's' ? '下架' : '上架'}}
                        </a-descriptions-item>
                        <a-descriptions-item label="模块名称" :span="3">
                            {{moduleDetail.name}}
                        </a-descriptions-item>
                        <a-descriptions-item label="模块描述" :span="3">
                            {{moduleDetail.mdesc}}
                        </a-descriptions-item>
                        <a-descriptions-item label="模块编号" :span="3">
                            {{moduleDetail.type}}
                        </a-descriptions-item>
                        <a-descriptions-item label="所属站点编号" :span="3">
                            {{moduleDetail.layoutId}}
                        </a-descriptions-item>
                        <a-descriptions-item label="模块提示" :span="3">
                            {{moduleDetail.udesc ? moduleDetail.udesc : '用于说明模块注意事项，为空时不显示'}}
                        </a-descriptions-item>
                        <a-descriptions-item label="所属页面" :span="3">
                            {{moduleDetail.page}}
                        </a-descriptions-item>
                        <a-descriptions-item label="展现方式" :span="3">
                            {{getShowType(moduleDetail.showType)}}
                        </a-descriptions-item>
                        <a-descriptions-item label="是否在前台展示" :span="3">
                            {{moduleDetail.isDisplay}}
                        </a-descriptions-item>
                        <a-descriptions-item label="缩略图片" :span="3">
                            <img :src="'//cdn.jihui88.com/' + moduleDetail.pic" style="width: 100%" alt="" @error="show404Imgs">
                        </a-descriptions-item>
                    </a-descriptions>
                </a-tab-pane>
                <a-tab-pane key="2" tab="模块html">
                    <div style="margin-bottom: 20px">
                        API文档：<a target="_blank" href="https://jihui88.gitee.io/jhdoc">https://jihui88.gitee.io/jhdoc</a>(说明：如果点击后只看到LOGO图标，请复制该链接手动在浏览器地址栏中打开)
                    </div>
                    {{moduleDetail.jsp}}
                </a-tab-pane>
                <a-tab-pane key="3" tab="模块样式">
                    {{moduleDetail.css}}
                </a-tab-pane>
                <a-tab-pane key="4" tab="模块脚本">
                    {{moduleDetail.js}}
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
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
            title: '模块编号',
            dataIndex: 'type',
            width: '10%',
            scopedSlots: {customRender: 'type'},
        },
        {
            title: '名称',
            dataIndex: 'name',
            width: '10%',
            scopedSlots: {customRender: 'name'},
        },
        {
            title: '模块价格',
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
    const langColumns = [
        {
            title: '名称',
            dataIndex: 'key',
            scopedSlots: {customRender: 'key'},
        },
        {
            title: '内容',
            dataIndex: 'value',
            scopedSlots: {customRender: 'value'},
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
        }
    ];
    const adminColumns = [
        {
            title: '管理员账号',
            dataIndex: 'username',
            scopedSlots: {customRender: 'username'},
        },
        {
            title: '操作',
            scopedSlots: {customRender: 'adminOperation'},
        }
    ];

    export default {
        name: 'TemplateManageV4Table',
        props: ['checkVisible'],
        data() {
            return {
                labelCol: { span: 8 },
                wrapperCol: { span: 12 },
                form: {},
                console: true,
                modalTitle: '查询模块作者',
                moduleType: '',
                data: [],
                selectedNo: "",
                pagination: {page: 1, current: 1},
                loading: false,
                columns,
                langTitle: '配置中文语言配置',
                langVisible: false,
                lanId: '1',
                selectModuleId: '',
                langData: [],
                langColumns,
                langConfigId: '',
                langSelect: {key: '', value: ''},
                isLang: true,
                adminColumns,
                adminData: [],
                adminForm: {username: '', move: '2'},
                adminAddVisible: false,
                drawerVisible: false,
                moduleDetail: {}
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
            tableClickRow(record) {
                return {
                    on: {
                        click: () => {
                            if(this.langConfigId == record.langConfigId){
                                return -1
                            }
                            this.langSelect = {key: record.key, value: record.value}
                            this.langConfigId = record.langConfigId
                        },
                    }
                }
            },
            cancelModal(){
                this.$emit("hideVisible", false)
            },
            langCancelModal(){
                this.langVisible = false
            },
            onDrawerClose(){
                this.drawerVisible = false
            },
            showLangControl(value){
                this.lang = true
                this.langVisible = true
                this.selectModuleId = value.moduleId
                this.lanId = '1'
                this.getLangList()
            },
            setAdmin(value){
                this.selectModuleId = value.moduleId
                this.langVisible = true
                this.isLang = false
                this.getAdminList()
            },
            addAdmin(){
                this.adminAddVisible = true
            },
            getLanId(value){
                this.lanId = value
                this.getLangList()
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
            getDetail(value){
                let params = {"moduleId": value.moduleId}
                this.$api.getModuleDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.moduleDetail = data.data.data
                            this.drawerVisible = true
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            moduleOn(value){
                this.loading = true
                let params = {"moduleId": value.moduleId}
                this.$api.postSiteModuleOn(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.loading = false
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
                this.loading = true
                let params = {"moduleId": value.moduleId}
                this.$api.postSiteModuleOff(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.loading = false
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
            readySubmit(){
                if(!this.moduleType){
                    this.$message.error('请输入模块');
                    return -1
                }
                let params = {"moduleType": this.moduleType}
                this.$api.getModuleAdminInfo(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.form = data.data.data
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getLangList(){
                let params = {"lanId": this.lanId, "moduleId": this.selectModuleId}
                this.$api.getModuleLangList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.langData = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getAdminList(){
                let params = {"moduleId": this.selectModuleId}
                this.$api.getModuleOperatorList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.adminData = data.data.data.list
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            saveLang(){
                let params = {...this.langSelect, 'lanId': this.lanId, 'langConfigId': this.langConfigId == '-1' ? '' : this.langConfigId, 'moduleId': this.selectModuleId}
                this.$api.postSaveLangConfig(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('修改成功')
                            this.langSelect = {key: '', value: ''}
                            this.langConfigId = ''
                            this.getLangList()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            deleteLang(value){
                if(this.langConfigId == -1 && this.langConfigId == value.langConfigId){
                    this.langData.pop()
                    return -1
                }
                let params = {'langConfigId': value.langConfigId}
                this.$api.postDelLangConfig(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('删除成功')
                            this.langConfigId = ''
                            this.getLangList()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            addLan(){
                this.langConfigId = '-1'
                this.langData.push({key: '', value: '', langConfigId: '-1'})
            },
            deleteAdmin(value){
                let params = {'operatorId': value.operatorId}
                this.$api.postDelModuleOperator(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('删除成功')
                            this.getAdminList()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            sureAddAdmin(){
                if(!this.adminForm.username){
                    this.$message.error('请输入管理员账号');
                    return -1
                }
                let params = {'moduleId': this.selectModuleId, 'move': this.adminForm.move == 1 ? true : false, 'username': this.adminForm.username}
                this.$api.postAddModuleOperator(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('添加成功')
                            this.getAdminList()
                            this.adminAddCancelModal()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            adminAddCancelModal(){
                this.adminAddVisible = false
            },
            getShowType(type){
                let showType
                switch (type) {
                    case "00":
                        showType = "默认"
                        break;
                    case "01":
                        showType = "大屏"
                        break;
                    case "02":
                        showType = "小屏"
                        break;
                    default:
                        showType = "其他"
                        break;
                }
                return showType
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

