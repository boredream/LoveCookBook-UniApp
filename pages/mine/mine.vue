<template>
	<view>
		<!-- 头 -->
		<view class="paddingHor header llVer">
			<image class="imageOval" mode="aspectFill" :src="user.avatar" />
			<view class="textName">{{user.nickname}}</view>
			<view class="textId">ID:{{user.id}}</view>
		</view>
		
		<!-- 列表 -->
		<view class="itemContainer llHor paddingHor" @click="bindCp">
			<view class="textBody grow">另一半</view>
		</view>
		<view style="margin-left: 20px;" class="dividerHor"></view>
		
		<view class="itemContainer llHor paddingHor" @click="aboutUs">
			<view class="textBody grow">关于我们</view>
		</view>
		<view style="margin-left: 20px;" class="dividerHor"></view>
		
		<view class="itemContainer llHor paddingHor" @click="feedBack">
			<view class="textBody grow">反馈</view>
		</view>
		<view style="margin-left: 20px;" class="dividerHor"></view>

		<button class="btnPrimary btnLogout" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			}
		},
		onLoad() {
			this.getUserInfoFromLocal();
		},
		methods: {
			getUserInfoFromLocal() {
				uni.getStorage({
					key: "user",
					success: (res) => {
						console.log("get user from local = " + JSON.stringify(res));
						this.user = res.data;
					}
				});
			},
			bindCp() {
				
			},
			aboutUs() {
				
			},
			feedBack() {
				uni.navigateTo({
					url: "../feedback/feedback",
				})
			},
			logout() {
				console.log("logout");
				uni.removeStorage({
					key: "user"
				});
				uni.removeStorage({
					key: "token"
				});
				uni.navigateTo({
					url: "../login/login",
				});
			},
		}
	}
</script>

<style lang="scss">
	
	.imageOval {
		width: 76px;
		height: 76px;
		border-radius: 50%;
		border-width: 3px;
		border-color: #FFFFFF;
		border-style: solid;
		background-color: #FFFFFF;
	}
	
	.textName {
		margin-top: 4px;
		font-size: 18px;
		color: white;
	}
	
	.textId {
		font-size: 10px;
		color: white;
	}
	
	.header {
		background-color: $primary-color;
		padding-top: 32px;
		padding-bottom: 24px;
		display: flex;
		align-items: center;
	}
	
	.itemContainer {
		height: 62px;
		align-items: center;
	}
	
	.btnLogout {
		margin: 44px;
	}
	
	
</style>
