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
                <span>
                    {{layoutId}}
                </span>
                <a :href="'http://pc.jihui88.com/rest/site/'+layoutId+'/index'" target="_blank">[查看]</a>
            </template>
            <template slot="logo" slot-scope="logo, record">
                <div class="table-content-span-ellipsis table-content-img-box flex">
                    <img :src="'http://cdn.jihui88.com/' + logo" class="table-content-img" alt="" @error="show404Imgs">
                </div>
                <div class="table-content-span-edit">
                    <a @click="changeImg(record, 'logo')">[上传]</a>
                </div>
            </template>
            <template slot="pic" slot-scope="pic, record">
                <div class="table-content-span-ellipsis table-content-img-box flex">
                    <img :src="'http://cdn.jihui88.com/' + pic" alt="" class="table-content-img" @error="show404Imgs">
                </div>
                <div class="table-content-span-edit">
                    <a @click="changeImg(record, 'pic')">[上传]</a>
                </div>
            </template>
            <template slot="mobilePic" slot-scope="mobilePic, record">
                <div class="table-content-span-ellipsis table-content-img-box flex">
                    <img :src="'http://cdn.jihui88.com/' + mobilePic" alt="" class="table-content-img"
                         @error="show404Imgs">
                </div>
                <div class="table-content-span-edit">
                    <a @click="changeImg(record, 'mobilePic')">[上传]</a>
                </div>
            </template>
            <template slot="language" slot-scope="language">
                <span class="table-content-span-ellipsis">
                    {{getLanguage(language)}}
                </span>
            </template>
            <template slot="seoTitle" slot-scope="seoTitle,record">
                <div class="change-number-box" v-if="record.editable" :key="editingKey">
                    <a-input type="text" placeholder="请输入站点名称" v-model="inputId"></a-input>
                    <div class="change-number-btn flex">
                        <a href="javascript:;" class="flex-1" @click="saveEdit(record.layoutId)">保存</a>
                        <a href="javascript:;" class="flex-1" @click="cancelEdit(record.layoutId)">取消</a>
                    </div>
                </div>
                <span :title="seoTitle" v-if="!record.editable" :key="editingKey">
                    {{ seoTitle }}
                    <a href="javascript:;" class="table-content-a" @click="editList(record.layoutId)"
                       :disabled="editingKey !== ''">[编辑]</a>
                </span>
            </template>
            <template slot="url" slot-scope="url">
                <span :title="url">
                    {{ url }}
                </span>
            </template>
            <template slot="state" slot-scope="state, record">
                <span :title="getState(state)">
                    {{ getState(state) }}
                    <a href="javascript:;" v-if="state == 3" class="table-content-a" @click="restoreSite(record.layoutId)">[恢复]</a>
                </span>
            </template>
            <template slot="addTime" slot-scope="addTime">
                <span :title="addTime ? new Date(addTime).toLocaleString() : '未知'">
                    {{ addTime ? new Date(addTime).toLocaleString() : '未知'}}
                </span>
            </template>
            <template slot="endTime" slot-scope="endTime">
                <span :title="endTime ? new Date(endTime).toLocaleString() : '未知'">
                    {{ endTime ? new Date(endTime).toLocaleString() : '未知'}}
                </span>
            </template>
            <template slot="onLineTime" slot-scope="onLineTime">
                <span :title="onLineTime ? new Date(onLineTime).toLocaleString() : '未知'">
                    {{ onLineTime ? new Date(onLineTime).toLocaleString() : '未知'}}
                </span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div v-if="record.state == 1">
                    <template>
                        <a href="javascript:;" class="block" @click="templateOn(record)" v-if="record.copyState != 1">上架模板</a>
                        <a href="javascript:;" class="block colorRed" @click="templateOff(record)" v-else>下架模板</a>
                    </template>
                    <template>
                        <a href="javascript:;" class="block" @click="caseOn(record)" v-if="record.isCase != 1">上架案例</a>
                        <a href="javascript:;" class="block colorOrange" @click="caseOff(record)" v-else>下架案例</a>
                    </template>
                </div>
                <div>
                    <a href="javascript:;" class="block" @click="showModal('label',record)">设置标签</a>
                    <a href="javascript:;" class="block" @click="showModal('endTime',record)">审核（到期时间）</a>
                </div>
                <div>
                    <a-popconfirm
                            v-if="data.length"
                            title="确认复制吗?"
                            okText="确定" cancelText="取消"
                            @confirm="() => copySite(record)"
                    >
                        <a href="javascript:;" class="block">同账号内复制网站</a>
                    </a-popconfirm>
                    <a href="javascript:;" class="block" @click="showModal('copy', record)">复制网站到指定账号</a>
                </div>
                <div>
                    <a-popconfirm
                            v-if="data.length"
                            title="确认关闭吗?"
                            okText="确定" cancelText="取消"
                            @confirm="() => closeSite(record)"
                    >
                        <a href="javascript:;" class="block">关闭网站</a>
                    </a-popconfirm>
                    <a-popconfirm
                            v-if="data.length"
                            title="确认删除吗?"
                            okText="确定" cancelText="取消"
                            @confirm="() => deleteSite(record)"
                    >
                        <a href="javascript:;" class="block">删除网站</a>
                    </a-popconfirm>
                </div>
                <div>
                    <a href="javascript:;" class="block" @click="showModal('adminSet', record)">管理员设置</a>
                </div>
            </template>
        </a-table>
