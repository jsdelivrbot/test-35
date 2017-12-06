$.ajaxSettings.cache = false;
var app = {debug: false};
app.tapevent = $.support.touch ? "tap" : "click";
app.helper = {
    contextPath: "",
    mergeArray: function (array1, array2) {
        var array = new Array();
        if (typeof array1 != "undefined") {
            if ($.type(array1) == "array") {
                for (var i = 0; i < array1.length; i++) {
                    array.push(array1[i]);
                }
            } else array.push(array1);
        }
        if (typeof array2 != "undefined") {
            if ($.type(array2) == "array") {
                for (var i = 0; i < array2.length; i++) {
                    array.push(array2[i]);
                }
            } else array.push(array2);
        }
        return array;
    },
    getContextPath: function () {
        var contextPath = location.pathname;
        var index = contextPath.substr(1).indexOf("/");
        contextPath = contextPath.substr(0, index + 1);
        delete index;
        return contextPath;
    },
    getFullContextPath: function () {
        var contextPath = app.helper.getContextPath();
        return location.protocol + "//" + location.host + contextPath;
    },
    getHost: function () {
        return location.protocol + "//" + location.host;
    },
    /**
     * 补全url
     */
    completeUrl: function (url) {
        if (!url) return url;
        var temp = '';
        if (url.indexOf("http") != 0) {
            temp = app.helper.getHost();
            if (url.indexOf("/") != 0) {
                temp += '/';
            }
        }
        temp += url;
        return temp;
    },
    getQueryParameter: function (parameterName) {
        var queryString = window.top.location.search.substring(1);
        var parameterName = parameterName + "=";
        if (queryString.length > 0) {
            begin = queryString.indexOf(parameterName);
            if (begin != -1) {
                begin += parameterName.length;
                end = queryString.indexOf("&", begin);
                if (end == -1) {
                    end = queryString.length
                }
                return queryString.substring(begin, end);
            }
        }
        return null;
    },
    removeArray: function (array, delObj) { //扩展Array.prototype与jquery冲突，故采用此法
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == delObj) {
                index = i;
            }
        }
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    },
    formatDate: function (dateString, pattern) {
        var date;
        if (dateString) date = new Date(dateString);
        else return "";
        return date.pattern(pattern ? pattern : 'yyyy-MM-dd');
    },
    formatCurrentDate: function (pattern) {
        var date = new Date();
        return date.pattern(pattern ? pattern : 'yyyy-MM-dd');
    },
    safeRender: function (s) {
        return (s && s != "" && s != '_NA_') ? s : "无";
    },
    loadStatus: function (id, status, defaultValue) {
        var e = $("#" + id);
        if (e.size() > 0) {
            e.empty();
            $("<option value=''>请选择</option>").appendTo(e);
            for (var s in status) {
                var str = "<option value='" + s + "' ";
                if (defaultValue && defaultValue == s) str += "selected";
                ;
                str += ">" + status[s] + "</option>";
                $(str).appendTo(e);
            }
        }
    },
    forwardToUrl: function (url) {
        location.href = url;
    },
    isMobileBrowser: function () {
        //document.hasOwnProperty("ontouchstart")
        return ('ontouchstart' in window)
    },
    initPageMinHeight: function () {
        $(".new-center").css("min-height", $(window).height() - 184);
    },
    initLoadMore: function (pageParams, url, className) {
        var pageIndex = pageParams.pageIndex;
        var totalSize = pageParams.totalSize;
        var pageSize = pageParams.pageSize;
        if (totalSize == 0) return;

        pageIndex++;
        if (totalSize <= pageSize) {
            $("#loadMore").html("没有更多数据了");
            $("#loadMore").unbind("click");
        }
        var totalPage = totalSize / pageSize;

        $("#loadMore").on('click', function () {
            app.ajaxHelper.submitRequest({
                url: url,
                data: {pageIndex: pageIndex},
                success: function (d) {
                    if (app.ajaxHelper.handleAjaxMsg(d)) {
                        $(className || ".new-rp-list").append(d.data.pagingListHtml);
                        pageIndex++;
                        if (pageIndex >= totalPage) {
                            $("#loadMore").html("没有更多数据了");
                            $("#loadMore").unbind("click");
                        }
                    }
                }
            });
        });
    },
    initGmuLoadMore: function (pageParams, url) {
        var pageIndex = pageParams.pageIndex;
        var totalSize = pageParams.totalSize;
        var pageSize = pageParams.pageSize;

        if (totalSize == 0) return;

        pageIndex++;
        if (totalSize <= pageSize) $(".ui-refresh-down").remove();
        var totalPage = totalSize / pageSize;

        $('.ui-refresh').refresh({
            load: function (dir, type) {
                var me = this;
                $.getJSON(url + '&pageIndex=' + pageIndex, function (data) {
                    data = [{
                        "html": data.data.pagingListHtml
                    }];
                    var $list = $('.new-rp-list'),
                        html = (function (data) {      //数据渲染
                            var liArr = [];
                            $.each(data, function () {
                                liArr.push(this.html);
                            });
                            return $(liArr.join(''));
                        })(data);
                    $list[dir == 'up' ? 'prepend' : 'append'](html);
                    me.afterDataLoading();    //数据加载完成后改变状态
                    pageIndex++;
                    if (pageIndex >= totalPage) {
                        me.disable(dir, true);
                    }
                });
            }
        });
    }
};
app.messages = [];
app.alert = function (msg, icon, options) {
    if (!msg) return false;

    var m;
    if ($.type(msg) == 'string') {
        m = '<sapn>' + msg + '</sapn>';
    } else if ($.isArray(msg)) {
        m = '';
        for (var i = 0; i < msg.length; i++) {
            m += '<sapn>' + msg[i] + '</sapn>';
        }
    }

    var setting = $.extend({}, options);

    var $toastMask = $('<div/>').addClass('toast-mask');
    var $toastBox = $('<sapn/>').addClass('toast-box').addClass("fade").addClass(icon).html(m);
    $toastMask.append($toastBox);
    $("body").append($toastMask);

    setTimeout(function () {
        $(".toast-mask").remove();
        if (setting.callback) {
            setting.callback();
        }
        app.executeShowMessage();
    }, 3000);

    return false;
}
app.showError = function (msg, options) {
    app.messages.push({msg: msg, icon: "error", options: options});
    app.executeShowMessage();
};
app.showSuccess = function (msg, options) {
    app.messages.push({msg: msg, icon: "success", options: options});
    app.executeShowMessage();
};
app.showInfo = function (msg, options) {
    app.messages.push({msg: msg, icon: "info", options: options});
    app.executeShowMessage();
};
app.executeShowMessage = function () {
    if ($(".toast-mask").size() > 0 || app.messages.length == 0) return;

    var message = app.messages.shift();
    app.alert(message.msg, message.icon, message.options);
};
/**
 * 用法：
 *  app.confirm(message:"确定将该管理员禁用吗？",function(){
 *			//TODO:确认后需要操作的事件
 *		 });
 */
