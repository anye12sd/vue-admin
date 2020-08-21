<template>
    <div>
        <a-tabs default-active-key="1" @change="callback" class="tabs-box">
            <a-tab-pane key="1" tab="替换内容">
                <content-replace></content-replace>
            </a-tab-pane>
            <a-tab-pane key="2" tab="设计师帐号模块转移">
                <user-transfer></user-transfer>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import ContentReplace from "./ToolsFold/ContentReplace";
    import UserTransfer from "./ToolsFold/UserTransfer";
    export default {
        name: "ToolsTable",
        components: {UserTransfer, ContentReplace},
        data() {
            return {
                timer: ""
            }
        },
        methods:{
            callback(key) {
                console.log(key);
            },
            refreshTable: function (data) {
                this.timer = data
            },
        }
    }
</script>

<style scoped>

</style>