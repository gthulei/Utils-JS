/**
 * Created by hulei on 2017/5/12.
 * version 0.1
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
 * @module GetQueryString   // 取得url参数
 * @module SubString        // 日期格式化
 * @module ToDX             // 数字转大写
 * @module dateWeek         // 得到当前星期
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

  // 懒加载
  var vievHeight;
  // 获取窗口高度
  if (window.innerHeight) {
    vievHeight = window.innerHeight;
  } else if ((document.body) && (document.body.clientHeight)) {
    vievHeight = document.body.clientHeight;
  }

  function imgLoad(id) {
    var scrollHeight;
    // 滚动的高度
    if (document.body.scrollTop) {
      scrollHeight = document.body.scrollTop;
    } else {
      scrollHeight = document.documentElement.scrollTop;
    }
    var $img = document.querySelectorAll(id);
    for (var i = 0; i < $img.length; i++) {
      // 获取窗口高度 + 滚动的高度 - 元素到顶部的距离 > 0 表示在可视区域内
      var y = vievHeight + scrollHeight - $img[i].offsetTop;
      if (y > 0) {
        $img[i].setAttribute("src", $img[i].getAttribute("imgLoad"));
      }
    }
  }

  // 懒加载
  T.lazyloadImg = function (id) {
    window.addEventListener("scroll", function () {
      console.log("1");
      imgLoad(id);
    }, false)
  }

  // 取得url参数
  T.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  },

    //20160101日期格式化
    T.SubString = function (str) {
      var Str = str && str.toString();
      return Str.substring(0, 4) + '-' + Str.substring(4, 6) + '-' + Str.substring(6, 8)
    },

    // 数字转大写
    T.ToDX = function (n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
      var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
      n += "00";
      var p = n.indexOf('.');
      if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2);
      unit = unit.substr(unit.length - n.length);
      for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
      return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
    }

  // 得到当前星期几
  T.dateWeek = function (datas) {
    var array = new Array();
    var date = datas;
    array = date.split('-');
    var ndate = new Date(array[0], parseInt(array[1] - 1), array[2]);
    var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var weekDay = weekArray[ndate.getDay()];
    return weekDay
  }

  // 正则验证
  var reg = {
    pwdLength: /^.{6,20}$/,//6-20位密码
    lx3: /([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)\+\`\-\=\[\]\\\{ \}\|\;\'\:\"\,\.\/\<\>\?])\1\1/,//判断是否包含三个连续字符
    numStr: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,//判断是否同时包含数字 字母
    isChinaName: /^[\u4E00-\u9FA5]{1,6}$/,//验证中文名称
    identityNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//验证身份证
    bankCard: /^\d{16}|\d{19}$/,// 验证银行卡号
    phone: /^1[3|4|5|7|8]\d{9}$/, // 验证手机号
    decimal: /^\d+\.?(\d{1,2})?$/, // 验证两位小数和数字
    verifyImgCode: /^[0-9]{5}$/, // 图形验证为5位数字
    verifySmsCode: /^[0-9]{6}$/, // 短信验证为6位数字
    pwdReg0: /^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,20}$/, // 数字，大写字母，小写字母，特殊字符组合
    pwdReg1: /^[0-9]{6,20}$/ // 6~20纯数字
  }

  // html5 本地存储
  T.localStorageSet = function (k, v) {
    if (T.isType(v) == 'Object') {
      v = JSON.stringify(v);
    }
    localStorage.setItem(k, v);
  }

  T.localStorageGet = function (k) {
    if (T.isType(localStorage.getItem(k)) == 'String') {
      var v = JSON.parse(localStorage.getItem(k));
    }
    return v;
  }

  T.sessionStorageSet = function (k, v) {
    if (T.isType(v) == 'Object') {
      v = JSON.stringify(v);
    }
    sessionStorage.setItem(k, v);
  }

  T.sessionStorageGet = function (k) {
    if (T.isType(sessionStorage.getItem(k)) == 'String') {
      var v = JSON.parse(sessionStorage.getItem(k));
    }
    return v;
  }

})();
