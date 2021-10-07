<template>
  <view>
		<view class="nl_user-info">
			<view>
				<view class="nl_user-avatar">
					<view class="nl_user-avatar-image">
						<open-data type="userAvatarUrl"></open-data>
					</view>
				</view>
				<view class="nl_user-base">
					<view class="nl_user-name nl_mt-20"><open-data type="userNickName"></open-data></view>
				</view>
			</view>
			<view class="nl_income-balance">
				<view class="nl_income-balance-text">可提现收益</view>
				<view class="nl_income-balance-price">{{ leftIncome }}</view>
				<navigator url="./withdraw" class="nl_income-withdraw-handle">提现</navigator>
			</view>
			<view class="nl_income">
				<view class="nl_income-group">
					<view class="nl_income-box nl_income-today">
						<view>今日收益</view>
						<view>{{ todayIncome }}</view>
					</view>
					<view class="nl_income-box nl_income-total">
						<view>总收益</view>
						<view>{{ totalIncome }}</view>
					</view>
					<view class="nl_income-box nl_income-withdraw">
						<view>已提现</view>
						<view>{{ withdrawalsTotal }}</view>
					</view>
				</view>
			</view>
			<view class="nl_center-coin">
				<navigator url="./coin_detail" class="nl_center-coin-total">
					<text class="nl_income-balance-text">我的贝壳数</text>
					<text class="nl_center-coin-count">{{ coinTotal }}</text>
					<text class="nl_center-coin-detail-go">></text>
				</navigator>
			</view>
		</view>
		<view class="nl_authize-btn-box" v-if="authizeBtnDisplay">
			<button class="nl_authize-btn nl_btn-primary" @click="getUserInfo('init')">
				<view class="nl_authize-btn-content">完善用户信息</view>
				<view class="nl_authize-btn-tip">(用于收益结算、提现操作)</view>
			</button>
		</view>
		<navigator v-if="centerCouponEnter" open-type="navigate" url="../index/coupon" class="nl_center-coupon">
			<image class="nl_center-coupon-image" src="../../static/coupon_go.png"></image>
		</navigator>
		<view class="nl_center-menu">
			<view class="nl_center-menu-item" @click="getUserInfo('update')">
				<image class="nl_center-menu-icon" src="../../static/update.png"></image>
				<view>更新用户信息</view>
			</view>
			<navigator class="nl_center-menu-item" url="./income_detail">
				<image class="nl_center-menu-icon" src="../../static/income.png"></image>
				<view>收益明细</view>
			</navigator>
			<navigator class="nl_center-menu-item" url="./withdrawal_list">
				<image class="nl_center-menu-icon" src="../../static/withdraw.png"></image>
				<view>提现记录</view>
			</navigator>
			<navigator class="nl_center-menu-item" url="./draw_result">
				<image class="nl_center-menu-icon" src="../../static/reward.png"></image>
				<view>中奖记录</view>
			</navigator>
			<navigator open-type="switchTab" url="../order/index" class="nl_center-menu-item">
				<image class="nl_center-menu-icon" src="../../static/order.png"></image>
				<view>我的订单</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todayIncome: '0.00',
				totalIncome: '0.00',
				withdrawalsTotal: '0.00',
				leftIncome: '0.00',
				authizeBtnDisplay: false,
				coinTotal: 0,
				// 红包入口开关
				centerCouponEnter: 0
			}
		},
		onShow() {
			this.getIncomeInfo()
			this.getSystemSetting()
		},
		methods: {
			// 获取小程序设置
			getSystemSetting () {
				if (getApp().globalData.setting) {
					this.centerCouponEnter = getApp().globalData.setting.center_coupon_enter
				} else {
					this.$getR('/api/getMiniProgramSetting').then(res => {
						this.systemSetting = res.info.center_coupon_enter
						getApp().globalData.setting = res.info
					})
				}
			},
			// 获取用户信息
			getUserInfo (action) {
				let that = this
				uni.getUserProfile({
					desc: '显示用户个人信息',
					success(res) {
						that.$postR('/api/setWechatUserInfo', res).then(res => {
							if (res.status === 'success') {
								let toastText = res.info;
								if (action === 'update') {
									toastText = '更新成功'
								} else if (action === 'init') {
									toastText = '完善成功'
								}
								uni.showToast({
									title: toastText
								})
							}
						})
					}
				})
			},
			getIncomeInfo () {
				this.$getR('/api/income').then(res => {
					this.userInfo = res.info.user_info
					if (!res.info.user_info.nickname) {
						this.authizeBtnDisplay = true
					} else {
						this.authizeBtnDisplay = false
					}
					this.totalIncome = res.info.total_income,
					this.withdrawalsTotal = res.info.withdrawals_total,
					this.leftIncome = res.info.left_income
					this.todayIncome = res.info.today_income
					this.coinTotal = res.info.coin_total
				})
			}
		}
	}
