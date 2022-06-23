<template>
	<view>
		<bd-fab @fabClick="add"></bd-fab>

		<view v-for="(item, index) in list">
			<view class="llVer">
				<view class="llHor">
					<view class="itemLine">
						<view class="itemDash" style="height: 42px;" />
						<view class="itemOval" />
						<view class="itemDash" style="height: 24px;" />
					</view>

					<!-- 日期 -->
					<view class="llHor" style="margin-top: 24px;">
						<view class="textSubhead" style="font-size: 40px; margin-left: 8px; margin-right: 8px;">
							{{getDay(item.diaryDate)}}
						</view>
						<view class="llVer">
							<view class="textCaption" style="color: #999999; margin-top: 12px;">{{getWeek(item.diaryDate)}}</view>
							<view class="textCaption">{{getDate(item.diaryDate)}}</view>
						</view>
					</view>
				</view>

				<view class="llHor">
					<view class="itemDash" style="margin-left: 18px; margin-right: 4px;" />

					<!-- 卡片内容 -->
					<view class="itemCard cardShadow" @click="toDetail(item)">
						<view class="textBody itemContent">{{item.content}}</view>
						<view class="dividerHor"></view>
						<view class="itemBottom">
							<image class="itemAvatar" :src="item.user.avatar"></image>
							<view class="textCaption">{{item.user.nickname}}</view>
						</view>
					</view>
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
				curPage: 1,
				list: []
			};
		},
		onLoad() {
			this.user = this.$userKeeper.get();
			this.loadData(false);
		},
		mounted() {
			this.$EventBus.$on('diaryChanged', () => {
				this.loadData(false);
			});
			this.$EventBus.$on('theUserChanged', () => {
				this.user = this.$userKeeper.get();
				this.loadData(false);
			});
		},
		beforeDestroy() {
			this.$EventBus.$off('diaryChanged');
			this.$EventBus.$off('theUserChanged');
		},
		methods: {
			getDay(date) {
				return date.split("-")[2];
			},
			getWeek(date) {
				return dateUtil.getWeek(dateUtil.str2date(date));
			},
			getDate(date) {
				return date.split("-")[0] + "年" + date.split("-")[1] + "月";
			},
			add() {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../diary/diarydetail",
				})
			},
			toDetail(item) {
				if(!this.$userKeeper.checkLogin()) return;
				uni.navigateTo({
					url: "../diary/diarydetail?data=" + encodeURIComponent(JSON.stringify(item)),
				})
			},
			loadData(loadMore) {
				if(!this.user) {
					this.list = [{
						content: "[示例] 今天真是个好日子啊，要记下来！",
						diaryDate: "2012-12-21",
						user: {
							avatar: "../../static/avatar_girl.png",
							nickname: "恋爱手册",
						}
					}];
					uni.stopPullDownRefresh();
					return;
				}
				
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

<style lang="scss">
	.itemLine {
		display: flex;
		flex-direction: column;
		margin-left: 12px;
	}

	.itemOval {
		width: 8px;
		height: 8px;
		border-radius: 8px;
		border: 3px solid $primary-color;
	}

	.itemDash {
		width: 1px;
		margin-left: 6px;
		background-image: linear-gradient(to bottom, #999999 0%, #999999 50%, transparent 50%);
		background-size: 100% 8px;
		background-repeat: repeat-y;
		opacity: 0.5;
	}

	.itemCard {
		margin-left: 12px;
		margin-top: 12px;
		margin-right: 20px;
		padding-left: 20px;
		padding-right: 20px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.itemContent {
		margin-top: 12px;
		margin-bottom: 12px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.itemBottom {
		display: flex;
		flex-direction: row;
		padding-top: 12px;
		padding-bottom: 12px;
	}

	.itemAvatar {
		width: 20px;
		height: 20px;
		border-radius: 10px;
		margin-right: 8px;
	}
</style>
