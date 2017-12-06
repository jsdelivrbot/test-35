function setDocumentTitle(title) {
  "use strict";
  setTimeout(function () {
    //利用iframe的onload事件刷新页面
    document.title = title;
    var iframe = document.createElement('iframe');
    iframe.src = '/favicon.ico'; // 必须
    iframe.style.visibility = 'hidden';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 0);
    };
    // document.body.appendChild(iframe);
  }, 0);
}

var fnTimeCountDown = function (d, o) {
  var f = {
    zero: function (n) {
      var n = parseInt(n, 10);
      if (n > 0) {
        if (n <= 9) {
          n = "0" + n;
        }
        return String(n);
      } else {
        return "00";
      }
    },
    dv: function () {
      d = d;
      var future = new Date(d), now = new Date();
      //现在将来秒差值
      var dur = Math.round((future.getTime() - now.getTime()) / 1000), pms = {
        sec: "00",
        mini: "00",
        hour: "00",
        day: "00",
        month: "00",
        year: "0"
      };
      if (dur > 0) {
        pms.sec = f.zero(dur % 60);
        pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00";
        pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00";
        pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00";
        //月份，以实际平均每月秒数计算
        pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
        //年份，按按回归年365天5时48分46秒算
        pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0";
      }
      return pms;
    },
    ui: function () {
      if (o.sec) {
        o.sec.innerHTML = f.dv().sec;
      }
      if (o.mini) {
        o.mini.innerHTML = f.dv().mini;
      }
      if (o.hour) {
        o.hour.innerHTML = f.dv().hour;
      }
      if (o.day) {
        o.day.innerHTML = f.dv().day;
      }
      if (o.month) {
        o.month.innerHTML = f.dv().month;
      }
      if (o.year) {
        o.year.innerHTML = f.dv().year;
      }
      setTimeout(f.ui, 1000);
    }
  };
  f.ui();
};
var ljl = {
  $: function (id) {
    return document.getElementById(id);
  },
  obj: function () {
    return {
      sec: ljl.$("sec"),
      mini: ljl.$("mini"),
      hour: ljl.$("hour"),
    }
  }
};
