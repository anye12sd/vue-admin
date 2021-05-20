<template>
    <div class="page-header-index-wide">
        <a-card :bordered="false">
            <a-button @click="append(null,'addAlbum')">添加分类</a-button>
            <a-spin :spinning="spinning" tip="加载中。。。">
                <a-tree
                        v-if="treeData.length"
                        :treeData="treeData"
                        class="treeClass"
                        :defaultExpandAll="true"
                        @select="onSelect"
                >
                    <template slot="custom" slot-scope="item">
                        <span>{{ item.title }}</span>
                        <a-button type="link" class="but_type" style="left:370px;" @click="()=> edit(item, 'editAlbum')">
                            编辑
                        </a-button>
                        <a-button type="link" class="but_type" style="left:270px;" @click="()=> manage(item, 'manage')">
                            管理图片
                        </a-button>
<!--                        <a-button type="link" class="but_type" style="left:350px;" @click="()=> categoryToUp(item)">-->
<!--                            上移-->
<!--                        </a-button>-->
<!--                        <a-button type="link" class="but_type" style="left:400px;" @click="()=> categoryToDown(item)">-->
<!--                            下移-->
<!--                        </a-button>-->
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
                <a-form-model-item label="上级分类" prop="albumId" v-if="showSelect">
                    <a-select v-model="form.albumId" placeholder="请选择">
                        <a-select-option value="" :belongId="null">
                            请选择
                        </a-select-option>
                        <a-select-option v-for="item in category" :key="item.key" :value="item.key"
                                         :belongId="item.belongId">
                            {{item.title}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
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
    // const treeData = [
    //     {
    //         title: '0-0',
    //         key: '0-0',
    //         scopedSlots: {title: 'custom'},
    //         children: [
    //             {
    //                 title: '0-0-0',
    //                 key: '0-0-0',
    //                 scopedSlots: {title: 'custom'},
    //                 children: [
    //                     {title: '0-0-0-0', key: '0-0-0-0', scopedSlots: {title: 'custom'}},
    //                     {title: '0-0-0-1', key: '0-0-0-1', scopedSlots: {title: 'custom'}},
    //                     {title: '0-0-0-2', key: '0-0-0-2', scopedSlots: {title: 'custom'}}
    //                 ]
    //             },
    //             {
    //                 title: '0-0-1',
    //                 key: '0-0-1',
    //                 scopedSlots: {title: 'custom'},
    //                 children: [
    //                     {title: '0-0-1-0', key: '0-0-1-0', scopedSlots: {title: 'custom'}},
    //                     {title: '0-0-1-1', key: '0-0-1-1', scopedSlots: {title: 'custom'}},
    //                     {title: '0-0-1-2', key: '0-0-1-2', scopedSlots: {title: 'custom'}}
    //                 ]
    //             },
    //             {
    //                 title: '0-0-2',
    //                 key: '0-0-2',
    //                 scopedSlots: {title: 'custom'}
    //             }
    //         ]
    //     },
    //     {
    //         title: '0-1',
    //         key: '0-1',
    //         scopedSlots: {title: 'custom'},
    //         children: [
    //             {title: '0-1-0-0', key: '0-1-0-0', scopedSlots: {title: 'custom'}},
    //             {title: '0-1-0-1', key: '0-1-0-1', scopedSlots: {title: 'custom'}},
    //             {title: '0-1-0-2', key: '0-1-0-2', scopedSlots: {title: 'custom'}}
    //         ]
    //     },
    //     {
    //         title: '0-2',
    //         key: '0-2',
    //         scopedSlots: {title: 'custom'}
    //     }
    // ]
    export default {
        name: "PicManage",
        components: {ImgSelectModal},
        data(){
            return{
                treeData: [],
                console: false,
                labelCol: {span: 6},
                wrapperCol: {span: 10},
                modalTitle: "",
                spinning: false,
                expandFlag: false,
                imgSelectShow: false,
                visible: false,
                modalType: "",
                albumId: 0,
                category: [],
                showSelect: true,
                selectedAlbum: 0,
                timer: "",
                form: {
                    name: "",
                    albumId: ""
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
                            this.treeData = this.generateOptions(dataList)
                            // console.log(this.treeData)
                            this.spinning = false
                            this.expandFlag = true
                            // this.parseJson(dataList)
                            // console.log(dataList)
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
            onSelect(selectedKeys) {
                this.console && console.log(selectedKeys)
                // console.log('selected', selectedKeys, info);
                // this.selectedAlbum = selectedKeys[0]
            },
            append(value, type){
                this.showSelect = true
                this.form.name = ""
                this.visible = true
                this.modalType = type
                if(type == "addAlbum"){
                    this.modalTitle = "添加分类"
                }else{
                    this.modalTitle = "分类添加"
                }
            },
            edit(value, type){
                this.modalTitle = "编辑分类"
                this.showSelect = false
                this.albumId = value.albumId
                this.visible = true
                this.modalType = type
                this.form.name = value.name
            },
            submitEdit(){
                if(this.modalType == "addAlbum"){
                    this.addAlbum()
                }else if(this.modalType == "editAlbum"){
                    this.editAlbum()
                }
            },
            addAlbum(){
                // if(!this.form.albumId){
                //     this.$message.error("请选择上级分类");
                //     return false
                // }
                if(!this.form.name){
                    this.$message.error("分类名称不能为空");
                    return false
                }
                let params = {name: this.form.name, belongId: this.form.albumId || 0}
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
            editAlbum(){
                if(!this.form.name){
                    this.$message.error("分类名称不能为空");
                    return false
                }
                let params = {name: this.form.name, albumId: this.albumId}
                this.$api.postAlbumEdit(params)
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
            categoryToUp(value){
                console.log(value)
                // 首先获取索引 0-0, 0-0-1, 0-0-0-1
                const posArray = value.pos.split("-")
                console.log(posArray)
                const posArrayIndex = posArray[posArray.length - 1]
                console.log(posArrayIndex)
                if(posArrayIndex == 0){
                    // 表示是该层级下的最上面一个
                    return false
                }
                let childrenArray = this.treeData
                let childrenSelectArray = [] // 当前选中的节点
                let childrenSelectArrayPrev = [] // 当前选中节点的上一个节点
                for(var i = 1; i < posArray.length; i++){
                    if(i == posArray.length - 1){
                        childrenSelectArray = childrenArray[posArray[i]]
                        childrenSelectArrayPrev = childrenArray[posArray[i] - 1]
                    }
                    childrenArray = childrenArray[posArray[i]].children
                }
                console.log(childrenSelectArray)
                console.log(childrenSelectArrayPrev)
                // const index = parseInt(value.pos.split("-")[1])
                let albumIds = []
                // if(index == 0){
                //     return false
                // }
                albumIds.push(childrenSelectArray.albumId)
                albumIds.push(childrenSelectArrayPrev.albumId)
                albumIds = albumIds.toString()
                this.albumIdSort(albumIds)
            },
            categoryToDown(value){
                const posArray = value.pos.split("-")
                let childrenArray = this.treeData
                for(var i = 1; i < posArray.length; i++){
                    if(i == posArray.length - 1) {
                        childrenArray = childrenArray[posArray[i]]
                    }
                }
                console.log(childrenArray)
                // let albumIds = []
                // if(index == this.treeData.length - 1){
                //     return false
                // }
                // albumIds.push(this.treeData[index + 1].albumId)
                // albumIds.push(this.treeData[index].albumId)
                // albumIds = albumIds.toString()
                // this.albumIdSort(albumIds)
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

            // 开始递归方法
            generateOptions(params) {
                let that = this
                var result = []
                for (const param of params) {
                    if (param.belongId === 0) {  // 判断是否为顶层节点
                        var parent = {
                            'key': param.albumId,
                            'albumId': param.albumId,
                            'title': param.name,
                            'name': param.name,
                            'scopedSlots': {title: "custom"}
                        }
                        const category = {'key': param.albumId, 'title': param.name, 'belongId': param.belongId}
                        that.category.push(category)
                        parent.children = this.getchilds(param.albumId, params)  // 获取子节点
                        result.push(parent)
                    }
                }
                return result
            },

            getchilds(id, array) {
                const childs = []
                for (const arr of array) {  // 循环获取子节点
                    if (arr.belongId === id) {
                        childs.push({
                            'key': arr.albumId,
                            'albumId': arr.albumId,
                            'title': arr.name,
                            'name': arr.name,
                            'scopedSlots': {title: "custom"}
                        })
                    }
                }
                for (const child of childs) { // 获取子节点的子节点
                    const childscopy = this.getchilds(child.albumId, array)// 递归获取子节点
                    if (childscopy.length > 0) {
                        child.children = childscopy
                    }
                }
                return childs
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