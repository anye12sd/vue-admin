<template>
    <div>
        <div class="tools-select-box">
            <a-select style="width: 160px" v-model="type">
                <a-select-option value="jsp">
                    jsp代码
                </a-select-option>
                <a-select-option value="style">
                    style样式
                </a-select-option>
                <a-select-option value="scripts">
                    script脚本
                </a-select-option>
                <a-select-option value="lanName">
                    语言配置名称
                </a-select-option>
            </a-select>
        </div>
        <div class="tools-select-box">
            <a-select style="width: 160px" v-model="kind">
                <a-select-option value="all">
                    全部
                </a-select-option>
                <a-select-option value="c">
                    已上架
                </a-select-option>
                <a-select-option value="s">
                    未上架
                </a-select-option>
            </a-select>
        </div>
        <div class="tools-select-box">
            <a-input placeholder="原字符串" v-model="originWord"/>
        </div>
        <div class="tools-select-box">
            <a-input placeholder="待替换的字符串" v-model="replaceWord"/>
        </div>
        <div class="tools-select-box">
            <a-tooltip placement="top" overlayClassName="toolTip-box">
                <template slot="title">
                    <span style="color: #333">当模块里已存在此字符串，则取消插入，否则插入到模块的最前面</span>
                </template>
                <a-input placeholder="仅插入一次的字符串" v-model="replaceOne"/>
            </a-tooltip>
        </div>
        <div class="tools-select-box">
            <a-button type="primary" @click="checkResult">检查待替换的模块</a-button>
            <a-button type="primary" style="margin-left: 8px" @click="replaceAll">确定替换</a-button>
        </div>
        <div class="tools-select-box">
            <div class="textarea">
                {{result}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContentReplace",
        data(){
            return{
                console: false,
                timer: null,
                result:"进度",
                originWord:"",
                replaceWord: "",
                replaceOne:"",
                type: "jsp",
                kind: "all"
            }
        },
        mounted() {

        },
        methods:{
            checkResult(){
                if(this.result.indexOf("全部完成") >= 0){
                    clearInterval(this.timer);
                    this.timer = null;
                }
                if(!this.originWord){
                    this.$message.error("替换的文字不能为空");
                    return false
                }
                this.$api.getModuleReplaceResult()
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.result = data.data.data.data
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            replaceAll(){
                let params = {kind: this.kind, originString: this.originWord, replaceOne: this.replaceOne, targetString:this.replaceWord, type:this.type}
                this.getResult()
                this.$api.postModuleReplace(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            console.log("完成")
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getResult() {
                if (!this.timer) {
                    this.timer = setInterval(this.checkResult, 2000);
                }
            }
        }
    }
</script>

<style scoped>

</style>