app.confirm = function (msg, callback) {
    if (!callback || $.type(callback) != 'function') {
        app.showError("请传入确认操作函数");
        return false;
    }
    if (!msg) {
        app.showError("请传入确认提示信息");
        return false;
    }

    var dialog = gmu.Dialog({
        autoOpen: true,
        closeBtn: false,
        buttons: {
            '取消': function () {
                this.close();
            },
            '确定': function () {
                this.close();
                if (callback) {
                    callback();
                }
            }
        },
        content: '<p>' + msg + '</p>'
    });

    return false;
};

app.ajaxHelper = {
    success: function (data, textStatus, jqXHR, options) {
        var settings = $.extend({}, options);
        if (app.ajaxHelper.handleAjaxMsg(data)) {
            if (settings.dialog) $("#" + settings.dialog).dialog("close");
            app.opTips(settings.opTips);
        }
        app.page.unBlock();
    },
    handleAjaxMsg: function (d) {
        app.page.unBlock();
        if (d.result == "error") {
            app.showError(d.message);
            return false;
        } else if (d.result == "noSession") {
            app.showLoginDialog();
            return false;
        }

        var eventMessage = app.ajaxHelper.getEventMessage(d);
        if (!app.validator.isEmpty(eventMessage)) {
            app.showSuccess(eventMessage);
        }
        return true;
    },
    submitRequest: function (options) {
        var settings = $.extend(true, {data: {}, loading: true}, options);
        if (!settings.url) {
            app.showError("缺少url参数");
            return false;
        }
        if (settings.loading) app.page.block();
        if (!settings.error) {
            settings.error = function (xhr, type) {
                if (settings.loading) app.page.unBlock();
            }
        }

        $.ajax({
            type: 'POST',
            url: settings.url,
            data: settings.data,
            dataType: 'json',
            traditional: true,
            success: function (d) {
                if (settings.loading) app.page.unBlock();
                settings.success(d);
            },
            error: settings.error
        })

    },
    confirm: function (options) {
        var settings = $.extend(true, {}, options);
        if (!settings.url) {
            app.showError("缺少url参数");
            return false;
        }
        var sure = function () {
            app.ajaxHelper.submitRequest({
                url: settings.url,
                data: settings.data,
                success: function (d) {
                    if (app.ajaxHelper.handleAjaxMsg(d)) {
                        if (settings.success) settings.success(d);
                    }
                }
            });
        };
        app.confirm(settings.message, sure);
        return false;
    },
    isSuccess: function (d) {
        if (d.result == "error") {
            return false;
        } else if (d.result == "noSession") {
            return false;
        }
        return true;
    },
    getErrorMessage: function (d) {
        return d.message;
    },
    getEventMessage: function (d) {
        if (this.isSuccess(d)) {
            if (d.data && d.data._EVENT_MESSAGE_LIST_) {
                return d.data._EVENT_MESSAGE_LIST_[0];
            }
        }
        return "";
    }
};

