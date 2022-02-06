<template>
	<view class="nl_content">
		<view  v-if="ads.length > 0" class="nl_top-ads">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :style="'height:' + swiperHeight">
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
		<view class="nl_coupons nl_margin-20">
			<block  v-for="(item, key) in link" :key="key">
				<navigator v-if="item.jump_get_page === 0" class="nl_coupon-item" open-type="navigate" target="miniProgram" :app-id="item.cps_link.appid" :path="item.cps_link.link">
					<image class="nl_coupon-hot" src="../../static/hot_2.png"></image>
					<view class="nl_coupon-label">
						<image class="nl_coupon-cover" :src="imgHost + item.icon"></image>
					</view>
					<view class="nl_coupon-content">
						<view class="nl_coupon-title">{{ item.name }}</view>
						<view v-if="item.sub_title">
							<text class="nl_coupon-price-text">{{ item.sub_title }}</text>
						</view>
						<view v-else>
							<view v-if="item.price > 0" class="nl_coupon-detail">
								<text class="nl_coupon-price-text">最高</text>
								<text class="nl_coupon-price">{{ item.price }}元</text>
							</view>
							<view v-else class="nl_coupon-detail">
								<text class="nl_coupon-price-text">前往</text>
								<text class="nl_coupon-price">抢购</text>
							</view>
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
						<view v-if="item.sub_title">
							<text class="nl_coupon-price-text">{{ item.sub_title }}</text>
						</view>
						<view v-else>
							<view v-if="item.price > 0" class="nl_coupon-detail">
								<text class="nl_coupon-price-text">最高</text>
								<text class="nl_coupon-price">{{ item.price }}元</text>
							</view>
							<view v-else class="nl_coupon-detail">
								<text class="nl_coupon-price-text">前往</text>
								<text class="nl_coupon-price">抢购</text>
							</view>
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
	</view>
</template>

<script>
	// const api = require('../../utils/request')
	export default {
		data() {
			return {
				title: 'Hello',
				link: {},
				imgHost: getApp().globalData.imgHost,
				ads: [],
				swiperHeight: ''
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
		onLoad() {
			this.getCouponList()
			this.getBanner()
		},
		methods: {
			toSharePage (event) {
				uni.navigateTo({
					url: '/pages/share/share?coupon=' + event.currentTarget.dataset.coupon + '&invite_user=' + uni.getStorageSync('openid')
				})
			},
			loadImage (e) {
				let width = uni.getSystemInfoSync().windowWidth
				let imageHeight = e.detail.height
				let imgWidth = e.detail.width
				this.swiperHeight = width * imageHeight / imgWidth + 'px'
			},
			getBanner () {
				this.$getR('/api/ad/coupon').then(res => {
					if (res.status === 'success') {
						this.ads = res.info
					}
				})
			},
			getCouponList (openid) {
				let token = uni.getStorageSync('auth_token')
				this.$getR('/api/coupons', {openid: uni.getStorageSync('openid')}, true).then(res => {
					this.link = res.info.data
				}).catch((res) => {
				})
			}
		}
	}
</script>

<style>
	.nl_ad-image {
		width: 100%;
	}
</style>
