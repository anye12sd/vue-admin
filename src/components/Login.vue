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
        <a-input
          v-decorator="[
            'userName',
            {
            initialValue: this.state.userName,
            rules: [{ required: true, message: '请输入帐号!' }] },
          ]"
          placeholder="请输入帐号"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码!' }] },
          ]"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'code',
            { rules: [{ required: true, message: '请输入验证码!' }] },
          ]"
          type="code"
          style="width: 55%;"
          placeholder="请输入验证码"
        >
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
        <a-button style="margin-left: 5%; width:40%;">
          获取验证码
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          <span>自动登录</span>
        </a-checkbox>
        <a class="login-form-forgot" href="">
          忘记密码
        </a>
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
  export default {
    name: 'Login',
    components: {Copyright},
    data(){
      return{
        state:{
          "userName": ""
        }
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.form.setFieldsValue({
              'userName': '123'
            })
            this.$router.push({name:'VerifiedCustomer',path:'/customer/VerifiedCustomer'})
          }
        });
      },
    },
  };
</script>
<style scoped>
  .login-box{
    position: relative;
  }
  .login-title{
    margin-bottom: 40px;
    text-align: center;
    font-size: 26px;
    color: #000;
  }
  #components-form-demo-normal-login.login-form {
    max-width: 300px;
    margin:0 auto;
    /*margin-top: calc(50vh - 175px);*/
    position: absolute;
    right: 0px;
    left: 0;
    top: calc(50vh - 200px);
  }
  #components-form-demo-normal-login.login-form:after{
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
