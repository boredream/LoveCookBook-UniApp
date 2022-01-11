export default {
	save,
	get
}

import localStorageUtil from "./local_storage_util.js"

const storageKey = "user";

function get() {
	return localStorageUtil.get(storageKey);
}

function save(info) {
	localStorageUtil.save(storageKey, info);
}

export function clear() {
	localStorageUtil.clear(storageKey);
}
