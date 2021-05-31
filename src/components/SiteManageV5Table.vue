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
            <template slot="layoutId" slot-scope="layoutId, record">
                <div v-if="!record.parentId">
                    <span>
                        [父]{{layoutId}}
                    </span>
                    <a :href="'http://pc.jihui88.com/rest/site/'+layoutId+'/index'" target="_blank">[查看]</a>
                </div>
                <div v-else>
                    <div>
                        <span>
                            [子]{{layoutId}}
                        </span>
                        <a :href="'http://pc.jihui88.com/rest/site/'+layoutId+'/index'" target="_blank">[查看]</a>
                    </div>
                    <div>
                        <span>
                            [父]{{record.parentId}}
                        </span>
<!--                        <span style="color: #1890ff; cursor: pointer" @click="findParent(record.parentId)">[查找]</span>-->
                        <router-link :to="{path: '/views/SiteManageV5?layoutId='+ record.parentId}" target='_blank'>[查找]</router-link>
                    </div>
                </div>
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
            <template slot="url" slot-scope="url">
                <span :title="url">
                    {{ url }}
                </span>
            </template>
            <template slot="state" slot-scope="state, record">
                <span :title="getState(state)">
                    {{ getState(state) }}
                    <a href="javascript:;" v-if="state == 3" class="table-content-a"
                       @click="restoreSite(record.layoutId)">[恢复]</a>
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
                <div>
                    <a href="javascript:;" class="block" @click="showModal('js', record)">全局脚本</a>
                </div>
                <div>
                    <a href="javascript:;" class="block" @click="showModal('style', record)">全局样式</a>
                </div>
                <div>
                    <a href="javascript:;" class="block" @click="showModal('clear', record)">清除缓存</a>
                </div>
            </template>
        </a-table>
        <a-modal
                :title="modalTitle"
                :visible="modalVisible"
                @cancel="cancelModal"
        >
            <div v-if="modalFlag == 'js'">
                <template>
                    <a-textarea placeholder="请输入脚本" v-model="globalJs"/>
                </template>
            </div>
            <div v-else-if="modalFlag == 'style'">
                <template>
                    <a-textarea placeholder="请输入样式" v-model="globalStyle"/>
                </template>
            </div>
            <template slot="footer">
                <a-button @click="cancelModal">取消</a-button>
                <a-button type="primary" @click="readySubmit" :loading="btnLoading">确定</a-button>
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
                        <a-icon type="plus"/>
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
            width: '16%',
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
            title: '审核状态',
            dataIndex: 'state',
            width: '8%',
            scopedSlots: {customRender: 'state'},
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
        name: 'SiteManageV5Table',
        props: ["toChildPage"],
        data() {
            return {
                console: false,
                data: [],
                btnLoading: false,
                visible: false,
                modalVisible: false,
                spinning: true,
                globalJs: "",
                globalStyle: "",
                sort: undefined,
                modalTitle: "",
                selectedNo: "",
                modalFlag: "js",
                columns,
                imgModalVisible: false,
                imgModalTitle: "",
                endTimeSelect: undefined,
                inputId: "",
                pagination: {page: 1, current: 1},
                loading: false,
                imgSelectShow: false,
                imgUploadAction: "",
                headers: {
                    "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
                },
                uploadData: {
                    layoutId: ""
                }
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
                let params = {pageSize: 10, page: this.pagination.current, appVersion: 'v5'}
                if (sessionStorage.getItem("siteParams")) {
                    let siteParams = JSON.parse(sessionStorage.getItem("siteParams"))
                    // 如果开始时间结束时间为空则删除这两个属性否则后台会报错
                    params = {...params, ...siteParams}
                }
                console.log(params)
                this.$api.getSiteManageV4List(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.loading = false
                            this.$emit("currentPage", this.pagination.current)
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
            },
            readySubmit() {
                this.btnLoading = true
                if (this.modalFlag == 'js') {
                    this.submitJS()
                } else if (this.modalFlag == 'style') {
                    this.submitStyle()
                }
            },
            submitJS() {
                let params = {"layoutId": this.selectedNo, "globalJs": this.globalJs}
                this.$api.postSaveGlobalJs(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("保存成功")
                            this.cancelModal()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                        this.btnLoading = false
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            submitStyle() {
                let params = {"layoutId": this.selectedNo, "globalStyle": this.globalStyle}
                this.$api.postSaveGlobalStyle(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("保存成功")
                            this.cancelModal()
                        } else {
                            this.$message.error(data.data.msg);
                        }
                        this.btnLoading = false
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            showModal(type, value) {
                if (type == 'js') {
                    this.getGlobal(value.layoutId)
                    this.modalTitle = "编辑全局脚本"
                    this.modalFlag = type
                    this.modalVisible = true
                } else if (type == 'style') {
                    this.getGlobal(value.layoutId)
                    this.modalTitle = "编辑全局样式"
                    this.modalVisible = true
                    this.modalFlag = type
                } else if (type == 'clear') {
                    this.clearCache(value.layoutId)
                    this.modalFlag = type
                }
            },
            getGlobal(id){
                this.spinning = true
                let params = {layoutId: id}
                this.$api.getLayoutDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.spinning = false
                            this.globalJs = data.data.data.globalJs || ""
                            this.globalStyle = data.data.data.globalStyle || ""
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            clearCache(id) {
                let params = {layoutId: id}
                this.$api.postClearCache(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success('清除成功');
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
            cancelImgModal() {
                this.imgModalVisible = false
            },
            changeImg(value, type) {
                // this.$emit('imgSelectShow', this.imgSelectShow)
                // this.imgSelectShow = !this.imgSelectShow
                this.imgModalVisible = true
                this.uploadData.layoutId = value.layoutId
                if (type == 'logo') {
                    this.imgModalTitle = '修改公司logo'
                    this.imgUploadAction = `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/logo/edit`
                    console.log(value)
                } else if (type == 'pic') {
                    console.log(value)
                    this.imgModalTitle = '修改首屏图片'
                    this.imgUploadAction = `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/pic/edit`
                } else {
                    console.log(value)
                    this.imgModalTitle = '修改移动端首屏图片'
                    this.imgUploadAction = `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/layout/mobile/pic/edit`
                }
            },
            handleChange(info) {
                console.log(info)
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if (info.file.response.code == 0 && info.file.response.msg == 'success') {
                        this.$message.success('图片上传成功');
                        this.$emit('refresh', new Date().getTime())
                    } else {
                        this.$message.error(info.file.response.msg + '，请重新上传');
                    }
                } else if (info.file.status === 'error') {
                    this.$message.error('图片上传失败，请重新上传');
                }
            },
            compressImg(info, infolist) {
                // let that = this
                console.log(info, infolist)
                if (info.size > 2048000) {
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
            parseJson(arr) {
                let title = 'value'
                let key = 'label'
                arr = arr.slice()

                function toParse(arr) {
                    arr.forEach(function (item) {
                        if (item.children && Array.isArray(item.children)) {
                            item.tagList.forEach(function (itemTag) {
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
            getLanguage(type) {
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

    .colorOrange {
        color: #faad14;
    }

    .colorRed {
        color: #f5222d;
    }
</style>

