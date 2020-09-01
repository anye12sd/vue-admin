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
                    <img :src="'http://cdn.jihui88.com/' + pic " class="table-content-img" alt="" @error="show404Imgs">
                </div>
                <div class="table-content-span-edit">
                    <a @click="changeImg(record, 'pic')">[上传]</a>
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
                    <a href="javascript:;" class="table-content-a-inline" @click="showModal(record, 'label')">设置标签</a>
                </div>
                <div>
                    <a href="javascript:;" class="table-content-a-inline" @click="showModal(record, 'endTime')">设置模板到期时间</a>
                </div>
            </template>
        </a-table>
        <a-modal
                :title="modalTitle"
                :visible="modalVisible"
                @cancel="cancelModal"
                :wrapClassName="{'check-select-box': modalFlag == 'label'}"
        >
            <div v-if="modalFlag == 'endTime'" style="text-align: center">
                <template>
                    <a-date-picker v-model="endTimeSelect" :showToday="false" placeholder="请选择到期时间"/>
                </template>
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
                console: false,
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
                imgModalTitle: "",
                imgModalVisible: false,
                imgUploadAction: "",
                checkboxAll: [],
                checkedboxAll:[],
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
                    params = {...params, ...siteParams}
                }
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
            showModal(value, type) {
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
            cancelImgModal() {
                this.imgModalVisible = false
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

