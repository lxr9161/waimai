(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/center/index"],{"063f":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},2788:function(t,n,e){"use strict";e.r(n);var o=e("72cc"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},"3c5c":function(t,n,e){},"72cc":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{todayIncome:"0.00",totalIncome:"0.00",withdrawalsTotal:"0.00",leftIncome:"0.00",authizeBtnDisplay:!1,coinTotal:0,centerCouponEnter:0}},onShow:function(){this.getIncomeInfo(),this.getSystemSetting()},methods:{getSystemSetting:function(){var t=this;getApp().globalData.setting?this.centerCouponEnter=getApp().globalData.setting.center_coupon_enter:this.$getR("/api/getMiniProgramSetting").then((function(n){t.systemSetting=n.info.center_coupon_enter,getApp().globalData.setting=n.info}))},getUserInfo:function(n){var e=this;t.getUserProfile({desc:"显示用户个人信息",success:function(o){e.$postR("/api/setWechatUserInfo",o).then((function(e){if("success"===e.status){var o=e.info;"update"===n?o="更新成功":"init"===n&&(o="完善成功"),t.showToast({title:o})}}))}})},getIncomeInfo:function(){var t=this;this.$getR("/api/income").then((function(n){t.userInfo=n.info.user_info,n.info.user_info.nickname?t.authizeBtnDisplay=!1:t.authizeBtnDisplay=!0,t.totalIncome=n.info.total_income,t.withdrawalsTotal=n.info.withdrawals_total,t.leftIncome=n.info.left_income,t.todayIncome=n.info.today_income,t.coinTotal=n.info.coin_total}))}}};n.default=e}).call(this,e("543d")["default"])},d3c4:function(t,n,e){"use strict";e.r(n);var o=e("063f"),i=e("2788");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("da3b");var c,u=e("f0c5"),f=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=f.exports},da3b:function(t,n,e){"use strict";var o=e("3c5c"),i=e.n(o);i.a},fb56:function(t,n,e){"use strict";(function(t){e("ebbf");o(e("66fd"));var n=o(e("d3c4"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["fb56","common/runtime","common/vendor"]]]);