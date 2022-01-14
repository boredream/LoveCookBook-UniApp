<!-- 日期 -->
<template>
	<view>
		<view @click="show = true">
			<datainput-picker :name="name" :initValue="value"></datainput-picker>
		</view>
		<u-datetime-picker 
			:show="show" 
			mode="date" 
			v-model="initDate"
			closeOnClickOverlay
			@confirm="confirm"
			@cancel="cancel">
		</u-datetime-picker>
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
			initValue: {
				type: String,
				default: ""
			}
		},
		mounted() {
			this.value = this.initValue;
			if(this.value != "") {
				this.initDate = Number(dateUtil.str2date(this.value));
			}
		},
		data() {
			return {
				initDate: Number(new Date()),
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
