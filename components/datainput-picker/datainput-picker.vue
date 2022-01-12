<!-- 基础样式 -->
<template>
	<view>
		<view class="input-picker">
			<view class="textBody input-name" style="color: #666666;">{{name}}</view>
			<view class="textCaption input-value">{{initValue}}</view>
			<image class="input-image" src="../../static/ic_right_arrow.png"></image>
		</view>
		<view class="dividerHor" style="margin-left: 16px;"></view>
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
				default: ""
			}
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
