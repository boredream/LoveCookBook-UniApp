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
	.llVer {
		display: flex;
		flex-direction: column;
	}
	
	.llHor {
		display: flex;
		flex-direction: row;
	}
	
	.grow {
		flex-grow: 1;
	}
	
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
	
	.textTopTip {
		@extend .textBody;
		height: 32px;
		line-height: 32px;
		width: 100%;
		text-align: center;
		background-color: #F4DBDA;
	}
	
	.planceholder {
		color: #cccccc;
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
	
	.cardShadow {
		border-radius: 12px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
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
		width: 16px;
		height: 16px;
	}

</style>
