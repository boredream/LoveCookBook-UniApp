<template>
	<view class="container">
		<input class="paddingHor input-name" v-model="info.name" placeholder="请输入标题" placeholder-class="planceholder" />
		<view class="dividerHor" style="margin-left: 20px;"></view>
		<textarea class="paddingHor input-name" v-model="info.content" placeholder="描述一下这段回忆吧…"
			placeholder-class="planceholder" />
		<view class="paddingHor">
			<datainput-grid-images :initImageList="imageList"></datainput-grid-images>
		</view>
		<view class="dividerHor" style="margin-left: 20px;"></view>
		<datainput-picker-date name="日期" :initValue="info.doneDate" @onSelected="onDateSelected" />
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary"
			@click="commitData">标记为已完成</button>
		<button class="marginHor btnPrimaryStroke" @click="deleteData">删除</button>
	</view>
</template>

<script>
	import imageUploadUtil from "../../utils/image_upload_util.js";
	import dateUtil from "../../utils/date_util.js";

	export default {
		onLoad(options) {
			// 进来的一定是编辑的情况
			this.info = JSON.parse(decodeURIComponent(options.data));

			if (info.doneDate == null) {
				info.doneDate = dateUtil.date2str(new Date(), "yyyy-MM-dd")
			}

			var images = this.info.images;
			if (images != null && images.length > 0) {
				images.split(",").forEach((e) => {
					this.imageList.push({
						"url": e
					});
				});
			}
		},
		data() {
			return {
				showDate: false,
				imageList: [],
				info: {},
			}
		},
		methods: {
			onDateSelected(params) {
				this.info.doneDate = params;
			},
			commitData() {
				if (this.$stringUtil.isEmpty(this.info.name)) {
					this.$toast("标题不能为空");
					return;
				}

				imageUploadUtil.check4upload(this.imageList)
					.then((imageUrls) => {
						this.info.done = !this.$stringUtil.isEmpty(this.info.doneDate);
						this.info.images = imageUrls;
						// 上传成功后发送请求
						this.$request.put({
							path: "todo",
							id: this.info.id,
							data: this.info,
							onSuccess: "修改成功"
						});
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
								path: "todo",
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
	.input-name {
		margin-top: 20px;
		margin-bottom: 20px;
		font-size: $font-subhead;
		color: $font-color-gray;
	}
</style>
