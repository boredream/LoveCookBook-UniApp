<template>
	<view class="container">
		<input v-model="info.name" class="title-input" placeholder="请输入名字" />
		<datainput-picker name="日期" @onDateSelected="onDateSelected"></datainput-picker>
		<button @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button v-if="isEdit" @click="deleteData">删除</button>
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
		},
		data() {
			return {
				isEdit: false,
				showDate: false,
				info: {},
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				uni.showModal({
					content: "是否确认删除？",
					success: (res) => {
						if (res.confirm) {
							this.imageList.splice(event.index, 1)
						}
					}
				})
			},
			// 新增图片
			afterRead(event) {
				this.imageList.push(event.file)
			},
			onDateSelected(params) {
				this.info.diaryDate = params;
			},
			commitData() {
				// 如果有本地图片，则先进行上传
				uni.showLoading();
				if (this.isEdit) {
					this.$request.put({
						path: "diary",
						id: this.info.id,
						data: this.info,
						onSuccess: "修改成功"
					});
				} else {
					this.$request.post({
						path: "diary",
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
								path: "diary",
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
