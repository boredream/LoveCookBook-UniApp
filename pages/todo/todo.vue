<template>
	<view>
		<bd-fab @fabClick="add"></bd-fab>
		<view class="textTopTip">已打卡{{progress}}/{{total}}次</view>
		<view v-for="group in groupList">
			<view class="llHor paddingHor groupContainer">
				<image class="icon" src="../../static/ic_todo_cus.png"></image>
				<view class="groupName">{{group.name}}</view>
				<view class="textCaption grow">{{groupProgress(group)}}</view>
				<u-icon name="more-dot-fill"></u-icon>
			</view>
			<view class="paddingHor">
				<u-grid col="4">
					<u-grid-item v-for="item in group.todoList">
						<image class="itemImage" src="../../static/avatar_boy.png" ></image>
						<view class="itemName">{{item.name}}</view>
						<view class="itemDate">{{item.todoDate}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import dateUtil from "../../utils/date_util.js";

	export default {
		data() {
			return {
				groupList: [],
				list: [],
			};
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			groupProgress(group) {
				return "1/10";
			},
			add() {
				uni.navigateTo({
					url: "../todo/tododetail",
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: "../todo/tododetail?data=" + encodeURIComponent(JSON.stringify(item)),
				})
			},
			loadData() {
				this.$request.get({
					path: "todo_group",
					onSuccess: (res) => {
						this.groupList = res;
						this.computeTotalProgress();
					}
				});
			},
			computeTotalProgress() {
				var totalCount = 0;
				var progressCount = 0;
				for (var group in this.groupList) {
					if (group.todoList == null) continue;
					for (var todo in group.todoList) {
						totalCount++;
						if (todo.isDone) {
							progressCount++;
						}
					}
				}
				this.progress = progressCount;
				this.total = totalCount;
			}
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.loadData();
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {

		}
	};
</script>

<style lang="scss">
	.groupContainer {
		height: 48px;
		align-items: center;
	}

	.groupName {
		font-size: $font-caption;
		color: $font-color-black;
		margin-left: 6px;
		margin-right: 6px;
	}
	
	.itemContainer {
		
	}
	
	.itemImage {
		width: 72px;
		height: 72px;
	}
	
	.itemName {
		height: 34px;
		font-size: $font-caption;
		color: $font-color-black;
		margin-top: 14px;
	}
	
	.itemDate {
		font-size: 10px;
		color: $font-color-gray-light;
	}
</style>
