export default {
	request,
	get,
	post,
	put,
	del
}

const HOST = 'https://www.papikoala.cn/api/';
// const HOST = 'http://localhost:8080/api/';

import tokenKeeper from "./token_keeper.js"
import userKeeper from "./user_keeper.js"

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
	if (params.data != null) {
		params.data["platform"] = "wx";
	}

	uni.showLoading();
	uni.request({
		method: params.method,
		url: HOST + params.path,
		header: getHeader(params.extraHeader),
		data: params.data,
		success: (res) => {
			try {
				console.log("request success " + JSON.stringify(res));
				if(res.statusCode && res.statusCode != 200) {
					// http error
					var errorMsg = "服务器错误 " + res.statusCode;
					if(res.statusCode == 401) {
						errorMsg = "用户未登录";
						// 清空用户信息
						tokenKeeper.clear();
						userKeeper.clear();
					}
					
					var error = {
						data: {
							msg: errorMsg,
							code: res.statusCode,
						}
					}
					doFail(params, error)
					return;
				}
				
				if (!res.data.success) {
					// 业务类错误
					doFail(params, res);
					return;
				}

				if (typeof(params.onSuccess) == "string") {
					// 如果onSuccess是字符串，默认toast+finish操作
					if (params.onSuccess.length > 0) {
						uni.showToast({
							title: params.onSuccess,
						});
					}
					uni.navigateBack();
				} else {
					// 如果onSuccess是函数，回调data数据
					params.onSuccess(res.data.data);
				}
			} catch (e) {
				console.log("request fail in success " + e);
				defaultOnFail(res);
			}
		},
		fail: (error) => doFail(params, error),
		complete: () => {
			uni.hideLoading();
			if(params.onComplete != null) {
				params.onComplete();
			}
		}
	})
}

function doFail(params, error) {
	console.log("request fail " + JSON.stringify(error));
	if (params.onFail != null) {
		// 有自定义回调函数，执行之
		console.log("request fail function");
		params.onFail(error);
	} else {
		defaultOnFail(error);
	}
}

function getHeader(extraHeader) {
	var headers = {};
	if (extraHeader != null) {
		headers = extraHeader;
	}
	var token = tokenKeeper.get();
	if (token != null && token.length > 0) {
		headers["token"] = token;
	}
	return headers;
}

function defaultOnFail(error) {
	console.log("request defaultOnFail " + JSON.stringify(error));
	try {
		uni.showToast({
			icon: "none",
			title: error.data.msg,
			duration: 2500,
		});
	} catch (e) {
		console.log("error " + e);
		uni.showToast({
			icon: "none",
			title: JSON.stringify(error),
			duration: 2500,
		});
	}

}
