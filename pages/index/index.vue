<template>
	<view>
		<view class="nl_top-ads">
			<swiper v-if="ads.length > 0" class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :style="'height:' + swiperHeight">
				<swiper-item v-for="(item, key) in ads" :key="key">
					<navigator v-if="item.type === 3" open-type="navigate" target="miniProgram" :app-id="item.coupon.cps_link.appid" :path="item.coupon.cps_link.link">
						<view>
							<image class="nl_ad-image" :src="imgHost + item.img_url" mode="widthFix" @load="loadImage"></image>
						</view>
					</navigator>
					<navigator v-else-if="item.type === 2" :url="'/pages/index/web_view?src=' + item.link">
						<view>
							<image class="nl_ad-image" :src="imgHost + item.img_url" mode="widthFix" @load="loadImage"></image>
						</view>
					</navigator>
					<navigator v-else-if="item.type === 1" open-type="navigate" target="miniProgram" :app-id="item.appid" :path="item.link">
						<view>
							<image class="nl_ad-image" :src="imgHost + item.img_url" mode="widthFix" @load="loadImage"></image>
						</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="nl_section" v-if="systemSetting.index_coupon_display === 1">
			<view class="nl_section-head">
				<image class="nl_section-icon" src="../../static/red_icon.png"></image>
				<view class="nl_section-title">领红包拿返利</view>
			</view>
			<view class="nl_section-body">
				<view class="nl_coupons">
					<block  v-for="(item, key) in link" :key="key">
						<navigator v-if="item.jump_get_page === 0" class="nl_coupon-item" open-type="navigate" target="miniProgram" :app-id="item.cps_link.appid" :path="item.cps_link.link">
							<image class="nl_coupon-hot" src="../../static/hot_2.png"></image>
							<view class="nl_coupon-label">
								<image class="nl_coupon-cover" :src="imgHost + item.icon"></image>
							</view>
							<view class="nl_coupon-content">
								<view class="nl_coupon-title">{{ item.name }}</view>
								<view v-if="item.price > 0" class="nl_coupon-detail">
									<text class="nl_coupon-price-text">最高</text>
									<text class="nl_coupon-price">{{ item.price }}元</text>
								</view>
								<view v-else class="nl_coupon-detail">
									<text class="nl_coupon-price-text">前往</text>
									<text class="nl_coupon-price">抢购</text>
								</view>
							</view>
							<view class="nl_coupon-get">
								<button v-if="item.share_btn === 1" class="nl_coupon-share" open-type="share" :data-coupon="item.id" :data-cover="item.cover"  @click.stop="">
									<image class="nl_coupon-share-icon" src="../../static/share2.png"></image>
								</button>
								<!-- <button class="nl_coupon-share" :data-coupon="item.id"  @click.stop="toSharePage">
									<image class="nl_coupon-share-icon" src="../../static/share2.png"></image>
								</button> -->
								<button class="nl_coupon-btn" type="default">免费领取</button>
							</view>
						</navigator>
						<navigator v-else class="nl_coupon-item" open-type="navigate" :url="'./coupon_detail?coupon=' + item.id">
							<image class="nl_coupon-hot" src="../../static/hot_2.png"></image>
							<view class="nl_coupon-label">
								<image class="nl_coupon-cover" :src="imgHost + item.icon"></image>
							</view>
							<view class="nl_coupon-content">
								<view class="nl_coupon-title">{{ item.name }}</view>
								<view v-if="item.price > 0" class="nl_coupon-detail">
									<text class="nl_coupon-price-text">最高</text>
									<text class="nl_coupon-price">{{ item.price }}元</text>
								</view>
								<view v-else class="nl_coupon-detail">
									<text class="nl_coupon-price-text">前往</text>
									<text class="nl_coupon-price">抢购</text>
								</view>
							</view>
							<view class="nl_coupon-get">
								<button v-if="item.share_btn === 1" class="nl_coupon-share" open-type="share" :data-coupon="item.id" :data-cover="item.cover"  @click.stop="">
									<image class="nl_coupon-share-icon" src="../../static/share2.png"></image>
								</button>
								<!-- <button class="nl_coupon-share" :data-coupon="item.id"  @click.stop="toSharePage">
									<image class="nl_coupon-share-icon" src="../../static/share2.png"></image>
								</button> -->
								<button class="nl_coupon-btn" type="default">免费领取</button>
							</view>
						</navigator>
					</block>
				</view>
				<navigator v-if="systemSetting.index_coupon_more === 1" class="nl_coupon-more-nav" url="./coupon">
					<image class="nl_coupon-more-image" src="../../static/red_more2.png"></image>
				</navigator>
			</view>
		</view>
		<!-- <view class="nl_red-packet-item">
			<image class="nl_red-icon" src="../../static/ele.jpeg"></image>
		</view> -->
		<view class="nl_section">
			<view class="nl_section-head">
				<image class="nl_section-icon" src="../../static/rice.png"></image>
				<view class="nl_section-title">{{ timeTypeText }}点什么</view>
			</view>
			<view class="nl_section-body nl_choose-food-box">
				<view class="nl_choose-food">{{ food }}</view>
				<view v-if="stopFlag" class="nl_choose-run" @click="randomFood">开始</view>
				<view v-else class="nl_choose-run" @click="stopRandomFood">停</view>
			</view>
		</view>
		<view class="nl_section">
			<view class="nl_section-head">
				<image class="nl_section-icon" src="../../static/clock.png"></image>
				<view class="nl_section-title">点餐提醒</view>
			</view>
			<view class="nl_section-body">
				<view class="nl_notice">
					<view>
						<text class="nl_notice-day">每天</text>
						<picker mode="time" class="nl_notice-clock" :value="clockNotice.clock1_str" @change="selectClock"  data-time="1">
							<text>{{ clockNotice.clock1_str }}</text>
						</picker>
					</view>
					<switch class="nl_notice-switch" color="#fe5656" @change="setClockNoticeStatus" data-time="1" :checked="clockNotice.clock1_status === 1"></switch>
				</view>
				<view class="nl_notice">
					<view>
						<text class="nl_notice-day">每天</text>
						<picker mode="time" class="nl_notice-clock" :value="clockNotice.clock2_str" @change="selectClock" data-time="2">
							<text>{{ clockNotice.clock2_str }}</text>
						</picker>
					</view>
					<switch class="nl_notice-switch" color="#fe5656" @change="setClockNoticeStatus" data-time="2" :checked="clockNotice.clock2_status === 1"></switch>
				</view>
			</view>
		</view>
		<view class="nl_section nl_section-draw" v-if="drawStatus">
			<view class="nl_section-head">
				<image class="nl_section-icon" src="../../static/gift.png"></image>
				<view class="nl_section-title">抽奖</view>
			</view>
			<view class="">
				<view class="nl_draw-bg">
					<view class="nl_draw-bg-color1">
						<view class="nl_draw-title">
							<image class="nl_draw-title-image" src="../../static/draw_t.png" mode="aspectFit"></image>
						</view>
						<view class="nl_draw-count" v-if="drawCount > 0">
							<text>还有{{ drawCount }}次抽奖机会</text>
						</view>
						<view class="nl_draw-count" v-else>
							<text>抽奖次数已用完</text>
						</view>
					</view>
					<view class="nl_draw-bg-color2"></view>
					<view class="nl_draw-bg-color3"></view>
					<view class="nl_draw-bg-color4"></view>
					<view class="nl_draw-box">
						<block v-for="(item, key) in drawRewardConfig" :key="key">
							<view class="nl_draw-item" :class="selected === key ? 'selected' : ''">
								<image :src="imgHost + item.img_url" class="nl_draw-image"></image>
							</view>
							<view v-if="key === 3" class="nl_draw-item nl_draw-start" @click="startDraw">
								<view class="nl_draw-start-text">点击</view>
								<view class="nl_draw-start-text">抽奖</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onReady () {
			this.getDrawConfig()
			this.getUserDrawCount()
			this.getTimeType()
			this.getFoods()
			this.getClockNotice()
			this.getCouponList()
			this.getSystemSetting()
			this.getBanner()
		},
		onShareAppMessage (event) {
			let id = event.target.dataset.coupon
			let res = {
				title: '来自好友分享外卖红包',
				path: '/pages/share/share?coupon=' + id + '&invite_user=' + uni.getStorageSync('openid')
			}
			if (event.target.dataset.cover) {
				res.imageUrl = this.imgHost + event.target.dataset.cover
			}
			return res
		},
		data() {
			return {
				link: {},
				imgHost: getApp().globalData.imgHost,
				selected: -1,
				food: '吃啥呢？🤔',
				timeTypeText: '',
				// 随机次数
				randomCount: 0,
				stopFlag: true,
				foodPool: ['白菜','玉米','麻辣烫','烧烤','白粥','奶茶'],
				clockTime1: '10:30',
				clockTime2: '17:00',
				clockNotice: {
					clock1_str: '10:30',
					clock2_str: '17:00',
					clock1_status: 0,
					clock2_status: 0
				},
				stopDraw: true,
				drawBoxSort: [0, 1, 2, 4, 7, 6, 5, 3],
				drawRewardMap: {},
				drawItemIndex: 0,
				onceDrawTimeLength: 80,
				drawRewardConfig: [],
				drawResult: null,
				drawCount: 0,
				//抽奖是否开启
				drawStatus: 0,
				systemSetting: getApp().globalData.setting,
				swiperHeight: '',
				ads: []
			}
		},
		methods: {
			// 获取广告图片
			getBanner () {
				this.$getR('/api/ad/index').then(res => {
					if (res.status === 'success') {
						this.ads = res.info
					}
				})
			},
			// 加载图片
			loadImage (e) {
				let width = uni.getSystemInfoSync().windowWidth
				let imageHeight = e.detail.height
				let imgWidth = e.detail.width
				this.swiperHeight = width * imageHeight / imgWidth + 'px'
			},
			// 获取小程序设置
			getSystemSetting () {
				if (getApp().globalData.setting) {
					this.systemSetting = getApp().globalData.setting
				} else {
					this.$getR('/api/getMiniProgramSetting').then(res => {
						this.systemSetting = res.info
						getApp().globalData.setting = res.info
					})
				}
			},
			// 获取优惠券列表
			getCouponList (openid) {
				this.$getR('/api/getIndexCoupons', {openid: uni.getStorageSync('openid')}, true).then(res => {
					this.link = res.info.data
				}).catch((res) => {
				})
			},
			//获取抽奖配置
			getDrawConfig () {
				this.$getR('/api/getDrawInfo').then(res => {
					if (res.status === 'success') {
						this.drawRewardConfig = res.info.reward
						this.drawStatus = res.info.status
						this.drawRewardConfig.map((item, key) => {
							this.drawRewardMap[item.id] = key
						})
					}
				})
			},
			//获取用户抽奖次数
			getUserDrawCount () {
				this.$getR('/api/getUserDrawCount').then(res => {
					if (res.status === 'success') {
						this.drawCount = res.info.draw_count
					}
				})
			},
			//开始抽奖
			startDraw () {
				if (!this.drawStatus) {
					uni.showToast({
						icon: 'none',
						title: '抽奖尚未开放'
					})
					return
				}
				if (!this.stopDraw) {
					return
				}
				this.$getR('/api/getUserDrawCount').then(res => {
					if (res.status === 'success') {
						if (res.info.draw_count > 0) {
							this.drawCount = res.info.draw_count - 1
							this.stopDraw = false
							// this.selected = 0
							this.onceDrawTimeLength = 80
							// this.drawItemIndex = 0
							this.drawResult = null
							this.drawing()
						} else {
							uni.showToast({
								icon: 'none',
								title: '抽奖次数已用完'
							})
						}
					}
				})
			},
			//抽奖中
			drawing () {
				setTimeout(() => {
					if (this.drawItemIndex > 8) {
						this.drawItemIndex = 0
					}
					this.selected = this.drawBoxSort[this.drawItemIndex]
					this.drawItemIndex++
					if (!this.stopDraw && this.drawResult) {
						let boxIndex = this.drawRewardMap[this.drawResult.reward]
						if (this.selected === boxIndex) {
							this.stopDraw = true
							let content = '';
							if (this.drawResult.reward_info.is_win === 0) {
								content = '很遗憾，未中奖'
							} else {
								content = '恭喜你获得' + this.drawResult.reward_info.title
							}
							uni.showModal({
								content: content,
								confirmText: this.drawCount > 0 ? '再抽一次' : '次数不足' ,
								confirmColor: '#fe5656',
								cancelText: '关闭',
								success: (res) => {
									if (res.confirm && this.drawCount > 0) {
										this.startDraw()
									}
								},
								fail: (res) => {
									console.log(res)
								}
							})
							return
						}
					}
					if (this.onceDrawTimeLength === 170) {
						this.getDrawResult()
					}
					this.onceDrawTimeLength = this.onceDrawTimeLength + 3
					// if (this.onceDrawTimeLength > 200) {
					// 	return
					// }
					this.drawing()
				}, this.onceDrawTimeLength)
			},
			// 获取抽奖结果
			getDrawResult () {
				this.$postR('/api/startDraw').then(res => {
					if (res.status === 'success') {
						this.drawResult = res.info
						this.stopDraw = false
					}
				})
			},
			// 设置时间
			selectClock (event) {
				if (event.target.dataset.time === '1') {
					this.clockNotice.clock1_str = event.target.value
				} else if (event.target.dataset.time === '2') {
					this.clockNotice.clock2_str = event.target.value
				} else {
					return
				}
				this.setClockNotice()
			},
			// 设置提醒开关
			setClockNoticeStatus (event) {
				let status = event.detail.value ? 1 : 0
				if (status === 0) {
					if (event.target.dataset.time === '1') {
						this.clockNotice.clock1_status = status
					} else if (event.target.dataset.time === '2') {
						this.clockNotice.clock2_status = status
					} else {
						return
					}
					this.setClockNotice()
				} else {
					uni.requestSubscribeMessage({
						tmplIds: [
							'N9BCZEjQlLklpRuevXMVz0UMPlDePdSGBo5PM5V9Czs',
						],
						success: (res) => {
							if (res.N9BCZEjQlLklpRuevXMVz0UMPlDePdSGBo5PM5V9Czs === 'accept') {
								if (event.target.dataset.time === '1') {
									this.clockNotice.clock1_status = 1
								} else if (event.target.dataset.time === '2') {
									this.clockNotice.clock2_status = 1
								} else {
									return
								}
								this.setClockNotice()
							} else {
								if (event.target.dataset.time === '1') {
									this.clockNotice.clock1_status = 0
								} else if (event.target.dataset.time === '2') {
									this.clockNotice.clock2_status = 0
								} else {
									return
								}
								this.setClockNotice()
							}
						}
					})
				}
			},
			setClockNotice () {
				this.$postR('/api/setOrderNotice', this.clockNotice).then(res => {
				})
			},
			// 获取用户订餐配置
			getClockNotice () {
				this.$getR('/api/getOrderNoticeSetting').then(res => {
					if (res.status === 'success') {
						this.clockNotice = res.info
					}
				})
			},
			// 时刻
			getTimeType () {
				let date = new Date()
				let hour = date.getHours()
				let breakfastHour = [5,6,7,8,9]
				let lunchHour = [10,11,12,13]
				let dinnerHour = [17,18,19,20,21]
				let afternoonTeaHour = [14,15,16]
				let midnightSnachHour = [22,23,0,1,2,3,4]
				if (breakfastHour.indexOf(hour) !== -1) {
					this.timeTypeText = '早餐'
				} else if (lunchHour.indexOf(hour) !== -1) {
					this.timeTypeText = '午餐'
				} else if (dinnerHour.indexOf(hour) !== -1) {
					this.timeTypeText = '晚餐'
				} else if (afternoonTeaHour.indexOf(hour) !== -1) {
					this.timeTypeText = '下午茶'
				} else if (midnightSnachHour.indexOf(hour) !== -1) {
					this.timeTypeText = '宵夜'
				}
			},
			// 获取食物列表
			getFoods () {
				this.$getR('/api/getFoods').then(res => {
					if (res.status === 'success') {
						this.foodPool = res.info.foods
					}
				})
			},
			// 随机食物
			randomFood () {
				if (this.foodPool.length === 0) {
					return
				}
				if (this.stopFlag) {
					this.stopFlag = false
				}
				setTimeout(() => {
					let length = this.foodPool.length
					let randomKey = Math.floor(Math.random() * length)
					this.food = this.foodPool[randomKey]
					if (this.stopFlag) {
						this.randomCount = 0
						return
					}
					this.randomCount++
					if (this.randomCount > 100) {
						this.randomCount = 0;
						this.stopFlag = true
						return
					}
					this.randomFood()
				}, 50)
			},
			// 停止随机
			stopRandomFood () {
				this.stopFlag = true
			}
		}
	}
