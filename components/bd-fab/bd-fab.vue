<template>
	<view>
		<uni-fab 
			horizontal="right" 
			vertical="bottom" 
			:pattern="pattern" 
			@fabClick="add">
		</uni-fab>
	</view>
</template>

<script>
	export default {
		name: "bd-fab",
		data() {
			return {
				pattern: {
					buttonColor: "#ff6a6c"
				}
			};
		},
		methods: {
			add() {
				this.$emit('fabClick');
			}
		}
	}
</script>

<style>

</style>
