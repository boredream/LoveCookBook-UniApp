export default {
	getStrWithDef,
	isEmpty,
	contains,
}

function getStrWithDef(str, def) {
	return str != null ? str : def;
}

function isEmpty(str) {
	return typeof str == "undefined" || str == null || str == "";
}

function contains(str, key) {
	return !isEmpty(str) && str.includes(key);
}