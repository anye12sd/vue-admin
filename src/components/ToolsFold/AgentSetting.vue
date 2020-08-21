<template>
    <div>
        <div class="tools-select-box">
            <a-select style="width: 500px" v-model="adminId">
                <a-select-option value="">
                    请选择代理账号
                </a-select-option>
                <a-select-option v-for="item in adminIdAll" :value="item.adminId" :key="item.adminId" :title="'代理账号 ['+item.username+']-姓名 ['+item.name+']-公司 ['+item.entName+']'">
                    代理账号 [{{item.username}}]-姓名 [{{item.name}}]-公司 [{{item.entName}}]
                </a-select-option>
            </a-select>
        </div>
        <div class="tools-select-box">
            <a-input placeholder="会员账号" v-model="username" style="width: 200px"/>
        </div>
        <div class="tools-select-box">
            <a-button type="primary" @click="bindAgent">确定指派</a-button>
            <a-button @click="cancelBind" style="margin-left: 8px">取消指派</a-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AgentSetting",
        data(){
            return{
                console: false,
                username: "",
                adminId: "",
                adminIdAll: []
            }
        },
        mounted() {
            this.fetch()
        },
        methods: {
            fetch(){
                this.$api.getAgentList()
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.adminIdAll = data.data.data.agentList
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            bindAgent(){
                if(!this.adminId){
                    this.$message.error("请选择代理账号")
                    return false
                }
                if(!this.username){
                    this.$message.error("请输入会员账号")
                    return false
                }
                let params = {username: this.username, adminId: this.adminId}
                this.$api.postAgentBind(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("指派成功");
                        } else {
                            this.$message.error(data.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            cancelBind(){
                if(!this.username){
                    this.$message.error("请输入会员账号")
                    return false
                }
                let params = {username: this.username}
                this.$api.postCancelAgentBind(params)
                    .then((data) => {
                        this.console && console.log(data)
                        if (data.data.code == 0 && data.data.msg == "success") {
                            this.$message.success("修改成功");
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