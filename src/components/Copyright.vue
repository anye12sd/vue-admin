<template>
    <div class="login-bottom">
        <div class="login-bottom-text">
            <p>帮助</p>
            <p>隐私</p>
            <p>条款</p>
        </div>
        <div class="copyright">
            <p>copyright © {{year}} 机汇科技出品</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Copyright",
        data() {
            return{
                year: ""
            }
        },
        mounted() {
            this.year = new Date().getFullYear()
        }
    }
</script>

<style scoped>
    .login-bottom {
        /*position: absolute;*/
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 5px;
        text-align: center;
        /*width: 300px;*/
    }

    .login-bottom-text p {
        display: inline-block;
        padding: 0 10px;
        margin-bottom: 5px;
    }

    .copyright {
        font-size: 12px;
    }

    .copyright p{
        margin-bottom: 0;
    }
</style>
