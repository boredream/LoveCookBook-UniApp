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
		color: $font-color-black;
		font-size: $font-subhead;
	}
	
	.textBody {
		color: $font-color-gray;
		font-size: $font-body;
	}
	
	.textCaption {
		color: $font-color-gray-light;
		font-size: $font-caption;
	}
	
	.planceholder {
		color: $font-color-gray-light;
	}
	
	.btnPrimary {
		background-color: $primary-color;
		font-size: $font-subhead;
		height: 44px;
		border-radius: 22px;
		color: #FFFFFF;
	}
	
	.btnPrimaryStroke {
		background-color: #FFFFFF;
		font-size: $font-subhead;
		height: 44px;
		border-radius: 22px;
		border-style: solid;
		border-color: $primary-color;
		border-width: 1px;
		color: $primary-color;
	}
	
	.dividerHor {
		height: 0.5px;
		background-color: #000000;
		opacity: 0.1;
	}
	
	.paddingHor {
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.marginHor {
		margin-left: 20px;
		margin-right: 20px;
	}
	
	.icon {
		width: 24px;
		height: 24px;
	}

</style>
