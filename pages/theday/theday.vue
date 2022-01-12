<template>
	<view style="display: flex; flex-direction: column;">
		<!-- 头 -->
		<view class="paddingHor header">
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

		<uni-fab horizontal="right" vertical="bottom" @fabClick="add"></uni-fab>

		<!-- 列表 -->
		<view v-for="item in list">
			<view class="list-item" @click="toDetail(item)">
				<view class="item-left">
					<view class="textSubhead">{{item.name}}</view>
					<view class="textBody" style="color: #999999;" v-if="item.theDayDate">{{item.theDayDate}}</view>
				</view>
				<view class="item-right">
					<image class="item-image" v-if="!item.theDayDate" src="../../static/ic_add_the_day.png"></image>
					<view v-if="item.theDayDate">
						<span class="textBody">{{getNotifyPre(item)}}</span>
						<span class="textBody item-notify-days">{{getNotifyDays(item)}}</span>
						<span class="textBody">天</span>
					</view>
				</view>
			</view>
		</view>
		
		<u-datetime-picker
			:show="showDate" 
			mode="date" 
			v-model="togatherDate"
			closeOnClickOverlay
			@confirm="confirm"
			@cancel="cancel">
		</u-datetime-picker>
		
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
				showDate: false,
				togatherTitle: "",
				togatherDays: "1",
				togatherDate: Number(new Date()),
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
			setTogetherDays() {
				var cpTogetherDate = this.user.cpTogetherDate;
				if (cpTogetherDate != null) {
					this.togatherTitle = "我们已恋爱";
					var date = dateUtil.str2date(cpTogetherDate);
					var days = dateUtil.calculateDayDiff(new Date(), date);
					this.togatherDays = days.toString();
					this.togatherDate = Number(date);
				} else {
					this.togatherTitle = "点我设置时间";
					this.togatherDays = "1";
				}
			},
			confirm(params) {
				var date = uni.$u.timeFormat(params.value, 'yyyy-mm-dd');
				this.$request.put({
					path: "user",
					id: this.user.id,
					data: {
						"cpTogetherDate": date
					},
					onSuccess: (res) => {
						this.user.cpTogetherDate = date;
						userKeeper.save(this.user);
						this.setTogetherDays();
						this.showDate = false;
						uni.showToast({
							title: "设置成功"
						});
					}
				});
			},
			cancel() {
				this.showDate = false;
			},
			getNotifyPre(item) {
				return item.notifyType == getApp().globalData.NOTIFY_TYPE_TOTAL_COUNT ?
					"已经" : "还有"
			},
			getNotifyDays(item) {
				var theDayDate = dateUtil.str2date(item.theDayDate);
				var today = new Date();
				if (item.notifyType == getApp().globalData.NOTIFY_TYPE_TOTAL_COUNT) {
					return dateUtil.calculateDayDiff(today, theDayDate);
				} else {
					// 获取下一个纪念日日期，先设置成今年
					var curYear = today.getFullYear();
					theDayDate.setFullYear(curYear);
					// 比较今年，如果已经过去了，则延续到下一年
					if (theDayDate < today) {
						theDayDate.setFullYear(curYear + 1);
					}
					return dateUtil.calculateDayDiff(theDayDate, today);
				}
			},
			pickTogetherDays() {
				this.showDate = true;
			},
			loadData(loadMore) {
				var requestPage = loadMore ? this.curPage + 1 : 1;
				this.$request.get({
					path: "the_day/page",
					page: requestPage,
					size: 20,
					onSuccess: (res) => {
						if (loadMore) {
							this.list.push(...res.records);
						} else {
							this.list = res.records;
							uni.stopPullDownRefresh();
						}
						this.curPage = requestPage;
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
					url: "../theday/thedaydetail?data=" + encodeURIComponent(JSON.stringify(item)),
				})
			},
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.loadData(false);
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			this.loadData(true);
		}
	}
</script>

<style lang="scss">
	.header {
		background-color: $primary-color;
		padding-top: 32px;
		padding-bottom: 32px;
	}

	.imageOval {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		border-width: 3px;
		border-color: #FFFFFF;
		border-style: solid;
		background-color: #FFFFFF;
	}

	.list-item {
		height: 60px;
		border-radius: 12px;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 16px;
		box-shadow: 0px 2px 12px rgba(251, 101, 101, 0.1);
		padding: 10px;
		display: flex;
		flex-direction: row;
	}

	.item-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
	}

	.item-right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item-image {
		width: 30px;
		height: 30px;
	}

	.item-notify-days {
		font-size: 36px;
		margin-left: 4px;
		margin-right: 4px;
	}
</style>
