(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b49c155"],{"057f":function(t,e,r){var n=r("fc6a"),a=r("241c").f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return a(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==o.call(t)?s(t):a(n(t))}},"159b":function(t,e,r){var n=r("da84"),a=r("fdbc"),o=r("17c2"),i=r("9112");for(var s in a){var c=n[s],u=c&&c.prototype;if(u&&u.forEach!==o)try{i(u,"forEach",o)}catch(l){u.forEach=o}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,a=r("a640"),o=r("ae40"),i=a("forEach"),s=o("forEach");t.exports=i&&s?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),o=r("2d00"),i=a("species");t.exports=function(t){return o>=51||!n((function(){var e=[],r=e.constructor={};return r[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},4160:function(t,e,r){"use strict";var n=r("23e7"),a=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},"4de4":function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").filter,o=r("1dde"),i=r("ae40"),s=o("filter"),c=i("filter");n({target:"Array",proto:!0,forced:!s||!c},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"65f0":function(t,e,r){var n=r("861d"),a=r("e8b5"),o=r("b622"),i=o("species");t.exports=function(t,e){var r;return a(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?n(r)&&(r=r[i],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"746f":function(t,e,r){var n=r("428f"),a=r("5135"),o=r("e538"),i=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});a(e,t)||i(e,t,{value:o.f(t)})}},8418:function(t,e,r){"use strict";var n=r("c04e"),a=r("9bf2"),o=r("5c6c");t.exports=function(t,e,r){var i=n(e);i in t?a.f(t,i,o(0,r)):t[i]=r}},9879:function(t,e,r){},a21c:function(t,e,r){"use strict";var n=r("9879"),a=r.n(n);a.a},a4d3:function(t,e,r){"use strict";var n=r("23e7"),a=r("da84"),o=r("d066"),i=r("c430"),s=r("83ab"),c=r("4930"),u=r("fdbf"),l=r("d039"),f=r("5135"),d=r("e8b5"),p=r("861d"),b=r("825a"),g=r("7b0b"),h=r("fc6a"),m=r("c04e"),v=r("5c6c"),w=r("7c73"),y=r("df75"),S=r("241c"),O=r("057f"),C=r("7418"),_=r("06cf"),j=r("9bf2"),k=r("d1e7"),L=r("9112"),P=r("6eeb"),I=r("5692"),T=r("f772"),x=r("d012"),R=r("90e3"),D=r("b622"),E=r("e538"),N=r("746f"),A=r("d44e"),$=r("69f3"),M=r("b727").forEach,V=T("hidden"),G="Symbol",F="prototype",J=D("toPrimitive"),H=$.set,U=$.getterFor(G),z=Object[F],B=a.Symbol,q=o("JSON","stringify"),Q=_.f,W=j.f,K=O.f,X=k.f,Y=I("symbols"),Z=I("op-symbols"),tt=I("string-to-symbol-registry"),et=I("symbol-to-string-registry"),rt=I("wks"),nt=a.QObject,at=!nt||!nt[F]||!nt[F].findChild,ot=s&&l((function(){return 7!=w(W({},"a",{get:function(){return W(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=Q(z,e);n&&delete z[e],W(t,e,r),n&&t!==z&&W(z,e,n)}:W,it=function(t,e){var r=Y[t]=w(B[F]);return H(r,{type:G,tag:t,description:e}),s||(r.description=e),r},st=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof B},ct=function(t,e,r){t===z&&ct(Z,e,r),b(t);var n=m(e,!0);return b(r),f(Y,n)?(r.enumerable?(f(t,V)&&t[V][n]&&(t[V][n]=!1),r=w(r,{enumerable:v(0,!1)})):(f(t,V)||W(t,V,v(1,{})),t[V][n]=!0),ot(t,n,r)):W(t,n,r)},ut=function(t,e){b(t);var r=h(e),n=y(r).concat(bt(r));return M(n,(function(e){s&&!ft.call(r,e)||ct(t,e,r[e])})),t},lt=function(t,e){return void 0===e?w(t):ut(w(t),e)},ft=function(t){var e=m(t,!0),r=X.call(this,e);return!(this===z&&f(Y,e)&&!f(Z,e))&&(!(r||!f(this,e)||!f(Y,e)||f(this,V)&&this[V][e])||r)},dt=function(t,e){var r=h(t),n=m(e,!0);if(r!==z||!f(Y,n)||f(Z,n)){var a=Q(r,n);return!a||!f(Y,n)||f(r,V)&&r[V][n]||(a.enumerable=!0),a}},pt=function(t){var e=K(h(t)),r=[];return M(e,(function(t){f(Y,t)||f(x,t)||r.push(t)})),r},bt=function(t){var e=t===z,r=K(e?Z:h(t)),n=[];return M(r,(function(t){!f(Y,t)||e&&!f(z,t)||n.push(Y[t])})),n};if(c||(B=function(){if(this instanceof B)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=R(t),r=function(t){this===z&&r.call(Z,t),f(this,V)&&f(this[V],e)&&(this[V][e]=!1),ot(this,e,v(1,t))};return s&&at&&ot(z,e,{configurable:!0,set:r}),it(e,t)},P(B[F],"toString",(function(){return U(this).tag})),P(B,"withoutSetter",(function(t){return it(R(t),t)})),k.f=ft,j.f=ct,_.f=dt,S.f=O.f=pt,C.f=bt,E.f=function(t){return it(D(t),t)},s&&(W(B[F],"description",{configurable:!0,get:function(){return U(this).description}}),i||P(z,"propertyIsEnumerable",ft,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:B}),M(y(rt),(function(t){N(t)})),n({target:G,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var r=B(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!s},{create:lt,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:bt}),n({target:"Object",stat:!0,forced:l((function(){C.f(1)}))},{getOwnPropertySymbols:function(t){return C.f(g(t))}}),q){var gt=!c||l((function(){var t=B();return"[null]"!=q([t])||"{}"!=q({a:t})||"{}"!=q(Object(t))}));n({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,r){var n,a=[t],o=1;while(arguments.length>o)a.push(arguments[o++]);if(n=e,(p(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!st(e))return e}),a[1]=e,q.apply(null,a)}})}B[F][J]||L(B[F],J,B[F].valueOf),A(B,G),x[V]=!0},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},ae40:function(t,e,r){var n=r("83ab"),a=r("d039"),o=r("5135"),i=Object.defineProperty,s={},c=function(t){throw t};t.exports=function(t,e){if(o(s,t))return s[t];e||(e={});var r=[][t],u=!!o(e,"ACCESSORS")&&e.ACCESSORS,l=o(e,0)?e[0]:c,f=o(e,1)?e[1]:void 0;return s[t]=!!r&&!a((function(){if(u&&!n)return!0;var t={length:-1};u?i(t,1,{enumerable:!0,get:c}):t[1]=1,r.call(t,l,f)}))}},b64b:function(t,e,r){var n=r("23e7"),a=r("7b0b"),o=r("df75"),i=r("d039"),s=i((function(){o(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(t){return o(a(t))}})},b727:function(t,e,r){var n=r("0366"),a=r("44ad"),o=r("7b0b"),i=r("50c4"),s=r("65f0"),c=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,l=4==t,f=6==t,d=5==t||f;return function(p,b,g,h){for(var m,v,w=o(p),y=a(w),S=n(b,g,3),O=i(y.length),C=0,_=h||s,j=e?_(p,O):r?_(p,0):void 0;O>C;C++)if((d||C in y)&&(m=y[C],v=S(m,C,w),t))if(e)j[C]=v;else if(v)switch(t){case 3:return!0;case 5:return m;case 6:return C;case 2:c.call(j,m)}else if(l)return!1;return f?-1:u||l?l:j}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},bb0b:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("a-table",{staticClass:"table-content",attrs:{columns:t.columns,"row-key":function(t){return t.orderId},"data-source":t.data,pagination:t.pagination,loading:t.loading,customRow:t.clickRow,rowClassName:t.addRowClass},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"username",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:e}},[t._v(" "+t._s(e)+" ")])]}},{key:"orderSn",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:e}},[t._v(" "+t._s(e)+" ")])]}},{key:"addTime",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:new Date(e).toLocaleString()}},[t._v(" "+t._s(new Date(e).toLocaleString())+" ")])]}},{key:"endTime",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:new Date(e).toLocaleString()}},[t._v(" "+t._s(new Date(e).toLocaleString())+" ")])]}},{key:"productName",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:e}},[t._v(" "+t._s(e)+" ")])]}},{key:"productId",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:e}},[r("a",{attrs:{href:"http://pc.jihui88.com/rest/site/"+e+"/index",target:"_blank"}},[t._v(t._s(e))])])]}},{key:"orderType",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:"01"==e?"购买":"续费"}},[t._v(" "+t._s("01"==e?"购买":"续费")+" ")])]}},{key:"orderStatus",fn:function(e){return[r("span",{staticClass:"table-content-span-ellipsis",attrs:{title:t.getStatus(e)}},[t._v(" "+t._s(t.getStatus(e))+" ")])]}},{key:"operation",fn:function(e,n){return[r("div",["01"!=n.orderStatus?r("a",{staticClass:"block",attrs:{href:"javascript:;"},on:{click:function(e){return t.orderPass(n)}}},[t._v("审核通过")]):t._e(),"02"!=n.orderStatus?r("a",{staticClass:"block",attrs:{href:"javascript:;"},on:{click:function(e){return t.orderUnpass(n)}}},[t._v("审核不通过")]):t._e(),r("a",{staticClass:"block",attrs:{href:"javascript:;"},on:{click:function(e){return t.showDrawer(n)}}},[t._v("查看代理商信息")])])]}}])}),r("a-drawer",{staticClass:"drawer-content",attrs:{width:"640",placement:"right",closable:!0,visible:t.visible},on:{close:t.onClose}},[r("a-spin",{attrs:{spinning:t.spinning,tip:"加载中。。。"}},[r("a-row",[r("a-col",{attrs:{span:12}},[r("p",{staticClass:"drawer-item drawer-item-title"},[t._v("代理商账号")]),r("p",{staticClass:"drawer-item"},[t._v(t._s(t.drawerContent.username))])])],1),r("a-row",[r("a-col",{attrs:{span:12}},[r("p",{staticClass:"drawer-item drawer-item-title"},[t._v("姓名")]),r("p",{staticClass:"drawer-item"},[t._v(t._s(t.drawerContent.name))])])],1),r("a-row",[r("a-col",{attrs:{span:12}},[r("p",{staticClass:"drawer-item drawer-item-title"},[t._v("公司名称")]),r("p",{staticClass:"drawer-item"},[t._v(t._s(t.drawerContent.entName))])])],1),r("a-row",[r("a-col",{attrs:{span:12}},[r("p",{staticClass:"drawer-item drawer-item-title"},[t._v("email")]),r("p",{staticClass:"drawer-item"},[t._v(t._s(t.drawerContent.email))])])],1),r("a-row",[r("a-col",{attrs:{span:12}},[r("p",{staticClass:"drawer-item drawer-item-title"},[t._v("手机号码")]),r("p",{staticClass:"drawer-item"},[t._v(t._s(t.drawerContent.cellphone))])])],1)],1)],1)],1)},a=[],o=r("5530"),i=[{title:"企业账号",dataIndex:"username",width:"8%",scopedSlots:{customRender:"username"}},{title:"订单编号",dataIndex:"orderSn",width:"10%",scopedSlots:{customRender:"orderSn"}},{title:"产品名称",dataIndex:"productName",width:"8%",scopedSlots:{customRender:"productName"}},{title:"创建时间",dataIndex:"addTime",width:"10%",scopedSlots:{customRender:"addTime"}},{title:"站点编号",dataIndex:"productId",width:"8%",scopedSlots:{customRender:"productId"}},{title:"金额",dataIndex:"amount",width:"6%",scopedSlots:{customRender:"amount"}},{title:"到期时间",dataIndex:"endTime",width:"10%",scopedSlots:{customRender:"endTime"}},{title:"订单类型",dataIndex:"orderType",width:"8%",scopedSlots:{customRender:"orderType"}},{title:"使用年限",dataIndex:"year",width:"7%",scopedSlots:{customRender:"year"}},{title:"审核状态",dataIndex:"orderStatus",width:"10%",scopedSlots:{customRender:"orderStatus"}},{title:"操作",dataIndex:"operation",width:"12%",scopedSlots:{customRender:"operation"}}],s={name:"OrderAgentVerifyTable",data:function(){return{console:!1,data:[],visible:!1,spinning:!0,selectedNo:"",drawerContent:{},pagination:{page:1,current:1},loading:!1,columns:i}},mounted:function(){this.fetch()},methods:{handleTableChange:function(t,e,r){var n=Object(o["a"])({},this.pagination);n.current=t.current,this.pagination=n,this.fetch(Object(o["a"])({results:t.pageSize,page:t.current,sortField:r.field,sortOrder:r.order},e))},fetch:function(){var t=this;this.loading=!0;var e={pageSize:10,page:this.pagination.current};if(sessionStorage.getItem("siteParams")){var r=JSON.parse(sessionStorage.getItem("siteParams"));e=Object(o["a"])(Object(o["a"])({},e),r)}this.$api.getAgentOrderList(e).then((function(e){if(t.console&&console.log(e),0==e.data.code&&"success"==e.data.msg){t.loading=!1;var r=Object(o["a"])({},t.pagination);r.total=e.data.data.count,t.data=e.data.data.orderList,t.pagination=r}else t.$message.error(e.data.msg)})).catch((function(t){console.log(t)}))},clickRow:function(t){var e=this;return{on:{click:function(){e.selectedNo=t.orderId}}}},addRowClass:function(t){var e="";return t.orderId===this.selectedNo&&(e="selected-tr"),e},onClose:function(){this.visible=!1},showDrawer:function(t){var e=this;this.visible=!0,this.spinning=!0;var r={agentId:t.agentId};this.$api.getAgentDetail(r).then((function(t){e.console&&console.log(t),e.spinning=!1,0==t.data.code&&"success"==t.data.msg?(e.spinning=!1,e.drawerContent=t.data.data):e.$message.error(t.data.msg)})).catch((function(t){console.log(t)}))},orderPass:function(t){var e=this,r={orderId:t.orderId};this.$api.postAgentOrderPass(r).then((function(t){e.console&&console.log(t),0==t.data.code&&"success"==t.data.msg?(e.$message.success("操作成功"),e.$emit("refresh",(new Date).getTime())):e.$message.error(t.data.msg)})).catch((function(t){console.log(t)}))},orderUnpass:function(t){var e=this,r={orderId:t.orderId};this.$api.postAgentOrderUnpass(r).then((function(t){e.console&&console.log(t),0==t.data.code&&"success"==t.data.msg?(e.$message.success("操作成功"),e.$emit("refresh",(new Date).getTime())):e.$message.error(t.data.msg)})).catch((function(t){console.log(t)}))},changeImg:function(t){console.log(t)},getStatus:function(t){var e;switch(t){case"00":e="未审核";break;case"01":e="审核通过";break;case"02":e="审核未通过";break;case"03":e="已关闭";break;default:e="其它";break}return e}}},c=s,u=(r("a21c"),r("2877")),l=Object(u["a"])(c,n,a,!1,null,"1b0aa64e",null);e["default"]=l.exports},dbb4:function(t,e,r){var n=r("23e7"),a=r("83ab"),o=r("56ef"),i=r("fc6a"),s=r("06cf"),c=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,r,n=i(t),a=s.f,u=o(n),l={},f=0;while(u.length>f)r=a(n,e=u[f++]),void 0!==r&&c(l,e,r);return l}})},e439:function(t,e,r){var n=r("23e7"),a=r("d039"),o=r("fc6a"),i=r("06cf").f,s=r("83ab"),c=a((function(){i(1)})),u=!s||c;n({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(t,e){return i(o(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);