<!--        <img-select-modal :imgSelectShow="imgSelectShow"></img-select-modal>-->
        <a-modal
                :title="modalTitle"
                :visible="modalVisible"
                @cancel="cancelModal"
                :wrapClassName="{'check-select-box': modalFlag == 'label'}"
        >
            <div v-if="modalFlag == 'copy'">
                <template>
                    <a-input placeholder="请输入帐号" v-model="siteUsername"/>
                </template>
            </div>
            <div v-else-if="modalFlag == 'endTime'" style="text-align: center">
                <template>
                    <a-date-picker v-model="endTimeSelect" :showToday="false" placeholder="请选择到期时间"/>
                </template>
            </div>
            <div v-else-if="modalFlag == 'adminSet'">
                <a-spin :spinning="spinning" tip="加载中。。。">
                    <template>
                        <a-input placeholder="请输入管理员" v-model="siteAdmin"/>
                    </template>
                </a-spin>
            </div>
            <div v-else>
                <a-spin :spinning="spinning" tip="加载中。。。">
                    <template>
                        <p class="check-select-box-p-error">注意：公司性质，功能，颜色，行业都需要选择一项， 否则模板那边将会搜索不到</p>
                        <div v-for="(item) in checkboxAll" :key="item.categoryId">
                            <p class="check-select-box-p-title">{{item.name}}：</p>
                            <a-checkbox-group name="name" :options="item.tagList" @change="checkboxChange" :default-value="checkedboxAll"/>
<!--                            <a-checkbox v-model="checkedboxAll"  @change="onChange"></a-checkbox>-->
                            <template v-if="item.name == '行业'">
                                <div v-for="(newItem) in item.children" :key="newItem.categoryId">
                                    <p class="check-select-box-p-title">{{newItem.name}}：</p>
                                    <a-checkbox-group name="name" :options="newItem.tagList" @change="checkboxChange" :default-value="checkedboxAll"/>
                                </div>
                            </template>
                        </div>
                    </template>
                </a-spin>
            </div>
            <template slot="footer">
                <a-button @click="cancelModal">取消</a-button>
                <a-button type="primary" @click="readySubmit">确定</a-button>
            </template>
        </a-modal>
        <div>
            <a-modal v-model="imgModalVisible" :title="imgModalTitle" class="img-upload-modal">
                <a-upload
                        name="Filedata"
                        :multiple="false"
                        :action="imgUploadAction"
                        :headers="headers"
                        :data="uploadData"
                        @change="handleChange"
                        :before-upload="compressImg"
                >
                    <div class="modal-box">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">
                            Upload
                        </div>
                    </div>
                </a-upload>
                <template slot="footer">
                    <a-button @click="cancelImgModal">取消</a-button>
                </template>
            </a-modal>
        </div>
    </div>
