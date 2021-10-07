<template>
	<view>
		<view class="nl_reward-list">
			<view v-for="(item, key) in list" :key="key" class="nl_reward-item">
				<view class="nl_reward-title">{{ item.reward_title }}</view>
				<view class="nl_reward-time">{{ item.created_at }}</view>
				<view class="nl_reward-status">
					<text class="nl_color-default" v-if="item.status === 0">未发放</text>
					<text class="nl_color-success" v-else-if="item.status === 1">已发放</text>
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
				this.$getR('/api/getDrawHisotry', { page: this.page }).then(res => {
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
.nl_reward-item {
	position: relative;
	padding: 20rpx 40rpx;
	border-bottom: 1px solid #eee;
}
.nl_reward-title{
	font-size: 32rpx;
}
.nl_reward-time {
	font-size: 28rpx;
	color: #aaa;
}
.nl_reward-status {
	position: absolute;
	top: 36rpx;
	right: 40rpx;
}
</style>
