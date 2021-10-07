<template>
	<view>
		<view class="nl_coin-panel">
			<view class="nl_normal-text">我的贝壳数</view>
			<view class="nl_coin-total">{{ coinTotal }}</view>
			<navigator class="nl_coin-go-detail" url="./coin_history">查看明细>></navigator>
		</view>
		<view class="nl_coin-exchange">
			<view class="nl_h2">贝壳兑换</view>
			<view v-for="(item, key) in items" class="nl_coin-exchange-item" :key="key">
				<image class="nl_coin-exchange-icon" src="../../static/money.png"></image>
				<view class="nl_coin-exchange-title">{{ item.title }}</view>
				<view class="nl_coin-exchange-need">{{ item.condition_desc }}</view>
				<view class="nl_coin-exchage-handle" @click="redeemHanlde(item)">兑换</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lastId: 0,
				list: [],
				items: [],
				coinTotal: 0
			}
		},
		onShow () {
			this.getItems()
			this.getUserCoin()
		},
		methods: {
			getUserCoin () {
				this.$getR('/api/getUserCoin').then(res => {
					if (res.status === 'success') {
						this.coinTotal = res.info.coin_total
					}
				});
			},
			// 获取兑换物品列表
			getItems () {
				this.$getR('/api/getRedeemConfig').then(res => {
					if (res.status === 'success') {
						this.items = res.info
					}
				})
			},
			// 兑换物品
			redeemHanlde (itemInfo) {
				uni.showModal({
					title: '确定要兑换「' + itemInfo.title + '」吗？',
					confirmColor: '#fe5656',
					success: (handle) => {
						if (handle.confirm) {
							this.$postR('/api/redeemHandle', { item_sn: itemInfo.sn }).then(res => {
								if (res.status === 'success') {
									uni.showToast({
										icon: 'none',
										title: res.info
									})
									this.coinTotal = this.coinTotal - itemInfo.condition
									this.getUserCoin()
								}
							}).catch(res => {
								uni.showToast({
									icon: 'none',
									title: res.info
								})
							})
						}
					}
				})
			},
		}
	}
</script>

<style>
.nl_coin-panel {
	position: relative;
	margin: 40rpx 40rpx 30rpx;
	padding: 40rpx;
	background: linear-gradient(-37deg,#ffae12,#ff9100);
	border-radius: 20rpx;
}
.nl_coin-total {
	margin-top: 10rpx;
	color: #fff;
	font-size: 72rpx;
	line-height: 1;
}
.nl_coin-go-detail {
	position: absolute;
	bottom: 40rpx;
	right: 40rpx;
	color: #fff;
	font-size: 28rpx;
	border-bottom: 1px solid #fff;
}
.nl_coin-exchange {
	margin: 30rpx 40rpx 40rpx;
}
.nl_coin-exchange-item {
	position: relative;
	margin-top: 26rpx;
	padding: 20rpx 30rpx 20rpx 110rpx;
	border-radius: 10rpx;
	background-color: #fff;
}
.nl_coin-exchange-icon {
	position: absolute;
	top: 30rpx;
	left: 30rpx;
	width: 60rpx;
	height: 73rpx;
}
.nl_coin-exchange-title {
	font-size: 34rpx;
	font-weight: bold;
}
.nl_coin-exchange-need {
	font-size: 28rpx;
	color: #fe5656;
}
.nl_coin-exchage-handle {
	position: absolute;
	right: 30rpx;
	top: 34rpx;
	padding: 10rpx 30rpx;
	font-size: 28rpx;
	border: none;
	border-radius: 50rpx;
	background-color: #fe5656;
	color: #fff;
}
</style>
