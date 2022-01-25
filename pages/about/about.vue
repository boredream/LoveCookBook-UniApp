<template>
	<view class="container paddingHor llVer">
		<image class="logo" src="/static/logo.png"></image>
		<view class="textSubhead">
			恋爱手册
		</view>
		<view class="textBody">
			{{version}}
		</view>
		<view class="textCaption" style="margin-top: 64px;">
			恋爱手册是一款专为恋人、情侣、夫妻使用的工具型记录软件。设计界面简洁，减少了很多花哨的游戏功能，为情侣提供纪念日、恋爱日记、愿望清单等多种功能，让情侣用户不论何时何地都能浏览一路走来的各种历程，见证情侣浪漫爱情。
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			const accountInfo = uni.getAccountInfoSync();
			this.version = accountInfo.miniProgram.version; // 小程序 版本号  
		},
		data() {
			return {
				version: "",
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container {
		align-items: center;
	}

	.logo {
		margin-top: 200px;
		margin-bottom: 16px;
		width: 60px;
		height: 60px;
		border-radius: 4px;
	}
</style>
