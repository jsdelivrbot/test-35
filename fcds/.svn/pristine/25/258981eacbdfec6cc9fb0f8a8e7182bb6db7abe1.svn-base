var tool = {
	// 数值格式化 strNum(数值) formatNum(134348098) = 134,348,098
	formatNum: function(strNum) {
	    if (strNum.length <= 3) {
	    	return strNum;
	    }
	    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
	    	return strNum;
	    }
	    var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
	    var re = new RegExp();
	    re.compile("(\\d)(\\d{3})(,|$)");
	    while (re.test(b)) {
	    	b = b.replace(re, "$1,$2$3");
	    }
	    
	    return a + "" + b + "" + c;
	},
	// 数字整除 Array(数组) Multiple(倍数)
	arrayDivision: function(Array, Multiple){

		for(var i = 0; i < Array.length; i++){
			Array[i] = Array[i] / Multiple;
		}

		return Array;
	}
}

export default tool;