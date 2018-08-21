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
 * @module el               // 获取元素
 * @module hasClass         // 判断元素是否有class
 * @module addClass         // 添加class
 * @module removeClass      // 移除class
 * @module getOS            // 获取操作系统类型
 * @module randomNum        // 生成指定范围随机数
 * @module isUrl            // isUrl
 * @module numberFormat     // numberFormat 金额格式化
 * @module skuGroup         // sku组合
 * @module filteremoji      // 过滤特殊字符,表情符号
 * 
 */
(function (window, undefined) {
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
    return value === undefined || value === null || value == "";
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
  T.SetCookies = function (key, value, exdays) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    document.cookie = key + "=" + value + ";path=/;expires=" + exdate.toGMTString();
  };

  // 读取Cookies
  T.GetCookies = function (key) {
    if (document.cookie.length > 0) {
      var arr = document.cookie.split('; '); //这里显示的格式需要切割一下可输出看下
      var cookieObj = {};
      for (var i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('='); //再次切割
        cookieObj[arr2[0]] = arr2[1];
      }
      if (cookieObj[key]) {
        return cookieObj[key];
      }
      return null;
    }
  };

  // 清除Cookies
  T.ClearCookies = function (key) {
    T.SetCookies(key, '', -1);
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
        d = 0,
        h = 0,
        m = 0,
        s = 0;

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
      if (r != null) return unescape(r[2]);
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
      var unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
        str = "";
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
    pwdLength: /^.{6,20}$/, //6-20位密码
    lx3: /([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)\+\`\-\=\[\]\\\{ \}\|\;\'\:\"\,\.\/\<\>\?])\1\1/, //判断是否包含三个连续字符
    numStr: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/, //判断是否同时包含数字 字母
    isChinaName: /^[\u4E00-\u9FA5]{1,6}$/, //验证中文名称
    identityNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //验证身份证
    bankCard: /^\d{16}|\d{19}$/, // 验证银行卡号
    phone: /^1[3|4|5|7|8]\d{9}$/, // 验证手机号
    decimal: /^\d+\.?(\d{1,2})?$/, // 验证两位小数和数字
    verifyImgCode: /^[0-9]{5}$/, // 图形验证为5位数字
    verifySmsCode: /^[0-9]{6}$/, // 短信验证为6位数字
    pwdReg0: /^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,20}$/, // 数字，大写字母，小写字母，特殊字符组合
    pwdReg1: /^[0-9]{6,20}$/, // 6~20纯数字
    pwdReg2:/(?=.*\d)(?=.*[a-zA-Z\W])|(?=.*[a-zA-Z])(?=.*[\d\W])|(?=.*\W)(?=.*[a-zA-Z0-9]).{6,30}/ // 数字,字母，特殊字符，任意2种组合
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

  // 获取元素
  T.el = function (el) {
    return document.querySelector(el);
  }

  // 判断元素是否有某个class
  T.hasClass = function (ele, cls) {
    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
  }

  // 为元素添加class
  T.addClass = function (ele, cls) {
    if (!T.hasClass(ele, cls)) {
      ele.className += ' ' + cls;
    }
  }

  // 为元素移除class
  T.removeClass = function (ele, cls) {
    if (T.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  }

  // 获取操作系统类型
  T.getOS = function () {

    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';

    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';

    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX';

    if (/win/i.test(appVersion)) return 'windows';

    if (/linux/i.test(appVersion)) return 'linux';

    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';

    if (/android/i.test(userAgent)) return 'android';

    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
  }

  // 生成指定范围随机数
  T.randomNum = function (min, max) {

    return Math.floor(min + Math.random() * (max - min));
  }

  // isUrl
  T.isUrl = function (str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  }

  // 金额格式化
  T.numberFormat = function (options) {
    options.filla = options.filla || false;
    options.narrow = options.narrow || false;
    options.roundtag = options.roundtag || 'ceil';
    options.decimals = options.decimals || 2;
    options.decPoint = options.decPoint || '.';
    options.thousandsSep = options.thousandsSep || ',';
    /*
     * 参数说明：
     * number：要格式化的数字
     * filla：小数位不足是否补位 (默认不补位)
     * narrow：小数位后数字缩小 (默认不缩小)
     * roundtag:舍入参数 "ceil" 向上取,"floor"向下取,"round" 四舍五入 (默认 "ceil")
     * decimals：保留几位小数 (默认2位)
     * decPoint：小数点符号 (默认.)
     * thousandsSep：千分位符号 (默认,)
     * */
    options.number = (options.number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+options.number) ? 0 : +options.number,
      prec = !isFinite(+options.decimals) ? 0 : Math.abs(options.decimals),
      sep = (typeof options.thousandsSep === 'undefined') ? ',' : options.thousandsSep,
      dec = (typeof options.decPoint === 'undefined') ? '.' : options.decPoint,
      s = '',
      toFixedFix = function (n, prec) {

        var k = Math.pow(10, prec);


        return '' + parseFloat(Math[options.roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
      };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if (options.filla) {
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        var arrays = [];
        arrays.length = (prec - s[1].length + 1);
        s[1] += arrays.join('0');
      }
    }
    if (options.narrow) {
      return s;
    }
    return s.join(dec);
  }

  // sku
  T.skuGroup = function (arrays) {
    var len = arrays.length;
    if (len >= 2) {
      var arrOne = arrays[0];
      var arrTwo = arrays[1];
      var index = 0;
      var tmp = [];
      for (var i = 0; i < arrOne.length; i++) {
        for (var j = 0; j < arrTwo.length; j++) {
          tmp[index] = `${arrOne[i]}/${arrTwo[j]}`;
          index++;
        }
      }
      var newArr = [];
      newArr[0] = tmp;
      if (len > 2) {
        count = 1;
        for (var y = 2; y < arrays.length; y++) {
          newArr[count] = arrays[y];
          count++;
        }
      }
      return T.skuGroup(newArr)
    } else {
      return arrays[0]
    }

  }

  // 过滤特殊字符,表情符号
  T.filteremoji = function (v) {
    var str = v;
    var strArr = str.split(''),
      result = '',
      totalLen = 0;

    for (var idx = 0; idx < strArr.length; idx++) {
      if (totalLen >= 16) break;
      var val = strArr[idx];
      if (/[a-zA-Z]/.test(val)) {
        totalLen = 1 + +totalLen;
        result += val;
      } else if (/[\u4e00-\u9fa5]/.test(val)) {
        totalLen = 2 + +totalLen;
        result += val;
      } else if (/[\ud800-\udfff]/.test(val)) {
        if (/[\ud800-\udfff]/.test(strArr[idx + 1])) {
          idx++;
        }
        result += '口';
      }
    }
    return result;
  }



})(window);