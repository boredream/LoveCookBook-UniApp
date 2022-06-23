export default {
	save,
	saveSync,
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

function saveSync(storageKey, info) {
	try {
		uni.setStorageSync(storageKey, info);
		return true;
	} catch (e) {
		return false;
	}
}

function clear(storageKey) {
	uni.clearStorage({
		key : storageKey,
	})
}