app.page = {
    loading: null,
    reload: function () {
        location.reload();
        return false;
    },
    open: function (options) {
        if (!options.href) {
            app.showError("未传入跳转地址");
            return;
        }
        location.href = options.href;
        return false;
    },
    block: function () {
        if (!this.loading) {
            // this.loading = new Loading();
        }
        if (this.loading) {
            this.loading.show();
        }
    },
    unBlock: function () {
        if (this.loading) {
            this.loading.hide();
        }
    }
}

app.showLoginDialog = function () {
    var dialog = gmu.Dialog({
        autoOpen: false,
        closeBtn: false,
        buttons: {
            '取消': function () {
                this.close();
            },
            '确定': function () {
                this.close();
                var loginUrl = app.helper.getContextPath() + '/control/login';
                var psid = app.helper.getQueryParameter('psid');
                if (psid) {
                    loginUrl += ('?psid=' + psid + "&historyUrl=" + encodeURIComponent(window.location.href))
                }
                location.href = loginUrl;
            }
        },
        title: '登录提示',
        content: '<p>您未登录，请先登陆</p>'
    });
    dialog.open();
};
app.share = {
    encodeParam: function (params) {
        var temp = [];
        for (var p in params) {
            temp.push(p + '=' + encodeURIComponent(params[p] || ''))
        }
        return temp.join('&');
    },
    /**
     * 补全url
     * @param params
     */
    fixUrl: function (params) {
        for (var p in params) {
            if (p == 'url' && params[p]) {
                params.url = app.helper.completeUrl(params[p]);
            } else if (p == 'pic') {
                if ($.type(params[p]) == 'array') {
                    var temp = params[p];
                    for (var i in temp) {
                        temp[i] = app.helper.completeUrl(temp[i]);
                    }
                    params.pic = temp;
                } else {
                    params.pic = app.helper.completeUrl(params[p]);
                }
            }
        }
        return params;
    },
    /**
     * 传入参数title,url,pic
     * @param options
     */
    sinaWeibo: function (params) {
        params = app.share.fixUrl(params);

        var pic = params.pic
        if ($.type(pic) == 'array') {
            params.pic = pic.join("||");
        }

        window.open('http://service.weibo.com/share/share.php?searchPic=false&' + app.share.encodeParam(params));
    },
    qqWeibo: function (params) {
        params = app.share.fixUrl(params);

        var pic = params.pic
        if ($.type(pic) == 'array') {
            params.pic = pic.join('|');
        }
        window.open('http://share.v.t.qq.com/index.php?c=share&a=index&' + app.share.encodeParam(params));
    },
    //url,title,pics,summary
    qqZone: function (params) {
        params = app.share.fixUrl(params);

        var pic = params.pic
        if ($.type(pic) == 'array') {
            params.pics = pic.join('|');
            delete params.pic;
        }
        /*params = app.share.fixUrl(params);
         var temp = [];
         for( var p in params ){
         temp.push(p + '=' + encodeURIComponent(params[p] || ''))
         }
         var param = temp.join('&');*/

        /*var p = {
         url:location.href,
         showcount:'1',*/
        /*是否显示分享总数,显示：'1'，不显示：'0' */
        /*
         desc:'',*/
        /*默认分享理由(可选)*/
        /*
         summary:'',*/
        /*分享摘要(可选)*/
        /*
         title:'',*/
        /*分享标题(可选)*/
        /*
         site:'',*/
        /*分享来源 如：腾讯网(可选)*/
        /*
         pics:'', */
        /*分享图片的路径(可选)*/
        /*
         style:'203',
         width:98,
         height:22
         };*/

        var temp = [];
        for (var p in params) {
            if ('pics' == p) {
                temp.push(p + '=' + (params[p] || ''))
            } else {
                temp.push(p + '=' + encodeURIComponent(params[p] || ''))
            }
        }
        var a = temp.join('&');

        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + a);
    }
};
app.loading = {
    show: function () {
        $("#loading").show();
    },
    hide: function () {
        $("#loading").hide();
    }
};

