/**
 * Created by hulei on 2017/5/12.
 * version 0.2
 *
 * @module isType           // 类型检测
 * @module MAX              // 取数组最大值
 * @module MIN              // 取数组最小值
 * @module sort             // 数组排序加强
 * @module trim             // 去除字符左右空格　
 * @module isMobile         // 校验手机号
 * @module isSMs            // 校验短信
 * @module isNull           // 校验字符为空
 * @module isCard           // 校验身份证
 * @module isEmail          // 校验邮箱
 * @module numberOne        // 手机号码截取中间四位
 * @module numberTwo        // 手机号码显示后四位
 * @module format           // 日期格式化
 * @module SetCookies       // 存Cookies
 * @module GetCookies       // 取Cookies
 * @module ClearCookies     // 清空Cookies
 * @module countDown        // 倒计时
 *
 */
(function () {
  'use strict';

  // 暴露
  window.T = {};

  // 类型检测
  T.isType = function (value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }

  // 取数组最大值
  T.MAX = function (arr) {
    return Math.max.apply(null, arr);
  }

  // 取数组最小值
  T.MIN = function (arr) {
    return Math.min.apply(null, arr);
  }

  // 数组排序加强(解释-默认是按照字母排序会导致数组不会用小往大排序)
  T.sort = function (arr) {
    return arr.sort(function (a, b) {
      return a - b;
    })
  }

  // 去除字符左右空格　
  T.trim = function (str) {
    return str.replace(/^\s+|\s+$/g, "");
  }

  // 检验手机号码
  T.isMobile = function (value) {
    return /^(13|14|15|17|18)\d{9}$/i.test(value);
  }

  // 检验短信
  T.isSMs = function (value, leng) {
    var v = leng || 6;
    if (+v == 6) {
      return /^\d{6}$/.test(value);
    } else if (+v == 4) {
      return /^\d{4}$/.test(value);
    }
  }

  // 校验字符空
  T.isNull = function (value) {
    return value === undefined || value === null || this == "";
  }

  // 检验身份证
  T.isCard = function (value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))(([0|1|2][1-9])|3[0-1])\d{3}([0-9]|x|X)$/.test(value);
  }

  // 校验邮箱
  T.isEmail = function (value) {
    return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(value);
  }

  // 手机号码截取中间四位
  T.numberOne = function (value) {
    return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }

  // 手机号码显示后四位
  T.numberTwo = function (value) {
    return value.replace(/\d{7}(\d{4})/, '*******$1');
  }


  // 日期格式化
  Date.prototype.format = function (pat) {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var day = this.getDate();
    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();
    // 两位补齐
    month = month > 9 ? month : "0" + month;
    day = day > 9 ? day : "0" + day;
    hour = hour > 9 ? hour : "0" + hour;
    minute = minute > 9 ? minute : "0" + minute;
    second = second > 9 ? second : "0" + second;
    if (!pat) {
      pat = "yyyy-MM-dd";
    }
    pat = pat.replace(/yyyy/g, year);
    pat = pat.replace(/MM/g, month);
    pat = pat.replace(/dd/g, day);
    pat = pat.replace(/HH/gi, hour);
    pat = pat.replace(/mm/g, minute);
    pat = pat.replace(/ss/g, second);
    return pat;
  }

  // 日期相差天数
  Date.prototype.diff = function (date) {
    return Math.ceil((this - date) / (1000 * 60 * 60 * 24)) - 1;
  }

  // 设置Cookies
  T.SetCookies = function (name, value) {
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
      ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
      ((path == null) ? "" : ("; path=" + path)) +
      ((domain == null) ? "" : ("; domain=" + domain)) +
      ((secure == true) ? "; secure" : "");
  };

  // 读取Cookies
  T.GetCookies = function (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while (i < clen) {
      j = i + alen;
      if (document.cookie.substring(i, j) == arg)
        return getCookieVal(j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0)
        break;
    }
    return null;
  };

  // 清除Cookies
  T.ClearCookies = function (name) {
    if (Cookies.get(name)) {
      var expdate = new Date();
      expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
      Cookies.set(name, "", expdate);
    }
  };

  function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
      endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
  };

  // 倒计时封装
  T.countDown = function (date, target) {

    var setTime = new Date(date).getTime(),
      timer = null;

    function core() {
      var nowTime = new Date().getTime(),
        leftTime = 0,
        d = 0, h = 0, m = 0, s = 0;

      leftTime = Math.ceil((setTime - nowTime) / 1000);
      if (nowTime <= setTime) {
        //按位非运算符，简单的理解就是改变运算数的符号并减去1,这里的意思去掉小数位
        d = ~~(leftTime / 86400);
        h = ~~(leftTime % 86400 / 3600);
        m = ~~(leftTime % 86400 % 3600 / 60);
        s = ~~(leftTime % 86400 % 3600 % 60);
        timer = setTimeout(core, 1e3);
      } else {
        clearTimeout(timer);
        timer = null;
      }
      target.innerHTML = '天' + d + ' 时' + h + ' 分' + m + ' 秒' + s;

    }
    core();
  }

})();
