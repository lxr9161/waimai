<template>
	<view>
		<view class="nl_withdrawal-way">
			<view class="nl_relative" v-if="withdrawalWay.account">
				<view class="nl_text-secondary">
					提现到
					<text v-if="withdrawalWay.way === 2" class="nl_text-secondary nl_mr-20">支付宝</text>
					<text v-else-if="withdrawalWay.way === 1" class="nl_text-secondary nl_mr-20">微信</text>
				</view>
				<navigator url="./third" class="nl_change-withdrawal-way">更换账号</navigator>
			</view>
			<view v-else>
				<navigator url="./third" class="nl_set-account">还未设置提现账号，去设置 >></navigator>
			</view>
		</view>
		<view class="nl_withdrawal">
			<view>
				<view class="nl_withdrawal-form">
					<view class="nl_withdrawal-title">提现金额</view>
					<view class="nl_withdrawal-input-box">
						<text class="nl_withdrawal-icon">¥</text>
						<input class="nl_withdrawal-input" type="digit" v-model="applyNum" @input="checkAmount"/>
					</view>
					<view v-if="errorMsg === ''" class="nl_balance-info">
						<text>当前可提现余额{{ leftIncome }}元，</text>
						<text class="nl_withdrawal-all" @click="setAll">全部提现</text>
					</view>
					<view v-else class="nl_balance-error">{{ errorMsg }}</view>
					<view>
						<button :disabled="errorMsg" class="nl_withdrawal-btn" @click="withdrawalHandle">提 现</button>
					</view>
				</view>
			</view>
			<view class="nl_withdrawal-rule">
				<view v-for="(item, key) in setting.rule" :key="key" class="nl_withdrawal-rule-item">{{ item }}</view>
			</view>
			<view class="nl_copy-wx nl_mt-20">
				<button @click="copyWx">复制客服微信</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applyNum: '',
				leftIncome: '0.00',
				loading: false,
				errorMsg: '',
				withdrawalWay: {
					account: '',
					account_name: '',
					way: ''
				},
				setting: {
					limit: 5,
					wx: '',
					rule: []
				}
			}
		},
		onShow () {
			this.getIncomeInfo()
			this.getThirdAccount()
			this.getWithdrawalSetting()
		},
		methods: {
			// 复制客服微信
			copyWx () {
				uni.setClipboardData({
					data: this.setting.wx,
					success: function() {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
			},
			// 获取提现配置
			getWithdrawalSetting () {
				this.$getR('/api/getWithdrawalSetting').then(res => {
					this.setting.limit = res.info.withdrawal_limit
					this.setting.wx = res.info.wx_service
					if (res.info.rule) {
						let rule = res.info.rule.split(/[(\r\n)\r\n]+/)
						this.setting.rule = []
						rule.map(item => {
							if (item.indexOf('[wx_service]') !== -1) {
								let textReplace = item.replace('[wx_service]', '')
								this.setting.rule.push({
									text: item,
									wx_service: res.info.wx_service
								})
							} else {
								this.setting.rule.push(item)
							}
						})
					}
				})
			},
			// 全部提现
			setAll () {
				this.applyNum = this.leftIncome
			},
			getIncomeInfo () {
				this.$getR('/api/income').then(res => {
					this.leftIncome = res.info.left_income
					this.errorMsg = ''
				})
			},
			getThirdAccount () {
				this.$getR('/api/getThirdAccount').then(res => {
					let thirdAccount = res.info
					// 同时绑定了微信和支付宝，如果有设置默认提现方式取默认，没有设置取微信账号
					if (thirdAccount.wx_account && thirdAccount.alipay_account) {
						if (thirdAccount.withdrawal_way === 2) {
							this.withdrawalWay.way = 2
							this.withdrawalWay.account = thirdAccount.alipay_account
							this.withdrawalWay.account_name = thirdAccount.alipay_name
						} else {
							this.withdrawalWay.way = 1
							this.withdrawalWay.account = thirdAccount.wx_account
						}
					} else {
						if (thirdAccount.wx_account) {
							this.withdrawalWay.way = 1
							this.withdrawalWay.account = thirdAccount.wx_account
						} else if (thirdAccount.alipay_account) {
							this.withdrawalWay.way = 2
							this.withdrawalWay.account = thirdAccount.alipay_account
							this.withdrawalWay.account_name = thirdAccount.alipay_name
						}
					}
				})
			},
			checkAmount (e) {
				let inputValue = parseFloat(e.detail.value)
				if (inputValue > this.leftIncome) {
					this.errorMsg = '提现金额超过最大可提现金额'
				} else if (inputValue < this.setting.limit) {
					this.errorMsg = '提现金额至少' + this.setting.limit + '元'
				} else {
					this.errorMsg = ''
				}
			},
			withdrawalHandle () {
				if (this.loading) {
					return
				}
				let applyAmount = this.applyNum ? parseFloat(this.applyNum) : 0
				if (applyAmount < this.setting.limit) {
					this.errorMsg = '提现金额至少' + this.setting.limit + '元'
					return
				}
				if (applyAmount > this.leftIncome) {
					this.errorMsg = '提现金额超过最大可提现金额'
					return
				}
				this.loading = true
				//转化为分
				applyAmount = parseInt(applyAmount * 100)
				this.$postR('/api/apply_withdrawal', { apply_num: applyAmount, way: 1 }).then(res => {
					let _this = this
					uni.showModal({
						content: res.info,
						showCancel: false,
						success: function () {
							let leftIncome = _this.leftIncome - _this.applyNum
							_this.applyNum = ''
							_this.leftIncome = leftIncome.toFixed(2)
							_this.getIncomeInfo()
							_this.loading = false
						}
					})
					
				}).catch((data) => {
					this.errorMsg = data.info
					this.loading = false
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #FFF;
}
.nl_mr-20 {
	margin-right: 20rpx;
}
.nl_withdrawal-way {
	padding: 40rpx 60rpx;
	background-color: #F1F1F1;
}
.nl_withdrawal {
	padding: 60rpx;
	background: #fff;
}
.nl_withdrawal-title {
	font-size: 32rpx;
}
.nl_withdrawal-input-box {
	position: relative;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	padding-left: 40rpx;
	border-bottom: 1px solid #EEEEEE;
}
.nl_withdrawal-icon {
	position: absolute;
	font-size: 60rpx;
	left: 0;
	top: 0;
}
.nl_withdrawal-input {
	line-height: 1.2;
	padding: 20rpx;
}
.nl_balance-info {
	font-size: 28rpx;
	color: #999999;
}
.nl_withdrawal-all {
	color: #fe5656;
}
.nl_balance-error {
	font-size: 28rpx;
	color: #fe5656;
}

.nl_withdrawal-btn {
	margin-top: 30rpx;
	background-color: #fe5656;
	border: 1px solid #fe5656;
	color: #FFF;
}
.nl_withdrawal-btn[disabled] {
	background-color: #F89A9A !important;
	color: #FFF !important;
	border: 1px solid #F89A9A !important;
}
.nl_set-account {
	color: #fe5656;
}
.nl_change-withdrawal-way {
	position: absolute;
	right: 0;
	top: -6rpx;
	font-size: 28rpx;
	padding: 6rpx 16rpx;
	border: 1px solid #fe5656;
	color: #fe5656;
	border-radius: 60rpx;
}
.nl_withdrawal-rule {
	margin-top: 30rpx;
}
.nl_withdrawal-rule-item {
	margin-bottom: 10rpx;
	font-size: 28rpx;
	color: #666;
}
.nl_wechat-qrcode {
	width: 400rpx;
	height: 400rpx;
}
</style>
