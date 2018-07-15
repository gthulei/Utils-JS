;
(function () {

  //数据
  var datePicker = {};

  // 获取一个月的数据
  datePicker.getMonthData = function (year, month) {

    var result = [];

    //如果不传就获取当前的年月
    if (!year || !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    // 获取当月第一天
    var firstDay = new Date(year, month - 1, 1);

    //年
    year = firstDay.getFullYear();
    //月
    month = firstDay.getMonth() + 1;

    // 获取当月第一天是周几
    var firstDayWeekDay = firstDay.getDay();
    if (firstDayWeekDay === 0) firstDayWeekDay = 7;

    // 获取上个月最后一天
    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    // 国外星期从1开始,一是星期一,零是周天
    var preMonthDayCount = firstDayWeekDay - 1;

    // 获取当月最后一天
    var lastDay = new Date(year, month, 0);
    var lastDate = lastDay.getDate();

    //一个月数据
    for (var i = 0; i < 7 * 6; i++) {

      var date = i + 1 - preMonthDayCount;
      var showDate = date;
      var thisMonth = month;
      if (date <= 0) {
        // 上一月
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) {
        // 下一月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }

      if (thisMonth === 0) thisMonth = 12;
      if (thisMonth === 13) thisMonth = 1;

      result.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      })
    }

    return {
      year: year,
      month: month,
      days: result
    }

  }

  //渲染
  var monthData, $wrapper;

  datePicker.buildUi = function (year, month) {
    monthData = datePicker.getMonthData(year, month);
    var d = new Date(),
      currentDate = fullYear = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    var html = '<div class="ui-datepicker-header">' +
      '<a class="ui-datepicker-btn ui-datepicker-prev-btn" href="#">&lt;</a>' +
      '<a class="ui-datepicker-btn ui-datepicker-next-btn" href="#">&gt;</a>' +
      '<span class="ui-datepicker-current-month">' + monthData.year + '-' + monthData.month + '</span>' +
      '</div>' +
      '<div class="ui-datepicker-body">' +
      '<table>' +
      '<thead>' +
      '<tr>' +
      '<th>一</th>' +
      '<th>二</th>' +
      '<th>三</th>' +
      '<th>四</th>' +
      '<th>五</th>' +
      '<th>六</th>' +
      '<th>日</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    for (var i = 0; i < monthData.days.length; i++) {

      if (i % 7 === 0) {
        html += '<tr>';
      }
      var t = monthData.year + "/" + monthData.month + "/" + monthData.days[i].date;
      //当前日历加属性
      if (currentDate == t) {
        html += '<td data-date="' + monthData.days[i].date + '" style="color:#f60;">' + monthData.days[i].showDate + '</td>';
      } else {
        html += '<td data-date="' + monthData.days[i].date + '">' + monthData.days[i].showDate + '</td>';
      }
      if (i % 7 === 6) {
        html += '</tr>';
      }

    }

    html += '</tbody>' +
      '</table>' +
      '</div>';

    return html;
  }

  datePicker.render = function (direction) {
    var year, month;
    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }
    if (direction === 'next') month++;
    if (direction === 'prev') month--;

    if (month < 1) {
      year--;
      month = 12;
    }
    if (month > 12) {
      year++;
      month = 1;
    }

    var html = datePicker.buildUi(year, month);
    $wrapper = document.querySelector('.ui-datepicker-container');
    if (!$wrapper) {
      $wrapper = document.createElement('div');
      document.body.appendChild($wrapper);
      $wrapper.className = 'ui-datepicker-container';
    }
    $wrapper.innerHTML = html
  };

  datePicker.init = function (input) {

    var $input = document.querySelector(input);

    datePicker.render()

    $input.addEventListener('focus', function () {
      $wrapper.classList.add('ui-datepicker-container-show');
      var left = $input.offsetLeft;
      var top = $input.offsetTop + $input.offsetHeight;
      $wrapper.style.left = left + 'px';
      $wrapper.style.top = top + 2 + 'px';
    }, false)

    $wrapper.addEventListener('click', function (e) {
      var $target = e.target;
      if (!$target.classList.contains('ui-datepicker-btn')) {
        return false;
      }
      if ($target.classList.contains('ui-datepicker-prev-btn')) {
        datePicker.render('prev');
      } else if ($target.classList.contains('ui-datepicker-next-btn')) {
        datePicker.render('next');
      }

    }, false)

    $wrapper.addEventListener('click', function (e) {
      var $target = e.target;
      if ($target.tagName.toLowerCase() !== 'td') {
        return false;
      }

      var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

      $input.value = format(date);

      $wrapper.classList.remove('ui-datepicker-container-show');

    }, false)

  };

  function format(date) {
    var result = '';
    var padding = function (num) {
      if (num <= 9) {
        return '0' + num;
      }
      return num;
    }
    result += date.getFullYear() + '-';
    result += padding(date.getMonth() + 1) + '-';
    result += padding(date.getDate());
    return result;
  }
  window.datePicker = datePicker;
})();