<template>
	<view class="container">
		<textarea style="padding: 24rpx;" placeholder="详细描述..." :auto-height="true" maxlength="-1"
			v-model="info.content" class="post-txt"></textarea>
		<u-upload ref="uUpload" :size-type="['compressed']" :max-count="9" :auto-upload="false"
			:file-list="exsitImageList"></u-upload>
		<uni-datetime-picker type="date" :value="info.diaryDate ? info.diaryDate : ''" @change="onDiaryDateSelected" />
		<button @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button v-if="isEdit" @click="deleteData">删除</button>
	</view>
</template>

<script>
	import imageUploadUtil from "../../utils/image_upload_util.js";

	export default {
		onLoad(options) {
			if (options.date != null) {
				// 新增
				this.isEdit = false;
			} else if (options.data != null) {
				// 修改
				this.isEdit = true;
				this.info = JSON.parse(decodeURIComponent(options.data));
				console.log("load = " + this.info);
			}
		},
		data() {
			return {
				isEdit: false,
				showDiaryDate: false,
				info: {},
			}
		},
		computed: {
			exsitImageList() {
				var images = this.info.images;
				var exsitImageList = [];
				if (images != null && images.length > 0) {
					images.split(",").forEach(function(e) {
						exsitImageList.push({
							"url": e
						});
					});
				}
				return exsitImageList;
			}
		},
		methods: {
			onDiaryDateSelected(params) {
				this.info.diaryDate = params;
			},
			commitData() {
				// 如果有本地图片，则先进行上传
				uni.showLoading();
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

				// imageUploadUtil.check4upload(this.$refs.uUpload.lists).then((imageUrls) => {
				// 	this.info.images = imageUrls;


				// }).catch((error) => {
				// 	uni.hideLoading();
				// 	uni.showToast({
				// 		title: "图片上传失败，请重新提交"
				// 	});
				// });
			},
			deleteData() {
				request.del("the_day", this.info.id, "删除成功");
			},
		}
	};
</script>

<style lang="scss" scoped>

</style>
