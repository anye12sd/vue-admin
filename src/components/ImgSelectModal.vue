<template>
    <div>
        <a-modal v-model="visible" title="我的素材" @ok="handleOk" okText="确定" cancelText="取消" class="img-select-modal">
            <a-spin tip="加载中。。。" :spinning="spinning">
                <div class="flex flexWrap">
                    <div v-for="(item) in data" :key="item.login.uuid" class="img-select-box">
                        <img :src="item.picture.large" alt="">
                    </div>
                </div>
                <template>
                    <a-pagination simple @change="fetch" :total="50" style="float: right;margin-top: 16px"/>
                    <div style="clear: both"></div>
                </template>
            </a-spin>
            <template slot="footer">
                <a-button @click="cancelModal">取消</a-button>
                <a-button type="primary">确定</a-button>
                <a-button style="float: left">上传图片</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import reqwest from 'reqwest';
    export default {
        name: "ImgSelectModal",
        props: ["imgSelectShow"],
        data() {
            return {
                visible: false,
                data: [],
                spinning: false
            };
        },
        mounted() {
            this.fetch()
        },
        watch :{
            imgSelectShow: function (n) {
                if (n == false) {
                    this.visible = true
                } else {
                    this.visible = n
                }
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
                // let params = {pageSize: 10, page: this.pagination.current}
                // console.log(params)
                // this.$api.getModuleList(params)
                //     .then((data) => {
                //         this.console && console.log(data)
                //         if (data.data.code == 0 && data.data.msg == "success") {
                //             this.loading = false
                //             const pagination = {...this.pagination};
                //             pagination.total = data.data.data.totalElements
                //             this.data = data.data.data.content
                //             this.pagination = pagination
                //         } else {
                //             this.$message.error(data.data.msg);
                //         }
                //     })
                //     .catch((err) => {
                //         console.log(err)
                //     })
                reqwest({
                    url: 'https://randomuser.me/api',
                    method: 'get',
                    data: {
                        results: 15,
                    },
                    type: 'json',
                }).then(data => {
                    const pagination = {...this.pagination};
                    // Read total count from server
                    // pagination.total = data.totalCount;
                    pagination.total = 200;
                    this.spinning = false;
                    this.data = data.results;
                    console.log(this.data)
                    this.pagination = pagination;
                });
            },
            cancelModal(){
                this.visible = false
            }
        },
    };
</script>

<style scoped>

</style>