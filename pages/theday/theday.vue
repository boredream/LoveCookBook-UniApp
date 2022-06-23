<template>
	<view style="display: flex; flex-direction: column;">
		<!-- 头 -->
		<view class="paddingHor header">
			<view @click="pickTogetherDays" class="textSubheadWhite">{{togatherTitle}}</view>
			<view style="display: flex; justify-content: space-between; align-items: center;">
				<view style="margin-top: 16px; display: flex; align-items: center; ">
					<text style="font-size: 48px; color: #FFFFFF;">{{togatherDays}}</text>
					<text class="textSubheadWhite" style="margin-left: 10px; margin-top: 20px;">天</text>
				</view>
				<view style="display: flex; flex-direction: row-reverse;">
					<image class="imageOval" mode="aspectFill" style="margin-left: -12px;" :src="cpUserAvatar" @click="bindCp" />
					<image class="imageOval" mode="aspectFill" :src="userAvatar" @click="editUserInfo"/>
				</view>
			</view>
		</view>

		<bd-fab @fabClick="add"></bd-fab>

		<!-- 列表 -->
		<view v-for="item in list">
			<view class="list-item cardShadow" @click="toDetail(item)">
				<view class="item-left">
					<view class="textSubhead">{{item.name}}</view>
					<view class="textBody item-date" v-if="item.theDayDate">{{item.theDayDate}}</view>
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

		<u-datetime-picker :show="showDate" mode="date" v-model="togatherDate" closeOnClickOverlay @confirm="confirm"
			@cancel="cancel">
		</u-datetime-picker>

	</view>
</template>

<script>
	import dateUtil from "../../utils/date_util.js";
	import imageUtil from "../../utils/image_util.js";

	export default {
		onShareAppMessage(res) {
			// https://uniapp.dcloud.io/api/plugins/share.html#%E5%88%86%E4%BA%AB
			return {
			  title: '恋爱手册',
			  path: '/pages/index/index',
			  imageUrl: '../../static/img_share.png'
			}
		},
		onLoad() {
			this.user = this.$userKeeper.get();
			this.setHeadInfo();
			this.loadData(false);
		},
		mounted() {
			this.$EventBus.$on('theUserInfoChanged', () => {
				this.setHeadInfo();
			});
			this.$EventBus.$on('theDayChanged', () => {
				this.loadData(false);
			});
			this.$EventBus.$on('theUserChanged', () => {
				this.user = this.$userKeeper.get();
				this.setHeadInfo();
				this.loadData(false);
			});
		},
		beforeDestroy() {
			this.$EventBus.$off('theUserInfoChanged');
			this.$EventBus.$off('theDayChanged');
			this.$EventBus.$off('theUserChanged');
		},
		data() {
			return {
				showDate: false,
				togatherTitle: "",
				togatherDays: "1",
				togatherDate: Number(new Date()),
				user: null,
				cpUser: null,
				userAvatar: "",
				cpUserAvatar: "",
				list: [],
			}
		},
		methods: {
			setHeadInfo() {
				this.userAvatar = imageUtil.getUserAvatar(this.user);
				
				if(this.user != null && this.user.cpUser != null) {
					this.cpUserAvatar = imageUtil.getUserAvatar(this.user.cpUser);
				} else {
					this.cpUserAvatar = "../../static/ic_add_avatar.png";
				}
				this.setTogetherDays();
			},
			setTogetherDays() {
				if (this.user && this.user.cpTogetherDate) {
					this.togatherTitle = "我们已恋爱";
					var date = dateUtil.str2date(this.user.cpTogetherDate);
					var days = dateUtil.calculateDayDiff(new Date(), date);
					this.togatherDays = days.toString();
					this.togatherDate = Number(date);
				} else {
					this.togatherTitle = "点我设置时间";
					this.togatherDays = "1";
				}
			},
			bindCp() {
				if(!this.$userKeeper.checkLogin()) return;
				if(this.cpUser == null) {
					uni.navigateTo({
						url: "../bindcp/bindcp"
					})
				}
			},
			editUserInfo() {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../userinfo/userinfo"
				})
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
						this.$userKeeper.save(this.user);
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
				if(!this.$userKeeper.checkLogin()) return;
				this.showDate = true;
			},
			loadData(loadMore) {
				if(!this.user) {
					this.list = [{
						"name": "[示例] TA的生日"
					}];
					uni.stopPullDownRefresh();
					return;
				}
				
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
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../theday/thedaydetail"
				})
			},
			toDetail(item) {
				if(!this.$userKeeper.checkLogin()) return;
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
		padding-bottom: 24px;
	}

	.imageOval {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		border-width: 3px;
		border-color: #FFFFFF;
		border-style: solid;
		background-color: #FFFFFF;
	}

	.list-item {
		height: 80px;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 12px;
		padding-left: 16px;
		padding-right: 16px;
		display: flex;
		flex-direction: row;
	}

	.item-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;

		.item-date {
			color: $font-color-gray-light;
			margin-top: 4px;
		}
	}

	.item-right {
		display: flex;
		flex-direction: row;
		align-items: center;

		span {
			color: $font-color-black;
		}
	}

	.item-image {
		width: 30px;
		height: 30px;
	}

	.item-notify-days {
		font-size: 30px;
		margin-left: 4px;
		margin-right: 4px;
	}
</style>