//验证器
var regexEnum = {
    decmal: "^([+-]?)\\d*\\.\\d+$", //浮点数
    decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", //正浮点数
    decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）
    intege: "^-?[1-9]\\d*$", //整数
    intege1: "^[1-9]\\d*$", //正整数
    intege2: "^-[1-9]\\d*$", //负整数
    num: "^([+-]?)\\d*\\.?\\d+$", //数字
    num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
    num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
    ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
    chinese: "^[\\u4e00-\\u9fa5]+$", //仅中文
    color: "^[a-fA-F0-9]{6}$", //颜色
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
    idcard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/, //身份证
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
    letter: "^[A-Za-z]+$", //字母
    letter_l: "^[a-z]+$", //小写字母
    letter_u: "^[A-Z]+$", //大写字母
    mobile: "^0?(13|15|17|18|14)[0-9]{9}$", //手机
    notempty: "^\\S+$", //非空
    password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
    fullNumber: "^[0-9]+$", //数字
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
    qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
    rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
    tel: "^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //户名
    deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$", //单位名
    zipcode: "^\\d{6}$", //邮编
    realname: "^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
    companyname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
    companyaddr: "^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
    companysite: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$",
    amount: "^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$" //金额
};
app.validator = {
    isEmpty: function (value) {
        if (value == undefined || value == "") {
            return true;
        }

        if ((typeof value) == "object") return false;
        if ((typeof value) == "number") return false;

        var val = value.replace(/^[ \s]+/, "").replace(/[ \s]+$/, "");
        return val == "";
    },
    regexValid: function (value, regexName) {
        var regex = eval("regexEnum." + regexName);
        if (regex == undefined || regex == "") {
            return false;
        }
        return (new RegExp(regex, "g")).test(value);
    },
    //短时间，形如 (13:04:06)
    isTime: function (str) {
        var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
        if (a == null) {
            return false
        }
        if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
            return false;
        }
        return true;
    },
    //短日期，形如 (2003-12-05)
    isDate: function (str) {
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null)return false;
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    },
    //长时间，形如 (2003-12-05 13:04:06)
    isDateTime: function (str) {
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = str.match(reg);
        if (r == null) return false;
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    },
    isNull: function (str) {
        return (str == "" || typeof str != "string");
    },
    betweenLength: function (str, _min, _max) {
        return (str.length >= _min && str.length <= _max);
    },
    isUid: function (str) {
        return new RegExp(regexEnum.username).test(str);
    },
    isNum: function (str) {
        return new RegExp(regexEnum.fullNumber).test(str);
    },
    isIntege1: function (str) {
        return new RegExp(regexEnum.intege1).test(str);
    },
    isQQ: function (str) {
        return new RegExp(regexEnum.qq).test(str);
    },
    fullNumberName: function (str) {
        return new RegExp(regexEnum.fullNumber).test(str);
    },
    isPwd: function (str) {
        return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
    },
    isPwdRepeat: function (str1, str2) {
        return (str1 == str2);
    },
    isEmail: function (str) {
        return new RegExp(regexEnum.email).test(str);
    },
    isTel: function (str) {
        return new RegExp(regexEnum.tel).test(str);
    },
    isMobile: function (str) {
        return new RegExp(regexEnum.mobile).test(str);
    },
    isZipCode: function (str) {
        return new RegExp(regexEnum.zipcode).test(str);
    },
    checkType: function (element) {
        return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
    },
    isRealName: function (str) {
        return new RegExp(regexEnum.realname).test(str);
    },
    isCompanyname: function (str) {
        return new RegExp(regexEnum.companyname).test(str);
    },
    isCompanyaddr: function (str) {
        return new RegExp(regexEnum.companyaddr).test(str);
    },
    isCompanysite: function (str) {
        return new RegExp(regexEnum.companysite).test(str);
    },
    weakPwd: function (str) {
        for (var i = 0; i < weakPwdArray.length; i++) {
            if (weakPwdArray[i] == str) {
                return true;
            }
        }
        return false;
    },
    isIDCard: function (str) {
        return new RegExp(regexEnum.idcard).test(str);
    },
    isAmount: function (str) {
        return new RegExp(regexEnum.amount).test(str);
    }
};

