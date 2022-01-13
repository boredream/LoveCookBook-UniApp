export default {
	date2str,
	str2date,
	calculateDayDiff,
	getWeek,
}

function calculateDayDiff(date1, date2) {
	var diff = date1.getTime() - date2.getTime();
	var dayDiff = diff / (1000 * 3600 * 24);
	return Math.round(dayDiff);
}

function str2date(str) {
	return new Date(str);
}

/**
 * 通用日期格式化
 * @author ckk
 * @param date
 * @param fmt 如："yyyyMMdd"、"yyyy/MM/dd"、"yyyy-MM-dd hh:mm:ss"、"yyyy年MM月dd日"、"yyyy-MM-dd"等等
 * @returns 日期字符串
 */
function date2str(date, fmt) {
	var obj = {
		"M+": date.getMonth() + 1, // 月
		"d+": date.getDate(), // 日
		"h+": date.getHours(), // 时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds(), // 秒
		"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
		"S": date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var i in obj) {
		if (new RegExp("(" + i + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
				(obj[i]) :
				(("00" + obj[i]).substr(("" + obj[i]).length)));
		}
	}
	return fmt;
}

function getWeek(date) {
	//第一种方法
	var str = "";  
	var week = date.getDay();  
	if (week == 0) {  
	    str = "周日";  
	} else if (week == 1) {  
	    str = "周一";  
	} else if (week == 2) {  
	    str = "周二";  
	} else if (week == 3) {  
	    str = "周三";  
	} else if (week == 4) {  
	    str = "周四";  
	} else if (week == 5) {  
	    str = "周五";  
	} else if (week == 6) {  
	    str = "周六";  
	} 
	return str;
}
