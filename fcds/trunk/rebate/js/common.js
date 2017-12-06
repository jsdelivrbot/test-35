
if(!$.cookie('session_token')){
	window.location.href="login.html";
}else{
	
}


// 获取url参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
// alert(GetQueryString("pid"));



function tu(myCanvas,vueDate){
  var canvas = document.getElementById(myCanvas); 
  var ctx = canvas.getContext("2d");

  function cal (x,y,r,n,color,text,text_1) {
     var i =1;
     var th = n*2*Math.PI/360;
     point = "("+(x+r*Math.sin(th*i))+","+(y-r*Math.cos(th*i))+")";
     var a = (x+r*Math.sin(th*i));
     var b = (y-r*Math.cos(th*i));
     ctx.font = "24px 微软雅黑";
     if(a >= x && b > y){
        ctx.strokeStyle= color;
        ctx.lineWidth=2;
        ctx.lineCap='square';
        ctx.beginPath();
        ctx.moveTo(a+0,b+0);
        ctx.lineTo(a+30,b+30);
        ctx.lineTo(a+180,b+30);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.textAlign = 'right';
        ctx.fillStyle = "#333";
        ctx.fillText(text, a+180, b+25);
        ctx.fillStyle = "#333";
        ctx.fillText(text_1, a+180, b+55);
     }else if(a < x && b >= y){
        ctx.strokeStyle= color;
        ctx.lineWidth=2;
        ctx.lineCap='square';
        ctx.beginPath();
        ctx.moveTo(a-0,b+0);
        ctx.lineTo(a-30,b+30);
        ctx.lineTo(a-180,b+30);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.textAlign = 'left';
        ctx.fillStyle = "#333";
        ctx.fillText(text, a-180, b+25);
        ctx.fillStyle = "#333";
        ctx.fillText(text_1, a-180, b+55);
     }else if(a < x && b < y){
        ctx.strokeStyle= color;
        ctx.lineWidth=2;
        ctx.lineCap='square';
        ctx.beginPath();
        ctx.moveTo(a-0,b-0);
        ctx.lineTo(a-30,b-30);
        ctx.lineTo(a-180,b-30);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.textAlign = 'left';
        ctx.fillStyle = "#333";
        ctx.fillText(text, a-180, b-35);
        ctx.fillStyle = "#333";
        ctx.fillText(text_1, a-180, b-5);
     }else if(a > x && b < y){
        ctx.strokeStyle= color;
        ctx.lineWidth=2;
        ctx.lineCap='square';
        ctx.beginPath();
        ctx.moveTo(a+0,b-0);
        ctx.lineTo(a+30,b-30);
        ctx.lineTo(a+180,b-30);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.textAlign = 'right';
        ctx.fillStyle = "#333";
        ctx.fillText(text, a+180, b-35);
        ctx.fillStyle = "#333";
        ctx.fillText(text_1, a+180, b-5);
     }
     
  }
  function yuanhuan(ctx,data,option){
   var cood=option.cood;
   var radius=option.radius;
   var lastpos=pos=0;
    for(var i=0;i<data.length;i++){
     ctx.beginPath(); 
     ctx.moveTo(cood.x,cood.y); 
     ctx.fillStyle = data[i].bgcolor; 
     pos=lastpos+Math.PI*2*data[i].value/100;
     ctx.arc(cood.x,cood.y,radius,lastpos,pos,false); 
     ctx.fill(); 
     lastpos=pos;
    }
    ctx.beginPath(); 
    ctx.fillStyle ="white"; 
    radius*=0.7;
    ctx.arc(cood.x,cood.y,radius,0,Math.PI*2 ,false); 
    ctx.fill();
   }
   function load(x,y,url) {　　
      var beauty = new Image();
      beauty.src = url;　　
      if (beauty.complete) {
        ctx.drawImage(beauty, x, y);　　
      } else {
        beauty.onload = function() {
          ctx.drawImage(beauty, x, y);　　
        };
        beauty.onerror = function() {
          // window.alert('加载失败，请重试');　　
        };　　
      };
   } 

   function cal1 (x,y,r,n,url) {
      var i =1;
      var th = n*2*Math.PI/360;
      var a = (x+r*Math.sin(th*i));
      var b = (y-r*Math.cos(th*i));
      if(a >= x && b > y){
        load(a-35,b-35,url);
      }else if(a < x && b >= y){
        load(a+8,b-20,url);
      }else if(a < x && b < y){
        load(a+20,b-20,url);
      }else if(a > x && b < y){
        load(a-40,b-10,url);
      }
    }

    function proportion(Arry,dataArry){
      // for (var i = 0;i < Arry.length; i++) {
      //   if(Arry[i]>=60){
      //     Arry[i] = 60;
      //   }else if(Arry[i]<=10&&Arry[i]>0){
      //     Arry[i] = 10;
      //   }else if(Arry[i]<60&&Arry[i]>10){
      //     Arry[i] = 20;
      //   }
      // }

      // var max = 0;var index = 0;
      // for(var i = 0;i < dataArry.length; i++){
      //   var j = i;
      //   if(dataArry[j]>max){
      //     max = dataArry[i];
      //     index = i;
      //   }
      // }
      // var n = Math.max(cycleRebate.poundageRebate,cycleRebate.packageRebate,cycleRebate.transBizFranchiseRebate,cycleRebate.scoreRebate);

      // $.each(dataArry, function(idx, val) {
      //    if(val == n){
      //     index = idx;
      //    }
      // });

      // var sum = Arry[0]+Arry[1]+Arry[2]+Arry[3];
      // if(sum<=100){
      //   Arry[index] = Arry[index] + (100-sum);
      // }
      var sum = 0;var j = [];var bigSum = 0;
      for (var i = 0;i < Arry.length; i++) {
        if(Arry[i]<=10&&Arry[i]>0){
          Arry[i] = 10;
          sum += Arry[i];
        }else{
          j.push(i)
          bigSum += Arry[i];
        }
      }

      var totalSum = 100 - sum;
      for(var i = 0; i < j.length; i++){
        Arry[j[i]] = (Arry[j[i]]/bigSum)*totalSum;
      }
    }

  var cycleRebate = vueDate;
  pieChart(cycleRebate);
  function pieChart(cycleRebate){
     var a = parseFloat(cycleRebate.poundageRebateRatio);
     var b = parseFloat(cycleRebate.packageRebateRatio);
     var c = parseFloat(cycleRebate.transBizFranchiseRebateRatio);
     var d = parseFloat(cycleRebate.scoreRebateRatio);

     var allArry = [a,b,c,d];
     var dataArry = [cycleRebate.poundageRebate,cycleRebate.packageRebate,cycleRebate.transBizFranchiseRebate,cycleRebate.scoreRebate]
     proportion(allArry,dataArry);
     // console.log(allArry)

     var y_data = [];
     if(a==0&&b==0&&c==0&&d==0){
       y_data=[
         {bgcolor:'#ccc',value:100},
         {bgcolor:'#e1e97a',value:0},
         {bgcolor:'#8bddf1',value:0},
         {bgcolor:'#fe86b3',value:0}
       ];
       cal(350,220,150,(y_data[0].value/2/100)*360+90,'rgba(0,0,0,0)','暂无返佣','请继续加油！')
     }else{
       y_data=[
         {bgcolor:'#ff954b',value:allArry[0]},
         {bgcolor:'#e1e97a',value:allArry[1]},
         {bgcolor:'#8bddf1',value:allArry[2]},
         {bgcolor:'#fe86b3',value:allArry[3]}
       ];
     }

     var aj = (y_data[0].value/2/100)*360+90;
     var bj = ((y_data[0].value+(y_data[1].value/2))/100*360+90);
     var cj = ((y_data[0].value+y_data[1].value+(y_data[2].value/2))/100*360+90);
     var dj = ((y_data[0].value+y_data[1].value+y_data[2].value+(y_data[3].value/2))/100*360+90);

     yuanhuan(ctx,y_data,{cood:{x:350,y:250},radius:160});
     if(cycleRebate.poundageRebate>0){
       cal(350,250,170,aj,'#ff954b',fmoney(cycleRebate.poundageRebate,2),'手续费返佣');
       // cal1(350,220,160,aj,"images/3_03.png");
     }
     if(cycleRebate.packageRebate>0){
       cal(350,250,170,bj,'#e1e97a',fmoney(cycleRebate.packageRebate,2),'商品包返佣');
       // cal1(350,220,160,bj,"images/4_03.png");
     }
     if(cycleRebate.transBizFranchiseRebate>0){
       cal(350,250,170,cj,'#8bddf1',fmoney(cycleRebate.transBizFranchiseRebate,2),'加盟费返佣');
       // cal1(350,220,160,cj,"images/1_03.png");
     }
     if(cycleRebate.scoreRebate>0){
       cal(350,250,170,dj,'#f76864',fmoney(cycleRebate.scoreRebate,2),'积分返佣');
       // cal1(350,220,160,dj,"images/2_03.png");
     }

    load(252,165,"images/brandlogo1.png");
  }
}

