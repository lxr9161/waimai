<template>
	<view>
		<web-view :src="webSrc"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			this.webSrc = options.src
		},
		data () {
			return {
				webSrc: ''
			}
		}
	}
	
</script>

<style>
</style>
