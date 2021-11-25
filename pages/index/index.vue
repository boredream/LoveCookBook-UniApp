<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">启动页</text>
		</view>
	</view>
</template>

<script>
	import request from "../../utils/request_util.js";
	export default {
		data() {
			return {};
		},
		onLoad(option) {
			// 自动登录
			var token = uni.getStorageSync("token");
			if (token != null && token.length > 0) {
				this.getUserInfo();
			} else {
				this.appLoginWx();
			}
		},
		methods: {
			route2login() {
				uni.navigateTo({
					url: "../login/login",
				});
			},
			route2main() {
				uni.switchTab({
					url: "../theday/theday",
				});
			},
			getUserInfo() {
				console.log("获取用户信息，完成登录流程，跳转页面");
				request.get("user/info", (res) => {
					console.log("auto login success " + JSON.stringify(res));
					uni.setStorage({
						key: "user",
						data: res
					});
					this.route2main();
				});
			},
			appLoginWx() {
				console.log("wx授权登录，获取code");
				uni.login({
					provider: 'weixin',
					success: (authCode) => {
						console.log("通过code获取微信openId，并完成登录/注册，最终生成token " + authCode);
						request.post("user/wxlogin", authCode, (token) => {
							console.log("wx login success = " + token);
							uni.setStorageSync("token", token);
							this.getUserInfo();
						});
					},
					fail: () => {
						uni.showToast({
							title: "微信登录授权失败",
							icon: "none"
						});
					}
				});
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
