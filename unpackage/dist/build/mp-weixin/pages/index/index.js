(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0dde":function(t,e,o){"use strict";o.r(e);var n=o("ec44"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},"5d75":function(t,e,o){"use strict";o.r(e);var n=o("edf1"),i=o("0dde");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("90b9");var s,c=o("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=r.exports},"90b9":function(t,e,o){"use strict";var n=o("c88c"),i=o.n(n);i.a},c88c:function(t,e,o){},de71:function(t,e,o){"use strict";(function(t){o("ebbf");n(o("66fd"));var e=n(o("5d75"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},ec44:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onReady:function(){this.getDrawConfig(),this.getUserDrawCount(),this.getTimeType(),this.getFoods(),this.getClockNotice(),this.getCouponList(),this.getSystemSetting(),this.getBanner()},onShareAppMessage:function(e){var o=e.target.dataset.coupon,n={title:"来自好友分享外卖红包",path:"/pages/share/share?coupon="+o+"&invite_user="+t.getStorageSync("openid")};return e.target.dataset.cover&&(n.imageUrl=this.imgHost+e.target.dataset.cover),n},data:function(){return{link:{},imgHost:getApp().globalData.imgHost,selected:-1,food:"吃啥呢？🤔",timeTypeText:"",randomCount:0,stopFlag:!0,foodPool:["白菜","玉米","麻辣烫","烧烤","白粥","奶茶"],clockTime1:"10:30",clockTime2:"17:00",clockNotice:{clock1_str:"10:30",clock2_str:"17:00",clock1_status:0,clock2_status:0},stopDraw:!0,drawBoxSort:[0,1,2,4,7,6,5,3],drawRewardMap:{},drawItemIndex:0,onceDrawTimeLength:80,drawRewardConfig:[],drawResult:null,drawCount:0,drawStatus:0,systemSetting:getApp().globalData.setting,swiperHeight:"",ads:[]}},methods:{getBanner:function(){var t=this;this.$getR("/api/ad/index").then((function(e){"success"===e.status&&(t.ads=e.info)}))},loadImage:function(e){var o=t.getSystemInfoSync().windowWidth,n=e.detail.height,i=e.detail.width;this.swiperHeight=o*n/i+"px"},getSystemSetting:function(){var t=this;getApp().globalData.setting?this.systemSetting=getApp().globalData.setting:this.$getR("/api/getMiniProgramSetting").then((function(e){t.systemSetting=e.info,getApp().globalData.setting=e.info}))},getCouponList:function(e){var o=this;this.$getR("/api/getIndexCoupons",{openid:t.getStorageSync("openid")},!0).then((function(t){o.link=t.info.data})).catch((function(t){}))},getDrawConfig:function(){var t=this;this.$getR("/api/getDrawInfo").then((function(e){"success"===e.status&&(t.drawRewardConfig=e.info.reward,t.drawStatus=e.info.status,t.drawRewardConfig.map((function(e,o){t.drawRewardMap[e.id]=o})))}))},getUserDrawCount:function(){var t=this;this.$getR("/api/getUserDrawCount").then((function(e){"success"===e.status&&(t.drawCount=e.info.draw_count)}))},startDraw:function(){var e=this;this.drawStatus?this.stopDraw&&this.$getR("/api/getUserDrawCount").then((function(o){"success"===o.status&&(o.info.draw_count>0?(e.drawCount=o.info.draw_count-1,e.stopDraw=!1,e.onceDrawTimeLength=80,e.drawResult=null,e.drawing()):t.showToast({icon:"none",title:"抽奖次数已用完"}))})):t.showToast({icon:"none",title:"抽奖尚未开放"})},drawing:function(){var e=this;setTimeout((function(){if(e.drawItemIndex>8&&(e.drawItemIndex=0),e.selected=e.drawBoxSort[e.drawItemIndex],e.drawItemIndex++,!e.stopDraw&&e.drawResult){var o=e.drawRewardMap[e.drawResult.reward];if(e.selected===o){e.stopDraw=!0;var n="";return n=0===e.drawResult.reward_info.is_win?"很遗憾，未中奖":"恭喜你获得"+e.drawResult.reward_info.title,void t.showModal({content:n,confirmText:e.drawCount>0?"再抽一次":"次数不足",confirmColor:"#fe5656",cancelText:"关闭",success:function(t){t.confirm&&e.drawCount>0&&e.startDraw()},fail:function(t){console.log(t)}})}}170===e.onceDrawTimeLength&&e.getDrawResult(),e.onceDrawTimeLength=e.onceDrawTimeLength+3,e.drawing()}),this.onceDrawTimeLength)},getDrawResult:function(){var t=this;this.$postR("/api/startDraw").then((function(e){"success"===e.status&&(t.drawResult=e.info,t.stopDraw=!1)}))},selectClock:function(t){if("1"===t.target.dataset.time)this.clockNotice.clock1_str=t.target.value;else{if("2"!==t.target.dataset.time)return;this.clockNotice.clock2_str=t.target.value}this.setClockNotice()},setClockNoticeStatus:function(e){var o=this,n=e.detail.value?1:0;if(0===n){if("1"===e.target.dataset.time)this.clockNotice.clock1_status=n;else{if("2"!==e.target.dataset.time)return;this.clockNotice.clock2_status=n}this.setClockNotice()}else t.requestSubscribeMessage({tmplIds:["N9BCZEjQlLklpRuevXMVz0UMPlDePdSGBo5PM5V9Czs"],success:function(t){if("accept"===t.N9BCZEjQlLklpRuevXMVz0UMPlDePdSGBo5PM5V9Czs){if("1"===e.target.dataset.time)o.clockNotice.clock1_status=1;else{if("2"!==e.target.dataset.time)return;o.clockNotice.clock2_status=1}o.setClockNotice()}else{if("1"===e.target.dataset.time)o.clockNotice.clock1_status=0;else{if("2"!==e.target.dataset.time)return;o.clockNotice.clock2_status=0}o.setClockNotice()}}})},setClockNotice:function(){this.$postR("/api/setOrderNotice",this.clockNotice).then((function(t){}))},getClockNotice:function(){var t=this;this.$getR("/api/getOrderNoticeSetting").then((function(e){"success"===e.status&&(t.clockNotice=e.info)}))},getTimeType:function(){var t=new Date,e=t.getHours(),o=[5,6,7,8,9],n=[10,11,12,13],i=[17,18,19,20,21],a=[14,15,16],s=[22,23,0,1,2,3,4];-1!==o.indexOf(e)?this.timeTypeText="早餐":-1!==n.indexOf(e)?this.timeTypeText="午餐":-1!==i.indexOf(e)?this.timeTypeText="晚餐":-1!==a.indexOf(e)?this.timeTypeText="下午茶":-1!==s.indexOf(e)&&(this.timeTypeText="宵夜")},getFoods:function(){var t=this;this.$getR("/api/getFoods").then((function(e){"success"===e.status&&(t.foodPool=e.info.foods)}))},randomFood:function(){var t=this;0!==this.foodPool.length&&(this.stopFlag&&(this.stopFlag=!1),setTimeout((function(){var e=t.foodPool.length,o=Math.floor(Math.random()*e);if(t.food=t.foodPool[o],t.stopFlag)t.randomCount=0;else{if(t.randomCount++,t.randomCount>100)return t.randomCount=0,void(t.stopFlag=!0);t.randomFood()}}),50))},stopRandomFood:function(){this.stopFlag=!0}}};e.default=o}).call(this,o("543d")["default"])},edf1:function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]}},[["de71","common/runtime","common/vendor"]]]);