app.dateTime = {
    nowAsString: function () {
        return new Date().getTime();
    }
};

app.currency = {
    regions: {},
    defaults: {
        name: "formatCurrency",
        colorize: false,
        region: 'zh-CN',
        global: true,
        roundToDecimalPlace: 2, // roundToDecimalPlace: -1; for no rounding; 0 to round to the dollar; 1 for one digit cents; 2 for two digit cents; 3 for three digit cents; ...
        eventOnDecimalsEntered: false
    },
    formatNumber: function (num, settings) {
        // initialize default region
        defaultSettings = $.extend({}, this.defaults, this.regions['']);
        // override defaults with settings passed in
        settings = $.extend(defaultSettings, settings);

        // check for region setting
        if (settings.region.length > 0) {
            settings = $.extend(settings, this.getRegionOrCulture(settings.region));
        }
        settings.regex = this.generateRegex(settings);

        num = String(num)
        //identify '(123)' as a negative number
        if (num.search('\\(') >= 0) {
            num = '-' + num;
        }

        if (num === '') {
            num = '0';
        }

        if (num === '-' && settings.roundToDecimalPlace === -1) {
            return;
        }

        // if the number is valid use it, otherwise clean it
        if (isNaN(num)) {
            // clean number
            num = num.replace(settings.regex, '');

            if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                return;
            }

            if (settings.decimalSymbol != '.') {
                num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arithmetic
            }
            if (isNaN(num)) {
                num = '0';
            }
        }

        // evalutate number input
        var numParts = String(num).split('.');
        var isPositive = (num == Math.abs(num));
        var hasDecimals = (numParts.length > 1);
        var decimals = (hasDecimals ? numParts[1].toString() : '0');
        var originalDecimals = decimals;

        // format number
        num = Math.abs(numParts[0]);
        num = isNaN(num) ? 0 : num;
        if (settings.roundToDecimalPlace >= 0) {
            decimals = parseFloat('1.' + decimals); // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
            decimals = decimals.toFixed(settings.roundToDecimalPlace); // round
            if (decimals.substring(0, 1) == '2') {
                num = Number(num) + 1;
            }
            decimals = decimals.substring(2); // remove "0."
        }
        num = String(num);

        if (settings.groupDigits) {
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
            }
        }

        if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
            num += settings.decimalSymbol + decimals;
        }

        return num;
    },
    formatCurrency: function (num, settings) {
        // initialize default region
        defaultSettings = $.extend({}, this.defaults, this.regions['']);
        // override defaults with settings passed in
        settings = $.extend(defaultSettings, settings);

        // check for region setting
        if (settings.region.length > 0) {
            settings = $.extend(settings, this.getRegionOrCulture(settings.region));
        }
        settings.regex = this.generateRegex(settings);

        num = String(num)
        //identify '(123)' as a negative number
        if (num.search('\\(') >= 0) {
            num = '-' + num;
        }

        if (num === '') {
            num = '0';
        }

        if (num === '-' && settings.roundToDecimalPlace === -1) {
            return;
        }

        // if the number is valid use it, otherwise clean it
        if (isNaN(num)) {
            // clean number
            num = num.replace(settings.regex, '');

            if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                return;
            }

            if (settings.decimalSymbol != '.') {
                num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arithmetic
            }
            if (isNaN(num)) {
                num = '0';
            }
        }

        // evalutate number input
        var numParts = String(num).split('.');
        var isPositive = (num == Math.abs(num));
        var hasDecimals = (numParts.length > 1);
        var decimals = (hasDecimals ? numParts[1].toString() : '0');
        var originalDecimals = decimals;

        // format number
        num = Math.abs(numParts[0]);
        num = isNaN(num) ? 0 : num;
        if (settings.roundToDecimalPlace >= 0) {
            decimals = parseFloat('1.' + decimals); // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
            decimals = decimals.toFixed(settings.roundToDecimalPlace); // round
            if (decimals.substring(0, 1) == '2') {
                num = Number(num) + 1;
            }
            decimals = decimals.substring(2); // remove "0."
        }
        num = String(num);

        if (settings.groupDigits) {
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
            }
        }

        if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
            num += settings.decimalSymbol + decimals;
        }

        // format symbol/negative
        var format = isPositive ? settings.positiveFormat : settings.negativeFormat;
        var money = format.replace(/%s/g, settings.symbol);
        money = money.replace(/%n/g, num);
        return money;
    },
    getRegionOrCulture: function (region) {
        var regionInfo = this.regions[region];
        if (regionInfo) {
            return regionInfo;
        }
        else {
            if (/(\w+)-(\w+)/g.test(region)) {
                var culture = region.replace(/(\w+)-(\w+)/g, "$1");
                return this.regions[culture];
            }
        }
        // fallback to extend(null) (i.e. nothing)
        return null;
    },
    generateRegex: function (settings) {
        if (settings.symbol === '') {
            return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
        }
        else {
            var symbol = settings.symbol.replace('$', '\\$').replace('.', '\\.');
            return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
        }
    }
}

