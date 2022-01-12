<!-- 日期 -->
<template>
	<view>
		<view @click="show = true">
			<datainput-picker :name="name" :initValue="value"></datainput-picker>
		</view>
		<u-picker :show="show" :columns="columns"></u-picker>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ""
			},
			columns: {
				type: Array,
			},
			initValue: {
				type: String,
				default: ""
			}
		},
		mounted() {
			this.value = this.initValue;
		},
		data() {
			return {
				show: false,
				value: "",
			}
		},
		methods: {
			confirm(params) {
				this.value = uni.$u.timeFormat(params.value, 'yyyy-mm-dd');
				this.show = false;
				this.$emit('onSelected', this.value);
			},
			cancel() {
				this.show = false;
			},
		}
	}
</script>

<style>
</style>
