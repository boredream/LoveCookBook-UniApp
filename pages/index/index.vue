<template>
	<view class="container llVer">
		<image class="logo" src="/static/logo.png"></image>
		<view class="textBody">
			记录恋爱生活点滴
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
				// 微信要求开发未登录体验，先进入主页
				this.route2main();
			}
		},
		methods: {
			route2main() {
				uni.switchTab({
					url: "../theday/theday",
				});
			},
			appLoginWx() {
				// step1. 检测手机上是否安装微信
				console.log("step1. 检测手机上是否安装微信");
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (~res.provider.indexOf('weixin')) {
							// step2. wx授权登录，获取code
							console.log("step2. wx授权登录，获取code");
							uni.login({
								provider: 'weixin',
								success: (authCode) => {
									// step3. 通过code获取微信openId，并完成登录/注册，最终生成token
									console.log("step3. 通过code获取微信openId，并完成登录/注册，最终生成token " +
										authCode);
									this.$request.post({
										path: "user/wxlogin",
										data: authCode,
										onSuccess: (token) => {
											console.log("wx login success = " + token);
											tokenKeeper.save(token);
											// step4. 获取用户信息，完成登录流程，跳转页面
											this.getUserInfo();
										}
									});
								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							});
						} else {
							uni.showToast({
								title: '请先安装微信或升级版本'
							});
						}
					}
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
			}
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