app.currency.regions['zh-CN'] = {
    symbol: '￥',
    positiveFormat: '%s%n',
    negativeFormat: '%s-%n',
    decimalSymbol: '.',
    digitGroupSymbol: ',',
    groupDigits: true
}

app.CascadeSelect = function (options) {
    this.settings = {};
    this.data = [];
    this.dataMap = {};
    this.elements = null;
    this.uiIds = [];
    this.defaultOptions = {
        nameKey: "name",
        valueKey: "id",
        childsKey: "childs"
    };
    this.init = function (options) {
        var this_ = this;
        this.settings = $.extend({}, this.defaultOptions, options);
        this.data = this.settings.data || [];
        this.uiIds = this.settings.uiIds || [];
        this.elements = new Array(this.uiIds.length);
        for (var i = 0; i < this.uiIds.length; i++) {
            var e = $("#" + this.uiIds[i]).first();
            if (!e || e.size() == 0) {
                app.showError({messages: ["元素" + this.uiIds[i] + "不是下拉框！"]});
                return;
            }
            this_.initSelect(e);
            e.change(function () {
                this_.clearSub(this.id);
                this_.updateSub(this.id);
            });
            this.elements[i] = e;
        }

        this.loadData2UI(0);

        if (this.settings.defaultValues) {
            for (var i = 0; i < this.settings.defaultValues.length; i++) {
                //TODO ie下有问题
                this.elements[i].val(this.settings.defaultValues[i]).change();
            }
        }
    };
    this.initSelect = function (e) {
        var firstOption = e.find("option").first();
        e.empty();
        var selectText = (firstOption.size() > 0) ? firstOption.text() : "请选择";
        $("<option value=''>" + selectText + "</option>").appendTo(e);
    };
    this.loadData2UI = function (uiIndex) {
        if (uiIndex + 1 > this.uiIds.length) return;
        var index = uiIndex || 0;
        var data = (index > 0) ? this.dataMap[this.uiIds[index - 1] + this.elements[index - 1].val()] : this.data;
        if (!data) return;
        var e = this.elements[uiIndex];
        this.initSelect(e);
        for (var i = 0; i < data.length; i++) {
            var key = data[i][this.settings.nameKey];
            var value = data[i][this.settings.valueKey];
            $("<option value='" + value + "'>" + key + "</option>").appendTo(e);
            this.dataMap[this.uiIds[uiIndex] + value] = data[i][this.settings.childsKey];
        }
    };
    this.updateSub = function (id) {
        var index = this.uiIds.indexOf(id);
        this.loadData2UI(index + 1);
    };
    this.clearSub = function (id) {
        var index = this.uiIds.indexOf(id) + 1;
        for (; index < this.uiIds.length; index++) {
            var e = this.elements[index];
            this.initSelect(e);
        }
    }
    this.init(options);
};

