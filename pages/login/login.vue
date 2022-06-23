<template>
	<view class="container">
		<view class="llHor paddingHor" style="align-items: center; margin-top: 64px;">
			<input class="input-name grow" v-model="form.username" placeholder="请输入手机号" placeholder-class="planceholder"
				maxlength="11" />
			<button :class="[isSmsSend? 'btnVerifyCodeDisActive' : 'btnVerifyCodeActive']"
				@click="sendVerifyCode">{{verifyCodeTip}}</button>
		</view>
		<view class="dividerHor marginHor"></view>
		<input class="paddingHor input-name" v-model="form.password" placeholder="请输入验证码"
			placeholder-class="planceholder" />
		<view class="dividerHor marginHor"></view>
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimaryStroke"
			@click="login">手机号验证码登录</button>
		<!-- #ifdef MP-WEIXIN -->
		<button class="marginHor btnPrimary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">
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
				isSmsSend: false,
				timer: null,
				verifyCodeTip: "发送验证码",
				counter: 60,
				form: {
					"username": "",
					"password": "",
				},
			};
		},
		methods: {
			route2main() {
				// 可以体验进入，所以一般都是其它页面过来的，直接关闭
				uni.navigateBack();
			},
			getUserInfo() {
				this.$request.get({
					path: "user/info",
					onSuccess: (res) => {
						userKeeper.save(res);
						this.$EventBus.$emit("theUserChanged");
						this.route2main();
						console.log("getUserInfo success = " + JSON.stringify(res));
					}
				});
			},
			sendVerifyCode() {
				// 判断手机号是否已经输入
				if (this.$stringUtil.isEmpty(this.form.username) || this.form.username.length !== 11) {
					this.$toast("请输入正确的手机号");
					return;
				}

				if (this.isSmsSend) {
					return;
				}

				// 调用接口，发送短信验证码
				this.$request.get({
					path: "user/sendVerifyCode?phone=" + this.form.username,
					onSuccess: (res) => {
						// 开始倒计时，60s之后才能再次点击
						console.log("get verify code success");
						this.isSmsSend = true
						this.countDown()
					}
				});
			},
			countDown() {
				// 将setInterval()方法赋值给前面定义的timer计时器对象，等用clearInterval()方法时方便清空这个计时器对象
				this.verifyCodeTip = this.counter + "秒"
				this.counter--;
				this.timer = setInterval(() => {
					// 替换文本，用es6里面的``这个来创建字符串模板，让秒实时改变
					this.verifyCodeTip = this.counter + "秒"
					this.counter--
					if (this.counter < 0) {
						this.reset();
					}
				}, 1000)
			},
			reset() {
				this.isSmsSend = false
				this.verifyCodeTip = '发送验证码'
				if (this.timer) {
					clearInterval(this.timer)
					this.counter = 60
					this.timer = null
				}
			},
			login() {
				if (this.$stringUtil.isEmpty(this.form.username) || this.form.username.length !== 11) {
					this.$toast("请输入正确的手机号");
					return;
				}
				
				if (this.$stringUtil.isEmpty(this.form.password)) {
					this.$toast("请输入验证码");
					return;
				}
				
				this.$request.post({
					path: "user/loginWithVerifyCode",
					data: {
						"phone": this.form.username,
						"code": this.form.password,
					},
					onSuccess: (token) => {
						console.log("login success = " + token);
						var success = tokenKeeper.save(token);
						console.log("login save token success = " + success);
						if(success) {
							this.getUserInfo();
						} else {
							uni.showToast({
								title: "登录失败 token save error",
								icon: "none"
							});
						}
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
									this.$request.post({
										path: "user/wxlogin",
										data: authCode,
										onSuccess: (token) => {
											console.log("wx login success = " + token);
											var success = tokenKeeper.save(token);
											console.log("wx login save token success = " + success);
											// step4. 获取用户信息，完成登录流程，跳转页面
											if(success) {
												this.getUserInfo();
											} else {
												uni.showToast({
													title: "登录失败 token save error",
													icon: "none"
												});
											}
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
				//#endif
			},
		}
	}
</script>

<style lang="scss">
	.input-name {
		height: 56px;
		line-height: 56px;
		font-size: $font-subhead;
		color: $font-color-gray;
	}

	.btnVerifyCodeActive {
		height: 34px;
		line-height: 34px;
		width: 100px;
		font-size: 14px;
		background-color: $primary-color;
		border-radius: 17px;
		color: #FFFFFF;
	}

	.btnVerifyCodeDisActive {
		@extend .btnVerifyCodeActive;
		background-color: $font-color-disabled;
	}
</style>
