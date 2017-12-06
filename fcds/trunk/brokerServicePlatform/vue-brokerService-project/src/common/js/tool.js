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
	isWeiXin: function(){ 
    	var ua = window.navigator.userAgent.toLowerCase(); 
    	if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
    		return false; 
    	}else{ 
    		return true; 
    	} 
    },
	// 数值格式化 s(数值) n(保留位数) formatNum("134348.098", 2) = 134,348,10
	fmoney: function(s, n)  
	{  
	   n = n > 0 && n <= 20 ? n : 2;  
	   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	   var l = s.split(".")[0].split("").reverse(); 
	   var r = s.split(".")[1];  
	   var t = "";  
	   for(var i = 0; i < l.length; i ++ )  
	   {  
	      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	   }  
	   return t.split("").reverse().join("") + "." + r;  
	},
	// 数字整除 Array(数组) Multiple(倍数)
	arrayDivision: function(Array, Multiple){

		for(var i = 0; i < Array.length; i++){
			Array[i] = Array[i] / Multiple;
		}

		return Array;
	},
	arrayinvert: function(Array){
		for(var i = 0; i < Array.length; i++){
			Array[i] = -Array[i];
		}

		return Array;
	},
	formatDate: function(now) { 
	  var year=now.getYear(); 
	  var month=now.getMonth()+1; 
	  var date=now.getDate(); 
	  var hour=now.getHours(); 
	  var minute=now.getMinutes(); 
	  var second=now.getSeconds(); 
	  return month+"-"+date; 
	},
	arrayFlashback: function(Array){
		var a = []
		for(var i = 0; i <= Array.length; i++){
			a[i - 1] = Array[Array.length - i];
		}

		return a;
	},
	getNowFormatDate: function() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	    return currentdate;
	},
	// 圆环图
	wagon: function(option){
		var c=document.getElementById(option.el);
		canvas.width = 800;
		canvas.height = 400;
		var ctx=c.getContext("2d");
		var r = option.r;
		var x = 0;
		var y = 0;
		var dataValue = [];
		var ball = [];
		var percent =[]; //百分比
		var numlist = [90,,,]
		var xx = [];
		var yx = [];
		var cx = [];
		var dx = [];
		var lINE_WIDTH = option.arcwidth; //圆弧粗细
		var XlINE_WIDTH = 8; //小圆点半径(圆弧起点)
		var animateType = 0;
		var j = [];
		var sum = 0;
		var bigSum = 0;

		for(var i =0 ; i<option.series.data.length; i++){
			if(option.series.data[i].value == 0){
				option.series.data[i].value = 0.0001
			}else{
				var valP = (option.series.data[i].value / option.data.value);
				if(valP < 0.1){
					option.series.data[i].value = option.data.value*0.1;
					sum += option.series.data[i].value;
				}else{
					j.push(i);
					bigSum += option.series.data[i].value;
				}
			}
		}

		var totalSum = option.data.value - sum;
		for(var i = 0; i < j.length; i++){
		  option.series.data[j[i]].value = (option.series.data[j[i]].value/bigSum)*totalSum;
		}


		for(var i =0 ; i<option.series.data.length; i++){

			if(i == 0){
				dataValue[i] = (option.series.data[i].value / option.data.value) * 2;
				ball[i] = {v: 0.05/9*Math.PI , cur: 0 ,end: dataValue[i]*Math.PI}
			}else{
				dataValue[i] = dataValue[i-1] + (option.series.data[i].value / option.data.value) * 2;
				ball[i] = {v: 0.05/9*Math.PI , cur: dataValue[i-1]*Math.PI ,end: dataValue[i]*Math.PI}
			}
			// percent[i] = (option.series.data[i].value/option.data.value) * 100;
			// percent[i] = option.series.data[i].value;
			// console.log(dataValue[2])
			if(option.percent){
				if((option.series.data[i].value/option.data.value)>0.001){
					percent[i] = (option.series.data[i].value/option.data.value) * 100 + '%';
				}else{
					percent[i] = 0 * 100 + '%';
				}
				
			}else{
				percent[i] = option.series.data[i].value;
			}
		}

		
		var timer1 = setInterval(
			function(){
				render(ctx, r, x, y);
				updata(x, y);
			},
			1
		)

		var timer2 = setInterval(function(){clearInterval(timer1);clearInterval(timer2);},5000)

		function render(ctx, r, x, y){
			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			// 文字描述
			for(var i = 0; i<option.series.data.length; i++){
				ctx.beginPath();
				ctx.strokeStyle= option.series.data[i].color;
				ctx.lineWidth=2;
				ctx.beginPath();
				
				if(parseInt(option.series.data[i].value) == 0){

				}else{
					zeline(cx[i], dx[i], option.series.data[i].name, option.series.data[i].describe, option.series.data[i].color);
				}

				ctx.stroke();
				ctx.closePath();
			}
			// 圆弧线
			ctx.lineWidth = lINE_WIDTH;
			for(var i = 0; i<option.series.data.length; i++){
				if(i == 0){
					ctx.beginPath();
					ctx.arc(400 + x, 200 + y , r, 0, ball[i].cur);
					ctx.strokeStyle= option.series.data[i].color;
					ctx.stroke();
					ctx.closePath();
				}else{
					ctx.beginPath();
					ctx.arc(400 + x, 200 + y , r, ball[i-1].end, ball[i].cur);
					ctx.strokeStyle= option.series.data[i].color;
					ctx.stroke();
					ctx.closePath();
				}
			}
			// 小圆点(圆弧起点)
			for(var i = 0; i<option.series.data.length; i++){
				
				if(parseInt(option.series.data[i].value) == 0){

				}else{
					ctx.beginPath();
					ctx.lineWidth= XlINE_WIDTH;
					ctx.strokeStyle = option.series.data[i].color;
					ctx.arc(xx[i],yx[i],4,0,2*Math.PI);
					ctx.stroke();
					ctx.closePath();
				}
			}

			// 中心区域
			if (option.data.title){
				ctx.beginPath();
				ctx.textAlign = 'center';
				ctx.fillStyle = "#333";
				ctx.font = "20px Arial";
				ctx.fillText(option.data.title, 400 + x, 170 + y);
				ctx.fillStyle = "#ff4600";
				ctx.font = "bold 24px Arial";
				ctx.fillText(fmoney(option.data.value,2), 400 + x, 210+ y );
				ctx.fillStyle = "#ff4600";
				ctx.font = "bold 24px Arial";
				ctx.fillText(option.data.name, 400 + x, 250+ y );
				ctx.closePath();
			}else{
				ctx.beginPath();
				ctx.textAlign = 'center';
				ctx.fillStyle = "#333";
				ctx.font = "24px Arial";
				ctx.fillText(option.data.name, 400 + x, 190 + y);
				ctx.fillStyle = "#ff4600";
				ctx.font = "bold 28px Arial";
				ctx.fillText(fmoney(option.data.value,2), 400 + x, 240+ y );
				ctx.closePath();
			}
		}

		var type = true;
		var balltype =[];
		for(var i = 0; i<option.series.data.length; i++){
			balltype[i] = true;
		}

		for(var i = 0; i < option.series.data.length; i++){

			if(option.series.data[i].value != 0){
				numlist[i] = 90;
				break;
			}
		
		}

		function updata(x, y){

			var ballType = true;
			for(var i = 0; i<option.series.data.length; i++){
				
				if(ball[i].cur < ball[i].end && ballType && i == 0){
					ballType = false;
					ball[i].cur = ball[i].cur + ball[i].v;
					numlist[i] -= 1;
					var a1 = Math.sin( numlist[i]*Math.PI/180 ) * r;
					var b1 = Math.cos( numlist[i]*Math.PI/180 ) * r;
					xx[i] = 400 + x + a1;
					yx[i] = 200 + y + b1;
					numlist[i+1] = numlist[i];
					if(ball[i].cur >= ball[i].end/2 && balltype[i]){
						cx[i] = xx[i];
						dx[i] = yx[i];
						balltype[i] = false;
					}
					type = false;
				}else if(ball[i].cur < ball[i].end && ballType && i>0){
					ballType = false;
					ball[i].cur = ball[i].cur + ball[i].v;
					numlist[i] -= 1;
					var a1 = Math.sin( numlist[i]*Math.PI/180 ) * r;
					var b1 = Math.cos( numlist[i]*Math.PI/180 ) * r;
					xx[i] = 400 + x + a1;
					yx[i] = 200 + y + b1;
					numlist[i+1] = numlist[i];
					if(ball[i].cur >= (ball[i].end + ball[i-1].end )/2 && balltype[i]){
						cx[i] = xx[i];
						dx[i] = yx[i];
						balltype[i] = false;
					}
					type = false;

				}	
			}
		}

		function fmoney(s, n)  
		{  
		   n = n > 0 && n <= 20 ? n : 2;  
		   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
		   var l = s.split(".")[0].split("").reverse(),  
		   r = s.split(".")[1];  
		   var t = "";  
		   for(i = 0; i < l.length; i ++ )  
		   {  
		      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
		   }  
		   return t.split("").reverse().join("") + "." + r;  
		}


		function zeline(ax, bx, text, percent, color){
			var i = 20;
			var i1 = 20;
			var j = 40;
			var j1 = 40;
			var j2 = 40;
			var l = 220;
			var i0 = 70;
			var j0 = 33;
			var p0 = 130;
			var k0 = 60;
			if(option.percent){
				var l = 220;
				var p0 = 140;
			}else{
				var l = 220;
				var p0 = 130;
			}
			ctx.textAlign = 'left';
			// 第3向限
			if(ax < 400 && bx >= 200){
				i = -i;
				j = -j;
				l = -l;
				i0 = -i0;
				p0 = - p0;
				ctx.textAlign = 'right';
			}
			// 第1向限
			if(ax > 400 && bx < 200){
				i1 = -i1;
				j1 = -j1;
				j2 = -j2;
				j0 = j0 - 50;
				k0 = -k0 + 15;
				ctx.textAlign = 'left';
				
			}
			// 第4向限
			if(ax <= 400 && bx < 200){
				i = - i;
				i1 = -i1;
				j = -j;
				j1 = -j1;
				j2 = -j2;
				l = -l;
				i0 = -i0;
				j0 = -j0 + 18;
				p0 = -p0;
				k0 = - k0 + 15;
				ctx.textAlign = 'right';
			}
			ctx.moveTo(ax+i,bx+i1);
			ctx.lineTo(ax+j,bx+j1);
			ctx.lineTo(ax+l,bx+j2);

			// ctx.fillStyle = color;
			// ctx.fillStyle = '#999999';
			if(option.percent){
				ctx.fillStyle = color;
			}else{
				ctx.fillStyle = '#999999';
			}
			ctx.font = "24px Arial";
			ctx.fillText(text, ax+i0, bx+j0);
			ctx.textAlign = 'center';
			// ctx.fillStyle = color;
			// ctx.fillStyle = '#ff6000';
			if(option.percent){
				ctx.fillStyle = color;
				ctx.fillText(fmoney(percent,2)+'%', ax+p0, bx+k0);		
			}else{
				ctx.fillStyle = '#ff6000';
				ctx.fillText(fmoney(percent,2), ax+p0, bx+k0);
			}

		}
	},
	// 圆环图
	wagon1: function(option){
		var c=document.getElementById(option.el);
		canvas.width = 800;
		canvas.height = 400;
		var ctx=c.getContext("2d");
		var r = option.r;
		var x = 0;
		var y = 0;
		var dataValue = [];
		var ball = [];
		var percent =[]; //百分比
		var numlist = [90,,,]
		var xx = [];
		var yx = [];
		var cx = [];
		var dx = [];
		var lINE_WIDTH = option.arcwidth; //圆弧粗细
		var XlINE_WIDTH = 8; //小圆点半径(圆弧起点)
		var animateType = 0;
		var j = [];
		var sum = 0;
		var bigSum = 0;

		for(var i =0 ; i<option.series.data.length; i++){
			if(option.series.data[i].value == 0){
				option.series.data[i].value = 0.0001
			}else{
				var valP = (option.series.data[i].value / option.data.value);
				if(valP < 0.1){
					option.series.data[i].value = option.data.value*0.1;
					sum += option.series.data[i].value;
				}else{
					j.push(i);
					bigSum += option.series.data[i].value;
				}
			}
		}

		var totalSum = option.data.value - sum;
		for(var i = 0; i < j.length; i++){
		  option.series.data[j[i]].value = (option.series.data[j[i]].value/bigSum)*totalSum;
		}



		for(var i =0 ; i<option.series.data.length; i++){

			// if(option.series.data[i].value == 0){
			// 	option.series.data[i].value = 0.0001
			// }

			if(i == 0){
				dataValue[i] = (option.series.data[i].value / option.data.value) * 2;
				ball[i] = {v: 0.05/9*Math.PI , cur: 0 ,end: dataValue[i]*Math.PI}
			}else{
				dataValue[i] = dataValue[i-1] + (option.series.data[i].value / option.data.value) * 2;
				ball[i] = {v: 0.05/9*Math.PI , cur: dataValue[i-1]*Math.PI ,end: dataValue[i]*Math.PI}
			}
			// percent[i] = (option.series.data[i].value/option.data.value) * 100;
			// percent[i] = option.series.data[i].value;
			// console.log(dataValue[2])
			if(option.percent){
				if((option.series.data[i].value/option.data.value)>0.001){
					percent[i] = (option.series.data[i].value/option.data.value) * 100 + '%';
				}else{
					percent[i] = 0 * 100 + '%';
				}
				
			}else{
				percent[i] = option.series.data[i].value;
			}
		}

		
		var timer3 = setInterval(
			function(){
				render1(ctx, r, x, y);
				updata1(x, y);
			},
			1
		)

		var timer4 = setInterval(function(){clearInterval(timer3);clearInterval(timer4);},5000)

		function render1(ctx, r, x, y){
			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			// 文字描述
			for(var i = 0; i<option.series.data.length; i++){
				ctx.beginPath();
				ctx.strokeStyle= option.series.data[i].color;
				ctx.lineWidth=2;
				ctx.beginPath();
				
				if(parseInt(option.series.data[i].value) == 0){

				}else{
					zeline1(cx[i], dx[i], option.series.data[i].name, option.series.data[i].describe, option.series.data[i].color);
				}

				ctx.stroke();
				ctx.closePath();
			}
			// 圆弧线
			ctx.lineWidth = lINE_WIDTH;
			for(var i = 0; i<option.series.data.length; i++){
				if(i == 0){
					ctx.beginPath();
					ctx.arc(400 + x, 200 + y , r, 0, ball[i].cur);
					ctx.strokeStyle= option.series.data[i].color;
					ctx.stroke();
					ctx.closePath();
				}else{
					ctx.beginPath();
					ctx.arc(400 + x, 200 + y , r, ball[i-1].end, ball[i].cur);
					ctx.strokeStyle= option.series.data[i].color;
					ctx.stroke();
					ctx.closePath();
				}
			}
			// 小圆点(圆弧起点)
			for(var i = 0; i<option.series.data.length; i++){
				
				if(parseInt(option.series.data[i].value) == 0){

				}else{
					ctx.beginPath();
					ctx.lineWidth= XlINE_WIDTH;
					ctx.strokeStyle = option.series.data[i].color;
					ctx.arc(xx[i],yx[i],4,0,2*Math.PI);
					ctx.stroke();
					ctx.closePath();
				}
			}

			// 中心区域
			if (option.data.title){
				ctx.beginPath();
				ctx.textAlign = 'center';
				ctx.fillStyle = "#333";
				ctx.font = "20px Arial";
				ctx.fillText(option.data.title, 400 + x, 170 + y);
				ctx.fillStyle = "#ff4600";
				ctx.font = "bold 24px Arial";
				ctx.fillText(fmoney1(option.data.value,2), 400 + x, 210+ y );
				ctx.fillStyle = "#ff4600";
				ctx.font = "bold 24px Arial";
				ctx.fillText(option.data.name, 400 + x, 250+ y );
				ctx.closePath();
			}else{
				ctx.beginPath();
				ctx.textAlign = 'center';
				ctx.fillStyle = "#333";
				ctx.font = "24px Arial";
				ctx.fillText(option.data.name, 400 + x, 190 + y);
				ctx.fillStyle = "#ff4600";
				ctx.font = "bold 28px Arial";
				ctx.fillText(fmoney(option.data.value,2), 400 + x, 240+ y );
				ctx.closePath();
			}
		}

		var type = true;
		var balltype =[];
		for(var i = 0; i<option.series.data.length; i++){
			balltype[i] = true;
		}

		for(var i = 0; i < option.series.data.length; i++){

			if(option.series.data[i].value != 0){
				numlist[i] = 90;
				break;
			}
		
		}

		function updata1(x, y){

			var ballType = true;
			for(var i = 0; i<option.series.data.length; i++){
				
				if(ball[i].cur < ball[i].end && ballType && i == 0){
					ballType = false;
					ball[i].cur = ball[i].cur + ball[i].v;
					numlist[i] -= 1;
					var a1 = Math.sin( numlist[i]*Math.PI/180 ) * r;
					var b1 = Math.cos( numlist[i]*Math.PI/180 ) * r;
					xx[i] = 400 + x + a1;
					yx[i] = 200 + y + b1;
					numlist[i+1] = numlist[i];
					if(ball[i].cur >= ball[i].end/2 && balltype[i]){
						cx[i] = xx[i];
						dx[i] = yx[i];
						balltype[i] = false;
					}
					type = false;
				}else if(ball[i].cur < ball[i].end && ballType && i>0){
					ballType = false;
					ball[i].cur = ball[i].cur + ball[i].v;
					numlist[i] -= 1;
					var a1 = Math.sin( numlist[i]*Math.PI/180 ) * r;
					var b1 = Math.cos( numlist[i]*Math.PI/180 ) * r;
					xx[i] = 400 + x + a1;
					yx[i] = 200 + y + b1;
					numlist[i+1] = numlist[i];
					if(ball[i].cur >= (ball[i].end + ball[i-1].end )/2 && balltype[i]){
						cx[i] = xx[i];
						dx[i] = yx[i];
						balltype[i] = false;
					}
					type = false;

				}	
			}
		}

		function fmoney1(s, n)  
		{  
		   n = n > 0 && n <= 20 ? n : 2;  
		   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
		   var l = s.split(".")[0].split("").reverse(),  
		   r = s.split(".")[1];  
		   var t = "";  
		   for(i = 0; i < l.length; i ++ )  
		   {  
		      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
		   }  
		   return t.split("").reverse().join("") + "." + r;  
		}


		function zeline1(ax, bx, text, percent, color){
			var i = 20;
			var i1 = 20;
			var j = 40;
			var j1 = 40;
			var j2 = 40;
			var l = 220;
			var i0 = 70;
			var j0 = 33;
			var p0 = 130;
			var k0 = 60;
			if(option.percent){
				var l = 220;
				var p0 = 140;
			}else{
				var l = 220;
				var p0 = 130;
			}
			ctx.textAlign = 'left';
			// 第3向限
			if(ax < 400 && bx >= 200){
				i = -i;
				j = -j;
				l = -l;
				i0 = -i0;
				p0 = - p0;
				ctx.textAlign = 'right';
			}
			// 第1向限
			if(ax > 400 && bx < 200){
				i1 = -i1;
				j1 = -j1;
				j2 = -j2;
				j0 = j0 - 50;
				k0 = -k0 + 15;
				ctx.textAlign = 'left';
				
			}
			// 第4向限
			if(ax <= 400 && bx < 200){
				i = - i;
				i1 = -i1;
				j = -j;
				j1 = -j1;
				j2 = -j2;
				l = -l;
				i0 = -i0;
				j0 = -j0 + 18;
				p0 = -p0;
				k0 = - k0 + 15;
				ctx.textAlign = 'right';
			}
			ctx.moveTo(ax+i,bx+i1);
			ctx.lineTo(ax+j,bx+j1);
			ctx.lineTo(ax+l,bx+j2);

			// ctx.fillStyle = color;
			// ctx.fillStyle = '#999999';
			if(option.percent){
				ctx.fillStyle = color;
			}else{
				ctx.fillStyle = '#999999';
			}
			ctx.font = "24px Arial";
			ctx.fillText(text, ax+i0, bx+j0);
			ctx.textAlign = 'center';
			// ctx.fillStyle = color;
			// ctx.fillStyle = '#ff6000';
			if(option.percent){
				ctx.fillStyle = color;
				ctx.fillText(fmoney1(percent,2)+'%', ax+p0, bx+k0);		
			}else{
				ctx.fillStyle = '#ff6000';
				ctx.fillText(fmoney1(percent,2), ax+p0, bx+k0);
			}

		}
	}
}

export default tool;