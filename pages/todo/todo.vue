<template>
	<view>
		<bd-fab @fabClick="addGroup()"></bd-fab>
		<view class="textTopTip">已打卡{{totalProgressStr}}次</view>
		<view v-for="group in groupList">
			<view class="llHor paddingHor groupContainer">
				<image class="icon" src="../../static/ic_todo_cus.png"></image>
				<view class="groupName">{{group.name}}</view>
				<view class="textCaption grow">{{progressStr(groupProgress(group))}}</view>
				<u-icon name="more-dot-fill" @click="toGroupDetail(group)"></u-icon>
			</view>
			<view class="paddingHor">
				<u-grid col="4">
					<u-grid-item @click="toItemDetail(item)" v-for="item in group.todoList">
						<image class="itemImage" mode="aspectFill" :src="todoImage(item)"></image>
						<view class="itemDate">{{item.doneDate || '未完成'}}</view>
						<view class="itemName">{{item.name}}</view>
					</u-grid-item>
					<u-grid-item @click="addItem(group)">
						<image class="itemImage" src="../../static/ic_add_todo.png"></image>
						<view class="itemDate"></view>
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
		onShareAppMessage(res) {
			// https://uniapp.dcloud.io/api/plugins/share.html#%E5%88%86%E4%BA%AB
			return {
			  title: '恋爱手册',
			  path: '/pages/index/index',
			  imageUrl: '../../static/img_share.png'
			}
		},
		data() {
			return {
				totalProgressStr: "0/0",
				groupList: [],
				list: [],
			};
		},
		onLoad() {
			this.user = this.$userKeeper.get();
			this.loadData();
		},
		mounted() {
			this.$EventBus.$on('todoChanged', () => {
				this.loadData();
			});
			this.$EventBus.$on('theUserChanged', () => {
				this.user = this.$userKeeper.get();
				this.loadData();
			});
		},
		beforeDestroy() {
			this.$EventBus.$off('todoChanged');
			this.$EventBus.$off('theUserChanged');
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
				if (!item.done) {
					return "../../static/ic_todo_lock.png"
				}
				if (this.$stringUtil.isEmpty(item.images)) {
					return "../../static/img_todo_done_default.png";
				}
				if (this.$stringUtil.contains(item.images, ',')) {
					return item.images.split(',')[0];
				}
				return item.images;
			},
			addGroup() {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../todo/todogroupdetail",
				})
			},
			toGroupDetail(item) {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../todo/todogroupdetail?data=" + encodeURIComponent(JSON.stringify(item)),
				})
			},
			addItem(group) {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../todo/tododetail?todoGroupId=" + group.id,
				})
			},
			toItemDetail(item) {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../todo/tododetail?data=" + encodeURIComponent(JSON.stringify(item)),
				})
			},
			loadData() {
				if (!this.user) {
					this.groupList = [{
						name: "[示例] 恋人要一起做的事集合",
						todoList: [{
							name: "一起去K歌"
						}]
					}];
					uni.stopPullDownRefresh();
					return;
				}

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

	.itemContainer {}

	.itemImage {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		border-width: 1px;
		border-color: $color-default-gray;
		border-style: solid;
		margin-top: 10px;
		background-color: $color-default-gray;
	}

	.itemName {
		height: 34px;
		font-size: $font-caption;
		color: $font-color-black;
		text-align: center;
		margin-top: 4px;
	}

	.itemDate {
		margin-top: 4px;
		height: 14px;
		font-size: 10px;
		color: $font-color-gray-light;
	}
</style>
