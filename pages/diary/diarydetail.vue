<template>
	<view>
		<textarea class="paddingHor input-name" v-model="info.content" placeholder="请输入日记内容"
			placeholder-class="planceholder" />
		<view class="paddingHor">
			<datainput-grid-images @onImageChanged="onImageChanged" :initImageList="imageList"></datainput-grid-images>
		</view>
		<view class="dividerHor" style="margin-left: 20px;"></view>
		<datainput-picker-date name="日期" :initValue="info.diaryDate" @onSelected="onDateSelected" />
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary"
			@click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button class="marginHor btnPrimaryStroke" v-if="isEdit" @click="deleteData">删除</button>
	</view>
</template>

<script>
	import imageUploadUtil from "../../utils/image_upload_util.js";
	import dateUtil from "../../utils/date_util.js";
	export default {
		onLoad(options) {
			if (options.data != null) {
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
			} else {
				// 新增
				this.isEdit = false;
				this.info = {
					diaryDate: dateUtil.date2str(new Date(), "yyyy-MM-dd")
				}
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
			onDateSelected(params) {
				this.info.diaryDate = params;
			},
			onImageChanged(params) {
				this.imageList = params;
			},
			commitData() {
				if (this.$stringUtil.isEmpty(this.info.content)) {
					this.$toast("日记内容不能为空");
					return;
				}

				if (this.$stringUtil.isEmpty(this.info.diaryDate)) {
					this.$toast("日期不能为空");
					return;
				}

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
								onSuccess: () => this.onComplete("修改成功"),
							});
						} else {
							this.$request.post({
								path: "diary",
								data: this.info,
								onSuccess: () => this.onComplete("新增成功"),
							});
						}
					}).catch((error) => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
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
								onSuccess: () => this.onComplete("删除成功"),
							});
						}
					}
				});
			},
			onComplete(msg) {
				this.$toast(msg);
				this.$EventBus.$emit("diaryChanged");
				uni.navigateBack();
			},
		}
	};
</script>

<style lang="scss" scoped>
	.input-name {
		margin-top: 20px;
		margin-bottom: 20px;
		font-size: $font-subhead;
		color: $font-color-gray;
	}
</style>
