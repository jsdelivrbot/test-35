
function deadline(){
    var oDate1 = localStorage.getItem("date");
    var oDate2 = new Date();
    var nTime = oDate2.getTime() - oDate1;
    var day = Math.floor(nTime/(1000*60*60*24));    
    var hour = Math.floor(nTime/(1000*60*60));    
    var minute = Math.floor(nTime/(1000*60));
    
    return day;
}
export {
  deadline
}