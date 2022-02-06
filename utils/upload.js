const host = 'https://upload.qiniup.com';


// 随机生成min到max之间的随机数,包含min和max
function randomNumber (len) {
	let str = ''
	for (let i = 1; i <= len; i++) {
		str += parseInt(Math.random() * 10)
	}
	return str
}

function getExt (fileName) {
	var result = /\.[^.]+/.exec(fileName)
	return result
}

export function upload (token) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			success (res) {
				const tempFilePaths = res.tempFilePaths
				let ext = getExt(tempFilePaths[0])
				let fileName = 'user/' + randomNumber(1) + Date.parse(new Date()) + randomNumber(4) + ext
				uni.uploadFile({
					url: host,
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						'token': token,
						'key': fileName,
					},
					success (uploadFileRes) {
						let data = JSON.parse(uploadFileRes.data)
						if (uploadFileRes.statusCode === 200) {
							resolve(data)
						} else {
							reject(data)
						}
					},
					fail(err) {
						console.log(err)
						reject(err)
					}
				})
			}
		})
	})
}