</template>
<script>
    // import ImgSelectModal from "./ImgSelectModal";
    // import lrz from "lrz";

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
            title: '移动端首屏图片',
            dataIndex: 'mobilePic',
            width: '10%',
            scopedSlots: {customRender: 'mobilePic'},
        },
        {
            title: '语言版本',
            dataIndex: 'language',
            width: '10%',
            scopedSlots: {customRender: 'language'},
            ellipsis: true
        },
        {
            title: '站点名称',
            dataIndex: 'seoTitle',
            width: '10%',
            scopedSlots: {customRender: 'seoTitle'},
        },
        {
            title: '域名地址',
            dataIndex: 'url',
            width: '10%',
            scopedSlots: {customRender: 'url'},
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            width: '8%',
            scopedSlots: {customRender: 'state'},
        },
        {
            title: '创建时间',
            dataIndex: 'addTime',
            width: '8%',
            scopedSlots: {customRender: 'addTime'},
        },
        {
            title: '开通时间',
            dataIndex: 'onLineTime',
            width: '8%',
            scopedSlots: {customRender: 'onLineTime'},
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
        name: 'SiteVerifyTable',
        data() {
            return {
                console: false,
                data: [],
                visible: false,
                modalVisible: false,
                spinning: true,
                siteUsername: "",
                sort: undefined,
                modalTitle: "",
                selectedNo: "",
                modalFlag: "copy",
                editingKey: "",
                siteAdmin: "",
                imgModalVisible: false,
                imgModalTitle: "",
                endTimeSelect: undefined,
                inputId: "",
                pagination: {page: 1, current: 1},
                loading: false,
                imgSelectShow: false,
                imgUploadAction: "",
                checkboxAll: [],
                checkedboxAll:[],
                columns,
                headers:{
                    "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
                },
                uploadData:{
                    layoutId:""
                }
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
                    // 如果开始时间结束时间为空则删除这两个属性否则后台会报错
                    params = {...params, ...siteParams}
                }
                this.$api.getAuditList(params)
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
            cancelModal() {
                this.modalVisible = false
                this.siteUsername = ""
                this.siteAdmin = ""
            },
            cancelImgModal() {
                this.imgModalVisible = false
            },
            readySubmit() {
                if (this.modalFlag == 'copy') {
                    this.submitCopySite()
                } else if (this.modalFlag == 'label') {
                    this.submitLabelSelect()
                } else if (this.modalFlag == 'adminSet') {
                    this.submitAdminSet()
                } else {
                    this.submitEndTime()
                }
            },
            submitEndTime() {
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
            submitCopySite() {
                let params = {"layoutId": this.selectedNo, "username": this.siteUsername}
                this.$api.postCopySiteToUser(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("复制成功")
                            this.cancelModal()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            submitAdminSet() {
                let params = {"layoutId": this.selectedNo, "username": this.siteAdmin}
                this.$api.PostAdminSet(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("修改成功")
                            this.cancelModal()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            restoreSite(value){
                let params = {"layoutId": value}
                this.$api.postSiteRestore(params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.spinning = false
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("还原成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            showModal(type, value) {
                if (type == 'copy') {
                    this.modalTitle = "输入用户帐号"
                    this.modalFlag = type
                } else if (type == 'label') {
                    this.modalTitle = "管理案例分类"
                    this.modalFlag = type
                    this.getTagList(value.layoutId)
                } else if (type == 'adminSet') {
                    this.modalTitle = "管理员设置"
                    this.getAdminDetail(value.layoutId)
                    this.modalFlag = type
                } else {
                    // 过期时间审核 endTime
                    this.modalTitle = "网站审核"
                    this.modalFlag = type
                }
                this.modalVisible = true
            },
            getTagList(id) {
                this.spinning = true
                let params = {layoutId: id}
                this.$api.getCategoryTagList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.spinning = false
                            const tagRelationShipsList = data.data.data.tagRelationShipsList
                            for (let i = 0; i < tagRelationShipsList.length ; i++){
                                this.checkedboxAll.push(tagRelationShipsList[i].tagId)
                            }
                            this.checkboxAll = data.data.data.categoryList
                            this.parseJson(this.checkboxAll)
                            console.log(this.checkboxAll)
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            parseJson(arr) {
                let title = 'value'
                let key = 'label'
                arr = arr.slice()

                function toParse(arr) {
                    arr.forEach(function (item) {
                        if (item.children && Array.isArray(item.children)) {
                            item.tagList.forEach(function (itemTag){
                                itemTag[key] = itemTag.name
                                itemTag[title] = itemTag.tagId
                            })
                            let itemChild = item.children
                            toParse(itemChild)
                        }
                    })
                    return arr
                }
                return toParse(arr)
            },
            checkboxChange() {

            },
            submitLabelSelect(){
                let checkValue=[];
                let checkedBox = document.getElementsByName("name")
                for(let i = 0; i < checkedBox.length; i++){
                    if(checkedBox[i].checked){
                        checkValue.push(checkedBox[i].value)
                    }
                }
                checkValue = checkValue.toString()
                let params = {layoutId: this.selectedNo, ids: checkValue}
                this.$api.postSaveTags(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("修改成功")
                            this.modalVisible = false
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getAdminDetail(value) {
                this.spinning = true
                let params = {"layoutId": value}
                this.$api.getAdminSet(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.spinning = false
                            this.siteAdmin = data.data.data.username
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            caseOff(value) {
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteCaseOff(params)
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
            caseOn(value) {
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteCaseOn(params)
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
            templateOn(value) {
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteTemplateOn(params)
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
            templateOff(value) {
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteTemplateOff(params)
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
            deleteSite(value) {
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteDelete(params)
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
            closeSite(value) {
                let params = {"layoutId": value.layoutId}
                this.$api.postSiteClose(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("关闭成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            copySite(value) {
                let params = {"layoutId": value.layoutId}
                this.$api.postCopySite(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("复制成功")
                            this.$emit('refresh', new Date().getTime())
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            changeImg(value, type) {
                // this.$emit('imgSelectShow', this.imgSelectShow)
                // this.imgSelectShow = !this.imgSelectShow
                this.imgModalVisible = true
                this.uploadData.layoutId = value.layoutId
                if(type == 'logo'){
                    this.imgModalTitle = '修改公司logo'
                    this.imgUploadAction = `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/logo/edit`
                    console.log(value)
                }else if(type == 'pic'){
                    console.log(value)
                    this.imgModalTitle = '修改首屏图片'
                    this.imgUploadAction = `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/pic/edit`
                }else{
                    console.log(value)
                    this.imgModalTitle = '修改移动端首屏图片'
                    this.imgUploadAction = `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/mobile/pic/edit`
                }
            },
            show404Imgs(event) {
                event.target.src = "http://cdn.jihui88.com/upload/j/j2/jhw_xlk/picture/2020/08/14/b4527c4b-f1f6-4e63-bef2-7daf7dd64b32.png"
            },
            editList(key) {
                const data = [...this.data]
                // this.showEditBox = true
                const target = data.filter(item => key === item.layoutId)[0];
                console.log(data)
                this.editingKey = key;
                if (target) {
                    target.editable = true;
                    this.inputId = target.seoTitle || ""
                }
            },
            cancelEdit(key) {
                const data = [...this.data]
                // this.showEditBox = true
                const target = data.filter(item => key === item.layoutId)[0];
                if (target) {
                    delete target.editable;
                    this.inputId = ""
                }
                this.editingKey = "";
            },
            saveEdit(key) {
                const data = [...this.data]
                // this.showEditBox = true
                const target = data.filter(item => key === item.layoutId)[0];
                this.editingKey = "";
                if (target) {
                    let params = {"layoutId": target.layoutId, "name": this.inputId}
                    this.console && console.log(params)
                    this.$api.postSiteNameEdit(params)
                        .then((data) => {
                            this.console && console.log(data)
                            if (data.data.code == 0 && data.data.msg == "success") {
                                this.$message.success("编辑成功")
                                target.seoTitle = this.inputId
                            } else {
                                this.$message.error(data.data.msg)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    delete target.editable;
                }
            },
            handleChange(info) {
                console.log(info)
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if(info.file.response.code == 0 && info.file.response.msg == 'success'){
                        this.$message.success('图片上传成功');
                        this.$emit('refresh', new Date().getTime())
                    }else{
                        this.$message.error(info.file.response.msg + '，请重新上传');
                    }
                } else if (info.file.status === 'error') {
                    this.$message.error('图片上传失败，请重新上传');
                }
            },
            compressImg(info,infolist) {
                // let that = this
                console.log(info,infolist)
                if(info.size > 2048000){
                    this.$message.error('图片上传大小不得大于2M');
                    return false
                }
                // lrz( info, {
                //     quality: 0.7    //自定义使用压缩方式
                // })
                //     .then(function(rst) {
                //         console.log(rst)
                //         that.handleChange(rst)
                //         //成功时执行
                //     }).catch(function(error) {
                //     console.log(error)
                //     //失败时执行
                // }).always(function() {
                //     //不管成功或失败，都会执行
                // })
            },
            getState(type) {
                let state
                switch (type) {
                    case "0":
                        state = "未审核"
                        break;
                    case "1":
                        state = "已审核"
                        break;
                    case "2":
                        state = "已过期"
                        break;
                    case "3":
                        state = "已删除"
                        break;
                    case "4":
                        state = "已关闭"
                        break;
                    default:
                        state = "其它"
                }
                return state
            },
            getLanguage(type){
                let state
                switch (type) {
                    case "1":
                        state = "中文"
                        break;
                    case "2":
                        state = "英语"
                        break;
                    case "3":
                        state = "日语"
                        break;
                    case "4":
                        state = "韩语"
                        break;
                    case "5":
                        state = "德语"
                        break;
                    case "6":
                        state = "法语"
                        break;
                    case "7":
                        state = "西班牙语"
                        break;
                    case "8":
                        state = "俄语"
                        break;
                    case "9":
                        state = "阿拉伯语"
                        break;
                    case "10":
                        state = "葡萄牙语"
                        break;
                    case "11":
                        state = "荷兰语"
                        break;
                    default:
                        state = "其它"
                }
                return state
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

    .table-content-img-box {
        width: 100px;
        height: 100px;
    }

    .table-content-img-box.flex {
        align-items: center;
        justify-content: center;
    }

    .table-content-img {
        align-items: center;
        justify-content: center;
    }

    .colorOrange{
        color: #faad14;
    }

    .colorRed{
        color: #f5222d;
    }
</style>

