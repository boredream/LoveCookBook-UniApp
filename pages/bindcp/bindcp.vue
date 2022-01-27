<template>
	<view class="llVer" style="align-items: center;">
		<view class="textBody" style="margin-top: 12px;">邀请你的另一半即可开通</view>
		<view class="inviteCard llVer paddingHor" style="margin: 20px; padding-top: 60px;">
			<view class="textBody">我的专属邀请码</view>
			<view class="llHor" style="justify-content: center; align-items: center; margin-top: 8px;">
				<view class="textSubhead" style="font-size: 36px; margin-right: 4px;">{{myInviteCode}}</view>
				<image class="icon" src="../../static/ic_copy.png"></image>
			</view>
			<view class="llHor" style="margin-top: 24px; align-items: center;">
				<view class="dividerHor grow"></view>
				<image style="width: 18px; height: 16px; margin: 10px;" src="../../static/ic_love_alpha.png"></image>
				<view class="dividerHor grow"></view>
			</view>
			<view class="inputBar llHor">
				<input type="number" class="grow" placeholder="填写TA的邀请码" placeholder-class="planceholder" v-model="inviteCode" />
				<button class="btnPrimary" @click="bindCp">开通</button>
			</view>
		</view>
	</view>
</template>

<script>
	import userKeeper from "../../utils/user_keeper.js"
	
	export default {
		data() {
			return {
				user: {},
				myInviteCode: null,
				inviteCode: null,
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
						
						var myInviteCode = this.user.id;
						for(var i=0; i < (9 - myInviteCode.toString().length); i++) {
							myInviteCode = "0" + myInviteCode;
						}
						this.myInviteCode = myInviteCode;
					}
				});
			},
			bindCp() {
				if(this.$stringUtil.isEmpty(this.inviteCode)) {
					this.$toast("TA的邀请码不能为空");
					return;
				}
				
				var inviteCode = parseInt(this.inviteCode);
				
				this.$request.put({
					path: "user/cp",
					id: inviteCode,
					onSuccess: (res)=> {
						// save cp user
						this.user.cpUser = res;
						userKeeper.save(this.user);
						
						this.$toast("绑定成功");
						this.$EventBus.$emit("theCpChanged");
						uni.navigateBack();
					} 
				});
			},
		}
	}
</script>

<style lang="scss">
	.inviteCard {
		background: #f9e3e5;
		border-radius: 12px;
		box-shadow: 0px 2px 6px rgba(47, 0, 0, 0.2);
		height: 280px;
		margin-left: 20px;
		margin-right: 20px;
		width: 75%;
		text-align: center;
	}

	.inputBar {
		background: #FFFFFF;
		border-radius: 26px;
		margin-top: 40px;
		align-items: center;
		box-shadow: 0px 2px 6px rgba(251, 101, 101, 0.2);
		height: 52px;

		input {
			text-align: left;
			height: 52px;
			line-height: 52px;
			padding-left: 24px;
			font-size: $font-subhead;
			color: $font-color-gray;
		}

		button {
			margin-right: 6px;
			width: 72px;
			height: 40px;
			opacity: 0.65;
		}
	}
</style>
