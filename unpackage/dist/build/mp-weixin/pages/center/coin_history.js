(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/center/coin_history"],{1220:function(t,n,e){},3184:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c},o=[]},"40dc":function(t,n,e){"use strict";var a=e("1220"),i=e.n(a);i.a},"752d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{page:1,list:[],loadEnd:!1}},onReachBottom:function(t){this.loadEnd||(this.page++,this.getList("bottom"))},onPullDownRefresh:function(){this.loadEnd=!1,this.page=1,this.getList("pull")},mounted:function(){this.getList("bottom")},methods:{getList:function(n){var e=this;this.$getR("/api/getUserCoinDetail",{page:this.page}).then((function(a){e.page=a.info.current_page,1===e.page?e.list=a.info.data:e.list=e.list.concat(a.info.data),"pull"==n&&t.stopPullDownRefresh(),a.info.data&&a.info.data.length<20&&(e.loadEnd=!0)})).catch((function(t){}))}}};n.default=e}).call(this,e("543d")["default"])},"952a":function(t,n,e){"use strict";(function(t){e("ebbf");a(e("66fd"));var n=a(e("a34e"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a322:function(t,n,e){"use strict";e.r(n);var a=e("752d"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},a34e:function(t,n,e){"use strict";e.r(n);var a=e("3184"),i=e("a322");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("40dc");var u,c=e("f0c5"),r=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=r.exports}},[["952a","common/runtime","common/vendor"]]]);