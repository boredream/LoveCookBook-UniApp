<template>
	<view>
		<view class="input-picker" @click="show = true">
			<view class="textBody input-name" style="color: #666666;">{{name}}</view>
			<view class="textCaption input-value">{{value}}</view>
			<image class="input-image" src="../../static/ic_right_arrow.png"></image>
		</view>

		<u-datetime-picker :show="show" mode="date" closeOnClickOverlay="true" @confirm="onDateSelected"
			@cancel="cancel">
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		name: "dateinput-picker",
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
		},
		data() {
			return {
				show: false,
				value: "",
			}
		},
		methods: {
			onDateSelected(params) {
				this.value = uni.$u.timeFormat(params.value, 'yyyy-mm-dd');
				this.show = false;
				this.$emit('onDateSelected', this.value);
			},
			cancel() {
				this.show = false;
			},
		}
	}
</script>

<style>
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
	
	.input-value {
		
	}

	.input-image {
		margin-left: 6px;
		width: 6px;
		height: 10px;
	}
</style>
