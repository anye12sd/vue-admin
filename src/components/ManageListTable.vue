<template>
    <div>
        <a-tabs default-active-key="1" @change="callback" class="tabs-box">
            <a-tab-pane key="1" tab="站点标签管理">
                <site-label-manage :key="timer" @refresh="refreshTable"></site-label-manage>
            </a-tab-pane>
            <a-tab-pane key="2" tab="模块标签管理">
                <module-tags-manage :key="timer" @refresh="refreshTable"></module-tags-manage>
            </a-tab-pane>
            <a-tab-pane key="3" tab="系统图片管理">
                <pic-manage :key="timer" @refresh="refreshTable"></pic-manage>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import SiteLabelManage from "./SiteLabelManageFold/SiteLabelManage";
    import ModuleTagsManage from "./SiteLabelManageFold/ModuleTagsManage";
    import PicManage from "./SiteLabelManageFold/PicManage";
    export default {
        name: "ManageListTable",
        components: {PicManage, ModuleTagsManage, SiteLabelManage},
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