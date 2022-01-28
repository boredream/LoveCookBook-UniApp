<template>
	<view>
		<!-- 头 -->
		<view class="paddingHor header llVer">
			<image @click="editUserInfo" class="imageOval" mode="aspectFill" :src="user.avatar" />
			<view class="textName">{{user.nickname || "未登录"}}</view>
			<view v-if="user" class="textId">ID:{{user.id}}</view>
		</view>

		<!-- 列表 -->
		<view class="itemContainer llHor paddingHor" @click="toggleBindCp">
			<view class="textBody grow">另一半</view>
			<view class="textCaption">{{cpBindAction}}</view>
			<image v-if="cpUserAvatar" class="cpAvatar" mode="aspectFill" :src="cpUserAvatar" />
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

		<button v-if="user" class="btnPrimary btnLogout" @click="logout">退出登录</button>
	</view>
</template>

<script>
	import userKeeper from "../../utils/user_keeper.js";
	import tokenKeeper from "../../utils/token_keeper.js";
	import imageUtil from "../../utils/image_util.js";
	
	export default {
		data() {
			return {
				user: {},
				cpUserAvatar: null,
				cpBindAction: null,
			}
		},
		onLoad() {
			this.getUserInfoFromLocal();
		},
		mounted() {
			this.$EventBus.$on('theUserInfoChanged', () => {
				this.getUserInfoFromLocal();
			});
			this.$EventBus.$on('theUserChanged', () => {
				this.getUserInfoFromLocal();
			});
		},
		beforeDestroy() {
			this.$EventBus.$off('theUserInfoChanged');
			this.$EventBus.$off('theUserChanged');
		},
		methods: {
			getUserInfoFromLocal() {
				this.user = userKeeper.get();
				this.cpUser = this.user.cpUser;

				if (this.cpUser != null) {
					this.cpUserAvatar = this.cpUser.avatar;
					this.cpBindAction = "解绑";
				} else {
					this.cpUserAvatar = null;
					this.cpBindAction = "绑定";
				}
			},
			editUserInfo() {
				if(!this.$userKeeper.checkLogin()) return;
				
				uni.navigateTo({
					url: "../userinfo/userinfo"
				})
			},
			toggleBindCp() {
				if(!this.$userKeeper.checkLogin()) return;
				
				if(this.cpBindAction == "解绑") {
					uni.showModal({
						content: "是否确认接触绑定？",
						success: (res) => {
							if (res.confirm) {
								this.unBindCp();
							}
						}
					})
				} else {
					this.bindCp();
				}
			},
			bindCp() {
				uni.navigateTo({
					url: "../bindcp/bindcp",
				})
			},
			unBindCp() {
				this.$request.del({
					path: "user/cp",
					id: this.user.cpUser.id,
					onSuccess: (res) => {
						this.user.cpUser = null;
						userKeeper.save(this.user);
						this.$EventBus.$emit("theUserChanged");
					}
				});
			},
			aboutUs() {
				uni.navigateTo({
					url: "../about/about",
				})
			},
			feedBack() {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../feedback/feedback",
				})
			},
			logout() {
				console.log("logout");
				userKeeper.clear();
				tokenKeeper.clear();
				uni.navigateTo({
					url: "../login/login",
				});
				this.$EventBus.$emit("theUserChanged");
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

	.cpAvatar {
		width: 40px;
		margin-left: 12px;
		height: 40px;
		border-radius: 50%;
	}

	.itemContainer {
		height: 62px;
		align-items: center;
	}

	.btnLogout {
		margin: 44px;
	}
</style>
