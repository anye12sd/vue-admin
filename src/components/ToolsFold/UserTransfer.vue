<template>
    <div>
        <div class="tools-select-box">
            <a-input placeholder="原始设计师帐号" v-model="fromDesignUsername" style="width: 200px"/>
        </div>
        <div class="tools-select-box">
            <a-input placeholder="目标设计师帐号" v-model="toDesignUsername" style="width: 200px"/>
        </div>
        <div class="tools-select-box">
            <a-button type="primary" @click="replace">确定</a-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserTransfer",
        data(){
            return{
                fromDesignUsername: "",
                toDesignUsername: ""
            }
        },
        methods: {
            replace(){
                let params = {fromDesignUsername: this.fromDesignUsername, toDesignUsername: this.toDesignUsername}
                this.$api.postModuleTransfer(params)
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
        }
    }
</script>

<style scoped>

</style>