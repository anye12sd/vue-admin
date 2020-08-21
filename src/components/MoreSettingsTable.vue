<template>
    <div>
        <a-tabs default-active-key="1" @change="callback" class="tabs-box">
            <a-tab-pane key="1" tab="语言设置">
                <lang-setting></lang-setting>
            </a-tab-pane>
            <a-tab-pane key="2" tab="代理商配置">
                <agent-setting></agent-setting>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import LangSetting from "./ToolsFold/LangSetting";
    import AgentSetting from "./ToolsFold/AgentSetting";
    export default {
        name: "MoreSettingsTable",
        components: {AgentSetting, LangSetting},
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