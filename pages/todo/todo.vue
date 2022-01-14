<template>
	<view>
		<bd-fab @fabClick="add"></bd-fab>
		<view class="textTopTip">已打卡{{totalProgressStr}}次</view>
		<view v-for="group in groupList">
			<view class="llHor paddingHor groupContainer">
				<image class="icon" src="../../static/ic_todo_cus.png"></image>
				<view class="groupName">{{group.name}}</view>
				<view class="textCaption grow">{{progressStr(groupProgress(group))}}</view>
				<u-icon name="more-dot-fill"></u-icon>
			</view>
			<view class="paddingHor">
				<u-grid col="4">
					<u-grid-item @click="toDetail(item)" v-for="item in group.todoList">
						<image class="itemImage" :src="todoImage(item)" ></image>
						<view class="itemName">{{item.name}}</view>
						<view class="itemDate">{{item.doneDate || ''}}</view>
					</u-grid-item>
					<u-grid-item @click="add()">
						<image class="itemImage" src="../../static/ic_add_red.png"></image>
						<view class="itemName"></view>
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
				totalProgressStr: "0/0",
				groupList: [],
				list: [],
			};
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			groupProgress(group) {
				var totalCount = 0;
				var progressCount = 0;
				for (var index in group.todoList) {
					var todo = group.todoList[index];
					totalCount++;
					if (todo.done) {
						progressCount++;
					}
				}
				return [progressCount, totalCount];
			},
			totalProgress() {
				var totalCount = 0;
				var progressCount = 0;
				for (var groupIndex in this.groupList) {
					var group = this.groupList[groupIndex];
					var groupProgress = this.groupProgress(group);
					progressCount += groupProgress[0];
					totalCount += groupProgress[1];
				}
				return [progressCount, totalCount];
			},
			progressStr(progress) {
				return progress[0] + "/" + progress[1];
			},
			todoImage(item) {
				if(!item.done) {
					return "../../static/ic_todo_lock.png"
				}
				return item.image;
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
						this.totalProgressStr = this.progressStr(this.totalProgress());
					}
				});
			},
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
		border-radius: 36px;
		margin-top: 10px;
		background-color: $color-default-gray;
	}
	
	.itemName {
		height: 34px;
		font-size: $font-caption;
		color: $font-color-black;
		text-align: center;
		margin-top: 14px;
	}
	
	.itemDate {
		height: 14px;
		font-size: 10px;
		color: $font-color-gray-light;
	}
</style>
