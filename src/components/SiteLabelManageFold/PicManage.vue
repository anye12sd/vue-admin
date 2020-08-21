<template>
    <div class="page-header-index-wide">
        <a-card :bordered="false">
            <a-button @click="append(null,'addAlbum')">添加分类</a-button>
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-tree
                        :treeData="treeData"
                        class="treeClass"
                >
                    <template slot="custom" slot-scope="item">
                        <span>{{ item.title }}</span>
                        <a-button type="link" class="but_type" style="left:270px;" @click="()=> manage(item, 'manage')">
                            管理图片
                        </a-button>
                        <a-button type="link" class="but_type" style="left:350px;" @click="()=> categoryToUp(item)">
                            上移
                        </a-button>
                        <a-button type="link" class="but_type" style="left:400px;" @click="()=> categoryToDown(item)">
                            下移
                        </a-button>
                        <a-popconfirm
                                v-if="treeData.length"
                                title="确认删除吗?"
                                okText="确定" cancelText="取消"
                                @confirm="() => removeAlbum(item)"
                        >
                            <a-button type="link" class="but_type" style="left:450px">
                                删除
                            </a-button>
                        </a-popconfirm>
                    </template>
                </a-tree>
            </a-spin>
        </a-card>
        <a-modal v-model="visible" :title="modalTitle" @ok="submitEdit" okText="确定" cancelText="取消">
            <a-form-model :model="form" :label-col="labelCol"
                          :wrapper-col="wrapperCol">
                <a-form-model-item label="分类名称" prop="name">
                    <a-input v-model="form.name"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <img-select-modal :imgSelectShow="imgSelectShow" :albumId="albumId"></img-select-modal>
    </div>
</template>

<script>
    import ImgSelectModal from "../ImgSelectModal";
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
        name: "PicManage",
        components: {ImgSelectModal},
        data(){
            return{
                treeData,
                console: false,
                labelCol: {span: 6},
                wrapperCol: {span: 10},
                modalTitle: "",
                spinning: false,
                imgSelectShow: false,
                visible: false,
                modalType: "",
                albumId: 0,
                timer: "",
                form: {
                    name: "",
                },
            }
        },
        mounted() {
            this.fetchList()
        },
        methods: {
            fetchList(){
                this.spinning = true
                this.$api.getAlbumList()
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
                arr = arr.slice()
                function toParse(arr) {
                    arr.forEach(function (item) {
                        item.children = []
                        if (item.children && Array.isArray(item.children)) {
                            item[key] = item.albumId
                            item[title] = item.name
                            item['scopedSlots'] = {title: 'custom'}
                            let itemChild = item.children
                            toParse(itemChild)
                        }
                    })
                    return arr
                }
                return toParse(arr)
            },
            append(value, type){
                this.visible = true
                this.modalType = type
                if(type == "addAlbum"){
                    this.modalTitle = "添加分类"
                }else{
                    this.modalTitle = "分类添加"
                }
            },
            submitEdit(){
                if(this.modalType == "addAlbum"){
                    this.addAlbum()
                }
            },
            addAlbum(){
                if(!this.form.name){
                    this.$message.error("分类名称不能为空");
                    return false
                }
                let params = {name: this.form.name}
                console.log(params)
                this.$api.postAlbumAdd(params)
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
            categoryToUp(value){
                const index = parseInt(value.pos.split("-")[1])
                let albumIds = []
                if(index == 0){
                    return false
                }
                albumIds.push(this.treeData[index].albumId)
                albumIds.push(this.treeData[index - 1].albumId)
                albumIds = albumIds.toString()
                this.albumIdSort(albumIds)
            },
            categoryToDown(value){
                const index = parseInt(value.pos.split("-")[1])
                let albumIds = []
                if(index == this.treeData.length - 1){
                    return false
                }
                albumIds.push(this.treeData[index + 1].albumId)
                albumIds.push(this.treeData[index].albumId)
                albumIds = albumIds.toString()
                this.albumIdSort(albumIds)
            },
            albumIdSort(value){
                let params = {albumIds: value}
                this.$api.postAlbumSort(params)
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
            removeAlbum(value){
                let params = {albumId: value.albumId}
                this.$api.postAlbumDelete(params)
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
            manage(value){
                this.imgSelectShow = !this.imgSelectShow
                this.albumId = value.albumId
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