app.geoHelper = {
    getGeoName: function (geoId) {
        if (typeof geoDataMap == "undefined") {
            alert("未装载geo数据！");
            return "";
        }
        if (typeof geoId == "undefined" || !geoId) {
            alert("未指定geoId！");
            return "";
        }

        return geoDataMap[geoId];
    },
    checkRequired: function (uiId) {
        var geoLength = $("#" + uiId + " option").length;
        var geoValue = $("#" + uiId).val();

        if (geoLength > 1 && app.validator.isEmpty(geoValue)) return false;
        return true;
    }
};

//扩展zepto将表单序列化为Json对象
// (function ($) {
//     $.fn.serializeJson = function () {
//         var serializeObj = {};
//         var array = this.serializeArray();
//         var str = this.serialize();
//         $(array).each(function () {
//             if (serializeObj[this.name]) {
//                 if ($.isArray(serializeObj[this.name])) {
//                     serializeObj[this.name].push(this.value);
//                 } else {
//                     serializeObj[this.name] = [serializeObj[this.name], this.value];
//                 }
//             } else {
//                 serializeObj[this.name] = this.value;
//             }
//         });
//         return serializeObj;
//     };
// })(Zepto);

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

app.uploadHelper = {
    singleUploader: function (options) {
        /* var singleUploaderOption = {
         BeforeUploadCallBack: function () {

         $("#progressBarBox").show();
         },
         UploadProgressCallBack: function (pluploader, up, file) {
         $('.progress-box .prog-w').css("width", file.percent + "%");
         $('.progress-box .prog-val').html(file.percent + "%");
         },
         UploadCompleteCallBack: function () {

         $("#progressBarBox").hide();
         }
         }
         $.extend(options, singleUploaderOption);*/
        options.multiSelection = false;
        this.pluploader(options);
    },

    multiUploader: function (options) {
        $.extend(options, {multipart: true});

        this.pluploader(options);
    },

    pluploader: function (options) {
        if (!options.uploadButtonId) throw '(需要制定组件的id)uploadButtonId is required!';
        if (!options.sign) throw 'sign is required!';
        var qiniuIsOpen = options.qiniuIsOpen || app.config.qiniuIsOpen;  //thirdparty local
        var fileType = options.fileType || "image";
        var fileSizeLimit = options.fileSizeLimit || '3mb';
        var sign = options.sign;
        var multipart = options.multipart || true;

        var btnText = options.btnText || "选择文件";

        var filterRule = {};

        if ("image" == fileType) {
            filterRule = {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png,ico',
                mimeTypes: 'image/*'
            }
        } else if ("audio" == fileType) {
            filterRule = {
                title: 'Images',
                extensions: 'mp3,AIF,RM,WMV',
                mimeTypes: 'audio/*'
            }
        } else if ("androidApp" == fileType) {
            filterRule = {
                title: 'apps',
                extensions: 'apk',
                mimeTypes: 'audio/*'
            }
        } else if ("iosApp" == fileType) {
            filterRule = {
                title: 'apps',
                extensions: 'ipa',
                mimeTypes: 'audio/*'
            }
        }

        var uploader = UPLOADER.uploader({
            qiniuIsOpen: qiniuIsOpen,
            fileKeyFrom: options.fileKeyFrom,
            fileType: fileType,
            sign: sign,
            isConfigReturnUrl: false,//配置了重定向 需要处理303
            runtimes: 'html5,flash,html4',
            browse_button: options.uploadButtonId,
//          container: 'container',
//          drop_element: 'container',
            max_file_size: fileSizeLimit,
            flash_swf_url: 'js/plupload/Moxie.swf',
            dragdrop: true,
            chunk_size: '4mb',
            'multipart': multipart,
            uptoken_url: '/tp/control/generateUploadToken',
            domain: app.config.imageHomeUrl,
            auto_start: true,
            filters: [
                filterRule
            ],
            init: {
                'FilesAdded': function (up, files) {
                    if (options.FilesAddedCallBack)
                        options.FilesAddedCallBack(up, files);
                },
                'BeforeUpload': function (up, file) {
                    $("#progressBarBox").show();
                },
                'UploadProgress': function (up, file) {
                    $('.progress-box .prog-w').css("width", file.percent + "%");
                    $('.progress-box .prog-val').html(file.percent + "%");
                },
                'UploadComplete': function () {
                    $("#progressBarBox").hide();
                    if (options && options.uploadCompleteCallback) {
                        var obj = {};
                        obj.callBackType = "fileComplete";
                        options.uploadCompleteCallback(obj);
                    }
                },
                'FileUploaded': function (up, file, info) {
                    if (options.FileUploadedCallBack)
                        options.FileUploadedCallBack(up, file, info);

                    var res = $.parseJSON(info);
                    var fileName;
                    var fileUrl;

                    if ("Y" == qiniuIsOpen) {
                        fileUrl = up.getOption('domain') + res.key;
                        fileName = res.key;
                    } else {
                        var data = res.data;

                        fileUrl = data[0].fileUrl;
                        fileName = data[0].fileName;
                    }

                    $.extend(res, {fileUrl: fileUrl, fileName: fileName});

                    var file = res;

                    if (options && options.callback) {
                        options.callback(file.fileUrl, file.fileName, file.imageWidth, file.imageHeight);
                    }

                    var showFileUrlId = options.showFileUrlId;
                    var hiddenFileInputUrlId = options.showFileNameId;

                    if (fileType == "image" && showFileUrlId != "") {
                        $('#' + showFileUrlId).attr("src", file.fileUrl).show();
                    }
                    if (fileType == "audio" && showFileUrlId != "") {
                        $('#' + showFileUrlId).attr("href", file.fileUrl);
                    }
                    if (hiddenFileInputUrlId != "") {
                        $('#' + hiddenFileInputUrlId).val(file.fileName);
                    }

                }
            }
        });

        uploader.bind('FileUploaded', function () {

        });

    }
}

