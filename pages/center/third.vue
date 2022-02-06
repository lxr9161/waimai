<template>
	<view>
		<view class="nl_form-box">
			<view v-if="editing" @click="cancelSet" class="nl_third-set-cancel">取消</view>
			<view v-if="!editing" class="nl_form-item">
				<view class="nl_form-label">默认收款方式</view>
				<view class="nl_form-content">
					<view class="nl_form-text">
						<text v-if="thirdAccount.withdrawal_way === 1">微信</text>
						<text v-else-if="thirdAccount.withdrawal_way === 2">支付宝</text>
					</view>
				</view>
			</view>
			<view class="nl_form-item">
				<view class="nl_form-label">微信收款码</view>
				<view class="nl_form-content">
					<view v-if="editing">
						<view v-if="thirdAccount.wx_pay_qrcode">
							<image @click="uploadImg('wx')" :src="qiniuHost + thirdAccount.wx_pay_qrcode" mode="widthFix" style="width: 300rpx;"></image>
						</view>
						<view v-else>
							<image @click="uploadImg('wx')" src="../../static/add_1.png" style="width: 100rpx;height: 100rpx;" ></image>
						</view>
					</view>
					<view v-else>
						<image v-if="thirdAccount.wx_pay_qrcode" @click="preview(thirdAccount.wx_pay_qrcode)" :src="qiniuHost + thirdAccount.wx_pay_qrcode" mode="widthFix" style="width: 300rpx;"></image>
						<view v-else class="nl_form-text nl_color-default">还未上传</view>
					</view>
				</view>
			</view>
			<view class="nl_form-item">
				<view class="nl_form-label">微信号</view>
				<view class="nl_form-content">
					<input class="nl_form-input" placeholder="选填" v-if="editing" v-model="thirdAccount.wx_account" />
					<view class="nl_form-text" v-else>
						{{ thirdAccount.wx_account }}
					</view>
				</view>
			</view>
			<view class="nl_form-item">
				<view class="nl_form-label">支付宝收款码</view>
				<view class="nl_form-content">
					<view v-if="editing">
						<view v-if="thirdAccount.alipay_qrcode">
							<image @click="uploadImg('alipay')" :src="qiniuHost + thirdAccount.alipay_qrcode" mode="widthFix" style="width: 300rpx;"></image>
							<text v-if="thirdAccount.withdrawal_way === 2">(默认)</text>
						</view>
						<view v-else>
							<image @click="uploadImg('alipay')" src="../../static/add_1.png" style="width: 100rpx;height: 100rpx;" ></image>
						</view>
					</view>
					<view v-else>
						<image v-if="thirdAccount.alipay_qrcode" @click="preview(thirdAccount.alipay_qrcode)" :src="qiniuHost + thirdAccount.alipay_qrcode" mode="widthFix" style="width: 300rpx;"></image>
						<view v-else class="nl_form-text nl_color-default">还未上传</view>
					</view>
				</view>
			</view>
			<view class="nl_form-item">
				<view class="nl_form-label">支付宝账号</view>
				<view class="nl_form-content">
					<input class="nl_form-input" placeholder="选填" v-if="editing" v-model="thirdAccount.alipay_account" />
					<view class="nl_form-text" v-else>
						{{ thirdAccount.alipay_account }}
					</view>
				</view>
			</view>
			<view class="nl_form-item">
				<view class="nl_form-label">姓名</view>
				<view class="nl_form-content">
					<input class="nl_form-input" placeholder="选填" v-if="editing" v-model="thirdAccount.alipay_name" />
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
			<view>{{ err }}</view>
		</view>
	</view>
</template>

<script>
import { upload } from '../../utils/upload.js'
export default {
	data () {
		return {
			errorMsg: '',
			currentWay: -1,
			qiniuHost: getApp().globalData.qiniuHost,
			way: [
				{ value: 1, name: '微信' },
				{ value: 2, name: '支付宝' }
			],
			editing: false,
			thirdAccount: {
				wx_account: '',
				alipay_account: '',
				alipay_name: '',
				withdrawal_way: 0,
				wx_pay_qrcode: '',
				alipay_qrcode: ''
			},
			initData: {},
			loading: false,
			uploadToken: ''
		}
	},
	onLoad () {
		this.getThirdAccount()
		this.getUploadToken()
	},
	methods: {
		preview (url) {
			uni.previewImage({
				urls: [
					this.qiniuHost + url
				]
			})
		},
		// 上传二维码
		uploadImg (type) {
			upload(this.uploadToken).then(res => {
				console.log(res)
				if (type === 'wx') {
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					})
					this.thirdAccount.wx_pay_qrcode = res.key
				} else if (type === 'alipay') {
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					})
					this.thirdAccount.alipay_qrcode = res.key
				} else {
					uni.showToast({
						title: '请正确上传'
					})
				}
			}).catch(err => {
				uni.showToast({
					title: '上传失败',
					icon: 'error'
				})
			})
		},
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
			if (!this.thirdAccount.wx_pay_qrcode && !this.thirdAccount.alipay_qrcode) {
				this.errorMsg = '请上传微信或支付宝收款码'
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
		},
		getUploadToken () {
			this.$getR('/api/getUploadToken').then(res => {
				this.uploadToken = res.info.token
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
	width: 200rpx;
	text-align: right;
	padding: 10rpx 0;
}
.nl_form-content {
	margin-left: 220rpx;
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
	position: fixed;
	right: 40rpx;
	top: 20rpx;
	color: #808080;
}

</style>