</script>

<style>
.nl_section {
	margin: 20rpx;
}
.nl_section-body {
	overflow: hidden;
	border-radius: 20rpx;
}
.nl_section-body-empty {

}
.nl_section-draw {
	padding-bottom: 100rpx;
}
.nl_section-head {
	position: relative;
}
.nl_section-icon {
	position: absolute;
	top: 15rpx;
	left: 0;
	width:52rpx;
	height: 52rpx;
}
.nl_section-title {
	padding: 20rpx 0 20rpx 60rpx;
	font-size: 32rpx;
	font-weight: bold;
}
.nl_choose-food-box {
	position: relative;
	padding: 20rpx;
	background-color: #fff;
}
.nl_choose-food {
	margin-right: 200rpx;
	padding: 20rpx 30rpx;
	border-radius: 30rpx;
	background-color: #F4F4F5;
	line-height: 1.5;
}
.nl_choose-run {
	box-sizing: border-box;
	position: absolute;
	right: 20rpx;
	top: 20rpx;
	padding: 20rpx 0;
	width: 180rpx;
	text-align: center;
	background-color: #333333;
	color: #fff;
	border-radius: 10rpx;
	line-height: 1.5;
}
.nl_notice {
	position: relative;
	background-color: #fff;
	padding: 30rpx;
}
.nl_notice:first-child {
	border-bottom: 1px solid #eee;
}
.nl_notice-day {
	font-size: 32rpx;
	margin-right: 10rpx;
	color: #777;
	vertical-align: 4rpx;
}
.nl_notice-clock {
	display: inline-block;
	font-size: 50rpx;
}
.nl_notice-switch {
	position: absolute;
	right: 30rpx;
	top: 34rpx;
}
.nl_draw-bg {
	position: relative;
	width: 520rpx;
	margin: 50rpx auto 0;
}
.nl_draw-box {
	margin-top: 180rpx;
	position: relative;
	box-sizing: border-box;
	width: 520rpx;
	height: 520rpx;
	background-color: #A51C1C;
	border-radius: 20rpx;
	z-index: 10;
	padding: 10rpx
}
.nl_draw-item {
	position: relative;
	box-sizing: border-box;
	float: left;
	width: 160rpx;
	height: 160rpx;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
	background: #fff;
	border-radius: 20rpx;
	border: 4rpx solid #ff8080;
}
.nl_draw-image {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -60rpx;
	margin-top: -60rpx;
	width: 120rpx;
	height: 120rpx;
}
.nl_draw-start {
	padding-top: 22rpx;
	text-align: center;
	color: #fe5656;
	font-size: 44rpx;
	background-color: #FDE600;
}
.nl_draw-start .nl_draw-start-text {
	line-height: 1.2;
}
.nl_draw-item.selected {
	box-shadow: 0 0 8rpx 8rpx #FDE600;
	border: none;
}
.nl_draw-item:nth-child(3n) {
	margin-right: 0;
}
.nl_draw-item:nth-child(7),
.nl_draw-item:nth-child(8),
.nl_draw-item:nth-child(9) {
	margin-bottom: 0;
}

