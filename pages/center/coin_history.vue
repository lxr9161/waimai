<template>
	<view>
		<view class="nl_income-list">
			<view v-for="(item, key) in list" :key="key" class="nl_income-item">
				<view v-if="item.type === 1" class="nl_income-amount nl_color-success">+{{ item.coin_count }} <text class="nl_income-desc">{{ item.source_desc }}</text></view>
				<view v-else-if="item.type === 2" class="nl_income-amount nl_color-primary">-{{ item.coin_count }} <text class="nl_income-desc">{{ item.source_desc }}</text></view>
				<view class="nl_income-time">{{ item.created_at }}</view>
				<view class="nl_income-type">
					<text v-if="item.type === 1" class="nl_color-success">收入</text>
					<text v-else-if="item.type === 2" class="nl_color-primary">支出</text>
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
				this.$getR('/api/getUserCoinDetail', { page: this.page }).then(res => {
					this.page = res.info.current_page
					if (this.page === 1) {
						this.list = res.info.data
					} else {
						this.list = this.list.concat(res.info.data)
					}
					if (action == 'pull') {
						uni.stopPullDownRefresh()
					}
					if (res.info.data && res.info.data.length < 20) {
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
.nl_income-desc {
	margin-left: 6rpx;
	font-size: 28rpx;
}
</style>
