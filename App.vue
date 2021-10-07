<script>
	const api = require('./utils/request')
	export default {
		globalData: {
			// API请求域名
			apiHost: 'https://xxxx',
			// 图片地址域名
			imgHost: 'https://xxxxx',
		},
		onLaunch: function() {
		},
		onShow: function() {
		},
		onHide: function() {
		},
		methods: {
		}
	}
</script>

<style>
	/* @import "uview-ui/theme.scss"; */
	/*每个页面公共css */
	page {
		background-color: #f1f1f1;
	}
	.nl_mt-20 {
		margin-top: 20rpx;
	}
	.nl_mt-10 {
		margin-top: 10rpx;
	}
	.nl_margin-20 {
		margin: 20rpx;
	},
	.nl_color-default {
		color: #808080;
	}
	.nl_color-primary {
		color: #fe5656;
	}
	.nl_color-error {
		color: #DD524D;
	}
	.nl_color-success {
		color: #45cb45;
	}
	.nl_bold-red {
		color: #fe5656;
		font-weight: bold;
	}
	.nl_text-right {
		text-align: right;
	}
	.nl_text-center {
		text-align: center;
	}
	.nl_less-text {
		color: #aaa;
		font-size: 24rpx;
	}
	.nl_clearfix {
		clear: both;
	}
	.nl_btn-primary {
		background-color: #fe5656;
		border: 1px solid #fe5656;
		color: #FFF;
	}
	.nl_btn-primary[disabled] {
		background-color: #F89A9A !important;
		color: #FFF !important;
		border: 1px solid #F89A9A !important;
	}
	.nl_form-error {
		font-size: 28rpx;
		color: #fe5656;
		line-height: 48rpx;
		height: 48rpx;
	}
	.nl_relative {
		position: relative;
	}
	.nl_normal-text {
		color: #fff;
		font-size: 28rpx;
	}
	.nl_h2 {
		font-size: 36rpx;
	}
	.nl_coupon-item {
		display: flex;
		position: relative;
		background-color: #FFF;
		margin: 20rpx 0;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, .12), 0 0 6rpx rgba(0, 0, 0, .04);
		border-radius: 10rpx;
	}
	.nl_coupon-hot {
		position: absolute;
		top: -16rpx;
		left: 0;
		width: 56rpx;
		height: 56rpx;
	}
	.nl_coupon-content {
		flex-grow: 1;
		padding: 30rpx 0 30rpx 0;
		text-align: justify;
	}
	.nl_coupon-label {
		display: flex;
		flex-basis: 140rpx;
		flex-shrink: 0;
		text-align: center;
		align-items: center;
		justify-content: center;
		/* position: absolute;
		left: 20rpx;
		top: 36rpx; */
	}
	.nl_coupon-cover {
		
		display: inline-block;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.nl_coupon-title {
		font-size: 32rpx;
		color: #000;
		margin-bottom: 16rpx;
	}
	.nl_coupon-price {
		font-size: 40rpx;
		color: #fe5656;
	}
	.nl_coupon-get {
		position: relative;
		display: flex;
		flex-basis: 220rpx;
		text-align: center;
		align-items: center;
		flex-shrink: 0;
	}
	.nl_coupon-share {
		position: absolute;
		top: 0;
		right: 10rpx;
		background-color: #fff;
		line-height: 1;
		margin: 0;
		padding: 10rpx 10rpx 0;
	}
	.nl_coupon-share .nl_coupon-share-icon {
		width: 50rpx;
		height: 50rpx;
	}
	.nl_coupon-share::after {
		border: none;
		
	}
	.nl_coupon-count {
		font-size: 26rpx;
		color: #666;
	}
	.nl_coupon-btn {
		/* position: absolute;
		right: 16rpx;
		top: 50%;
		margin-top: -45rpx; */
		border-radius: 50rpx;
		font-size: 28rpx;
		width: 180rpx;
		line-height: 72rpx;
		border: none;
		margin-top: 50rpx;
	}
	.nl_coupon-btn::after {
		border: none;
	}
	button.nl_coupon-btn,
	button.nl_coupon-btn:focus,
	button.nl_coupon-btn:hover {
		color: #FFFFFF;
		background-color: #fe5656;
		border-color: #fe5656;
	}
	.nl_coupon-price-text {
		font-size: 28rpx;
		margin-right: 4rpx;
		vertical-align: 2rpx;
		color: #fe5656;
	}
</style>