.nl_draw-bg-color1 {
	box-sizing: border-box;
	position: absolute;
	top: -180rpx;
	left: -60rpx;
	z-index: 5;
	background-color: #fe5656;
	width: 640rpx;
	height: 780rpx;
	border-radius: 20rpx;
}
.nl_draw-title {
	padding-top: 20rpx;
	text-align: center;
}
.nl_draw-title-image {
	width: 282rpx;
	height: 60rpx;
}
.nl_draw-count {
	padding-top: 6rpx;
	padding-right: 40rpx;
	text-align: right;
	color: #fff;
	font-size: 28rpx;
}
.nl_draw-bg-color2 {
	box-sizing: border-box;
	position: absolute;
	top: -30rpx;
	left: -30rpx;
	z-index: 6;
	background-color: #ff8080;
	width: 580rpx;
	height: 580rpx;
	border-radius: 20rpx;
	box-shadow: 0 0 6rpx 4rpx #fff;
}
.nl_draw-bg-color3 {
	box-sizing: border-box;
	position: absolute;
	top: -20rpx;
	left: -20rpx;
	z-index: 7;
	background-color: #fe5656;
	width: 560rpx;
	height: 560rpx;
	border-radius: 20rpx;
	box-shadow: 0 0 6rpx 4rpx #fff;
}
.nl_draw-bg-color4 {
	box-sizing: border-box;
	position: absolute;
	top: -10rpx;
	left: -10rpx;
	z-index: 8;
	background-color: #ff8080;
	width: 540rpx;
	height: 540rpx;
	border-radius: 20rpx;
}
.nl_get-more-coupon {
	margin: 30rpx 200rpx 0;
	padding: 20rpx;
	text-align: center;
	background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
	color: #fff;
	font-size: 30rpx;
	border-radius: 10rpx;
}
.nl_get-more-coupon-go {
	margin-left: 10rpx;
}
.nl_coupon-more-nav {
	width: 600rpx;
	height: 172rpx;
	margin: -10rpx auto 0;
	text-align: center;
}
.nl_coupon-more-image {
	width: 600rpx;
	height: 172rpx;
}
.nl_ad-image {
	width: 100%;
}
/* .nl_red-packet-item {
	position: relative;
	width: 240rpx;
	height: 270rpx;
	background-image: url(../../static/red_bg_1.png);
	background-repeat: no-repeat;
	background-size: 240rpx 270rpx;
}
.nl_red-icon {
	position: absolute;
	top: 87rpx;
	left: 83rpx;
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
} */
</style>
