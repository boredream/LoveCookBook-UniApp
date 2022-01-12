<template>
	<view>
		<uni-fab horizontal="right" vertical="bottom" @fabClick="add"></uni-fab>

		<view style="padding: 5px;" v-for="item in list">
			<span @click="toDetail(item)">[{{item.diaryDate}}] {{item.content}}</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curPage: 1,
				list: []
			};
		},
		onLoad() {
			this.loadData(false);
		},
		methods: {
			add() {
				uni.navigateTo({
					url: "../diary/diarydetail",
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: "../diary/diarydetail?data=" + encodeURIComponent(JSON.stringify(item)),
				})
			},
			loadData(loadMore) {
				var requestPage = loadMore ? this.curPage + 1 : 1;
				this.$request.get({
					path: "diary/page",
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
			}
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
	};
</script>

<style>
</style>
