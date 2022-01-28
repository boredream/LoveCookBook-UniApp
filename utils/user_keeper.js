export default {
	checkLogin,
	save,
	get,
	clear
}

import localStorageUtil from "./local_storage_util.js"

const storageKey = "user";

function checkLogin() {
	// 微信需要未登录也可以体验
	// https://developers.weixin.qq.com/community/develop/doc/000ea46d08898015317b956c65fc09
	var user = get();
	if (!user) {
		uni.showModal({
			content: "需要登录后才能记录恋爱资料",
			confirmText: "前往登录",
			cancelText: "暂不登录",
			success: (res) => {
				if (res.confirm) {
					uni.navigateTo({
						url: "../login/login"
					})
				}
			}
		})
		return false;
	}
	return true;
}

function get() {
	return localStorageUtil.get(storageKey);
}

function save(info) {
	localStorageUtil.save(storageKey, info);
}

function clear() {
	localStorageUtil.clear(storageKey);
}
