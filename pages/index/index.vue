<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">启动页</text>
		</view>
	</view>
</template>

<script>
	import tokenKeeper from "../../utils/token_keeper.js"
	import userKeeper from "../../utils/user_keeper.js"
	export default {
		data() {
			return {};
		},
		onLoad(option) {
			// 自动登录
			var token = tokenKeeper.get();
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
				this.$request.get({
					path: "user/info",
					onSuccess: (res) => {
						console.log("auto login success " + JSON.stringify(res));
						userKeeper.save(res);
						this.route2main();
					}
				});
			},
			appLoginWx() {
				console.log("wx授权登录，获取code");
				uni.login({
					provider: 'weixin',
					success: (authCode) => {
						console.log("通过code获取微信openId，并完成登录/注册，最终生成token " + authCode);
						this.$request.post("user/wxlogin", authCode, (token) => {
							console.log("wx login success = " + token);
							token.save(token);
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
</style>
