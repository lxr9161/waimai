<template>
	<view>
		<view class="nl_income-list">
			<view v-for="(item, key) in list" :key="key" class="nl_income-item">
				<view class="nl_income-amount">+{{ item.amount }}</view>
				<view class="nl_income-time">{{ item.created_at }}</view>
				<view class="nl_income-type">
					<text>{{ item.order_type }}</text>
				</view>
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
				loadEnd: false
			}
		},
		onReachBottom (obj) {
			if (!this.loadEnd) {
				this.getList('bottom')
			}
		},
		onPullDownRefresh () {
			this.loadEnd = false
			this.lastId = 0
			this.getList('pull')
		},
		mounted () {
			this.getList('bottom')
		},
		methods: {
			// 获取提现记录
			getList (action) {
				if (this.lastId === null) {
					return
				}
				this.$getR('/api/income_details', { last_id: this.lastId }).then(res => {
					if (this.lastId === 0) {
						this.list = res.info
					} else {
						this.list = this.list.concat(res.info)
					}
					if (res.info && res.info.length === 20) {
						this.lastId = res.info[res.info.length - 1].id
					} else {
						this.lastId = null
					}
					if (action == 'pull') {
						uni.stopPullDownRefresh()
					}
					if (res.info && res.info.length < 20) {
						this.loadEnd = true
					}
				}).catch((res) => {
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.nl_income-item {
	position: relative;
	padding: 20rpx 40rpx;
	border-bottom: 1px solid #eee;
}
.nl_income-amount {
	font-size: 32rpx;
}
.nl_income-time {
	font-size: 28rpx;
	color: #aaa;
}
.nl_income-type {
	position: absolute;
	top: 40rpx;
	right: 40rpx;
	color: #666;
	font-size: 28rpx;
}
</style>
