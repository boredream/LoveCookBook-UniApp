<template>
	<view class="paddingHor">
		{{this.showTheDayDate}}
		<input v-model="info.name" class="title-input" placeholder="请输入名字" />
		<view @click="showTheDayDate = true" style="display: flex; align-items: center; height: 92rpx;">
			<text class="textSubhead" style="flex-grow: 1;">日期</text>
			<text class="textBody">{{this.$stringUtil.getStrWithDef(info.theDayDate, '')}}</text>
			<image style="margin-left: 16rpx;" class="icon" src="../../static/ic_right_arrow.png" />
		</view>
		<view @click="" style="display: flex; align-items: center; height: 92rpx;">
			<text class="textSubhead" style="flex-grow: 1;">显示方式</text>
			<text class="textBody">{{notifyType}}</text>
			<image style="margin-left: 16rpx;" class="icon" src="../../static/ic_right_arrow.png" />
		</view>
		<u-picker :default-time="this.$stringUtil.getStrWithDef(info.theDayDate, '')" @confirm="onTheDayDateSelected"
			mode="time">
		</u-picker>
		<button class="btnPrimary" style="margin-top: 316rpx;" @click="commitData">{{isEdit ? "修改" : "新增"}}</button>
		<button v-if="isEdit" @click="deleteData">删除</button>

		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
			<view class="uni-input">{{date}}</view>
		</picker>
	</view>
</template>

<script>
	import imageUploadUtil from "../../utils/image_upload_util.js";

	export default {
		onLoad(options) {
			if (options.date != null) {
				// 新增
				this.isEdit = false;
				this.info.theDayDate = options.date;
			} else if (options.data != null) {
				// 修改
				this.isEdit = true;
				this.info = JSON.parse(options.data);
			}
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				isEdit: false,
				showTheDayDate: false,
				info: {},
				date: currentDate,
			}
		},
		computed: {
			notifyType() {
				var type = this.$stringUtil.getStrWithDef(this.info.notifyType, 0);
				return type == 1 ? '每年倒数' : '累计天数';
			},
			exsitImageList() {
				var images = this.info.images;
				var exsitImageList = [];
				if (images != null && images.length > 0) {
					images.split(",").forEach(function(e) {
						exsitImageList.push({
							"url": e
						});
					});
				}
				return exsitImageList;
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			onTheDayDateSelected(params) {
				this.info.theDayDate = params.year + '-' + params.month + '-' + params.day
			},
			commitData() {
				if (this.isEdit) {
					this.$request.put("the_day", this.info.id, this.info, "修改成功");
				} else {
					this.$request.post("the_day", this.info, "新增成功");
				}
			},
			deleteData() {
				this.$request.del("the_day", this.info.id, "删除成功");
			},
		}
	};
</script>


<style>

</style>
