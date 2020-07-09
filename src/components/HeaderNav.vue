<template>
    <div>
        <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="sendCollapsedStatus"
        />
        <div class="login-status-bar">
            <a-icon type="search" style="margin-right: 20px"/>
            <a-badge dot style="margin-right: 20px">
                <a-icon type="bell"/>
            </a-badge>
            <a-avatar icon="user" size="small" style="margin-right: 20px"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderNav",
        data() {
            return{
                collapsed: false,
            }
        },
        methods: {
            sendCollapsedStatus:function (){
                this.$emit('collapsedStatus',!this.collapsed)
                this.collapsed = !this.collapsed
            }
        }
    }
</script>

<style scoped>

</style>