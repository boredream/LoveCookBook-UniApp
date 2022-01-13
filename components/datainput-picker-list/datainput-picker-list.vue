<!-- 普通文字选项 -->
<template>
	<view>
		<view @click="show = true">
			<datainput-picker :name="name" :initValue="value"></datainput-picker>
		</view>
		
		<u-picker :show="show" 
			:columns="valueList"
			singleIndex="singleIndex"
			closeOnClickOverlay
			@confirm="confirm"
			@cancel="cancel">
		</u-picker>
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
				default () {
					return [];
				}
			},
			initValue: {
				type: String,
				default: "",
			}
		},
		mounted() {
			// picker可以是多维数组
			this.valueList.push(this.columns);
			this.value = this.initValue;
		},
		data() {
			return {
				show: false,
				valueList: [],
				value: "",
			}
		},
		methods: {
			confirm(params) {
				// 回调参数为包含columnIndex、value、values
				this.value = params.value[0];
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
