<template>
	<view>
		<view class="container">
			<input placeholder="手机" v-model="form.username" />
			<input placeholder="密码" v-model="form.password" />
			<button @click="login">登录</button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">
			小程序授权登录
		</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import tokenKeeper from "../../utils/token_keeper.js"
	import userKeeper from "../../utils/user_keeper.js"
	export default {
		data() {
			return {
				form: {
					"username": "18501683421",
					"password": "123456",
				},
			};
		},
		methods: {
			route2main() {
				uni.switchTab({
					url: "../theday/theday",
				});
			},
			getUserInfo() {
				this.$request.get({
					path: "user/info",
					onSuccess: (res) => {
						userKeeper.save(res);
						this.route2main();
						console.log("getUserInfo success = " + res);
					}
				});
			},
			login() {
				this.$request.post({
					path: "user/login",
					data: this.form,
					onSuccess: (token) => {
						tokenKeeper.save(token);
						this.getUserInfo();
						console.log("login success = " + token);
					}
				});
			},
			appLoginWx() {
				// #ifdef MP-WEIXIN
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
									console.log("step3. 通过code获取微信openId，并完成登录/注册，最终生成token " + authCode);
									request.post("user/wxlogin", authCode, (token) => {
										console.log("wx login success = " + token);
										tokenKeeper.save(token);
										// step4. 获取用户信息，完成登录流程，跳转页面
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
						} else {
							uni.showToast({
								title: '请先安装微信或升级版本'
							});
						}
					}
				});
				//#endif
			},
		}
	}
</script>

<style>
</style>
