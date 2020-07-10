<template>
    <div class="login-box">
        <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit"
        >
            <div class="login-title">系统后台</div>
            <a-form-item>
                <a-input v-decorator="['username',
                {rules: [{ required: true, message: '请输入帐号!' }] },]" placeholder="请输入帐号" ref="userName">
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-decorator="['password',
                { rules: [{ required: true, message: '请输入密码!' }] },]" type="password" placeholder="请输入密码">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                        v-decorator="[
            'randCode',
            { rules: [{ required: true, message: '请输入验证码!' }] },
          ]"
                        type="code"
                        style="width: 55%;"
                        placeholder="请输入验证码"
                >
                    <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)"/>
                </a-input>
                <img :src="'/v4/alphveriImg'+ qs" alt="" style="margin-left: 28px;height: 32px;border-radius: 2px;width:105px;" @click="getNewCode">
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" class="login-form-button">
                    登录
                </a-button>
            </a-form-item>
            <!--<router-link to="/demo">34566</router-link>-->
        </a-form>
        <Copyright style="position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: calc(20px - 100vh);
    text-align: center;"></Copyright>
    </div>
</template>

<script>
    import Copyright from "./Copyright";
    import https from "../utils/https"

    export default {
        name: 'Login',
        components: {Copyright},
        data() {
            return {
                state: {
                    "userName": ""
                },
                // codeSource : "http://i.jihui88.com/v4/alphveriImg"
                qs : "?234"
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },
        mounted() {
            https.fetchGet('/alphveriImg')
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        let params = values
                        https.fetchPost('/open/admin/login', params)
                            .then((data) => {
                                console.log(data)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        // this.form.setFieldsValue({
                        //   'userName': '123'
                        // })
                        this.$router.push({name: 'VerifiedCustomer', path: '/customer/VerifiedCustomer'})
                    }
                });
            },
            getNewCode() {
                let randomNum = Math.random();
                this.codeSource = "http://i.jihui88.com/v4/alphveriImg?"+randomNum
            }
        },
    };
</script>
<style scoped>
    .login-box {
        position: relative;
    }

    .login-title {
        margin-bottom: 40px;
        text-align: center;
        font-size: 26px;
        color: #000;
    }

    #components-form-demo-normal-login.login-form {
        max-width: 300px;
        margin: 0 auto;
        /*margin-top: calc(50vh - 175px);*/
        position: absolute;
        right: 0px;
        left: 0;
        top: calc(50vh - 200px);
    }

    #components-form-demo-normal-login.login-form:after {
        content: "";
        display: block;
        height: 0;
        zoom: 0;
        clear: both;
    }

    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }

    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>
