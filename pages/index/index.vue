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
