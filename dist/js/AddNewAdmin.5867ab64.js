(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AddNewAdmin"],{"25f0":function(e,t,a){"use strict";var r=a("6eeb"),o=a("825a"),l=a("d039"),s=a("ad6d"),n="toString",i=RegExp.prototype,c=i[n],u=l((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),d=c.name!=n;(u||d)&&r(RegExp.prototype,n,(function(){var e=o(this),t=String(e.source),a=e.flags,r=String(void 0===a&&e instanceof RegExp&&!("flags"in i)?s.call(e):a);return"/"+t+"/"+r}),{unsafe:!0})},"44e7":function(e,t,a){var r=a("861d"),o=a("c6b6"),l=a("b622"),s=l("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==o(e))}},"4d63":function(e,t,a){var r=a("83ab"),o=a("da84"),l=a("94ca"),s=a("7156"),n=a("9bf2").f,i=a("241c").f,c=a("44e7"),u=a("ad6d"),d=a("9f7f"),m=a("6eeb"),p=a("d039"),f=a("69f3").set,g=a("2626"),v=a("b622"),b=v("match"),x=o.RegExp,h=x.prototype,w=/a/g,y=/a/g,_=new x(w)!==w,I=d.UNSUPPORTED_Y,k=r&&l("RegExp",!_||I||p((function(){return y[b]=!1,x(w)!=w||x(y)==y||"/a/i"!=x(w,"i")})));if(k){var R=function(e,t){var a,r=this instanceof R,o=c(e),l=void 0===t;if(!r&&o&&e.constructor===R&&l)return e;_?o&&!l&&(e=e.source):e instanceof R&&(l&&(t=u.call(e)),e=e.source),I&&(a=!!t&&t.indexOf("y")>-1,a&&(t=t.replace(/y/g,"")));var n=s(_?new x(e,t):x(e,t),r?this:h,R);return I&&a&&f(n,{sticky:a}),n},$=function(e){e in R||n(R,e,{configurable:!0,get:function(){return x[e]},set:function(t){x[e]=t}})},E=i(x),S=0;while(E.length>S)$(E[S++]);h.constructor=R,R.prototype=h,m(o,"RegExp",R)}g("RegExp")},7156:function(e,t,a){var r=a("861d"),o=a("d2bb");e.exports=function(e,t,a){var l,s;return o&&"function"==typeof(l=t.constructor)&&l!==a&&r(s=l.prototype)&&s!==a.prototype&&o(e,s),e}},9263:function(e,t,a){"use strict";var r=a("ad6d"),o=a("9f7f"),l=RegExp.prototype.exec,s=String.prototype.replace,n=l,i=function(){var e=/a/,t=/b*/g;return l.call(e,"a"),l.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=o.UNSUPPORTED_Y||o.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=i||u||c;d&&(n=function(e){var t,a,o,n,d=this,m=c&&d.sticky,p=r.call(d),f=d.source,g=0,v=e;return m&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),v=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(f="(?: "+f+")",v=" "+v,g++),a=new RegExp("^(?:"+f+")",p)),u&&(a=new RegExp("^"+f+"$(?!\\s)",p)),i&&(t=d.lastIndex),o=l.call(m?a:d,v),m?o?(o.input=o.input.slice(g),o[0]=o[0].slice(g),o.index=d.lastIndex,d.lastIndex+=o[0].length):d.lastIndex=0:i&&o&&(d.lastIndex=d.global?o.index+o[0].length:t),u&&o&&o.length>1&&s.call(o[0],a,(function(){for(n=1;n<arguments.length-2;n++)void 0===arguments[n]&&(o[n]=void 0)})),o}),e.exports=n},"9f7f":function(e,t,a){"use strict";var r=a("d039");function o(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,a){"use strict";var r=a("23e7"),o=a("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},ad6d:function(e,t,a){"use strict";var r=a("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},e088:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-layout",[a("a-layout-sider",{attrs:{trigger:null,collapsible:""},model:{value:e.collapsed,callback:function(t){e.collapsed=t},expression:"collapsed"}},[a("left-slide-nav",{attrs:{"selected-key":["3"],"opened-key":["sub4"],"show-title":e.collapsed},on:{DrawerStatus:e.getDrawerStatus}})],1),a("a-layout",{staticClass:"layout-box"},[a("a-layout-header",{staticClass:"layout-box-header"},[a("header-nav",{on:{collapsedStatus:e.getCollapsedStatus}})],1),a("a-breadcrumb",{staticClass:"layout-box-breadcrumb"},[a("a-breadcrumb-item",[e._v("超级管理")]),a("a-breadcrumb-item",[e._v("管理员管理")]),a("a-breadcrumb-item",[e._v("添加管理员")])],1),a("a-layout-content",{style:{background:"#fff",padding:"24px",margin:0,minHeight:"780px"}},[a("a-form-model",{ref:"adminForm",attrs:{rules:e.rules,model:e.form,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-form-model-item",{attrs:{label:"所属企业",prop:"domain"}},[a("a-select",{attrs:{placeholder:"请选择"},model:{value:e.form.domain,callback:function(t){e.$set(e.form,"domain",t)},expression:"form.domain"}},[a("a-select-option",{attrs:{value:"www.jihui88.com"}},[e._v(" 机汇网 ")]),a("a-select-option",{attrs:{value:"cn.easthardware.com"}},[e._v(" 东方五金网 ")])],1)],1),a("a-form-model-item",{attrs:{label:"所属部门",prop:"groupId"}},[a("a-select",{attrs:{placeholder:"请选择"},model:{value:e.form.groupId,callback:function(t){e.$set(e.form,"groupId",t)},expression:"form.groupId"}},[a("a-select-option",{attrs:{value:"8a9e457e5e035029015e11b634ea046d"}},[e._v(" 机汇网技术部 ")]),a("a-select-option",{attrs:{value:"ff8081815092e4800150a7b522830453"}},[e._v(" 微传单事业部 ")]),a("a-select-option",{attrs:{value:"8a9e457e7074df1401707f7dffe50067"}},[e._v(" 设计部 ")]),a("a-select-option",{attrs:{value:"402881e44ccadc61014ccae3e35d0002"}},[e._v(" 代理商 ")]),a("a-select-option",{attrs:{value:"ff80818153e8ef49015407fd6a63079c"}},[e._v(" 留言管理 ")]),a("a-select-option",{attrs:{value:"ff8081815a3a1f1a015a3b3c5b4e0067"}},[e._v(" 机汇网销售部 ")]),a("a-select-option",{attrs:{value:"ff8081815a144ab9015a1628c45d0006"}},[e._v(" 东方五金网技术部 ")])],1)],1),a("a-form-model-item",{attrs:{label:"用户名",prop:"username"}},[a("a-input",{model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),a("a-form-model-item",{attrs:{label:"密码",prop:"password"}},[a("a-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),a("a-form-model-item",{attrs:{label:"权限",prop:"roleIds"}},[a("a-select",{attrs:{placeholder:"请选择"},model:{value:e.form.roleIds,callback:function(t){e.$set(e.form,"roleIds",t)},expression:"form.roleIds"}},e._l(e.accessRole,(function(t){return a("a-select-option",{key:t.roleId,attrs:{value:t.roleId}},[e._v(" "+e._s(t.name)+" ")])})),1)],1),a("a-form-model-item",{attrs:{label:"姓名",prop:"name"}},[a("a-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("a-form-model-item",{attrs:{label:"email",prop:"email"}},[a("a-input",{model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),a("a-form-model-item",{attrs:{label:"手机",prop:"cellphone"}},[a("a-input",{model:{value:e.form.cellphone,callback:function(t){e.$set(e.form,"cellphone",t)},expression:"form.cellphone"}})],1),a("a-form-model-item",{attrs:{label:"性别",prop:"gender"}},[a("a-radio-group",{model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}},[a("a-radio",{attrs:{value:"00"}},[e._v(" 男 ")]),a("a-radio",{attrs:{value:"01"}},[e._v(" 女 ")])],1)],1),a("a-form-model-item",{attrs:{label:"公司名称",prop:"entName"}},[a("a-input",{model:{value:e.form.entName,callback:function(t){e.$set(e.form,"entName",t)},expression:"form.entName"}})],1),a("a-form-model-item",{attrs:{label:"状态",prop:"state"}},[a("a-select",{attrs:{placeholder:"请选择"},model:{value:e.form.state,callback:function(t){e.$set(e.form,"state",t)},expression:"form.state"}},[a("a-select-option",{attrs:{value:"01"}},[e._v(" 正常 ")]),a("a-select-option",{attrs:{value:"02"}},[e._v(" 封禁 ")])],1)],1),a("a-form-model-item",{attrs:{label:"类型",prop:"type"}},[a("a-select",{attrs:{placeholder:"请选择"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[a("a-select-option",{attrs:{value:"01",title:"表示这个账号只能在这个总系统后台可以操作"}},[e._v(" 系统后台管理员 ")]),a("a-select-option",{attrs:{value:"02",title:"表示这个账号可以在网站用户后台上传产品、新闻等操作"}},[e._v(" 网站用户后台操作账号 ")]),a("a-select-option",{attrs:{value:"03",title:"表示代理商可以在代理商后台添加用户、站点等操作"}},[e._v(" 代理商后台账号 ")]),a("a-select-option",{attrs:{value:"04",title:"技术部那边的人可以进入模块制作后台制作站点模块"}},[e._v(" 外包后台设计师账号 ")]),a("a-select-option",{attrs:{value:"05",title:"与admin账号一样的权限， 可以有多个超级管理员"}},[e._v(" 超级管理员 ")])],1)],1),a("a-form-model-item",{attrs:{"wrapper-col":{span:14,offset:4}}},[a("a-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(" 提交 ")]),a("a-button",{staticStyle:{"margin-left":"10px"},on:{click:function(t){return e.$router.back(-1)}}},[e._v(" 返回上一页 ")])],1)],1)],1)],1)],1),a("left-drawer",{attrs:{LeftDrawerShow:e.LeftDrawerShow}})],1)},o=[],l=(a("4d63"),a("ac1f"),a("25f0"),{name:"AddNewAdmin",data:function(){return{console:!1,collapsed:!1,LeftDrawerShow:!1,labelCol:{span:4},wrapperCol:{span:4},accessRole:"",form:{domain:"",groupId:"",username:"",password:"",name:"",email:"",cellphone:"",entName:"",roleIds:"",gender:"",state:"",type:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],domain:[{required:!0,message:"请选择企业",trigger:"change"}],groupId:[{required:!0,message:"请选择部门",trigger:"change"}],roleIds:[{required:!0,message:"请选择权限",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"}],cellphone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{pattern:new RegExp(/^((13[0-9])|(14[5,7])|(15[^4,\\D])|(17[0,1,3,6-8])|(18[0-9])|(19[8,9])|(166))[0-9]{8}$/,"g"),message:"请输入正确的手机号码",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{pattern:new RegExp(/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/,"g"),message:"请输入正确的邮箱",trigger:"blur"}],entName:[{required:!0,message:"请输入公司名称",trigger:"blur"}],gender:[{required:!0,message:"请选择性别",trigger:"change"}],state:[{required:!0,message:"请选择账号状态",trigger:"change"}],type:[{required:!0,message:"请选择类型",trigger:"change"}]}}},mounted:function(){this.fetch()},methods:{onSubmit:function(){var e=this;this.$refs.adminForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.console&&console.log("submit!",e.form);var a=e.form;e.$api.addNewAdmin(a).then((function(t){e.console&&console.log(t),0==t.data.code&&"success"==t.data.msg?(e.$message.success("添加成功"),e.$router.push({name:"AdminList",path:"/admin/AdminList"})):e.$message.error(t.data.msg)})).catch((function(e){console.log(e)}))}))},getCollapsedStatus:function(e){this.collapsed=e,this.console&&console.log(e)},getDrawerStatus:function(e){this.LeftDrawerShow=e},fetch:function(){var e=this;this.$api.getAccessControlAdminList().then((function(t){e.console&&console.log(t),0==t.data.code&&"success"==t.data.msg?(e.accessRole=t.data.data.roleList,console.log(t)):e.$message.error(t.data.msg)})).catch((function(e){console.log(e)}))}}}),s=l,n=a("2877"),i=Object(n["a"])(s,r,o,!1,null,"59693f6a",null);t["default"]=i.exports}}]);
//# sourceMappingURL=AddNewAdmin.5867ab64.js.map