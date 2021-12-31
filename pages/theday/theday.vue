<template>
	<view style="display: flex; flex-direction: column;">
		<!-- 头 -->
		<view class="paddingHor" style="background-color: #FB6565; padding-top: 100rpx; padding-bottom: 100rpx;">
			<view @click="pickTogetherDays" class="textSubheadWhite">{{togatherTitle}}</view>
			<view style="display: flex; justify-content: space-between; align-items: center;">
				<view style="margin-top: 20rpx; display: flex; align-items: center; ">
					<text style="font-size: 120rpx; color: #FFFFFF;">{{togatherDays}}</text>
					<text class="textSubheadWhite" style="margin-left: 8rpx; margin-top: 32rpx;">天</text>
				</view>
				<view style="display: flex; flex-direction: row-reverse;">
					<image class="imageOval" mode="aspectFill" style="margin-left: -24rpx;" :src="cpUserAvatar" />
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
	import dateUtil from "../../utils/date_util.js";
	import userKeeper from "../../utils/user_keeper.js"

	export default {
		onLoad() {
			this.loadData();
			this.setHeadInfo();
		},
		data() {
			return {
				togatherTitle: "",
				togatherDays: "100",
				user: {},
				cpUser: {},
				cpUserAvatar: "",
				list: [],
			}
		},
		methods: {
			setHeadInfo() {
				this.user = userKeeper.get();
				this.cpUser = this.user.cpUser;
				
				if (this.cpUser != null) {
					this.cpUserAvatar = this.cpUser.avatar;
				} else {
					this.cpUserAvatar = "../../static/ic_add_primary.png";
				}
				this.setTogetherDays();
			},
			setTogetherDays(){
				console.log("setTogetherDays");
				var bothTogetherDate = this.user.bothTogetherDate;
				console.log("setTogetherDays " + bothTogetherDate);
				if (bothTogetherDate != null) {
					this.togatherTitle = "我们已恋爱";
					var days = dateUtil.calculateDayDiff(time.now(), dateUtil.str2date(bothTogetherDate));
					this.togatherDays = days.toString();
				} else {
					this.togatherTitle = "点我设置时间";
					this.togatherDays = "1";
				}
			},
			pickTogetherDays() {
				
			},
			loadData() {
				this.$request.get({
					path: "the_day/page",
					page: 1,
					size: 20,
					onSuccess: (res) => {
						this.list = res.records;
					}
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
		background-color: #FFFFFF;
	}
</style>
