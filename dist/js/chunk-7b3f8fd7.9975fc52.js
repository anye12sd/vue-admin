(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b3f8fd7"],{4526:function(t,e,a){"use strict";var n=a("4f47"),s=a.n(n);s.a},"48fd":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-table",{staticClass:"table-content",attrs:{columns:t.columns,"row-key":function(t){return t.messageId},"data-source":t.data,pagination:t.pagination,loading:t.loading,customRow:t.clickRow,rowClassName:t.addRowClass},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"recvUser",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:e}},[t._v(" "+t._s(e)+" ")])]}},{key:"addTime",fn:function(e){return[a("span",{attrs:{title:new Date(e).toLocaleString()}},[t._v(" "+t._s(new Date(e).toLocaleString())+" ")])]}},{key:"content",fn:function(e){return[a("span",{domProps:{innerHTML:t._s(e)}})]}},{key:"operation",fn:function(e,n){return[a("router-link",{attrs:{to:{name:"ScreenshotsToCustomer",query:{messageId:n.messageId}},target:"_blank"}},[t._v(" 截图给客户 ")]),a("a",{staticClass:"table-content-a",attrs:{href:"javascript:;"},on:{click:function(e){return t.showDrawer(n)}}},[t._v("查看")])]}}])}),a("a-drawer",{attrs:{width:"640",placement:"right",closable:!0,visible:t.visible},on:{close:t.onClose}},[a("a-row",[a("a-col",{attrs:{span:12}},[a("p",{staticClass:"drawer-item drawer-item-title"},[t._v("接收人")]),a("p",{staticClass:"drawer-item"},[t._v(t._s(t.drawerContent.recvUser))])]),a("a-col",{attrs:{span:12}},[a("p",{staticClass:"drawer-item drawer-item-title"},[t._v("接收企业")]),a("p",{staticClass:"drawer-item"},[t._v(t._s(t.drawerContent.recvEnt))])]),a("a-col",{attrs:{span:12}},[a("p",{staticClass:"drawer-item drawer-item-title"},[t._v("发送时间")]),a("p",{staticClass:"drawer-item"},[t._v(t._s(new Date(t.drawerContent.addTime).toLocaleString()))])])],1),a("a-divider"),a("a-row",[a("a-col",[a("p",{staticClass:"drawer-item drawer-item-title"},[t._v("内容")]),a("p",{staticClass:"drawer-item",domProps:{innerHTML:t._s(t.drawerContent.content)}})])],1),a("a-divider")],1)],1)},s=[],o=a("2909"),r=a("5530"),i=[{title:"内容",dataIndex:"content",sorter:!0,width:"40%",scopedSlots:{customRender:"content"}},{title:"接收人",dataIndex:"recvUser",sorter:!0,width:"15%",scopedSlots:{customRender:"recvUser"}},{title:"接收企业",dataIndex:"recvEnt",width:"15%",scopedSlots:{customRender:"recvEnt"}},{title:"发送时间",dataIndex:"addTime",width:"15%",scopedSlots:{customRender:"addTime"}},{title:"操作",dataIndex:"operation",width:"15%",scopedSlots:{customRender:"operation"}}],c={name:"CustomerMessageTable",data:function(){return{console:!1,visible:!1,data:[],pagination:{page:1,current:1},loading:!1,columns:i,selectedNo:"",drawerContent:{recvEnt:"",recvUser:"",content:"",addTime:""}}},mounted:function(){this.fetch()},methods:{handleTableChange:function(t,e,a){var n=Object(r["a"])({},this.pagination);n.current=t.current,this.pagination=n,this.fetch(Object(r["a"])({results:t.pageSize,page:t.current,sortField:a.field,sortOrder:a.order},e))},fetch:function(){var t=this,e="";sessionStorage.getItem("message")&&(e=sessionStorage.getItem("message")||"");var a={pageSize:10,page:this.pagination.current,searchKey:e};this.console&&console.log("params:",a),this.loading=!0,this.$api.getCustomerMessageList(a).then((function(e){t.loading=!1;var a=Object(r["a"])({},t.pagination);a.total=e.data.data.count,t.data=e.data.data.messageList,t.pagination=a,t.console&&console.log(e)})).catch((function(t){console.log(t)}))},onDelete:function(t){var e=Object(o["a"])(this.data);this.console&&console.log(e,t)},showDrawer:function(t){this.visible=!0,this.drawerContent=t},onClose:function(){this.visible=!1},clickRow:function(t){var e=this;return{on:{click:function(){e.selectedNo=t.messageId}}}},addRowClass:function(t){var e="";return t.messageId===this.selectedNo&&(e="selected-tr"),e}}},d=c,l=(a("4526"),a("2877")),u=Object(l["a"])(d,n,s,!1,null,"0469be64",null);e["default"]=u.exports},"4f47":function(t,e,a){}}]);
//# sourceMappingURL=chunk-7b3f8fd7.9975fc52.js.map