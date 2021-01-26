<template>
    <div>
        <div class="tools-select-box">
            <a-select style="width: 200px" v-model="type">
                <a-select-option value="">
                    请选择类型
                </a-select-option>
<!--                <a-select-option :value="1">-->
<!--                    中英文互导-->
<!--                </a-select-option>-->
                <a-select-option :value="2">
                    同平台互导
                </a-select-option>
            </a-select>
        </div>
        <div class="tools-select-box" style="margin-top: 20px">
            <p v-if="type == 1">中英文数据互导</p>
            <a-form layout="inline" :form="form">
                <div>
                    <a-form-item label="来源用户">
                        <a-input
                                v-decorator="[
                                  'originUserName',
                                  { rules: [{ required: true, message: '请输入来源用户名' }] },
                                ]"
                        >
                        </a-input>
                    </a-form-item>
                </div>
                <div>
                    <a-form-item label="目标用户">
                        <a-input
                                v-decorator="[
                                  'targetUsername',
                                  { rules: [{ required: true, message: '请输入目标用户名' }] },
                                ]"
                        >
                        </a-input>
                    </a-form-item>
                </div>
            </a-form>
        </div>
        <div class="tools-select-box" style="margin-top: 20px">
            <a-button type="primary" @click="importProduct">导入产品分类与产品</a-button>
            <a-button type="primary" @click="importNews" style="margin-left: 8px">导入新闻分类与新闻</a-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DataTransferTable",
        data() {
            return {
                console: false,
                type: "",
                form: this.$form.createForm(this, { name: 'horizontal_login' }),
            }
        },
        mounted() {

        },
        methods: {
            importProduct() {
                if(!this.type){
                    this.$message.error("请先选择类型")
                    return false
                }
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.$api.postProductTransfer(values)
                            .then((data) => {
                                this.console && console.log(data)
                                if (data.data.code == 0 && data.data.msg == "success") {
                                    this.$message.success("转移成功");
                                } else {
                                    this.$message.error(data.data.msg);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                });
            },
            importNews() {
                if(!this.type){
                    this.$message.error("请先选择类型")
                    return false
                }
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.$api.postNewsTransfer(values)
                            .then((data) => {
                                this.console && console.log(data)
                                if (data.data.code == 0 && data.data.msg == "success") {
                                    this.$message.success("转移成功");
                                } else {
                                    this.$message.error(data.data.msg);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>