<template>
	<view></view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		onShow () {
			uni.showLoading({
				title: '加载中...'
			})
			this.doLogin()
		},
		methods: {
			doLogin () {
				// 判断是否有token
				let tokenTime = uni.getStorageSync('auth_token_time')
				let token = uni.getStorageSync("auth_token")
				let currentTimestamps = parseInt(Date.parse(new Date()) / 1000)
				if (tokenTime && (currentTimestamps - tokenTime) < 80000) {
					uni.hideLoading()
					uni.switchTab({
						url: './index'
					})
					return
				}
				
				uni.showLoading({
				   title: '加载中'
				});
				
				let _this = this
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function (loginRes) {
									_this.$postR('/api/login', { code: loginRes.code }, false).then(res => {
										if (res.status === 'success') {
											uni.setStorageSync('auth_token', res.info.token)
											let timestamp = Date.parse(new Date())
											timestamp = parseInt(timestamp / 1000)
											uni.setStorageSync('auth_token_time', timestamp)
											uni.setStorageSync('openid', res.info.openid)
											uni.hideLoading()
											uni.switchTab({
												url: './index'
											})
										}
									}).catch(res => {
										uni.switchTab({
											url: './index'
										})
										uni.setStorageSync('guest_visit', true)
										uni.hideLoading()
									})
								}
							});
						}
					},
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #FFF;
}
</style>
