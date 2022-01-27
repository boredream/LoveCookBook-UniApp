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
		},
		data() {
			return {
				value: "",
			}
		},
		methods: {
			show() {
				uni.navigateTo({
					url: "../../pages/datainputedit/datainputedit?value=" + encodeURIComponent(this.value),
					events: {
						acceptDataFromOpenedPage: (data) => {
							this.value = data.value;
							this.confirm();
						}
					}
				})
			},
			confirm() {
				this.$emit('onSelected', this.value);
			},
		}
	}
</script>

<style>
</style>
