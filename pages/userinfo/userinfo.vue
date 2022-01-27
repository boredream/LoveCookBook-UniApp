<template>
	<view>
		<datainput-picker-image name="头像" :initImage="user.avatar" @onSelected="onImageSelected" />
		<datainput-edit name="昵称" :initValue="user.nickname" @onSelected="onValueSelected" />
		<datainput-picker-list name="性别" :initValue="user.gender" :columns="genderList" @onSelected="onGenderSelected" />
		<datainput-picker-date name="生日" :initValue="user.birthday" @onSelected="onDateSelected" />
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary" @click="commitData">修改</button>
	</view>
</template>

<script>
	import userKeeper from "../../utils/user_keeper.js"
	import imageUploadUtil from "../../utils/image_upload_util.js";
	
	export default {
		onLoad() {
			this.user = userKeeper.get();
		},
		data() {
			return {
				showDate: false,
				user: {},
				genderList: ["女", "男"],
			}
		},
		methods: {
			onImageSelected(params) {
				this.user.avatar = params;
			},
			onValueSelected(params) {
				this.user.nickname = params;
			},
			onGenderSelected(params) {
				this.user.gender = params;
			},
			onDateSelected(params) {
				this.user.birthday = params;
			},
			commitData() {
				var imageList = [];
				if(this.user.avatar) {
					if(this.user.avatar.startsWith("http://tmp/")) {
						// 本地图片
						imageList.push({
							thumb: this.user.avatar
						});
					} else {
						imageList.push({
							url: this.user.avatar
						});
					}
				}
				
				uni.showLoading();
				imageUploadUtil.check4upload(imageList)
					.then((imageUrls) => {
						this.user.avatar = imageUrls;
						// 上传成功后发送请求
						this.$request.put({
							path: "user",
							id: this.user.id,
							data: this.user,
							onSuccess: ()=> this.onComplete("修改成功"),
						});
					}).catch((error) => {
						uni.hideLoading();
						uni.showToast({
							title: "图片上传失败，请重新提交"
						});
						console.log("图片上传失败 " + error);
					});
			},
			onComplete(msg) {
				userKeeper.save(this.user);
				this.$toast(msg);
				this.$EventBus.$emit("theUserChanged");
				uni.navigateBack();
			},
		}
	};
</script>

<style lang="scss" scoped>
	.input {
		height: 74px;
	}
</style>
