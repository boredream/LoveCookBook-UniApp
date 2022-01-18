<template>
	<view>
		<textarea class="paddingHor input-name" v-model="info.detail" placeholder="请输入您宝贵的意见"
			placeholder-class="planceholder" />
		<view class="paddingHor">
			<datainput-grid-images @onImageChanged="onImageChanged" :initImageList="imageList"></datainput-grid-images>
		</view>
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary"
			@click="commitData">提交</button>
	</view>
</template>

<script>
	import imageUploadUtil from "../../utils/image_upload_util.js";

	export default {
		data() {
			return {
				imageList: [],
				info: {},
			}
		},
		methods: {
			onImageChanged(params) {
				this.imageList = params;
			},
			commitData() {
				if (this.$stringUtil.isEmpty(this.info.detail)) {
					this.$toast("意见内容不能为空");
					return;
				}

				// 如果有本地图片，则先进行上传
				uni.showLoading();
				imageUploadUtil.check4upload(this.imageList)
					.then((imageUrls) => {
						this.info.images = imageUrls;
						// 上传成功后发送请求
						this.$request.post({
							path: "feed_back",
							data: this.info,
							onSuccess: "新增成功",
						});
					}).catch((error) => {
						uni.hideLoading();
						uni.showToast({
							title: "图片上传失败，请重新提交"
						});
						console.log("图片上传失败 " + error);
					});
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
