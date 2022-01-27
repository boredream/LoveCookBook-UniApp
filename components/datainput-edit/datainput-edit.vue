<!-- 普通文字选项 -->
<template>
	<view>
		<view @click="show">
			<datainput-picker :name="name" :initValue="value"></datainput-picker>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ""
			},
			initValue: {
				type: String,
				default: "",
			}
		},
		mounted() {
			this.value = this.initValue;
			this.$EventBus.$on('datainputEditChanged', (data) => {
				console.log(JSON.stringify(data))
				this.value = data.value;
			});
		},
		beforeDestroy() {
			this.$EventBus.$off('datainputEditChanged');
		},
		data() {
			return {
				value: "",
			}
		},
		methods: {
			show() {
				uni.navigateTo({
					url: "../../pages/datainputedit/datainputedit",
				})
			},
			confirm(params) {
				// 回调参数为包含columnIndex、value、values
				this.value = params.value[0];
				this.show = false;
				this.$emit('onSelected', this.value);
			},
		}
	}
</script>

<style>
</style>
