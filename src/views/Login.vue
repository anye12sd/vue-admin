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
                <img :src="codeSource" alt=""
                     style="margin-left: 28px;height: 32px;border-radius: 2px;width:105px;" @click="getNewCode">
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" class="login-form-button">
                    登录
                </a-button>
            </a-form-item>
        </a-form>
        <Copyright class="login-box-copyright"></Copyright>
    </div>
</template>

<script>
    const Copyright = () => import("../components/Copyright")

    export default {
        name: 'Login',
        components: {Copyright},
        data() {
            return {
                console: true,
                codeSource : "/api/alphveriImg",
                qs: "?234"
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.console && console.log('Received values of form: ', values);
                        let params = values
                        this.$api.userLogin(params)
                            .then((data) => {
                                this.console && console.log(data)
                                if (data.data.code == 0 && data.data.msg == "success") {
                                    const dataList = data.data.data
                                    sessionStorage.setItem("username", dataList.username)
                                    const adminPermissionMenus = dataList.adminPermissionMenus;
                                    // 判断adminPermissionMenus数组的最后一个数组是不是网站导航
                                    if (adminPermissionMenus.length > 0 && adminPermissionMenus[adminPermissionMenus.length - 1].name === "网站导航") {
                                        sessionStorage.setItem("site", JSON.stringify(adminPermissionMenus[adminPermissionMenus.length - 1]))
                                        sessionStorage.setItem("adminPermissionMenus", JSON.stringify(adminPermissionMenus.slice(0, -1)))
                                    } else if (adminPermissionMenus.length > 0) {
                                        // adminPermissionMenus数组有值且数组的最后一个不是网站导航
                                        sessionStorage.setItem("adminPermissionMenus", JSON.stringify(adminPermissionMenus))
                                    } else {
                                        // adminPermissionMenus是一个空数组
                                        console.log('adminPermissionMenus是一个空数组')
                                    }

                                    if (data.headers["x-csrf-token"]) {
                                        sessionStorage.setItem("X-CSRF-Token", data.headers["x-csrf-token"])
                                    }

                                    if (adminPermissionMenus.length && adminPermissionMenus[0].name !== "网站导航") {
                                        this.$router.push({
                                            name: dataList.adminPermissionMenus[0].children.component,
                                            path: dataList.adminPermissionMenus[0].children[0].path
                                        })
                                    } else {
                                        this.$router.push({name: 'VerifiedCustomer', path: '/views/VerifiedCustomer'})
                                    }
                                } else {
                                    this.$message.error(data.data.msg)
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        // this.$https.fetchPost('/open/admin/login', params)
                        //     .then((data) => {
                        //         this.console && console.log(data)
                        //         if (data.data.code == 0 && data.data.msg == "success") {
                        //             sessionStorage.setItem("username", data.data.data.username)
                        //             if (data.headers["x-csrf-token"]) {
                        //                 sessionStorage.setItem("X-CSRF-Token", data.headers["x-csrf-token"])
                        //             }
                        //             this.$router.push({name: 'VerifiedCustomer', path: '/customer/VerifiedCustomer'})
                        //         } else {
                        //             this.$message.error(data.data.msg)
                        //         }
                        //     })
                        //     .catch((err) => {
                        //         console.log(err)
                        //     })

                        // this.form.setFieldsValue({
                        //   'userName': '123'
                        // })
                        // this.$router.push({name: 'VerifiedCustomer', path: '/customer/VerifiedCustomer'})
                    }
                });
            },
            getNewCode() {
                console.log(123)
                let randomNum = Math.random();
                this.codeSource = "/api/alphveriImg?" + randomNum
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

    .login-box-copyright {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: calc(20px - 100vh);
        text-align: center;
    }
</style>
