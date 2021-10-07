<template>
	<view>
		<view class="nl_order-list">
			<view class="nl_order-item" v-for="(item, key) in orderList" :key="key">
				<view class="nl_order-time">{{ item.order_time }}</view>
				<view class="nl_order-id">订单号: {{ item.order_id }}</view>
				<view class="nl_order-title">{{ item.title }}</view>
				<view v-if="item.goods_title" class="nl_order-goods">{{ item.goods_title }}</view>
				<view class="nl_order-pirce">订单金额:<text class="nl_bold nl_ml-6">{{ item.pay_price }}</text></view>
				<view class="nl_order-profit">
					<view  v-if="item.status === 1">
						<text class="nl_bold-text">预计返利:</text><text class="nl_bold-red nl_ml-6">{{ item.per_split_profit }}</text>
					</view>
					<view v-if="item.status === 2">
						<text class="nl_bold-text">返利:</text>
						<text class="nl_bold-red nl_ml-6">{{ item.split_profit }}</text>
						<text class="nl_order-waiting-handle nl_ml-6" v-if="is_handle === 0">(待结算)</text>
					</view>
					<view v-if="item.status === 3">
						<text class="nl_bold-text">返利:</text><text class="nl_bold-red nl_ml-6">0.00</text>
					</view>
					<view class="nl_order-icon">
						<image v-if="item.platform === 1" class="nl_order-platform-icon" src="../../static/ele.jpeg"></image>
						<image v-else-if="item.platform ===2" class="nl_order-platform-icon" src="../../static/meituan.png"></image>
					</view>
					<view class="nl_order-status">
						<text v-if="item.status === 1" class="nl_order-status-ing">已付款</text>
						<text v-if="item.status === 2" class="nl_order-status-ok">已完成</text>
						<text v-if="item.status === 3" class="nl_order-status-fail">失效订单</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				orderList: [],
				loadEnd: false
			}
		},
		onReachBottom (obj) {
			if (!this.loadEnd) {
				this.page++
				this.getOrderList()
			}
		},
		onPullDownRefresh () {
			this.loadEnd = false
			this.page = 1
			this.getOrderList('pull')
		},
		onLoad () {
			this.getOrderList('bottom')
		},
		mounted () {
			// this.height = uni.getSystemInfoSync().windowHeight + 'px'
		},
		methods: {
			getOrderList (action) {
				this.$getR('/api/order_cps', {page: this.page}, true).then(res => {
					this.page = res.info.current_page
					if (this.page === 1) {
						this.orderList = res.info.data
					} else {
						this.orderList = this.orderList.concat(res.info.data)
					}
					if (action == 'pull') {
						uni.stopPullDownRefresh()
					}
					if (res.info.data && res.info.data.length < 10) {
						this.loadEnd = true
					}
				}).catch((res) => {
				})
			}
		}
	}
</script>

<style>
.nl_bold {
	font-weight: bold;
}
.nl_ml-6 {
	margin-left: 6rpx;
}
.nl_order-list {
	margin-bottom: 40rpx;
}
.nl_order-item {
	position: relative;
	margin: 20rpx 40rpx;
	padding: 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
}
.nl_order-waiting-handle {
	color: #fe5656;
	font-size: 24rpx;
}
.nl_order-status-ing {
	color: #82848A;
}
.nl_order-status-ok {
	color: #fe5656;
}
.nl_order-id {
	line-height: 56rpx;
	font-size: 24rpx;
}
.nl_order-goods {
	font-size: 24rpx;
	color: #aaa;
	line-height: 48rpx;
}
.nl_order-pirce {
	margin-top: 8rpx;
	font-size: 28rpx;
	color: #666;
}
.nl_order-time {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	line-height: 56rpx;
	font-size: 24rpx;
	color: #aaa;
}
.nl_order-profit {
	position: relative;
	margin-top: 20rpx;
	padding: 20rpx 0 0 72rpx;
	border-top: 1px dashed #E4E7ED;
	line-height: 50rpx;
}
.nl_order-status {
	position: absolute;
	top: 20rpx;
	right: 0;
	line-height: 50rpx;
}
.nl_order-icon {
	position: absolute;
	top: 14rpx;
	left: 0;
}
.nl_order-platform-icon {
	display: block;
	width: 54rpx;
	height: 54rpx;
	border-radius: 50%;
	border: 1px solid #EEE;
}

</style>
