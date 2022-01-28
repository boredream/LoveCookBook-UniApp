export default {
	getUserAvatar,
}

import stringUtil from "./string_util.js"

function getUserAvatar(user) {
	if(!user) {
		// 默认女头像
		return "../../static/avatar_girl.png"
	}
	
	if(stringUtil.isEmpty(user.avatar)) {
		// 按性别，默认女
		if("男" == user.gender) {
			return "../../static/avatar_boy.png"
		} else {
			return "../../static/avatar_girl.png"
		}
	}
	
	return user.avatar
	
}
