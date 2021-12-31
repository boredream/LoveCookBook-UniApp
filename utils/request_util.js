export default {
	request,
	get,
	post,
	put,
	del,
}

const HOST = 'https://www.papikoala.cn/api/';
// const HOST = 'http://localhost:8080/api/';

import tokenUtil from "./token_keeper.js"

/**
 * @param {Object} params
 * @param {string} params.path
 * @param {int} params.page
 * @param {int} params.size
 * @param params.onSuccess
 * @param {function} params.onFail
 */
function get(params) {
	if (params.path.indexOf("?") >= 0) {
		params.path += "&";
	} else {
		params.path += "?"
	}
	if ("page" in params && "size" in params) {
		params.path = params.path + "page=" + params.page + "&size=" + params.size;
	}
	request("GET", params.path, null, null, params.onSuccess, params.onFail);
}

/**
 * @param {Object} params
 * @param {string} params.path
 * @param {Object} params.data
 * @param params.onSuccess
 * @param {function} params.onFail
 */
function post(params) {
	request("POST", params.path, params.data, null, params.onSuccess, params.onFail);
}

/**
 * @param {Object} params
 * @param {string} params.path
 * @param {string} params.id
 * @param {Object} params.data
 * @param params.onSuccess
 * @param {function} params.onFail
 */
function put(params) {
	params.path = params.path + "/" + params.id;
	request("PUT", params.path, params.data, null, params.onSuccess, params.onFail);
}

/**
 * @param {Object} params
 * @param {string} params.path
 * @param {string} params.id
 * @param params.onSuccess
 * @param {function} params.onFail
 */
function del(params) {
	params.path = params.path + "/" + params.id;
	request("DELETE", params.path, null, null, params.onSuccess, params.onFail);
}

function request(method, path, data, extraHeader, onSuccess, onFail) {
	var url = HOST + path;

	uni.showLoading();
	uni.request({
		method: method,
		url: url,
		header: getHeader(extraHeader),
		data: data,
		success: (res) => {
			// http code error
			if ("status" in res && res.status != 200) {
				defaultOnFail(res);
				return;
			}

			var data = res.data;
			if (!res.data.success) {
				defaultOnFail(res);
				return;
			}

			// 如果onSuccess是字符串，默认toast+finish操作
			if (typeof(onSuccess) == "string") {
				if (onSuccess.length > 0) {
					uni.showToast({
						title: onSuccess,
					});
				}
				uni.navigateBack();
			} else {
				onSuccess(res.data.data);
			}
		},
		fail: (error) => {
			console.log("request fail " + JSON.stringify(error));
			if (onFail != null) {
				onFail(error);
			} else {
				defaultOnFail(error);
			}
		},
		complete: () => {
			uni.hideLoading();
		}
	})
}

function getHeader(extraHeader) {
	var headers = {};
	if (extraHeader != null) {
		headers = extraHeader;
	}
	var token = tokenUtil.get();
	if (token != null && token.length > 0) {
		headers["token"] = token;
	}
	return headers;
}

function defaultOnFail(error) {
	if (error.data.status >= 400 && error.data.status < 500) {
		// token
		uni.showToast({
			title: "登录已过期"
		});
		uni.navigateTo({
			url: "/pages/login/login",
		});
		return;
	}

	// uni.showToast({
	// 	title: JSON.stringify(error)
	// })
}
