(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53e33284"],{8079:function(t,e,a){"use strict";var n=a("c79a"),i=a.n(n);i.a},b9a7:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-table",{staticClass:"table-content",attrs:{columns:t.columns,"row-key":function(t){return t.layoutId},"data-source":t.data,pagination:t.pagination,loading:t.loading,customRow:t.clickRow,rowClassName:t.addRowClass},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"layoutId",fn:function(e){return[a("span",[t._v(" "+t._s(e)+" "),a("a",{key:t.site,attrs:{href:"http://pc."+t.site+"/rest/site/"+e+"/index",target:"_blank"}},[t._v("[查看]")])])]}},{key:"weixinNumber",fn:function(e,n){return[n.editable?a("div",{key:t.editingKey,staticClass:"change-number-box"},[a("a-input",{attrs:{type:"text",placeholder:"请输入编号"},model:{value:t.inputId,callback:function(e){t.inputId=e},expression:"inputId"}}),a("div",{staticClass:"change-number-btn flex"},[a("a",{staticClass:"flex-1",attrs:{href:"javascript:;"},on:{click:function(e){return t.saveEdit(n.layoutId)}}},[t._v("保存")]),a("a",{staticClass:"flex-1",attrs:{href:"javascript:;"},on:{click:function(e){return t.cancelEdit(n.layoutId)}}},[t._v("取消")])])],1):t._e(),n.editable?t._e():a("span",{key:t.editingKey,attrs:{title:n.weixinNumber?n.weixinNumber:""}},[t._v(" "+t._s(n.weixinNumber?n.weixinNumber:"")+" "),a("a",{staticClass:"table-content-a",attrs:{href:"javascript:;",disabled:""!==t.editingKey},on:{click:function(e){return t.editList(n.layoutId)}}},[t._v("[编辑]")])])]}},{key:"payState",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:t.getPayState(e)}},[t._v(" "+t._s(t.getPayState(e))+" ")])]}},{key:"logTime",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:new Date(e).toLocaleString()}},[t._v(" "+t._s(new Date(e).toLocaleString())+" ")])]}},{key:"endTime",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:new Date(e).toLocaleString()}},[t._v(" "+t._s(new Date(e).toLocaleString())+" ")])]}}])})},i=[],s=(a("4de4"),a("2909")),o=a("5530"),c=[{title:"站点编号",dataIndex:"layoutId",width:"10%",scopedSlots:{customRender:"layoutId"}},{title:"微信群编号",dataIndex:"weixinNumber",width:"15%",scopedSlots:{customRender:"weixinNumber"}},{title:"是否付费",dataIndex:"payState",width:"15%",scopedSlots:{customRender:"payState"}},{title:"最近操作时间",dataIndex:"logTime",width:"20%",scopedSlots:{customRender:"logTime"}},{title:"到期时间",dataIndex:"endTime",width:"20%",scopedSlots:{customRender:"endTime"}},{title:"原始注册手机号码",dataIndex:"registerCellphone",width:"20%",scopedSlots:{customRender:"registerCellphone"}}],l={name:"SiteListTable",prop:["site"],data:function(){return{console:!1,data:[],pagination:{page:1,current:1},loading:!1,columns:c,selectedNo:"",editingKey:"",inputId:"",site:""}},mounted:function(){this.fetch()},methods:{handleTableChange:function(t,e,a){var n=Object(o["a"])({},this.pagination);n.current=t.current,this.pagination=n,this.fetch(Object(o["a"])({results:t.pageSize,page:t.current,sortField:a.field,sortOrder:a.order},e))},fetch:function(){var t=this,e={pageSize:10,page:this.pagination.current,domain:"",payType:"00",weixinNumber:""};if(sessionStorage.getItem("siteParams")){var a=JSON.parse(sessionStorage.getItem("siteParams"));e=Object(o["a"])(Object(o["a"])({},e),a),this.site=e.domain}this.console&&console.log("params:",e),this.loading=!0,this.$api.getSiteList(e).then((function(e){if(0==e.data.code&&"success"==e.data.msg){t.loading=!1;var a=Object(o["a"])({},t.pagination);a.total=e.data.data.count,t.data=e.data.data.layoutList,t.pagination=a,t.console&&console.log(e)}else t.$message.error(e.data.msg)})).catch((function(t){console.log(t)}))},clickRow:function(t){var e=this;return{on:{click:function(){e.selectedNo=t.layoutId}}}},addRowClass:function(t){var e="";return t.layoutId===this.selectedNo&&(e="selected-tr"),e},getPayState:function(t){var e;switch(t){case"00":e="否";break;case"01":e="是";break;default:e="其它";break}return e},editList:function(t){var e=Object(s["a"])(this.data),a=e.filter((function(e){return t===e.layoutId}))[0];console.log(e),this.editingKey=t,a&&(a.editable=!0,this.inputId=a.weixinNumber||"")},cancelEdit:function(t){var e=Object(s["a"])(this.data),a=e.filter((function(e){return t===e.layoutId}))[0];a&&(delete a.editable,this.inputId=""),this.editingKey=""},saveEdit:function(t){var e=this,a=Object(s["a"])(this.data),n=a.filter((function(e){return t===e.layoutId}))[0];if(this.editingKey="",n){var i={layoutId:n.layoutId,weixinNumber:this.inputId};this.console&&console.log(i),this.$api.editWeixinNumber(i).then((function(t){e.console&&console.log(t),0==t.data.code&&"success"==t.data.msg?(e.$message.success("编辑成功"),e.$emit("refresh",(new Date).getTime())):e.$message.error(t.data.msg)})).catch((function(t){console.log(t)})),delete n.editable}}}},r=l,d=(a("8079"),a("2877")),u=Object(d["a"])(r,n,i,!1,null,"dba076b0",null);e["default"]=u.exports},c79a:function(t,e,a){}}]);