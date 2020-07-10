<template>
    <div>
        <div ref="imageWrapper" style="width: 450px;margin: 0 auto">
            <div class="main-image">
                <img src="../../assets/img/banner1.jpg" alt="">
                <div class="showLogo" @click="toggleLogo">
                    <img src="../../assets/img/dongfang-logo.png" alt="" class="toggle-logo" v-show="showLogo">
                    <img src="../../assets/img/jihui-logo.png" alt="" class="toggle-logo toggle-logo2" v-show="!showLogo">
                </div>
            </div>
            <div class="screenshots-detail">
                <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" style="margin: 0 auto;width:400px;">
                    <p class="screenshots-detail-title"><span>{{showLogo ? '东方五金网' : '机汇网'}}</span>客户又收到精准询盘</p>
                    <a-form-model-item label="公司名称" v-if="form.companyName">
                        <a-input v-model="form.companyName" read-only/>
                    </a-form-model-item>
                    <div class="company-img">
                        <div class="company-img-border">
                            <img src="../../assets/img/mask.png" alt="" class="company-img-mask">
                        </div>
                        <img src="../../assets/img/banner1.jpg" alt="" class="company-img-content">
                    </div>
                    <a-form-model-item label="公司官网" v-if="form.companySite">
                        <a-input v-model="form.companySite" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="联系电话" v-if="form.phone">
                        <a-input v-model="form.phone" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="电子邮件" v-if="form.email">
                        <a-input v-model="form.email" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="留言时间" v-if="form.messageTime">
                        <a-input v-model="form.messageTime" read-only/>
                    </a-form-model-item>
                    <a-form-model-item label="留言内容" v-if="form.messageContent">
                        <!--<a-input v-model="form.messageContent"/>-->
                        <div class="imitate-input">{{form.messageContent}}</div>
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
                labelCol: { span:6 },
                wrapperCol: { span: 16 },
                showLogo: true,
                form: {
                    companyName: "浙江天哥有限公司",
                    companySite: "www.baidu.com",
                    phone: "13813813813",
                    email: "aaaa@163.com",
                    messageTime: "2018-12-12",
                    messageContent: "7月8日11时25分，高考文科综合/理科综合科目考试将要结束时，平顶山市一中考点一考生突然情绪失控，先后抓其右边、后边考生答题卡，造成两位考生答题卡损毁。考场两位监考教师及时制止，并稳定了考场秩序，市一中考点按程序启用备用答题卡，按规定补足答题卡被损毁的两位考生耽误的考试时间，两位考生将损毁卡的内容誊写在新答题卡上。",
                }
            }
        },
        mounted(){
            // console.log("a",this.$route.query.id)
        },
        methods: {
            toImage() {
                html2canvas(this.$refs.imageWrapper,{
                    scale: 3,
                    debug: true,
                    useCORS: true,
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
                    link.setAttribute("download","截图.png");
                    link.style.display = "none";//a标签隐藏
                    document.body.appendChild(link);
                    link.click();
                });
            },
            toggleLogo() {
                this.showLogo = !this.showLogo
            }
        }
    }
</script>

<style scoped>

</style>