<template>
	<view>
		<input class="paddingHor input-name" v-model="info.name" placeholder="请输入标题" placeholder-class="planceholder" />
		<view class="dividerHor" style="margin-left: 20px;"></view>
		<datainput-picker-date name="日期" :initValue="info.theDayDate" @onSelected="onDateSelected" />
		<datainput-picker-list name="显示方式" :initValue="notifyType" :columns="notifyTypeList" @onSelected="onTypeSelected" />
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary" @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button class="marginHor btnPrimaryStroke" v-if="isEdit" @click="deleteData">删除</button>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			if (options.data != null) {
				// 修改
				this.isEdit = true;
				this.info = JSON.parse(decodeURIComponent(options.data));
			} else {
				// 新增
				this.isEdit = false;
				this.info = {
					notifyType: getApp().globalData.NOTIFY_TYPE_TOTAL_COUNT
				}
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
			},
			notifyType() {
				return this.notifyTypeList[this.info.notifyType - 1];
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
				if(this.$stringUtil.isEmpty(this.info.name)) {
					this.$toast("标题不能为空");
					return;
				}
				
				// 如果有本地图片，则先进行上传
				uni.showLoading();
				if (this.isEdit) {
					this.$request.put({
						path: "the_day",
						id: this.info.id,
						data: this.info,
						onSuccess: ()=> this.onComplete("修改成功"),
					});
				} else {
					this.$request.post({
						path: "the_day",
						data: this.info,
						onSuccess: ()=> this.onComplete("新增成功"),
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
								onSuccess: ()=> this.onComplete("删除成功"),
							});
						}
					}
				});
			},
			onComplete(msg) {
				this.$toast(msg);
				this.$EventBus.$emit("theDayChanged");
				uni.navigateBack();
			},
		}
	};
</script>

<style lang="scss" scoped>
	.input-name {
		height: 74px;
		line-height: 74px;
		font-size: $font-subhead;
		color: $font-color-gray;
	}
</style>
