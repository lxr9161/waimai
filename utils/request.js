import Vue from 'vue'
const API_HOST = 'https://coupon.api.nulizhe.com'
// const API_HOST = 'https://game.zzz.nulizhe.com'

let header = {
	'content-type': 'application/json'
}
/**
 * GET请求
 */
export function get(uri, params, auth = true) {
	let options = {
		uri: uri,
		data: params,
		auth: auth,
		method: 'GET'
	}
	
	return request(options)
}

/**
 * POST请求
 */
export function post(uri, params, auth = true) {
	let options = {
		uri: uri,
		data: params,
		auth: auth,
		method: 'POST'
	}
	
	return request(options)
}

/**
 * @param {Object} options
 */
export function request(options) {
	let auth = options.auth === null ? true : options.auth
	if (auth) {
		let token = uni.getStorageSync('auth_token')
		header['Authorization'] = "Bearer " + token
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: API_HOST + options.uri,
			data: options.data,
			header: header,
			method: options.method,
			success: function (res) {
				if (res.data.status === 'success') {
					resolve(res.data)
				} else {
					// 未授权时跳转到登录中间页面
					reject(res.data)
					if (res.data.info === 'Unauthorized') {
						uni.reLaunch({
							url: '/pages/index/main'
						})
					}
				}
			},
			fail: function (res) {
				
			}
		})
	})
}

let plugin = {}
plugin.install = function (Vue, options) {
	Vue.prototype.$getR = function(uri, params, auth = true) {
		let options = {
			uri: uri,
			data: params,
			auth: auth,
			method: 'GET'
		}
		
		return request(options)
	}
	
	Vue.prototype.$postR = function(uri, params, auth = true) {
		let options = {
			uri: uri,
			data: params,
			auth: auth,
			method: 'POST'
		}
		
		return request(options)
	}
	
	Vue.prototype.$request = function(options) {
		return request(options)
	}
}

export default plugin