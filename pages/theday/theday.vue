<template>
	<view style="display: flex; flex-direction: column;">
		<!-- 头 -->
		<view class="paddingHor" style="background-color: #FB6565; padding-top: 100rpx; padding-bottom: 100rpx;">
			<view class="textSubhead">我们</view>
			<view style="display: flex; justify-content: space-between; align-items: center;">
				<view style="margin-top: 20rpx; display: flex; align-items: center; ">
					<text style="font-size: 120rpx; color: #FFFFFF;">{{togatherDays}}</text>
					<text class="textSubhead" style="margin-left: 8rpx; margin-top: 32rpx;">天</text>
				</view>
				<view style="display: flex; flex-direction: row-reverse;">
					<image class="imageOval" mode="aspectFill" style="margin-left: -24rpx;" src="https://img0.baidu.com/it/u=1787728239,1859405122&fm=26&fmt=auto" />
					<image class="imageOval" mode="aspectFill" src="https://img0.baidu.com/it/u=1787728239,1859405122&fm=26&fmt=auto" />
				</view>
			</view>
		</view>
		
		<view style="display: flex;">
			<view style="background-color: #18B566; height: 50rpx;">123</view>
			<view style="background-color: #be1035; height: 50rpx; flex: 1 1 0%;">456</view>
		</view>
		
		<!-- 列表 -->
		<view style="background-color: #18B566; border-radius: 44rpx; flex: 1 1 0%;">
			content
		</view>
		
		<button @click="add" style="position: absolute; bottom: 16px; right: 16px;">
			新增
		</button>
	</view>
</template>

<script>
	import dateFormat from "../../utils/date_util.js";
	import request from "../../utils/request_util.js";

	export default {
		onLoad() {
			var today = new Date();
			this.curYearMonth = dateFormat(today, "yyyy-MM");
			this.curDate = dateFormat(today, "yyyy-MM-dd");
			this.loadData();
		},
		data() {
			return {
				togatherDays: "100",
				curYearMonth: "",
				show: true,
				theHintList: [],
				yearMonthMap: {},
				list: [],
			}
		},
		methods: {
			onDayChanged(calendar) {
				this.curDate = calendar.fulldate;
				this.showDayList();
			},
			onMonthSwitch(calendar) {
				var yearMonth = calendar.year + "-";
				if (calendar.month < 10) {
					yearMonth += "0";
				}
				yearMonth += calendar.month;
				this.curYearMonth = yearMonth;

				// 先尝试从缓存取，取不到再请求
				if (this.yearMonthMap[this.curYearMonth] != null) {
					this.showDayList();
				} else {
					this.loadData();
				}
			},
			loadData() {
				request.getPage("the_day/page?queryDate=" + this.curYearMonth, 1, 100, (res) => {
					// 记录 x年x月 下所有数据
					var records = this.yearMonthMap[this.curYearMonth] = res.records;

					// 记录 x年x月 下所有日期红点提示
					for (var index in records) {
						this.theHintList.push({
							date: records[index].theDayDate
						});
					}

					this.showDayList();
				});
			},
			showDayList() {
				// 过滤当日数据列表
				var records = this.yearMonthMap[this.curYearMonth];
				this.list = [];
				for (var index in records) {
					if (this.curDate == records[index].theDayDate) {
						this.list.push(records[index]);
					}
				}
			},
			add() {
				uni.navigateTo({
					url: "../theDayDetail/theDayDetail?date=" + this.curDate,
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
	.textSubhead {
		color: #FFFFFF;
		font-size: 32rpx;
	}

	.paddingHor {
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.imageOval {
		width: 136rpx;
		height: 136rpx;
		border-radius: 50%;
		border-width: 6rpx;
		border-color: #FFFFFF;
		border-style: solid;
	}
</style>
