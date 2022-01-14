<!-- 日期 -->
<template>
	<u-upload 
		@delete="deletePic" 
		sizeType="['compressed']" 
		maxCount="9" 
		:fileList="imageList"
		@afterRead="afterRead">
	</u-upload>
</template>

<script>
	import dateUtil from "../../utils/date_util.js";
	
	export default {
		props: {
			initImageList: {
				type: Array,
				default () {
					return [];
				}
			},
		},
		mounted() {
			this.imageList = this.initImageList;
		},
		data() {
			return {
				imageList: [],
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				console.log("delete pic");
				uni.showModal({
					content: "是否确认删除？",
					success: (res) => {
						if (res.confirm) {
							this.imageList.splice(event.index, 1);
							this.onImageChanged();
						}
					}
				})
			},
			// 新增图片
			afterRead(event) {
				this.imageList.push(event.file);
				this.onImageChanged();
			},
			onImageChanged() {
				this.$emit('onImageChanged', this.imageList);
			},
		}
	}
</script>

<style>
</style>
