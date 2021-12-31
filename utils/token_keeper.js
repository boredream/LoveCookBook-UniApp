export default {
	save,
	get,
	clear,
}

import localStorageUtil from "./local_storage_util.js"

const storageKey = "token";

function get() {
	return localStorageUtil.get(storageKey);
}

function save(info) {
	localStorageUtil.save(storageKey, info);
}

function clear() {
	localStorageUtil.clear(storageKey);
}
