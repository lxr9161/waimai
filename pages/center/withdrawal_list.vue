<template>
	<view>
		<view class="nl_withdrawal-list">
			<view v-for="(item, key) in list" :key="key" class="nl_withdrawal-item">
				<view class="nl_withdrawal-amount">{{ item.amount }}</view>
				<view class="nl_withdrawal-time">{{ item.created_at }}</view>
				<view class="nl_withdrawal-status">
					<text class="nl_color-default" v-if="item.status === 0">提现中</text>
					<text class="nl_color-success" v-else-if="item.status === 1">提现成功</text>
					<text class="nl_color-error" v-else-if="ite.status === 2">提现失败</text>
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
				list: [],
				loadEnd: false
			}
		},
		onReachBottom (obj) {
			if (!this.loadEnd) {
				this.page++
				this.getList('bottom')
			}
		},
		onPullDownRefresh () {
			this.loadEnd = false
			this.page = 1
			this.getList('pull')
		},
		mounted () {
			this.getList('bottom')
		},
		methods: {
			// 获取提现记录
			getList (action) {
				this.$getR('/api/withdrawals', { page: this.page }).then(res => {
					console.log(res)
					this.page = res.info.current_page
					if (this.page === 1) {
						this.list = res.info.data
					} else {
						this.list = this.list.concat(res.info.data)
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
page {
	background-color: #fff;
}
.nl_withdrawal-item {
	position: relative;
	padding: 20rpx 40rpx;
	border-bottom: 1px solid #eee;
}
.nl_withdrawal-amount {
	font-size: 32rpx;
}
.nl_withdrawal-time {
	font-size: 28rpx;
	color: #aaa;
}
.nl_withdrawal-status {
	position: absolute;
	top: 36rpx;
	right: 40rpx;
}
</style>
