<template>
	<view>
		<view class="nl_back" @click="back()">返回</view>
		<view v-if="share === 1">
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
		</view>
		<view v-else>
			<view class="nl_share-red">
				<view class="nl_red-bg-curve1"></view>
				<view class="nl_red-bg-curve2"></view>
				<image class="nl_red-icon" :src="imgHost + couponInfo.icon"></image>
			</view>
			<view>
				<view class="nl_share-red-title">{{ couponInfo.name }}</view>
				<view v-if="couponInfo.price">
					<view class="nl_share-red-max">最高</view>
					<view class="nl_share-red-price">{{ couponInfo.price }}元</view>
				</view>
				<view v-else="couponInfo.price">
					<view class="nl_share-red-max" style="height: 160rpx;"></view>
				</view>
				<view class="nl_coupon-detail-btns">
					<navigator class="nl_coupon-detail-btn-default {" open-type="navigate" target="miniProgram" :app-id="couponInfo.cps_link.appid" :path="couponInfo.cps_link.link">前往领取</navigator>
					<button class="nl_coupon-detail-btn-default nl_coupon-detai-btn-share" open-type="share" :data-coupon="couponInfo.id" :data-cover="couponInfo.cover">
						分享好友
					</button>
				</view>
			</view>
			<view class="nl_coupon-rules" v-if="couponInfo.rule && couponInfo.rule.length > 0">
				<view class="nl_coupon-rule-title">红包说明</view>
				<view class="">
					<view v-for="(item, index) in couponInfo.rule" class="nl_coupon-rule-item" :key="index">{{ index + 1 }}. {{ item }}</view>
				</view>
			</view>
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
					rule: [],
					name: ''
				},
				share: 0,
				openid: ''
			}
		},
		onShareAppMessage (event) {
			let id = this.couponInfo.id
			let res = {
				title: this.couponInfo.name,
				path: '/pages/share/share?coupon=' + id + '&invite_user=' + this.openid
			}
			if (this.couponInfo && this.couponInfo.cover) {
				res.imageUrl = this.imgHost + this.couponInfo.cover
			}
			return res
		},
		onShareTimeline () {
			let id = this.couponInfo.id
			return {
				title: this.couponInfo.name,
				query: 'is_share=1&coupon=' + id + '&invite_user=' + this.openid,
				imageUrl: this.imgHost + this.couponInfo.icon
			}
		},
		onLoad(options) {
			if (options.is_share === '1') {
				this.share = 1
				this.openid = options.invite_user
			} else {
				this.share = 0
				this.openid = uni.getStorageSync('openid')
			}
			let params = {
				coupon: options.coupon,
				openid: this.openid
			}
			this.getCouponInfo(params)
		},
		methods: {
			//返回上一页
			back () {
				uni.switchTab({
					'url': '/pages/index/index',
				})
			},
			getCouponInfo (params) {
				this.$getR('/api/getCouponDetail', params).then(res => {
					if (res.status === 'success') {
						this.couponInfo = res.info
					}
				}).catch(res => {
					uni.showToast({
						icon: 'none',
						title: '红包不存在',
						success: () => {
							uni.navigateTo({
								url: './index'
							})
						}
					})
				})
			}			
		}
	}
</script>

<style>
.nl_back {
	position: fixed;
	top: 100rpx;
	left: 40rpx;
	z-index: 100;
}
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
	font-size: 38rpx;
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
.nl_coupon-detail-btns {
	text-align: center;
}
.nl_coupon-detail-btn-default {
	overflow: hidden;
	display: inline-block;
	box-sizing: border-box;
	margin: 100rpx 20rpx 60rpx;
	width: 280rpx;
	padding: 28rpx 0;
	text-align: center;
	font-size: 32rpx;
	line-height: 1;
	border-radius: 30rpx;
	color: #fff;
	background-color: #FECD56;
	border: none;
}
.nl_coupon-detai-btn-share {
	background-color: #7A42AB;
}
.nl_coupon-rules {
	padding: 0 80rpx;
}
.nl_coupon-rule-title {
	margin-bottom: 6rpx;
	color: #A51C1C;
	font-size: 30rpx;
	font-weight: bold;
}
.nl_coupon-rule-item {
	margin-bottom: 8rpx;
	color: #A51C1C;
	font-size: 26rpx;
}
.nl_share-red-subtitle {
	margin-top: 16rpx;
	text-align: center;
	font-size: 32rpx;
	color: #ffcca2;
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