app.dateTime = {
    format: function (d, pattern) {
        var date;
        if (!d) return "";
        if (typeof d == "string") {
            date = new Date(d);
        } else {
            date = d;
        }
        return date.pattern(pattern ? pattern : 'yyyy-MM-dd HH:mm:ss');
    },
    formatDate: function (date) {
        return app.dateTime.format(date, "yyyy-MM-dd");
    },
    formatTime: function (date) {
        return app.dateTime.format(date, "HH:mm:ss");
    },
    formatCurrentDate: function (pattern) {
        var date = new Date();
        return app.dateTime.format(date, pattern);
    },
    formatCurrentTime: function (pattern) {
        var date = new Date();
        return app.dateTime.format(date, pattern || "HH:mm:ss");
    },
    formatCurrentDateTime: function (pattern) {
        var date = new Date();
        return app.dateTime.format(date, pattern || "yyyy-MM-dd HH:mm:ss");
    },
    nowAsString: function () {
        return new Date().getTime();
    },
    getMonthStartDate: function () {
        var date = new Date()
        with (date) {
            year = date.getYear() + 1900;
            month = date.getMonth() + 1;
        }
        return monthStartDate = year + "-" + month + "-1";
    },
    getMonthEndDate: function () {
        var dt = new Date();
        dt.setDate(1);
        dt.setMonth(dt.getMonth() + 1);
        cdt = new Date(dt.getTime() - 1000 * 60 * 60 * 24);
        return monthEndDate = cdt.getFullYear() + "-" + (Number(cdt.getMonth()) + 1) + "-" + cdt.getDate();
    }
}

$(function () {
    app.helper.initPageMinHeight();
});