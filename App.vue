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
		},
		globalData: {
			NOTIFY_TYPE_TOTAL_COUNT : 1, // 提醒方式 累计天数
			NOTIFY_TYPE_YEAR_COUNT_DOWN : 2, // 提醒方式 按年倒计天数
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
	.textSubheadWhite {
		color: #FFFFFF;
		font-size: $font-subhead;
	}
	
	.textSubhead {
		color: #333333;
		font-size: $font-subhead;
	}
	
	.textBody {
		color: #333333;
		font-size: $font-body;
	}
	
	.textCaption {
		color: #999999;
		font-size: $font-caption;
	}
	
	.btnPrimary {
		background-color: #FB6565;
		font-size: $font-subhead;
		height: 44px;
		border-radius: 22px;
		color: #FFFFFF;
	}
	
	.paddingHor {
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.icon {
		width: 24px;
		height: 24px;
	}
	
	.input-picker {
		height: 46px;
		display: flex;
		padding-left: 20px;
		padding-right: 20px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.input-picker image {
		width: 6px;
		height: 10px;
		
	}
</style>
