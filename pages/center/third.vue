<template>
	<view>
		<view class="nl_form-box">
			<view v-if="editing" @click="cancelSet" class="nl_third-set-cancel">取消</view>
			<view class="nl_form-item">
				<view class="nl_form-label">微信号</view>
				<view class="nl_form-content">
					<input class="nl_form-input" placeholder="点击填写" v-if="editing" v-model="thirdAccount.wx_account" />
					<view class="nl_form-text" v-else>
						{{ thirdAccount.wx_account }}
						<text v-if="thirdAccount.withdrawal_way === 1">(默认)</text>
					</view>
				</view>
			</view>
			<view class="nl_form-item">
				<view class="nl_form-label">支付宝账号</view>
				<view class="nl_form-content">
					<input class="nl_form-input" placeholder="点击填写" v-if="editing" v-model="thirdAccount.alipay_account" />
					<view class="nl_form-text" v-else>
						{{ thirdAccount.alipay_account }}
						<text v-if="thirdAccount.withdrawal_way === 2">(默认)</text>
					</view>
				</view>
			</view>
			<view class="nl_form-item">
				<view class="nl_form-label">姓名</view>
				<view class="nl_form-content">
					<input class="nl_form-input" placeholder="点击填写" v-if="editing" v-model="thirdAccount.alipay_name" />
					<view class="nl_form-text" v-else>
						{{ thirdAccount.alipay_name }}
					</view>
				</view>
			</view>
			<view class="nl_form-item" v-show="thirdAccount.wx_account && thirdAccount.alipay_account && editing">
				<view class="nl_form-label">默认</view>
				<view class="nl_form-content">
					<picker class="nl_form-packer" mode="selector" :value="currentWay" :range="way" range-key="name" @change="changeDefault">
						<view class="picker">
							<view v-if="way[currentWay].name">{{ way[currentWay].name }}<text class="nl_less-text">(点击更改)</text></view>
							<view class="nl_color-default" v-else>点击设置</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="nl_clearfix"></view>
			<view class="nl_mt-20">
				<button class="nl_btn-primary" :disabled="loading" v-if="editing" @click="bindThirdAccount">保存设置</button>
				<button v-else @click="editing = true">设置提现账号</button>
				<view class="nl_form-error">{{ errorMsg }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			errorMsg: '',
			currentWay: -1,
			way: [
				{ value: 1, name: '微信' },
				{ value: 2, name: '支付宝' }
			],
			editing: false,
			thirdAccount: {
				wx_account: '',
				alipay_account: '',
				alipay_name: '',
				withdrawal_way: 0
			},
			initData: {},
			loading: false
		}
	},
	onShow () {
		this.getThirdAccount()
	},
	methods: {
		// 取消设置
		cancelSet () {
			this.thirdAccount = JSON.parse(this.initData)
			this.editing = false
			this.errorMsg = ''
			this.way.map((item, key) => {
				if (item.value === this.thirdAccount.withdrawal_way) {
					this.currentWay = key
				}
			})
		},
		// 设置默认提现账号
		changeDefault (e) {
			this.currentWay = e.detail.value
			this.thirdAccount.withdrawal_way = this.way[e.detail.value].value ? this.way[e.detail.value].value : 0
		},
		// 获取第三方账号信息
		getThirdAccount () {
			this.$getR('/api/getThirdAccount').then(res => {
				let dataJson = JSON.stringify(res.info)
				this.thirdAccount = JSON.parse(dataJson)
				this.initData = dataJson
				this.way.map((item, key) => {
					if (item.value === this.thirdAccount.withdrawal_way) {
						this.currentWay = key
					}
				})
			})
		},
		// 绑定提现账号
		bindThirdAccount () {
			if (this.loading) {
				return
			}
			if (!this.thirdAccount.wx_account && !this.thirdAccount.alipay_account) {
				this.errorMsg = '微信、支付宝至少绑定其中一个'
				return
			}
			this.loading = true
			this.$postR('/api/bindThirdAccount', this.thirdAccount).then(res => {
				this.editing = false
				this.errorMsg = ''
				this.loading = false
				this.initData = JSON.stringify(this.thirdAccount)
				uni.showToast({
					title: '设置成功'
				})
			}).catch(err => {
				this.loading = false
				this.errorMsg = err.info
			})
		}
	}
}
</script>

<style>
page {
	background-color: #FFF;
}
.nl_form-box {
	padding: 80rpx 40rpx 40rpx;
}
.nl_form-item {
	margin-bottom: 20rpx;
}
.nl_form-label {
	float: left;
	width: 180rpx;
	text-align: right;
	padding: 10rpx 0;
}
.nl_form-content {
	margin-left: 200rpx;
	min-height: 70rpx;
}
.nl_form-input {
	border-bottom: 1px solid #eee;
	padding: 10rpx 0;
}
.nl_form-text {
	padding: 10rpx 0;
}
.nl_form-packer {
	padding: 10rpx 0;
}
.nl_third-set-cancel {
	position: absolute;
	right: 40rpx;
	top: 20rpx;
	color: #808080;
}

</style>
