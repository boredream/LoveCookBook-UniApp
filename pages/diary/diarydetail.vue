<template>
	<view class="container">
		<textarea style="padding: 24rpx;" placeholder="详细描述..." :auto-height="true" maxlength="-1"
			v-model="info.content" class="post-txt"></textarea>
		<u-upload @delete="deletePic" sizeType="['compressed']" maxCount="9" :fileList="imageList"
			@afterRead="afterRead"></u-upload>
		<view class="input-picker" @click="showDate = true">
			{{info.diaryDate ? info.diaryDate : ""}}
		</view>
		<u-datetime-picker 
			:show="showDate" 
			mode="date" 
			closeOnClickOverlay="true"
			@confirm="onDateSelected"
			@cancel="closeDatePicker">
		</u-datetime-picker>
		<button @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button v-if="isEdit" @click="deleteData">删除</button>
	</view>
</template>

<script>
	import imageUploadUtil from "../../utils/image_upload_util.js";
	import dateUtil from "../../utils/date_util.js";

	export default {
		onLoad(options) {
			if (options.date != null) {
				// 新增
				this.isEdit = false;
			} else if (options.data != null) {
				// 修改
				this.isEdit = true;
				this.info = JSON.parse(decodeURIComponent(options.data));

				var images = this.info.images;
				if (images != null && images.length > 0) {
					images.split(",").forEach((e) => {
						this.imageList.push({
							"url": e
						});
					});
				}
				console.log("exsitImageList " + this.imageList);
			}
		},
		data() {
			return {
				isEdit: false,
				showDate: false,
				imageList: [],
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
				this.info.diaryDate = uni.$u.timeFormat(params.value, 'yyyy-mm-dd');
				this.closeDatePicker();
			},
			closeDatePicker() {
				this.showDate = false;
			},
			commitData() {
				// 如果有本地图片，则先进行上传
				uni.showLoading();
				imageUploadUtil.check4upload(this.imageList)
					.then((imageUrls) => {
						this.info.images = imageUrls;
						// 上传成功后发送请求
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
					}).catch((error) => {
						uni.hideLoading();
						uni.showToast({
							title: "图片上传失败，请重新提交"
						});
						console.log("图片上传失败 " + error);
					});
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
