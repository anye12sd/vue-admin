(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3882d969"],{"057f":function(t,e,a){var n=a("fc6a"),r=a("241c").f,i={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],o=function(t){try{return r(t)}catch(e){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==i.call(t)?o(t):r(n(t))}},"159b":function(t,e,a){var n=a("da84"),r=a("fdbc"),i=a("17c2"),s=a("9112");for(var o in r){var c=n[o],l=c&&c.prototype;if(l&&l.forEach!==i)try{s(l,"forEach",i)}catch(d){l.forEach=i}}},"17c2":function(t,e,a){"use strict";var n=a("b727").forEach,r=a("a640"),i=a("ae40"),s=r("forEach"),o=i("forEach");t.exports=s&&o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,a){var n=a("d039"),r=a("b622"),i=a("2d00"),s=r("species");t.exports=function(t){return i>=51||!n((function(){var e=[],a=e.constructor={};return a[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"318f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-table",{staticClass:"table-content",attrs:{columns:t.columns,"row-key":function(t){return t.outTradeNo},"data-source":t.data,pagination:t.pagination,loading:t.loading,customRow:t.clickRow,rowClassName:t.addRowClass},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"outTradeNo",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:e}},[t._v(" "+t._s(e)+" ")])]}},{key:"addTime",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:new Date(e).toLocaleString()}},[t._v(" "+t._s(new Date(e).toLocaleString())+" ")])]}},{key:"paidPrice",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis order-price"},[t._v(" "+t._s(e||0==e?"￥"+e:"-")+" ")])]}},{key:"totalPrice",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis order-price",attrs:{title:"￥"+e}},[t._v(" ￥"+t._s(e)+" ")])]}},{key:"agentPrice",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis order-price"},[t._v(" "+t._s(e||0==e?"￥"+e:"-")+" ")])]}},{key:"payType",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:t.getPayType(e)}},[t._v(" "+t._s(t.getPayType(e))+" ")])]}},{key:"paymentType",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",class:t.getClass(e),attrs:{title:t.getPaymentType(e)}},[t._v(" "+t._s(t.getPaymentType(e))+" ")])]}},{key:"agentId",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:e?"线下订单":"线上订单"}},[t._v(" "+t._s(e?"线下订单":"线上订单")+" ")])]}},{key:"operation",fn:function(e,n){return[a("a",{staticClass:"table-content-a",attrs:{href:"javascript:;"},on:{click:function(e){return t.showDrawer(n)}}},[t._v("详情")])]}},{key:"auditId",fn:function(e){return[a("span",{staticClass:"table-content-span-ellipsis",attrs:{title:t.getAuditId(e)}},[t._v(" "+t._s(t.getAuditId(e))+" ")])]}}])}),a("a-drawer",{staticClass:"drawer-content",attrs:{width:"640",placement:"right",closable:!0,visible:t.visible},on:{close:t.onClose}},[a("a-spin",{attrs:{spinning:t.spinning,tip:"加载中。。。"}},[a("a-descriptions",{attrs:{title:"订单摘要",column:2}},[a("a-descriptions-item",{attrs:{label:"订单编号"}},[t._v(" "+t._s(t.dataDetail.outTradeNo||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"标记"}},[t._v(" "+t._s(t.dataDetail.agentId?"线下订单":"线上订单")+" ")]),a("a-descriptions-item",{attrs:{label:"订单创建时间"}},[t._v(" "+t._s(new Date(t.dataDetail.addTime).toLocaleString())+" ")]),a("a-descriptions-item",{attrs:{label:"使用年限"}},[t._v(" "+t._s(t.dataDetail.year||"-")+"年 ")]),a("a-descriptions-item",{attrs:{label:"到期时间"}},[t._v(" "+t._s(new Date(t.dataDetail.endTime).toLocaleString())+" ")]),a("a-descriptions-item",{attrs:{label:"支付来源"}},[t._v(" "+t._s(t.getPayType(t.dataDetail.payType)||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"总计"}},[a("span",{staticClass:"order-price"},[t._v("￥"+t._s(t.dataDetail.totalPrice||"0"))])]),a("a-descriptions-item",{attrs:{label:"客户应付金额"}},[a("span",{staticClass:"order-price"},[t._v("￥"+t._s(t.dataDetail.paidPrice||"0"))])])],1),a("a-divider"),a("a-descriptions",{attrs:{title:"订单明细",column:2}},[a("a-descriptions-item",{attrs:{label:"产品名称"}},[t._v(" "+t._s(t.dataDetail.name||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"数量"}},[t._v(" 1个 ")]),a("a-descriptions-item",{attrs:{label:"使用年限"}},[t._v(" "+t._s(t.dataDetail.year||"-")+"年 ")]),a("a-descriptions-item",{attrs:{label:"原价"}},[a("span",{staticClass:"order-price"},[t._v("￥"+t._s(t.dataDetail.totalPrice)+"×1")])]),a("a-descriptions-item",{attrs:{label:"网站编号"}},[t._v(" "+t._s(t.dataDetail.layoutId||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"小计"}},[a("span",{staticClass:"order-price"},[t._v("￥"+t._s(t.dataDetail.totalPrice||"-"))])])],1),a("a-divider"),a("a-descriptions",{attrs:{title:"客户资料",column:2}},[a("a-descriptions-item",{attrs:{label:"客户账号"}},[t._v(" "+t._s(t.dataDetail.username||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"客户公司全称"}},[t._v(" "+t._s(t.dataDetail.userEntName||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"公司法人"}},[t._v(" "+t._s(t.dataDetail.userLegalPre||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"法人手机号"}},[t._v(" "+t._s(t.dataDetail.userCellphone||"-")+" ")])],1),a("a-divider"),a("a-descriptions",{attrs:{title:"经销商详情",column:2}},[a("a-descriptions-item",{attrs:{label:"经销商支付金额"}},[a("span",{staticClass:"order-price"},[t._v("￥"+t._s(t.dataDetail.agentPrice||"0"))])]),a("a-descriptions-item",{attrs:{label:"订单创建公司"}},[t._v(" "+t._s(t.dataDetail.agentEntName||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"订单创建者姓名"}},[t._v(" "+t._s(t.dataDetail.agentName||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"订单创建者手机号"}},[t._v(" "+t._s(t.dataDetail.agentCellphone||"-")+" ")]),a("a-descriptions-item",{attrs:{label:"备注"}},[a("a-textarea",{staticClass:"order-comment",attrs:{"auto-size":""}})],1)],1)],1)],1)],1)},r=[],i=a("5530"),s=[{title:"订单编号",dataIndex:"outTradeNo",width:"10%",scopedSlots:{customRender:"outTradeNo"}},{title:"产品名称",dataIndex:"name",width:"10%",scopedSlots:{customRender:"name"},ellipsis:!0},{title:"原价",dataIndex:"totalPrice",width:"8%",scopedSlots:{customRender:"totalPrice"}},{title:"客户应付金额",dataIndex:"paidPrice",width:"10%",scopedSlots:{customRender:"paidPrice"},ellipsis:!0},{title:"经销商支付金额",dataIndex:"agentPrice",width:"10%",scopedSlots:{customRender:"agentPrice"},ellipsis:!0},{title:"订单创建者",dataIndex:"agentName",width:"8%",scopedSlots:{customRender:"agentName"},ellipsis:!0},{title:"来源网站",dataIndex:"domain",width:"8%",scopedSlots:{customRender:"domain"},ellipsis:!0},{title:"标记",dataIndex:"agentId",width:"8%",scopedSlots:{customRender:"agentId"}},{title:"订单创建时间",dataIndex:"addTime",width:"8%",scopedSlots:{customRender:"addTime"},ellipsis:!0},{title:"状态",dataIndex:"paymentType",width:"8%",scopedSlots:{customRender:"paymentType"}},{title:"支付来源",dataIndex:"payType",width:"8%",scopedSlots:{customRender:"payType"},ellipsis:!0},{title:"操作",dataIndex:"operation",width:"8%",scopedSlots:{customRender:"operation"}},{title:"审核",dataIndex:"auditId",width:"8%",scopedSlots:{customRender:"auditId"}}],o={name:"LogManageTable",prop:["site"],data:function(){return{console:!0,data:[],dataDetail:{},visible:!1,spinning:!0,pagination:{page:0,current:1},loading:!1,columns:s,selectedNo:""}},mounted:function(){this.fetch()},methods:{handleTableChange:function(t,e,a){var n=Object(i["a"])({},this.pagination);n.current=t.current,this.pagination=n,this.fetch(Object(i["a"])({results:t.pageSize,page:t.current,sortField:a.field,sortOrder:a.order},e))},fetch:function(){var t=this;this.loading=!0;var e={pageSize:10,page:this.pagination.current-1,state:"NORMAL"};if(sessionStorage.getItem("siteParams")){var a=JSON.parse(sessionStorage.getItem("siteParams"));e=Object(i["a"])(Object(i["a"])({},e),a)}this.$api.getOrderList(e).then((function(e){if(t.console&&console.log(e),0==e.data.code&&"success"==e.data.msg){t.loading=!1;var a=Object(i["a"])({},t.pagination);a.total=e.data.data.totalElements,t.data=e.data.data.content,t.pagination=a}else t.$message.error(e.data.msg)})).catch((function(t){console.log(t)}))},clickRow:function(t){var e=this;return{on:{click:function(){e.selectedNo=t.outTradeNo},onDoubleClick:function(){e.visible=!0,console.log(t)}}}},addRowClass:function(t){var e="";return t.outTradeNo===this.selectedNo&&(e="selected-tr"),e},onClose:function(){this.visible=!1},showDrawer:function(t){var e=this;this.visible=!0,console.log(t),this.spinning=!0;var a={orderId:t.orderId};this.$api.getOrderListDetail(a).then((function(t){e.console&&console.log(t),e.spinning=!1,0==t.data.code&&"success"==t.data.msg?(e.dataDetail=t.data.data,e.comment=e.dataDetail.comment):e.$message.error(t.data.msg)})).catch((function(t){console.log(t)}))},getPayType:function(t){var e;switch(t){case"WX":e="微信";break;case"ALI":e="支付宝";break;case"BANK":e="银行转账";break;case"PFA":e="找人代付";break;case"OFFLINE":e="线下支付";break;case"INVITATION":e="邀请码支付";break;default:e="其他";break}return e},getPaymentType:function(t){var e;switch(t){case"UN_PAY":e="未支付";break;case"PAID":e="已支付";break;case"PART_PAY":e="部分支付";break;default:e="其他";break}return e},getClass:function(t){var e;switch(t){case"UN_PAY":e="UN_PAY";break;case"PAID":e="PAID";break;case"PART_PAY":e="PART_PAY";break}return e},getAuditId:function(t){var e;return t?(e="通过","NOTPASS"==t&&(e="审核不通过")):e="待审核",e}}},c=o,l=(a("c112"),a("2877")),d=Object(l["a"])(c,n,r,!1,null,"66592d27",null);e["default"]=d.exports},4160:function(t,e,a){"use strict";var n=a("23e7"),r=a("17c2");n({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},"4de4":function(t,e,a){"use strict";var n=a("23e7"),r=a("b727").filter,i=a("1dde"),s=a("ae40"),o=i("filter"),c=s("filter");n({target:"Array",proto:!0,forced:!o||!c},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("a4d3"),a("4de4"),a("4160"),a("e439"),a("dbb4"),a("b64b"),a("159b");function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},"65f0":function(t,e,a){var n=a("861d"),r=a("e8b5"),i=a("b622"),s=i("species");t.exports=function(t,e){var a;return r(t)&&(a=t.constructor,"function"!=typeof a||a!==Array&&!r(a.prototype)?n(a)&&(a=a[s],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===e?0:e)}},"746f":function(t,e,a){var n=a("428f"),r=a("5135"),i=a("e5383"),s=a("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});r(e,t)||s(e,t,{value:i.f(t)})}},"7d09":function(t,e,a){},8418:function(t,e,a){"use strict";var n=a("c04e"),r=a("9bf2"),i=a("5c6c");t.exports=function(t,e,a){var s=n(e);s in t?r.f(t,s,i(0,a)):t[s]=a}},a4d3:function(t,e,a){"use strict";var n=a("23e7"),r=a("da84"),i=a("d066"),s=a("c430"),o=a("83ab"),c=a("4930"),l=a("fdbf"),d=a("d039"),u=a("5135"),f=a("e8b5"),p=a("861d"),b=a("825a"),g=a("7b0b"),m=a("fc6a"),v=a("c04e"),h=a("5c6c"),y=a("7c73"),w=a("df75"),_=a("241c"),S=a("057f"),P=a("7418"),O=a("06cf"),T=a("9bf2"),D=a("d1e7"),C=a("9112"),k=a("6eeb"),I=a("5692"),L=a("f772"),N=a("d012"),j=a("90e3"),A=a("b622"),x=a("e5383"),R=a("746f"),E=a("d44e"),M=a("69f3"),F=a("b727").forEach,V=L("hidden"),G="Symbol",Y="prototype",J=A("toPrimitive"),$=M.set,H=M.getterFor(G),z=Object[Y],B=r.Symbol,U=i("JSON","stringify"),W=O.f,q=T.f,K=S.f,Q=D.f,X=I("symbols"),Z=I("op-symbols"),tt=I("string-to-symbol-registry"),et=I("symbol-to-string-registry"),at=I("wks"),nt=r.QObject,rt=!nt||!nt[Y]||!nt[Y].findChild,it=o&&d((function(){return 7!=y(q({},"a",{get:function(){return q(this,"a",{value:7}).a}})).a}))?function(t,e,a){var n=W(z,e);n&&delete z[e],q(t,e,a),n&&t!==z&&q(z,e,n)}:q,st=function(t,e){var a=X[t]=y(B[Y]);return $(a,{type:G,tag:t,description:e}),o||(a.description=e),a},ot=l?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof B},ct=function(t,e,a){t===z&&ct(Z,e,a),b(t);var n=v(e,!0);return b(a),u(X,n)?(a.enumerable?(u(t,V)&&t[V][n]&&(t[V][n]=!1),a=y(a,{enumerable:h(0,!1)})):(u(t,V)||q(t,V,h(1,{})),t[V][n]=!0),it(t,n,a)):q(t,n,a)},lt=function(t,e){b(t);var a=m(e),n=w(a).concat(bt(a));return F(n,(function(e){o&&!ut.call(a,e)||ct(t,e,a[e])})),t},dt=function(t,e){return void 0===e?y(t):lt(y(t),e)},ut=function(t){var e=v(t,!0),a=Q.call(this,e);return!(this===z&&u(X,e)&&!u(Z,e))&&(!(a||!u(this,e)||!u(X,e)||u(this,V)&&this[V][e])||a)},ft=function(t,e){var a=m(t),n=v(e,!0);if(a!==z||!u(X,n)||u(Z,n)){var r=W(a,n);return!r||!u(X,n)||u(a,V)&&a[V][n]||(r.enumerable=!0),r}},pt=function(t){var e=K(m(t)),a=[];return F(e,(function(t){u(X,t)||u(N,t)||a.push(t)})),a},bt=function(t){var e=t===z,a=K(e?Z:m(t)),n=[];return F(a,(function(t){!u(X,t)||e&&!u(z,t)||n.push(X[t])})),n};if(c||(B=function(){if(this instanceof B)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=j(t),a=function(t){this===z&&a.call(Z,t),u(this,V)&&u(this[V],e)&&(this[V][e]=!1),it(this,e,h(1,t))};return o&&rt&&it(z,e,{configurable:!0,set:a}),st(e,t)},k(B[Y],"toString",(function(){return H(this).tag})),k(B,"withoutSetter",(function(t){return st(j(t),t)})),D.f=ut,T.f=ct,O.f=ft,_.f=S.f=pt,P.f=bt,x.f=function(t){return st(A(t),t)},o&&(q(B[Y],"description",{configurable:!0,get:function(){return H(this).description}}),s||k(z,"propertyIsEnumerable",ut,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:B}),F(w(at),(function(t){R(t)})),n({target:G,stat:!0,forced:!c},{for:function(t){var e=String(t);if(u(tt,e))return tt[e];var a=B(e);return tt[e]=a,et[a]=e,a},keyFor:function(t){if(!ot(t))throw TypeError(t+" is not a symbol");if(u(et,t))return et[t]},useSetter:function(){rt=!0},useSimple:function(){rt=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!o},{create:dt,defineProperty:ct,defineProperties:lt,getOwnPropertyDescriptor:ft}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:bt}),n({target:"Object",stat:!0,forced:d((function(){P.f(1)}))},{getOwnPropertySymbols:function(t){return P.f(g(t))}}),U){var gt=!c||d((function(){var t=B();return"[null]"!=U([t])||"{}"!=U({a:t})||"{}"!=U(Object(t))}));n({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,a){var n,r=[t],i=1;while(arguments.length>i)r.push(arguments[i++]);if(n=e,(p(e)||void 0!==t)&&!ot(t))return f(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!ot(e))return e}),r[1]=e,U.apply(null,r)}})}B[Y][J]||C(B[Y],J,B[Y].valueOf),E(B,G),N[V]=!0},a640:function(t,e,a){"use strict";var n=a("d039");t.exports=function(t,e){var a=[][t];return!!a&&n((function(){a.call(null,e||function(){throw 1},1)}))}},ae40:function(t,e,a){var n=a("83ab"),r=a("d039"),i=a("5135"),s=Object.defineProperty,o={},c=function(t){throw t};t.exports=function(t,e){if(i(o,t))return o[t];e||(e={});var a=[][t],l=!!i(e,"ACCESSORS")&&e.ACCESSORS,d=i(e,0)?e[0]:c,u=i(e,1)?e[1]:void 0;return o[t]=!!a&&!r((function(){if(l&&!n)return!0;var t={length:-1};l?s(t,1,{enumerable:!0,get:c}):t[1]=1,a.call(t,d,u)}))}},b64b:function(t,e,a){var n=a("23e7"),r=a("7b0b"),i=a("df75"),s=a("d039"),o=s((function(){i(1)}));n({target:"Object",stat:!0,forced:o},{keys:function(t){return i(r(t))}})},b727:function(t,e,a){var n=a("0366"),r=a("44ad"),i=a("7b0b"),s=a("50c4"),o=a("65f0"),c=[].push,l=function(t){var e=1==t,a=2==t,l=3==t,d=4==t,u=6==t,f=5==t||u;return function(p,b,g,m){for(var v,h,y=i(p),w=r(y),_=n(b,g,3),S=s(w.length),P=0,O=m||o,T=e?O(p,S):a?O(p,0):void 0;S>P;P++)if((f||P in w)&&(v=w[P],h=_(v,P,y),t))if(e)T[P]=h;else if(h)switch(t){case 3:return!0;case 5:return v;case 6:return P;case 2:c.call(T,v)}else if(d)return!1;return u?-1:l||d?d:T}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},c112:function(t,e,a){"use strict";var n=a("7d09"),r=a.n(n);r.a},dbb4:function(t,e,a){var n=a("23e7"),r=a("83ab"),i=a("56ef"),s=a("fc6a"),o=a("06cf"),c=a("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(t){var e,a,n=s(t),r=o.f,l=i(n),d={},u=0;while(l.length>u)a=r(n,e=l[u++]),void 0!==a&&c(d,e,a);return d}})},e439:function(t,e,a){var n=a("23e7"),r=a("d039"),i=a("fc6a"),s=a("06cf").f,o=a("83ab"),c=r((function(){s(1)})),l=!o||c;n({target:"Object",stat:!0,forced:l,sham:!o},{getOwnPropertyDescriptor:function(t,e){return s(i(t),e)}})},e5383:function(t,e,a){var n=a("b622");e.f=n},e8b5:function(t,e,a){var n=a("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-3882d969.70fe847c.js.map