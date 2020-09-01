<template>
    <div>
        <a-modal v-model="visible" title="我的素材" @ok="handleOk" okText="确定" cancelText="取消" class="img-select-modal"
                 @cancel="cancelModal">
            <a-spin tip="加载中。。。" :spinning="spinning">
                <div>
                    <div v-if="data.length" class="flex flexWrap">
                        <div v-for="(item) in data" :key="item.attId" class="img-select-box" @mouseenter="showMask"
                             @mouseleave="hideMask">
                            <img :src="'http://cdn.jihui88.com/'+item.serverPath" alt="">
                            <p class="img-select-name">{{item.filename}}</p>
                            <div class="img-select-mask">
                                <a href="javascript:;" class="img-select-mask-a" title="复制图片地址"
                                   v-clipboard:copy="'http://cdn.jihui88.com/'+item.serverPath"
                                   v-clipboard:success="onCopy"
                                   v-clipboard:error="onError">
                                    <a-icon type="copy"></a-icon>
                                </a>
                                <a href="javascript:;" class="img-select-mask-a" title="删除" :data-id="item.attId"
                                   @click="deleteImg($event)">
                                    <a-icon type="delete"></a-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; width: 100%" v-else>
                        <a-empty description="暂无数据"/>
                    </div>
                </div>
                <template>
                    <a-pagination simple @change="fetch" :pageSize="pagination.pageSize" :total="pagination.total"
                                  :key="timer" style="float: right;margin-top: 16px"/>
                    <div style="clear: both"></div>
                </template>
            </a-spin>
            <template slot="footer">
                <a-button @click="cancelModal">取消</a-button>
                <a-button type="primary" @click="cancelModal">确定</a-button>
                <a-button style="float: left" @click="upload">上传图片</a-button>
            </template>
        </a-modal>
        <a-upload
                name="Filedata"
                style="display: none"
                :multiple="false"
                :action="imgUploadAction"
                :headers="headers"
                :data="uploadData"
                @change="handleChange"
                :before-upload="compressImg"
        >
            <a-button style="float: left" id="uploadBtn">上传图片</a-button>
        </a-upload>
    </div>
</template>

<script>
    export default {
        name: "ImgSelectModal",
        props: {
            "imgSelectShow": Boolean,
            "albumId": Number
        },
        data() {
            return {
                console: false,
                visible: false,
                data: [],
                spinning: false,
                timer: "",
                simpleImage: "",
                imgUploadAction: `${process.env.VUE_APP_BASE_CODE_URL}/admin/pc/album/att/upload`,
                pagination: {page: 1, current: 1, total: 1, pageSize: 15},
                headers: {
                    "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
                },
                uploadData: {
                    albumId: ""
                }
            };
        },
        mounted() {

        },
        watch: {
            imgSelectShow: function (n) {
                console.log(n)
                if (n == false) {
                    this.visible = true
                } else {
                    this.visible = n
                }
                this.fetch(1)
            }
        },
        methods: {
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
            fetch(e) {
                // e为change后的当前分页
                this.spinning = true
                console.log(e)
                this.uploadData.albumId = this.albumId
                this.pagination.current = e || 1
                let params = {pageSize: this.pagination.pageSize, page: this.pagination.current, albumId: this.albumId}
                this.$api.getAlbumPicList(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.spinning = false
                            const pagination = {...this.pagination};
                            pagination.total = data.data.data.count
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
            cancelModal() {
                this.visible = false
                this.timer = new Date().getTime()
            },
            handleChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if (info.file.response.code == 0 && info.file.response.msg == 'success') {
                        this.$message.success('图片上传成功');
                        this.fetch();
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
            },
            upload() {
                document.getElementById('uploadBtn').click()
            },
            showMask(e) {
                e.srcElement.lastChild.style.display = 'block'
            },
            hideMask(e) {
                e.srcElement.lastChild.style.display = 'none'
            },
            deleteImg(e) {
                const imgId = e.currentTarget.getAttribute("data-id")
                let params = {attId: imgId}
                this.$api.postAlbumPicDelete(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("删除成功")
                            this.fetch()
                        } else {
                            this.$message.error(data.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            // 复制成功
            onCopy(){
                this.$message.success('已复制')
            },
            // 复制失败
            onError(){
                this.$message.error('复制失败')
            },
        },
    };
</script>

<style scoped>
    #uploadBtn {
        display: none;
    }
</style>