function errors(emptyHtml){
  $(".loader_cover_box").css("display","none");
  $("#tips").html('<span class="tip_text">系统错误</span>');
  $("#container").html(emptyHtml)
  $('#tips').css("display","block");
  setTimeout('$("#tips").css("display","none");',2000)
}

function outputmoney(number) {  
    if (isNaN(number) || number == "") return "";  
    number = Math.round(number * 100) / 100;  
    if (number < 0)  
        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);  
    else  
        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);  
}  
//格式化金额   
function outputdollars(number) {  
    if (number.length <= 3)  
        return (number == '' ? '0' : number);  
    else {  
        var mod = number.length % 3;  
        var output = (mod == 0 ? '' : (number.substring(0, mod)));  
        for (i = 0; i < Math.floor(number.length / 3); i++) {  
            if ((mod == 0) && (i == 0))  
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);  
            else  
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);  
        }  
        return (output);  
    }  
}  
  
  
function outputcents(amount) {  
    amount = Math.round(((amount) - Math.floor(amount)) * 100);  
    return (amount < 10 ? '.0' + amount : '.' + amount);  
}  

function fmoney(s, n)  
{  
   n = n > 0 && n <= 20 ? n : 2;  
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
   var l = s.split(".")[0].split("").reverse(),  
   r = s.split(".")[1];  
   t = "";  
   for(i = 0; i < l.length; i ++ )  
   {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
   }  
   return t.split("").reverse().join("") + "." + r;  
}  