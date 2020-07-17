<template>
    <div>
        <div ref="imageWrapper" style="width: 450px;margin: 0 auto">
            <div class="main-image">
                <img src="../../assets/img/banner1.jpg" alt="">
                <div class="showLogo" @click="toggleLogo">
                    <img src="../../assets/img/dongfang-logo.png" alt="" class="toggle-logo" v-show="showLogo">
                    <img src="../../assets/img/jihui-logo.png" alt="" class="toggle-logo toggle-logo2"
                         v-show="!showLogo">
                </div>
            </div>
            <div class="screenshots-detail">
                <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol"
                              style="margin: 0 auto;width:400px;">
                    <p class="screenshots-detail-title"><span>{{showLogo ? '东方五金网' : '机汇网'}}</span>客户又收到精准询盘</p>
                    <a-form-model-item label="公司名称" v-if="form.companyName">
                        <a-input v-model="form.companyName" read-only/>
                    </a-form-model-item>
                    <div class="company-img" v-if="form.pic">
                        <div class="company-img-border">
                            <img src="../../assets/img/mask.png" alt="" class="company-img-mask">
                        </div>
                        <img :src="form.pic" alt="" class="company-img-content" crossOrigin="anonymous">
                    </div>
                    <a-form-model-item label="公司官网" v-if="form.entUrl">
                        <a-input v-model="form.entUrl" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="联系电话" v-if="form.fromPhone">
                        <a-input v-model="form.fromPhone" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="电子邮件" v-if="form.fromEmail">
                        <a-input v-model="form.fromEmail" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="留言时间" v-if="form.addTime">
                        <a-input v-model="form.addTime" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="留言内容" v-if="form.content">
                        <!--<a-input v-model="form.messageContent"/>-->
                        <div class="imitate-input" v-html="form.content"></div>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </div>
        <div class="postBtn">
            <button @click="toImage">点击生成海报图片</button>
        </div>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas'

    export default {
        name: "ScreenshotsToCustomer",
        data() {
            return {
                console: false,
                labelCol: {span: 6},
                wrapperCol: {span: 16},
                showLogo: true,
                form: {
                    companyName: "",
                    entUrl: "",
                    fromPhone: "",
                    fromEmail: "",
                    addTime: "",
                    content: "",
                    pic: ""
                }
            }
        },
        mounted() {
            this.fetch();
        },
        methods: {
            fetch() {
                let params = {messageId: this.$route.query.messageId}
                this.console && console.log('params:', params);
                this.$https.fetchGet('/admin/message/detail', params)
                    .then((data) => {
                        this.console && console.log(data)
                        this.form = data.data.data;
                        this.form.addTime = new Date(this.form.addTime).toLocaleString()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            toImage() {
                document.getElementById("app").scrollIntoView();
                html2canvas(this.$refs.imageWrapper, {
                    scale: 3,
                    debug: true,
                    useCORS: true,
                    allowTaint: true,//允许跨域图片
                    scrollY: 0,
                    scrollX: 0
                }).then(canvas => {
                    let dataURL = canvas.toDataURL("image/png");
                    this.imgUrl = dataURL;
                    if (this.imgUrl !== "") {
                        this.dialogTableVisible = true;
                    }
                    let link = document.createElement("a");
                    link.href = canvas.toDataURL();//下载链接
                    link.setAttribute("download", "截图.png");
                    link.style.display = "none";//a标签隐藏
                    document.body.appendChild(link);
                    link.click();
                });
            },
            toggleLogo() {
                this.showLogo = !this.showLogo
            },
        }
    }
</script>

<style scoped>

</style>