</script>

<style>
.nl_authize-btn-box {
	margin: 40rpx 40rpx 0 40rpx;
}
.nl_authize-btn {
	padding: 20rpx;
}
.nl_authize-btn-content {
	font-size: 30rpx;
	line-height: 1.2;
	margin-bottom: 10rpx;
}
.nl_authize-btn-tip {
	font-size: 24rpx;
	line-height: 1.2;
}
.nl_user-info {
	padding: 170rpx 30rpx 30rpx;
	background: linear-gradient(310deg, rgb(255, 79, 141) 0%, rgba(255, 86, 51, 0.79) 50%, rgba(255, 90, 0, 0.66) 79%, rgba(255, 91, 1, 0.57) 100%);
}
.nl_user-avatar {
	text-align: center;
}
.nl_user-avatar-image {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	overflow: hidden;
	margin: 0 auto;
}
.nl_user-name {
	text-align: center;
	font-size: 30rpx;
	color: #fff;
}
.nl_income-balance {
	margin-top: 30rpx;
	position: relative;
}
.nl_income-balance-text {
	color: #fff;
	font-size: 28rpx;
}
.nl_income-balance-price {
	color: #fff;
	font-size: 72rpx;
}
.nl_income-withdraw-handle {
	position: absolute;
	right: 0;
	bottom: 20rpx;
	font-size: 32rpx;
	border: 1px solid #fff;
	line-height: 52rpx;
	padding: 6rpx 48rpx;
	border-radius: 50rpx;
	color: #fff;
	text-align: center;
}
.nl_user-balance {
	margin-top: 16rpx;
}
.nl_user-balance-text {
	font-size: 28rpx;
	margin-right: 10rpx;
}
.nl_user-balance-amount {
	font-weight: bold;
	font-size: 36rpx;
	color: #fe5656;
}
.nl_income {
	margin-top: 20rpx;
}
.nl_income-group {
	display: flex;
}
.nl_income-box {
	flex-grow: 1;
	width: 100%;
	text-align: center;
	align-items: center;
	padding: 20rpx;
	background: #19BE6B;
	border-radius: 10rpx;
	margin: 10rpx;
	font-size: 28rpx;
	color: #fff;
}
.nl_income-box:first-child {
	margin-left: 0;
}
.nl_income-box:last-child {
	margin-right: 0;
}
.nl_income-today {
	background: linear-gradient(310deg, rgb(255, 79, 141) 0%, rgba(255, 86, 51, 0.79) 50%, rgba(255, 90, 0, 0.66) 79%, rgba(255, 91, 1, 0.57) 100%);
}
.nl_income-total {
  background: linear-gradient(310deg, rgb(255, 79, 79) 0%, rgba(255, 79, 79, 0.95) 13%, rgba(255, 134, 41, 0.81) 50%, rgba(255, 193, 0, 0.75) 91%, rgba(255, 194, 1, 0.73) 100%);
}
.nl_income-withdraw {
	background: linear-gradient(305deg, rgba(255, 206, 0, 0.87) 0%, rgba(255, 251, 159, 0.82) 100%);
}
.nl_center-menu {
	margin: 20rpx 40rpx 40rpx 40rpx;
}
.nl_center-menu-item {
	position: relative;
	padding: 30rpx 30rpx 30rpx 100rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
}
.nl_center-menu-icon {
	position: absolute;
	width: 46rpx;
	height: 46rpx;
	left: 30rpx;
	top: 30rpx;
}
.nl_center-coin {
	position: relative;
	color: #fff;
	margin-top: 10rpx;
}
.nl_center-coin-count {
	font-size: 50rpx;
	font-weight: bold;
	margin-left: 8rpx;
	vertical-align: -4rpx;
}
.nl_center-coin-detail-enter {
	position: absolute;
	top: 14rpx;
	right: 0;
	width: 44rpx;
	height: 44rpx;
}
.nl_center-coin-detail-go {
	font-size: 36rpx;
	margin-left: 10rpx;
	vertical-align: 2rpx;
}
.nl_center-coupon {
	margin: 14rpx 0;
	text-align: center;
}
.nl_center-coupon-image {
	width: 600rpx;
	height: 156rpx;
}
</style>