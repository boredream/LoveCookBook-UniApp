<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
	.textSubheadWhite {
		color: #FFFFFF;
		font-size: 32rpx;
	}
	
	.textSubhead {
		color: #333333;
		font-size: 32rpx;
	}
	
	.textBody {
		color: #333333;
		font-size: 28rpx;
	}
	
	.textCaption {
		color: #999999;
		font-size: 24rpx;
	}
	
	.btnPrimary {
		background-color: #FB6565;
		font-size: 32rpx;
		height: 88rpx;
		border-radius: 44rpx;
		color: #FFFFFF;
	}
	
	.paddingHor {
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	
	.icon {
		width: 24rpx;
		height: 24rpx;
	}
</style>
