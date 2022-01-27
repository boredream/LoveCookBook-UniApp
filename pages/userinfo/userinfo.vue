<template>
	<view>
		<datainput-edit name="昵称" :initValue="user.nickname" />
		<datainput-picker-list name="性别" :initValue="user.gender" :columns="genderList" @onSelected="onGenderSelected" />
		<datainput-picker-date name="生日" :initValue="user.birthday" @onSelected="onDateSelected" />
		<button style="margin-top: 90px; margin-bottom: 16px;" class="marginHor btnPrimary" @click="commitData">修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showDate: false,
				user: {},
				genderList: ["女", "男"],
			}
		},
		methods: {
			onGenderSelected(params) {
				this.user.gender = params;
			},
			onDateSelected(params) {
				this.user.birthday = params;
			},
			commitData() {
				this.$request.put({
					path: "user",
					id: this.user.id,
					data: this.user,
					onSuccess: ()=> this.onComplete("修改成功"),
				});
			},
			onComplete(msg) {
				this.$toast(msg);
				this.$EventBus.$emit("theDayChanged");
				uni.navigateBack();
			},
		}
	};
</script>

<style lang="scss" scoped>
	.input {
		height: 74px;
	}
</style>
