<template>
	<view>
		<view class="nl_back" @click="back()">返回</view>
		<view class="nl_share-red">
			<view class="nl_red-bg-curve1"></view>
			<view class="nl_red-bg-curve2"></view>
			<image class="nl_red-icon" :src="imgHost + couponInfo.icon"></image>
		</view>
		<view>
			<view class="nl_share-red-title">{{ couponInfo.name }}</view>
			<view class="nl_share-red-max">最高</view>
			<view class="nl_share-red-price">{{ couponInfo.price }}元</view>
			<view class="nl_coupon-detail-btns">
				<navigator class="nl_coupon-detail-btn-default {" open-type="navigate" target="miniProgram" :app-id="couponInfo.cps_link.appid" :path="couponInfo.cps_link.link">前往领取</navigator>
				<button class="nl_coupon-detail-btn-default nl_coupon-detai-btn-share" open-type="share" :data-coupon="couponInfo.id" :data-cover="couponInfo.cover">
					分享好友
				</button>
			</view>
		</view>
		<view class="nl_coupon-rules">
			<view class="nl_coupon-rule-title">红包说明</view>
			<view class="">
				<view v-for="(item, index) in couponInfo.rule" class="nl_coupon-rule-item" :key="index">{{ index + 1 }}. {{ item }}</view>
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
					price: 66,
					link: '',
					icon: '',
					rule: []
				}
			}
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
		onLoad(options) {
			let params = {
				coupon: options.coupon,
				openid: uni.getStorageSync('openid')
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
</style>
