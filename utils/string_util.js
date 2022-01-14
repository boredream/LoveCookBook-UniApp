export default {
	getStrWithDef,
	isEmpty
}

function getStrWithDef(str, def) {
	return str != null ? str : def;
}

function isEmpty(str) {
	return typeof str == "undefined" || str == null || str == "";
}