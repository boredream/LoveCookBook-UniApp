<template>
	<view class="container">
		<input class="paddingHor input-name" v-model="value" placeholder="请输入" placeholder-class="planceholder" />
		<view class="dividerHor marginHor"></view>
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary" @click="commit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
			};
		},
		methods: {
			commit() {
				if (this.$stringUtil.isEmpty(this.value)) {
					this.$toast("内容不能为空");
					return;
				}

				this.$EventBus.$emit('datainputEditChanged', {
					value: this.value
				});
				uni.navigateBack();
			},
		}
	}
</script>

<style lang="scss">
	.input-name {
		height: 56px;
		line-height: 56px;
		font-size: $font-subhead;
		color: $font-color-gray;
	}
</style>
