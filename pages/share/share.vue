<template>
	<view>
		<view class="nl_share-red">
			<view class="nl_red-bg-curve1"></view>
			<view class="nl_red-bg-curve2"></view>
			<image class="nl_red-icon" :src="imgHost + couponInfo.icon"></image>
		</view>
		<view>
			<view class="nl_share-red-title">好友送你红包啦</view>
			<view class="nl_share-red-subtitle">{{ couponInfo.name }}</view>
			<view v-if="couponInfo.price > 0">
				<view class="nl_share-red-max">最高</view>
				<view class="nl_share-red-price">{{ couponInfo.price }}元</view>
			</view>
			<view v-else style="height: 180rpx;"></view>
			<navigator class="nl-share-get" open-type="navigate" target="miniProgram" :app-id="couponInfo.cps_link.appid" :path="couponInfo.cps_link.link">前往领取</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				imgHost: getApp().globalData.imgHost,
				couponInfo: {
					price: 0,
					link: '',
					icon: '',
					name: ''
				}
			}
		},
		onShareAppMessage (event) {
		},
		onShareTimeline () {
		},
		onLoad(options) {
			let params = {
				invite_user: options.invite_user,
				coupon: options.coupon
			}
			this.getCouponInfo(params)
		},
		methods: {
			getCouponInfo (params) {
				let _this = this
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function (loginRes) {
									_this.$postR('/api/login', { code: loginRes.code }, false).then(res => {
										if (res.status === 'success') {
											// if (res.info.openid === params.invite_user) {
											// 	uni.showModal({
											// 		content: '不能领自己分享的红包',
											// 		showCancel: false,
											// 		success: function () {
											// 			uni.switchTab({
											// 				url: '/pages/index/index'
											// 			})
											// 		}
											// 	})
											// 	return
											// }
											params.openid = res.info.openid
											_this.$getR('/api/getCouponInfoForShare', params).then(res => {
												if (res.status === 'success') {
													_this.couponInfo = res.info
												}
											})
										}
									}).catch(res => {
										uni.showToast({
											title: '获取红包失败',
											icon: 'none'
										})
									})
								}
							});
						}
					},
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fe5656;
}
.nl_share-red {
	position: relative;
	height: 560rpx;
}
.nl_red-bg-curve1 {
	position: absolute;
	top: 220rpx;
	width: 100%;
	height: 120px;
	background-color: #A51C1C;
	border-bottom-left-radius: 50%;
	border-bottom-right-radius: 50%;
}
.nl_red-bg-curve2 {
	position: absolute;
	top: 210rpx;
	width: 100%;
	height: 120px;
	background-color: #fe5656;
	border-bottom-left-radius: 50%;
	border-bottom-right-radius: 50%;
}
.nl_red-icon {
	box-sizing: border-box;
	position: absolute;
	top: 350rpx;
	left: 50%;
	width: 160rpx;
	height: 160rpx;
	margin-left: -80rpx;
	background-color: #fff;
	border-radius: 50%;
	border: 10rpx solid #ff8080;
}
.nl_share-red-title {
	text-align: center;
	font-size: 40rpx;
	color: #ffcca2;
}
.nl_share-red-subtitle {
	margin-top: 16rpx;
	text-align: center;
	font-size: 32rpx;
	color: #ffcca2;
}
.nl_share-red-max {
	margin-top: 40rpx;
	text-align: center;
	font-size: 28rpx;
	color: #FEB980;
}
.nl_share-red-price {
	text-align: center;
	font-size: 120rpx;
	color: #FEA256;
	line-height: 1.1;
}
.nl-share-get {
	box-sizing: border-box;
	margin: 280rpx auto 0;
	width: 400rpx;
	padding: 30rpx 0;
	text-align: center;
	font-size: 36rpx;
	line-height: 1;
	border-radius: 100rpx;
	color: #fff;
	background-color: #FEA256;
}
</style>
