<template>
	<view>
		<input class="paddingHor input-name" v-model="info.name" placeholder="请输入标题" placeholder-class="planceholder" />
		<view class="dividerHor" style="margin-left: 20px;"></view>
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary"
			@click="commitData">{{isEdit ? "修改" : "新增"}}</button>
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
			}
		},
		data() {
			return {
				isEdit: false,
				info: {},
			}
		},
		methods: {
			commitData() {
				if (this.$stringUtil.isEmpty(this.info.name)) {
					this.$toast("标题不能为空");
					return;
				}

				if (this.isEdit) {
					this.$request.put({
						path: "todo_group",
						id: this.info.id,
						data: this.info,
						onSuccess: "修改成功"
					});
				} else {
					this.$request.post({
						path: "todo_group",
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
								path: "todo_group",
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
