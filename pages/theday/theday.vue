<template>
	<view style="display: flex; flex-direction: column;">
		<!-- 头 -->
		<view class="paddingHor" style="background-color: #FB6565; padding-top: 100rpx; padding-bottom: 100rpx;">
			<view class="textSubheadWhite">我们</view>
			<view style="display: flex; justify-content: space-between; align-items: center;">
				<view style="margin-top: 20rpx; display: flex; align-items: center; ">
					<text style="font-size: 120rpx; color: #FFFFFF;">{{togatherDays}}</text>
					<text class="textSubheadWhite" style="margin-left: 8rpx; margin-top: 32rpx;">天</text>
				</view>
				<view style="display: flex; flex-direction: row-reverse;">
					<image class="imageOval" mode="aspectFill" style="margin-left: -24rpx;" :src="user.avatar" />
					<image class="imageOval" mode="aspectFill" :src="user.avatar" />
				</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view style="background-color: #18B566; border-radius: 44rpx; height: max-content; flex: 1 1 0%;">
			<u-list>
				
			</u-list>
		</view>
		
		<button @click="add" style="position: absolute; bottom: 16px; right: 16px;">
			新增
		</button>
	</view>
</template>

<script>
	import dateFormat from "../../utils/date_util.js";
	import userKeeper from "../../utils/user_keeper.js"

	export default {
		onLoad() {
			this.loadData();
		},
		data() {
			return {
				user: {},
				togatherDays: "100",
				list: [],
			}
		},
		methods: {
			setHeadInfo() {
				this.user = userKeeper.get();
		
				// User cpUser = user.getCpUser();
				// if (cpUser != null) {
				// 	GlideHelper.loadAvatar(ivRight, cpUser);
				// 	ivRightAdd.setVisibility(View.GONE);
				// 	ivRight.setOnClickListener(null);
				// } else {
				// 	ivRight.setImageDrawable(null);
				// 	ivRightAdd.setVisibility(View.VISIBLE);
				// 	ivRight.setOnClickListener(v -> InviteCpActivity.start(activity));
				// }
			},
			loadData() {
				this.$request.getPage("the_day/page", 1, 20, (res) => {
					this.list = res.records;
					console.log(this.list);
				});
			},
			add() {
				uni.navigateTo({
					url: "../theday/thedaydetail"
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: "../theDayDetail/theDayDetail?data=" + JSON.stringify(item),
				})
			},
		}
	}
</script>

<style>
	.imageOval {
		width: 136rpx;
		height: 136rpx;
		border-radius: 50%;
		border-width: 6rpx;
		border-color: #FFFFFF;
		border-style: solid;
	}
</style>
