<template>
    <div>
        <div class="tools-select-box">
            <a-input placeholder="请输入账号" v-model="username" style="width: 200px"/>
            <a-button type="primary" @click="check" style="margin-left: 8px">查询</a-button>
        </div>
        <div class="tools-select-box" v-show="langSelect">
            <a-select
                    :key="timer"
                    mode="multiple"
                    :default-value="selectedValue"
                    style="width: 200px"
                    placeholder="请设置语言"
                    @change="handleChange"
            >
                <a-select-option v-for="item in lang" :key="item.value" :value="item.value">
                    {{ item.name }}
                </a-select-option>
            </a-select>
            <a-button type="primary" @click="submitCheck" style="margin-left: 8px">确定</a-button>
        </div>
    </div>
</template>

<script>
    const lang = [
        {"name": "中文" , "value": "1"},
        {"name": "英文" , "value": "2"},
        {"name": "日语" , "value": "3"},
        {"name": "韩语" , "value": "4"},
        {"name": "德语" , "value": "5"},
        {"name": "法语" , "value": "6"},
        {"name": "西班牙语" , "value": "7"},
        {"name": "俄语" , "value": "8"},
        {"name": "阿拉伯语" , "value": "9"},
        {"name": "葡萄牙语" , "value": "10"},
        {"name": "荷兰语" , "value": "11"},
        {"name": "中文繁体", "value": "12"}
    ]
    export default {
        name: "LangSetting",
        data() {
            return {
                console: false,
                lang,
                username: "",
                selectedValue: [],
                timer:"",
                langSelect: false
            }
        },
        methods: {
            check() {
                let params = {username: this.username}
                this.$api.getLanguageDetail(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.selectedValue = data.data.data.data.split(",")
                            console.log(this.selectedValue)
                            this.timer = new Date().getTime()
                            this.langSelect = true
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            handleChange(value) {
                this.selectedValue = value
            },
            submitCheck(){
                let params = {lanList: this.selectedValue.toString(), username: this.username}
                this.$api.postLanguageSave(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("设置成功");
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>

</style>