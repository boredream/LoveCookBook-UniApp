<!-- 基础样式 -->
<template>
	<view>
		<view class="input-picker">
			<view class="textBody input-name">{{name}}</view>
			<view class="input-value">{{initValue}}</view>
			<view style="margin-left: 8px;">
				<u-icon size="10px" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="dividerHor" style="margin-left: 20px; "></view>
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

<style lang="scss">
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
		font-size: $font-caption;
		color: $font-color-gray;
	}

	.input-image {
		margin-left: 6px;
		width: 6px;
		height: 10px;
	}
</style>
