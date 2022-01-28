export default {
	request,
	get,
	post,
	put,
	del
}

// const HOST = 'https://www.papikoala.cn/api/';
const HOST = 'http://localhost:8080/api/';

import tokenUtil from "./token_keeper.js"

function get(params) {
	params.method = "GET";
	if (params.path.indexOf("?") >= 0) {
		params.path += "&";
	} else {
		params.path += "?"
	}
	if ("page" in params && "size" in params) {
		params.path = params.path + "page=" + params.page + "&size=" + params.size;
	}
	request(params);
}

function post(params) {
	params.method = "POST";
	request(params);
}

function put(params) {
	params.method = "PUT";
	params.path = params.path + "/" + params.id;
	request(params);
}

function del(params) {
	params.method = "DELETE";
	params.path = params.path + "/" + params.id;
	request(params);
}

function request(params) {
	if(params.data != null) {
		params.data["platform"] = "wx";
	}
	
	uni.showLoading();
	uni.request({
		method: params.method,
		url: HOST + params.path,
		header: getHeader(params.extraHeader),
		data: params.data,
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
			if (typeof(params.onSuccess) == "string") {
				if (params.onSuccess.length > 0) {
					uni.showToast({
						title: params.onSuccess,
					});
				}
				uni.navigateBack();
			} else {
				params.onSuccess(res.data.data);
			}
		},
		fail: (error) => {
			console.log("request fail " + JSON.stringify(error));
			if (params.onFail != null) {
				params.onFail(error);
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
			icon: "none",
			title: "登录已过期"
		});
	} else {
		uni.showToast({
			icon: "none",
			title: error.data.msg,
		});
	}
}
