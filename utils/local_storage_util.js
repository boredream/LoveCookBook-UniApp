export default {
	save,
	get,
	clear,
}

function get(storageKey) {
	return uni.getStorageSync(storageKey);
}

function save(storageKey, info) {
	uni.setStorage({
		key: storageKey,
		data: info
	});
}

function clear(storageKey) {
	uni.clearStorage({
		key : storageKey,
	})
}
