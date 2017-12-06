//动态判断页面中的字体--不改变页面宽度这里不用管
(function(b){
  function fontSizeInit() {
    var a = document.documentElement,
      b = a.clientWidth;
      b && (b /= 320, 2 < b && (b = 2), a.style.fontSize = 25 * b + "px")
  };
  b(document).ready(function() {
    fontSizeInit();
  });
  window.onresize = function() {
    fontSizeInit()
  };
})(jQuery);

