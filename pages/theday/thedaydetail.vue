<template>
	<view class="container">
		<input v-model="info.name" class="title-input" placeholder="请输入名字" />
		<datainput-picker-date name="日期" :initValue="info.theDayDate" @onSelected="onDateSelected" />
		<datainput-picker-list name="显示方式" :initValue="info.notifyType" initIndex="0" :columns="notifyTypeList" @onSelected="onTypeSelected" />
		<button style="margin-top: 64px;" class="paddingHor" @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button class="paddingHor" v-if="isEdit" @click="deleteData">删除</button>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			if (options.date != null) {
				// 新增
				this.isEdit = false;
			} else if (options.data != null) {
				// 修改
				this.isEdit = true;
				this.info = JSON.parse(decodeURIComponent(options.data));
			}
			
			if(!this.info.notifyType) {
				// 默认设置提醒类型
				this.info.notifyType = getApp().globalData.NOTIFY_TYPE_TOTAL_COUNT;
			}
		},
		data() {
			return {
				isEdit: false,
				showDate: false,
				info: {},
			}
		},
		computed: {
			notifyTypeList() {
				var list = ["累计天数", "按年倒数"];
				return list;
			}
		},
		methods: {
			onDateSelected(params) {
				this.info.theDayDate = params;
			},
			onTypeSelected(params) {
				this.info.notifyType = this.notifyTypeList.indexOf(params) + 1;
			},
			commitData() {
				// 如果有本地图片，则先进行上传
				uni.showLoading();
				if (this.isEdit) {
					this.$request.put({
						path: "the_day",
						id: this.info.id,
						data: this.info,
						onSuccess: "修改成功"
					});
				} else {
					this.$request.post({
						path: "the_day",
						data: this.info,
						onSuccess: "新增成功"
					});
				}
			},
			deleteData() {
				uni.showModal({
					content: "是否确认删除？",
					success: (res) => {
						if (res.confirm) {
							this.$request.del({
								path: "the_day",
								id: this.info.id,
								onSuccess: "删除成功"
							});
						}
					}
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
</style>
