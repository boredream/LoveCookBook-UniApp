<!-- 日期 -->
<template>
	<view @click="chooseImage">
		<view class="input-picker">
			<view class="textBody input-name">{{name}}</view>
			<image mode="aspectFill" class="input-image" :src="image"></image>
			<view style="margin-left: 8px;">
				<u-icon size="10px" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="dividerHor" style="margin-left: 20px; "></view>
	</view>
</template>

<script>
	import dateUtil from "../../utils/date_util.js";

	export default {
		props: {
			name: {
				type: String,
				default: ""
			},
			initImage: {
				type: String,
				default: ""
			},
		},
		mounted() {
			this.image = this.initImage;
		},
		data() {
			return {
				image: ""
			}
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					success: (res) => {
						this.image = res.tempFilePaths[0]
						this.onImageChanged();
					}
				});
			},
			onImageChanged() {
				this.$emit('onSelected', this.image);
			},
		}
	}
</script>

<style lang="scss">
	.input-picker {
		height: 46px;
		display: flex;
		padding-left: 20px;
		padding-right: 20px;
		flex-direction: row;
		align-items: center;
	}

	.input-name {
		flex-grow: 1;
	}

	.input-image {
		width: 28px;
		height: 28px;
		border-radius: 14px;
	}
</style>
